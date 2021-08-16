import { adminLinks } from "data/adminLinks";

function LinksGrid() {
  return (
    <div className="bg-gray-100">
      <div className="max-w-4xl mx-auto px-4 py-16 sm:px-6 sm:pt-20 sm:pb-24 lg:max-w-7xl lg:pt-12 lg:px-8 bg-white">
        <div className="mt-2 grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:mt-2 ">
          {adminLinks.map((link) => (
            <div key={link.name}>
              <div className="flex flex-row">
                <span className="flex flex-shrink-0 items-center justify-center h-12 w-12 rounded-md bg-indigo-500">
                  <link.icon
                    className="h-6 w-6 text-white"
                    aria-hidden="true"
                  />
                </span>
                <div className="flex flex-col ml-4">
                  <h3 className="text-lg font-medium text-black leading-none">
                    {link.name}
                  </h3>
                  <p className="mt-2 text-base text-gray-500">
                    {link.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default LinksGrid;
