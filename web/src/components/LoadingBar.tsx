const LoadingBar = () => {
  return (
    <div
      className="-after:translate-x-full z-50000 fixed
     top-0 left-0 ml-[112px] h-1 w-screen overflow-hidden bg-teal-500 after:absolute after:inset-0 after:animate-shimmer after:bg-gradient-to-r after:from-teal-300 after:to-teal-500
  "
    />
  );
};

export default LoadingBar;
