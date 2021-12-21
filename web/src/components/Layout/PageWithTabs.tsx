import { Headings } from "types/Headings";
import { PageLink } from "types/PageLink";
import TabMenu from "components/TabMenu";

type PageProps = Headings & { links: PageLink[]; namespace?: string };

const PageWithTabs: React.FC<PageProps> = ({
  title,
  description,
  links,
  namespace = "common",
  children,
}) => {
  return (
    <main className="flex-1 h-full relative z-0 overflow-y-auto focus:outline-none bg-gray-100">
      <div className="px-4 sm:px-6 lg:px-8 pb-4">
        <TabMenu links={links} namespace={namespace} />
      </div>
      <div className="px-4 mt-2 sm:px-6 lg:px-8 pb-10">
        <h1 className="text-2xl mb-4">{title}</h1>
        <p className="text-md mb-4">{description}</p>
        {children}
      </div>
    </main>
  );
};

export default PageWithTabs;
