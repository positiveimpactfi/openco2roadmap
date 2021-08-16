import { adminLinks } from "data/adminLinks";

function LinksGrid() {
  return (
    <div className="bg-white">
      <div className="max-w-4xl mx-auto px-4 py-16 sm:px-6 sm:pt-20 sm:pb-24 lg:max-w-7xl lg:pt-12 lg:px-8">
        <div className="mt-2 grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:mt-2 lg:grid-cols-4 lg:gap-x-8 lg:gap-y-16">
          {adminLinks.map((link) => (
            <div key={link.name}>
              <div className="flex flex-row">
                <span className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500">
                  <link.icon
                    className="h-6 w-6 text-white"
                    aria-hidden="true"
                  />
                </span>
                <h3 className="text-lg font-medium text-black ml-4">
                  {link.name}
                </h3>
              </div>
              <div className="mt-6">
                <p className="mt-2 text-base text-gray-500">
                  {link.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default LinksGrid;
