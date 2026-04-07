import { useShopReviewsCount } from "./useShopReviewsCount";

import Heading from "@/ui/Heading";
import Stat from "./Stat";
import DashboardBox from "./DashboardBox";

import { MdOutlineReviews } from "react-icons/md";

import styled from "styled-components";

const StyledDashboardBox = styled(DashboardBox)`
  grid-column: 3 / span 2;
`;

const GroupStats = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2.4rem;
`;
function ShopReviewsStats() {
  const { isPending: isPendingUntreated, count: untreatedCount } =
    useShopReviewsCount("PENDING");
  const { isPending: isPendingTreated, count: treatedCount } =
    useShopReviewsCount("PENDING", "__ne");

  return (
    <StyledDashboardBox>
      <Heading as="h2">Avis sur les magasins</Heading>
      <GroupStats>
        <Stat
          title="Avis non traités"
          color="yellow"
          icon={<MdOutlineReviews />}
          value={untreatedCount}
          isPending={isPendingUntreated}
        />
        <Stat
          title="Avis traités"
          color="green"
          icon={<MdOutlineReviews />}
          value={treatedCount}
          isPending={isPendingTreated}
        />
      </GroupStats>
    </StyledDashboardBox>
  );
}

export default ShopReviewsStats;
