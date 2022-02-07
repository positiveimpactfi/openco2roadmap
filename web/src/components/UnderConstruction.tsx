const CubeIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1"
        d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5"
      />
    </svg>
  );
};

export const PageUnderConstruction = () => {
  return (
    <div className="flex items-center justify-center space-x-4 py-6 px-6 pb-8">
      <div className="w-24 font-extralight text-gray-600">
        <CubeIcon />
      </div>
      <div className="flex max-w-[35ch] flex-col space-y-4">
        <h3 className="text-lg  text-gray-600">Sivu rakenteilla</h3>
        <p className="text-gray-600">
          Laskuria kehitetään aktiivisesti ja tälle sivulle tulevat ominaisuudet
          julkaistaan myöhemmin.
        </p>
      </div>
    </div>
  );
};

export const SectionUnderConstruction = () => {
  return (
    <div className="flex items-center justify-start space-x-4 bg-gray-200 py-6 px-6 pb-8">
      <div className="w-24 font-extralight text-gray-600">
        <CubeIcon />
      </div>
      <div className="flex max-w-[35ch] flex-col items-start justify-start space-y-4">
        <h3 className="text-lg text-gray-600">Osio rakenteilla</h3>
        <p className="text-gray-600">
          Laskuria kehitetään aktiivisesti ja tämä osio julkaistaan käyttöön
          myöhemmin.
        </p>
      </div>
    </div>
  );
};
