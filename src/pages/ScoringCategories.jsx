import Row from "@/ui/Row";
import Heading from "@/ui/Heading";
import ScoringCategoryTable from "@/features/scoring/categories/ScoringCategoryTable";
import ScoringCategoryListOperations from "@/features/scoring/categories/ScoringCategoryListOperations";

import { HiOutlineRectangleGroup } from "react-icons/hi2";

function ScoringCategories() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">
          <HiOutlineRectangleGroup /> Catégories
        </Heading>
        <ScoringCategoryListOperations />
      </Row>

      <ScoringCategoryTable />
    </>
  );
}

export default ScoringCategories;
