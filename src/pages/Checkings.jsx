import Row from "@/ui/Row";
import Heading from "@/ui/Heading";
import CheckingProductTable from "@/features/checkings/CheckingProductTable";

import { HiOutlineEnvelope } from "react-icons/hi2";

function Checkings() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">
          <HiOutlineEnvelope /> Contacts des marques
        </Heading>
      </Row>

      <CheckingProductTable />
    </>
  );
}

export default Checkings;
