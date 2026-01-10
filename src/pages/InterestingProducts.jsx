import Row from "@/ui/Row";
import Heading from "@/ui/Heading";
import InterestingProductTable from "@/features/interesting-products/InterestingProductTable";
import InterestingProductListOperations from "@/features/interesting-products/InterestingProductListOperations";

import { PiSparkle } from "react-icons/pi";

function InterestingProducts() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">
          <PiSparkle /> Produits d'intérêt (vegandex)
        </Heading>
        <InterestingProductListOperations />
      </Row>

      <InterestingProductTable />
    </>
  );
}

export default InterestingProducts;
