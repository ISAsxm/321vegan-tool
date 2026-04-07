import Row from "@/ui/Row";
import Heading from "@/ui/Heading";

import ShopReviewTable from "@/features/shop-reviews/ShopReviewTable";

import { MdOutlineReviews } from "react-icons/md";

function ShopReviews() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">
          <MdOutlineReviews /> Avis
        </Heading>
      </Row>

      <ShopReviewTable />
    </>
  );
}

export default ShopReviews;
