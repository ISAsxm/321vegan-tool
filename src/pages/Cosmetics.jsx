import Row from "@/ui/Row";
import Heading from "@/ui/Heading";

import CosmeticListOperations from "@/features/cosmetics/CosmeticListOperations";
import CosmeticTable from "@/features/cosmetics/CosmeticTable";

import { PiHandSoap } from "react-icons/pi";

function Cosmetics() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">
          <PiHandSoap /> Cosmétiques
        </Heading>
        <CosmeticListOperations />
      </Row>

      <CosmeticTable />
    </>
  );
}

export default Cosmetics;
