import { useCurrentMonthProducts } from "./useCurrentMonthProducts";

import Spinner from "@/ui/Spinner";
import Divider from "@/ui/Divider";
import Heading from "@/ui/Heading";

import ProductCurrentMonthStats from "./ProductCurrentMonthStats";
import ErrorReportsStats from "./ErrorReportsStats";
import ProductStatesAllTimeStats from "./ProductStatesAllTimeStats";
import ProductStatusesAllTimeStats from "./ProductStatusesAllTimeStats";
import ProductCurrentMonthAreaChart from "./ProductCurrentMonthAreaChart";
import ProductStatesCurrentMonthPieChart from "./ProductStatesCurrentMonthPieChart";
import ProductStatusesCurrentMonthPieChart from "./ProductStatusesCurrentMonthPieChart";

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

const SectionDivider = styled(Divider)`
  grid-column: 1 / -1;
  margin: 4rem 0 4rem 0;
`;

function DashboardLayout() {
  const { isPending, products } = useCurrentMonthProducts();

  if (isPending) return <Spinner />;

  return (
    <StyledDashboardLayout>
      <Section>
        <StyledHeading as="h2">
          Statistiques du mois actuel (100 derniers produits)
        </StyledHeading>

        <ProductCurrentMonthStats products={products} />

        <ProductStatesCurrentMonthPieChart products={products} />

        <ProductStatusesCurrentMonthPieChart products={products} />

        <ProductCurrentMonthAreaChart products={products} />
      </Section>

      <SectionDivider />

      <Section>
        <StyledHeading as="h2">
          Statistiques tous temps (tous les produits)
        </StyledHeading>

        <ErrorReportsStats />

        <StyledHeading as="h3">États des produits</StyledHeading>
        <ProductStatesAllTimeStats />

        <StyledHeading as="h3">Statuts des produits</StyledHeading>
        <ProductStatusesAllTimeStats />
      </Section>
    </StyledDashboardLayout>
  );
}

export default DashboardLayout;
