/**
 * OpenRouter API service
 * Handles LLM calls for query parsing and property summaries
 */

const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1/chat/completions';
const MODEL = 'google/gemma-4-31b-it:free';

/**
 * Make a call to OpenRouter API
 */
async function callOpenRouter(messages, apiKey) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 20000); // 20 second timeout

  try {
    const response = await fetch(OPENROUTER_API_URL, {
      method: 'POST',
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
        'HTTP-Referer': window.location.origin,
        'X-Title': '360 Ghar - AI Property Search'
      },
      body: JSON.stringify({
        model: MODEL,
        messages,
        temperature: 0.1,
        max_tokens: 1024
      })
    });
    
    clearTimeout(timeoutId);

    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      throw new Error(err.error?.message || `API error: ${response.status}`);
    }

    const data = await response.json();
    return data.choices?.[0]?.message?.content || '';
  } catch (error) {
    clearTimeout(timeoutId);
    if (error.name === 'AbortError') {
      throw new Error('AI server took too long to respond. Please try again.');
    }
    throw error;
  }
}

/**
 * Parse a natural language property search query into structured filters
 */
export async function parseQuery(query, apiKey) {
  const systemPrompt = `You are a real estate search query parser for properties in Gurgaon (Gurugram), India.

Your job is to extract structured search filters from the user's natural language query.

IMPORTANT RULES:
- Prices in Indian real estate are typically in "lakhs" (1 lakh = ₹1,00,000) or "crores" (1 crore = ₹1,00,00,000 = 100 lakhs)
- "Under 80 lakhs" means priceMax = 80
- "1 crore" = 100 lakhs, "2.5 crore" = 250 lakhs
- Sectors in Gurgaon are numbered (e.g., Sector 50, Sector 57)
- BHK refers to Bedroom-Hall-Kitchen configuration (1BHK, 2BHK, 3BHK, 4BHK)
- Normalize amenity and preference terms to match these standard values:
  Amenities: swimming pool, gym, power backup, security, park, club house, jogging track, tennis court, spa, concierge, children play area, smart home, car parking, laundry, squash court, yoga room, terrace garden
  Preferences: good sunlight, corner unit, vastu compliant, high floor, quiet neighborhood, premium finishes, modern design, new construction, near metro, good connectivity, independent floor
  Nearby place types: school, hospital, metro, market, office, road

Return ONLY a valid JSON object (no markdown, no explanation, no extra text) in this exact format:
{
  "bhk": [],
  "priceMin": null,
  "priceMax": null,
  "locations": [],
  "amenities": [],
  "preferences": [],
  "nearbyPlaceTypes": [],
  "followUpQuestion": null,
  "followUpOptions": []
}

- bhk: array of integers (e.g., [2] or [2, 3]). Empty if not specified.
- priceMin/priceMax: numbers in lakhs, null if not specified.
- locations: array of location strings like "Sector 50" — extract sector numbers/names.
- amenities: normalized amenity strings from the list above.
- preferences: normalized preference strings from the list above.
- nearbyPlaceTypes: types of nearby places the user wants (e.g., "school", "hospital").
- followUpQuestion: If the query is ambiguous or vague, set this to ONE short clarifying question. Otherwise null.
- followUpOptions: If followUpQuestion is set, provide 2-3 short clickable option strings. Otherwise empty array.

Examples of when to ask a follow-up:
- User says "flat in Gurgaon" with no specific area → ask about preferred sectors
- User mentions a misspelled or ambiguous sector → clarify which one
- Very broad price range with no other constraints → ask about preferences

If the query is clear and specific, set followUpQuestion to null.`;

  const content = await callOpenRouter([
    { role: 'system', content: systemPrompt },
    { role: 'user', content: query }
  ], apiKey);

  try {
    // Extract JSON from the response (handle potential markdown wrapping)
    let jsonStr = content;
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      jsonStr = jsonMatch[0];
    }
    const parsed = JSON.parse(jsonStr);

    // Validate and provide defaults
    return {
      bhk: Array.isArray(parsed.bhk) ? parsed.bhk : [],
      priceMin: typeof parsed.priceMin === 'number' ? parsed.priceMin : null,
      priceMax: typeof parsed.priceMax === 'number' ? parsed.priceMax : null,
      locations: Array.isArray(parsed.locations) ? parsed.locations : [],
      amenities: Array.isArray(parsed.amenities) ? parsed.amenities : [],
      preferences: Array.isArray(parsed.preferences) ? parsed.preferences : [],
      nearbyPlaceTypes: Array.isArray(parsed.nearbyPlaceTypes) ? parsed.nearbyPlaceTypes : [],
      followUpQuestion: parsed.followUpQuestion || null,
      followUpOptions: Array.isArray(parsed.followUpOptions) ? parsed.followUpOptions : []
    };
  } catch {
    console.error('Failed to parse LLM response:', content);
    throw new Error('Failed to parse search query. Please try rephrasing.');
  }
}

/**
 * Generate a personalized AI summary for a property based on the user's original query
 */
export async function generateSummary(property, originalQuery, apiKey) {
  const systemPrompt = `You are a friendly, knowledgeable real estate advisor for 360 Ghar, a property search platform in Gurgaon, India.

Given a property's details and the buyer's original search query, write a personalized 2-3 line summary explaining WHY this specific property is a great match for them.

Rules:
- Reference specific aspects of their query (e.g., if they wanted "good sunlight", mention the property's sunlight features)
- Be warm, helpful, and specific — not generic marketing copy
- Mention 2-3 concrete reasons the property matches
- Keep it to 2-3 sentences maximum
- Use ₹ symbol for prices
- Don't start with "This property" — vary your opening`;

  const userPrompt = `Buyer's search query: "${originalQuery}"

Property details:
- Title: ${property.title}
- Type: ${property.bhk}BHK, ${property.area} sq ft
- Price: ₹${property.price} Lakhs
- Location: ${property.location}
- Amenities: ${property.amenities.join(', ')}
- Features: ${property.preferences.join(', ')}
- Nearby: ${property.nearbyPlaces.map(p => `${p.name} (${p.type})`).join(', ')}
- Description: ${property.description}

Write a personalized 2-3 line summary:`;

  const content = await callOpenRouter([
    { role: 'system', content: systemPrompt },
    { role: 'user', content: userPrompt }
  ], apiKey);

  return content.trim();
}

/**
 * Validate an API key with a simple test call
 */
export async function validateApiKey(apiKey) {
  try {
    await callOpenRouter([
      { role: 'user', content: 'Hello' }
    ], apiKey);
    return true;
  } catch {
    return false;
  }
}

export { MODEL };
