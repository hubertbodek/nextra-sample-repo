import { Sidebar } from "../shared/sidebar";
import { useCategorizedChangelogNavigation } from "./useChangelogNavigation";

export const ChangeLogSidebar = () => {
  const { links } = useCategorizedChangelogNavigation();

  return (
    <Sidebar
      items={links}
      before={
        <li className="nx-px-4 nx-py-2">
          <div className="font-bold uppercase text-xs text-brand-gray-600">
            Dates
          </div>
        </li>
      }
    />
  );
};
