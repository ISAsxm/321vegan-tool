import Row from "@/ui/Row";
import Heading from "@/ui/Heading";

import PartnerCategoryTable from "@/features/partners/categories/PartnerCategoryTable";
import PartnerCategoryListOperations from "@/features/partners/categories/PartnerCategoryListOperations";

import { HiOutlineRectangleGroup } from "react-icons/hi2";

function PartnerCategories() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">
          <HiOutlineRectangleGroup /> Catégories de partenaire
        </Heading>
        <PartnerCategoryListOperations />
      </Row>

      <PartnerCategoryTable />
    </>
  );
}

export default PartnerCategories;
