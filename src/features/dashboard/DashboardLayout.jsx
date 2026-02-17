import Heading from "@/ui/Heading";

import ErrorReportsStats from "./ErrorReportsStats";
import ProductStatesAllTimeStats from "./ProductStatesAllTimeStats";
import ProductStatusesAllTimeStats from "./ProductStatusesAllTimeStats";

import styled from "styled-components";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 2.4rem;
`;

const StyledHeading = styled(Heading)`
  grid-column: 1 / -1;
`;

const Section = styled.div`
  grid-column: 1 / -1;
  display: contents;
`;

function DashboardLayout() {
  return (
    <StyledDashboardLayout>
      <Section>
        <StyledHeading as="h2">Erreurs signalées</StyledHeading>
        <ErrorReportsStats />

        <StyledHeading as="h2">États des produits</StyledHeading>
        <ProductStatesAllTimeStats />

        <StyledHeading as="h2">Statuts des produits</StyledHeading>
        <ProductStatusesAllTimeStats />
      </Section>
    </StyledDashboardLayout>
  );
}

export default DashboardLayout;
