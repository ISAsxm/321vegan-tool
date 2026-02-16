import Row from "@/ui/Row";
import Heading from "@/ui/Heading";

import PartnerListOperations from "@/features/partners/partners/PartnerListOperations";
import PartnerTable from "@/features/partners/partners/PartnerTable";

import { HiOutlineBuildingStorefront } from "react-icons/hi2";

function Partners() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">
          <HiOutlineBuildingStorefront /> Entreprises partenaires
        </Heading>
        <PartnerListOperations />
      </Row>

      <PartnerTable />
    </>
  );
}

export default Partners;
