import Row from "@/ui/Row";
import Heading from "@/ui/Heading";

import AdditiveListOperations from "@/features/additives/AdditiveListOperations";
import AdditiveTable from "@/features/additives/AdditiveTable";

import { HiOutlineBeaker } from "react-icons/hi2";

function Additives() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">
          <HiOutlineBeaker /> Additifs
        </Heading>
        <AdditiveListOperations />
      </Row>

      <AdditiveTable />
    </>
  );
}

export default Additives;
