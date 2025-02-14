const LoadingDots = () => {
  return (
    <div
      className="relative w-16 h-4"
      style={{
        WebkitMask: `radial-gradient(circle closest-side,
          #000 90%,
          transparent 90%
        ) 0 / 33.33% 100%`,
        mask: `radial-gradient(circle closest-side,
          #000 90%,
          transparent 90%
        ) 0 / 33.33% 100%`,
        WebkitMaskRepeat: "space",
        maskRepeat: "space",
        background: "black",
        animation: "dotMove 1s steps(4) infinite",
      }}
    >
      <style>{`
        @keyframes dotMove {
          0% {
            clip-path: inset(0 100% 0 0);
          }
          100% {
            clip-path: inset(0 -34% 0 0);
          }
        }
      `}</style>
    </div>
  );
};

export default LoadingDots;
