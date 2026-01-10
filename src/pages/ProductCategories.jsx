import Row from "@/ui/Row";
import Heading from "@/ui/Heading";
import ProductCategoryTable from "@/features/product-categories/ProductCategoryTable";
import ProductCategoryListOperations from "@/features/product-categories/ProductCategoryListOperations";

import { HiOutlineRectangleGroup } from "react-icons/hi2";

function ProductCategories() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">
          <HiOutlineRectangleGroup /> Catégories de produit
        </Heading>
        <ProductCategoryListOperations />
      </Row>

      <ProductCategoryTable />
    </>
  );
}

export default ProductCategories;
