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
    <main className="relative z-0 h-full flex-1 overflow-y-auto bg-gray-100 focus:outline-none">
      <div className="px-4 pb-4 sm:px-6 lg:px-8">
        <TabMenu links={links} namespace={namespace} />
      </div>
      <div className="mt-2 px-4 pb-10 sm:px-6 lg:px-8">
        <h1 className="mb-4 text-2xl">{title}</h1>
        <p className="text-md mb-4">{description}</p>
        {children}
      </div>
    </main>
  );
};

export default PageWithTabs;
