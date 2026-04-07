import ErrorReportsStats from "./ErrorReportsStats";
import ShopReviewsStats from "./ShopReviewsStats";
import ProductStatesAllTimeStats from "./ProductStatesAllTimeStats";
import ProductStatusesAllTimeStats from "./ProductStatusesAllTimeStats";

import styled from "styled-components";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2.4rem;
`;

function DashboardLayout() {
  return (
    <StyledDashboardLayout>
      <ErrorReportsStats />
      <ShopReviewsStats />
      <ProductStatesAllTimeStats />
      <ProductStatusesAllTimeStats />
    </StyledDashboardLayout>
  );
}

export default DashboardLayout;
