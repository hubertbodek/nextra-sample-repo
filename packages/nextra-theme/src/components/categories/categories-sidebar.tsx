import { ReactNode } from "react";
import { Sidebar } from "../shared/sidebar";
import { useCategoriesNavigation } from "../shared/useCategoriesNavigation";

interface CategoriesSidebarProps {
  route: string;
  tabs?: ReactNode;
}
export const CategoriesSidebar = ({ route, tabs }: CategoriesSidebarProps) => {
  const { links } = useCategoriesNavigation({ route });

  return <Sidebar items={links} tabs={tabs} withSearch />;
};
