import { CategoriesDropdown } from "../shared/categories-dropdown";
import { useChangelogNavigation } from "./useChangelogNavigation";

export const ChangelogMobileCategoriesDropdown = () => {
  const { links } = useChangelogNavigation();

  return <CategoriesDropdown links={links} />;
};
