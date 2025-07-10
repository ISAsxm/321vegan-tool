import Row from "@/ui/Row";
import Heading from "@/ui/Heading";
import BrandTable from "@/features/brands/BrandTable";

import BrandListOperations from "@/features/brands/BrandListOperations";

import { HiOutlineBuildingOffice } from "react-icons/hi2";

function Brands() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">
          <HiOutlineBuildingOffice /> Marques
        </Heading>
        <BrandListOperations />
      </Row>

      <BrandTable />
    </>
  );
}

export default Brands;
