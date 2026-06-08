export default function SkeletonCard() {
  return (
    <div className="skeleton-card" aria-hidden="true">
      <div className="skeleton-thumbnail" />
      <div className="skeleton-body">
        <div className="skeleton-line price" />
        <div className="skeleton-line medium" />
        <div className="skeleton-line short" />
        <div className="skeleton-line long" />
      </div>
    </div>
  );
}
