const LoadingBar = () => {
  return (
    <div
      className="h-1 w-screen ml-[112px]
     fixed top-0 left-0 after:absolute overflow-hidden bg-teal-500 after:inset-0 -after:translate-x-full after:bg-gradient-to-r after:from-teal-300 after:to-teal-500 after:animate-shimmer z-50000
  "
    />
  );
};

export default LoadingBar;
