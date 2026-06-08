/**
 * Mock property data for 360 Ghar
 * 10 realistic properties across Gurgaon sectors
 */

const properties = [
  {
    id: 1,
    title: "Sunlit Corner Apartment in Emerald Heights",
    bhk: 2,
    area: 1200,
    price: 75,
    location: "Sector 50, Gurgaon",
    sector: 50,
    amenities: ["swimming pool", "gym", "power backup", "security", "park", "club house"],
    preferences: ["good sunlight", "corner unit", "vastu compliant"],
    nearbyPlaces: [
      { name: "DPS School", type: "school" },
      { name: "Medanta Hospital", type: "hospital" },
      { name: "Sector 50 Market", type: "market" }
    ],
    thumbnailGradient: "linear-gradient(135deg, #0ea5e9 0%, #6366f1 50%, #8b5cf6 100%)",
    description: "A beautifully designed 2BHK apartment with floor-to-ceiling windows on two sides. The south-east facing unit receives abundant morning and afternoon sunlight. Located in a well-maintained society with landscaped gardens."
  },
  {
    id: 2,
    title: "Premium 3BHK in DLF Phase V",
    bhk: 3,
    area: 1850,
    price: 145,
    location: "Sector 54, Gurgaon",
    sector: 54,
    amenities: ["swimming pool", "gym", "power backup", "security", "tennis court", "club house", "jogging track"],
    preferences: ["high floor", "good sunlight", "premium finishes"],
    nearbyPlaces: [
      { name: "Heritage School", type: "school" },
      { name: "Artemis Hospital", type: "hospital" },
      { name: "Galleria Market", type: "market" },
      { name: "HUDA City Centre Metro", type: "metro" }
    ],
    thumbnailGradient: "linear-gradient(135deg, #f59e0b 0%, #ef4444 50%, #ec4899 100%)",
    description: "Spacious 3BHK on the 18th floor with panoramic city views. Italian marble flooring, modular kitchen with Hettich fittings, and a large balcony overlooking the golf course. Part of a premium gated community."
  },
  {
    id: 3,
    title: "Affordable Smart Home in Sohna Road",
    bhk: 2,
    area: 950,
    price: 42,
    location: "Sector 70, Gurgaon",
    sector: 70,
    amenities: ["power backup", "security", "park", "smart home"],
    preferences: ["vastu compliant", "new construction"],
    nearbyPlaces: [
      { name: "Ryan International School", type: "school" },
      { name: "Columbia Asia Hospital", type: "hospital" }
    ],
    thumbnailGradient: "linear-gradient(135deg, #22c55e 0%, #0ea5e9 50%, #3b82f6 100%)",
    description: "Newly constructed smart-enabled 2BHK with home automation features. Alexa-compatible switches, video door phone, and energy-efficient design. Ideal for young professionals and small families."
  },
  {
    id: 4,
    title: "Luxury 4BHK Penthouse with Terrace",
    bhk: 4,
    area: 3200,
    price: 250,
    location: "Sector 56, Gurgaon",
    sector: 56,
    amenities: ["swimming pool", "gym", "power backup", "security", "spa", "concierge", "terrace garden", "club house"],
    preferences: ["high floor", "good sunlight", "premium finishes", "quiet neighborhood", "corner unit"],
    nearbyPlaces: [
      { name: "Shiv Nadar School", type: "school" },
      { name: "Fortis Hospital", type: "hospital" },
      { name: "Huda City Centre Metro", type: "metro" },
      { name: "Vyapar Kendra Market", type: "market" }
    ],
    thumbnailGradient: "linear-gradient(135deg, #a855f7 0%, #6366f1 50%, #0ea5e9 100%)",
    description: "Ultra-luxurious duplex penthouse on the top floor with a private 800 sq ft terrace garden. Features imported fixtures, a home theatre, servant quarters, and 3 covered parking spots. The epitome of premium living."
  },
  {
    id: 5,
    title: "Cozy 1BHK Studio near Cyber City",
    bhk: 1,
    area: 550,
    price: 35,
    location: "Sector 49, Gurgaon",
    sector: 49,
    amenities: ["gym", "power backup", "security", "laundry"],
    preferences: ["near metro", "good connectivity"],
    nearbyPlaces: [
      { name: "DLF Cyber City", type: "office" },
      { name: "Rapid Metro Station", type: "metro" },
      { name: "Suncity School", type: "school" }
    ],
    thumbnailGradient: "linear-gradient(135deg, #0891b2 0%, #059669 50%, #22c55e 100%)",
    description: "Compact and efficiently designed 1BHK perfect for working professionals. Just 5 minutes from Cyber City and walking distance to the Rapid Metro. Fully furnished with modular kitchen and split ACs."
  },
  {
    id: 6,
    title: "Family 3BHK with Garden View",
    bhk: 3,
    area: 1650,
    price: 95,
    location: "Sector 57, Gurgaon",
    sector: 57,
    amenities: ["swimming pool", "gym", "power backup", "security", "park", "children play area", "club house"],
    preferences: ["good sunlight", "vastu compliant", "quiet neighborhood"],
    nearbyPlaces: [
      { name: "DAV Public School", type: "school" },
      { name: "Max Hospital", type: "hospital" },
      { name: "Sector 57 Market", type: "market" }
    ],
    thumbnailGradient: "linear-gradient(135deg, #10b981 0%, #34d399 50%, #a3e635 100%)",
    description: "Thoughtfully designed 3BHK overlooking a lush 2-acre central garden. All bedrooms receive cross-ventilation and natural light. Child-friendly society with excellent school bus connectivity."
  },
  {
    id: 7,
    title: "Modern 2BHK in Golf Course Extension",
    bhk: 2,
    area: 1350,
    price: 88,
    location: "Sector 65, Gurgaon",
    sector: 65,
    amenities: ["swimming pool", "gym", "power backup", "security", "club house", "jogging track"],
    preferences: ["modern design", "good sunlight", "high floor"],
    nearbyPlaces: [
      { name: "Pathways School", type: "school" },
      { name: "W Pratiksha Hospital", type: "hospital" },
      { name: "Sector 65 Metro (upcoming)", type: "metro" }
    ],
    thumbnailGradient: "linear-gradient(135deg, #f97316 0%, #fb923c 50%, #fbbf24 100%)",
    description: "Contemporary designed 2BHK with open kitchen concept and floor-to-ceiling glass panels. Located in one of Gurgaon's fastest-developing corridors with excellent future appreciation potential."
  },
  {
    id: 8,
    title: "Spacious 3BHK Independent Floor",
    bhk: 3,
    area: 2100,
    price: 120,
    location: "Sector 50, Gurgaon",
    sector: 50,
    amenities: ["power backup", "security", "park", "car parking"],
    preferences: ["independent floor", "good sunlight", "vastu compliant", "quiet neighborhood"],
    nearbyPlaces: [
      { name: "DPS School", type: "school" },
      { name: "Medanta Hospital", type: "hospital" },
      { name: "Sector 50 Market", type: "market" }
    ],
    thumbnailGradient: "linear-gradient(135deg, #ec4899 0%, #f43f5e 50%, #ef4444 100%)",
    description: "First-floor independent builder flat with private staircase and reserved parking. Large living room with Italian marble, wooden work in all bedrooms, and a modular kitchen with chimney. Peaceful residential colony."
  },
  {
    id: 9,
    title: "Budget 2BHK in Upcoming Location",
    bhk: 2,
    area: 850,
    price: 38,
    location: "Sector 82, Gurgaon",
    sector: 82,
    amenities: ["power backup", "security", "park", "children play area"],
    preferences: ["new construction", "vastu compliant"],
    nearbyPlaces: [
      { name: "Delhi Public School", type: "school" },
      { name: "Paras Hospital", type: "hospital" }
    ],
    thumbnailGradient: "linear-gradient(135deg, #64748b 0%, #475569 50%, #6366f1 100%)",
    description: "Affordable 2BHK in a rapidly developing sector with excellent connectivity to NH-8 and Dwarka Expressway. New RERA-registered project with OC received. Ideal for first-time home buyers."
  },
  {
    id: 10,
    title: "Premium 2BHK with Club Membership",
    bhk: 2,
    area: 1100,
    price: 68,
    location: "Sector 62, Gurgaon",
    sector: 62,
    amenities: ["swimming pool", "gym", "power backup", "security", "club house", "squash court", "yoga room"],
    preferences: ["good sunlight", "modern design"],
    nearbyPlaces: [
      { name: "GD Goenka School", type: "school" },
      { name: "Park Hospital", type: "hospital" },
      { name: "Golf Course Extension Road", type: "road" }
    ],
    thumbnailGradient: "linear-gradient(135deg, #0ea5e9 0%, #06b6d4 50%, #14b8a6 100%)",
    description: "Well-maintained 2BHK with complimentary premium club membership. Features include a temperature-controlled pool, professional squash court, and a yoga & meditation room. Society has won awards for green maintenance."
  }
];

export default properties;
