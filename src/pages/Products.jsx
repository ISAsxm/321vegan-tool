import Row from "@/ui/Row";
import Heading from "@/ui/Heading";
import ProductTable from "@/features/products/ProductTable";

import ProductListOperations from "@/features/products/ProductListOperations";

import { PiPlant } from "react-icons/pi";

function Products() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">
          <PiPlant /> Produits
        </Heading>
        <ProductListOperations />
      </Row>

      <ProductTable />
    </>
  );
}

export default Products;
