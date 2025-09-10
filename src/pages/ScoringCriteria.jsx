import Row from "@/ui/Row";
import Heading from "@/ui/Heading";
import ScoringCriteriaTable from "@/features/scoring/criteria/ScoringCriteriaTable";
import ScoringCriteriaListOperations from "@/features/scoring/criteria/ScoringCriteriaListOperations";

import { HiOutlineCheckBadge } from "react-icons/hi2";

function ScoringCriteria() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">
          <HiOutlineCheckBadge /> Critères
        </Heading>
        <ScoringCriteriaListOperations />
      </Row>

      <ScoringCriteriaTable />
    </>
  );
}

export default ScoringCriteria;
