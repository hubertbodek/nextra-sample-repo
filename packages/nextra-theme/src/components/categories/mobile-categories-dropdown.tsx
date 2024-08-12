
import { CategoriesDropdown } from "../shared/categories-dropdown";
import { useCategoriesNavigation } from "../shared/useCategoriesNavigation";

interface MobileCategoriesDropdownProps {
  route: string;
}


export const MobileCategoriesDropdown = ({ route }: MobileCategoriesDropdownProps) => {
  const { links } = useCategoriesNavigation({ route });

  return <CategoriesDropdown links={links} />; 
}
