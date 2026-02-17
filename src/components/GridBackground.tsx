const GridBackground = () => {
  return (
    <div className="grid-lines-wrapper" aria-hidden="true">
      <div className="grid-lines">
        {Array.from({ length: 14 }, (_, i) => (
          <span key={i} className="line" />
        ))}
      </div>
    </div>
  );
};

export default GridBackground;
