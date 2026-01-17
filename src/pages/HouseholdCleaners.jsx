import Row from "@/ui/Row";
import Heading from "@/ui/Heading";

import HouseholdCleanerListOperations from "@/features/household-cleaners/HouseholdCleanerListOperations";
import HouseholdCleanerTable from "@/features/household-cleaners/HouseholdCleanerTable";

import { PiSprayBottle } from "react-icons/pi";

function HouseholdCleaners() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">
          <PiSprayBottle /> Marques de nettoyants
        </Heading>
        <HouseholdCleanerListOperations />
      </Row>

      <HouseholdCleanerTable />
    </>
  );
}

export default HouseholdCleaners;
