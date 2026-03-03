import Row from "@/ui/Row";
import Heading from "@/ui/Heading";
import ButtonText from "@/ui/ButtonText";
import ProductValidatorTool from "@/features/products/ProductValidatorTool";

import { useGoBack } from "@/hooks/useGoBack";
import { PiPlant } from "react-icons/pi";

function ProductValidator() {
  const goBack = useGoBack();

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">
          <PiPlant /> Mode validation de produits
        </Heading>
        <ButtonText onClick={goBack}>&larr; Retour aux produits</ButtonText>
      </Row>

      <ProductValidatorTool />
    </>
  );
}

export default ProductValidator;
