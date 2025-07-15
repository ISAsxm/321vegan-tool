import Row from "@/ui/Row";
import Heading from "@/ui/Heading";

import ApiClientListOperations from "@/features/apiclients/ApiClientListOperations";
import ApiClientTable from "@/features/apiclients/ApiClientTable";

import { HiMiniGlobeAlt } from "react-icons/hi2";

function ApiClients() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">
          <HiMiniGlobeAlt /> Clients API
        </Heading>
        <ApiClientListOperations />
      </Row>

      <ApiClientTable />
    </>
  );
}

export default ApiClients;
