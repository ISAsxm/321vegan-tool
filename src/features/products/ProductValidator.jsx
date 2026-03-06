import Row from "@/ui/Row";
import Heading from "@/ui/Heading";
import ProductValidatorTool from "@/features/products/ProductValidatorTool";

import { HiOutlineDocumentCheck } from "react-icons/hi2";

function ProductValidator() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">
          <HiOutlineDocumentCheck /> Validation des produits
        </Heading>
      </Row>

      <ProductValidatorTool />
    </>
  );
}

export default ProductValidator;
