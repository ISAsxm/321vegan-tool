import { useCurrentMonthProducts } from "./useCurrentMonthProducts";

import Spinner from "@/ui/Spinner";

import ProductStats from "./ProductStats";
import AllTimeProductStats from "./AllTimeProductStats";
import ProductsAreaChart from "./ProductsAreaChart";
import ProductStatesPieChart from "./ProductStatesPieChart";
import ProductStatusesPieChart from "./ProductStatusesPieChart";

import styled from "styled-components";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 2.4rem;
`;

const CurrentMonthSection = styled.div`
  grid-column: 1 / -1;
  display: contents;
`;

const AllTimeSection = styled.div`
  grid-column: 1 / -1;
  display: contents;
`;

const SectionTitle = styled.h2`
  grid-column: 1 / -1;
  font-size: 2.4rem;
  font-weight: 600;
  color: var(--color-grey-700);
  margin: 0;
  padding: 1.6rem 0;
  border-bottom: 1px solid var(--color-grey-200);
`;

function DashboardLayout() {
  const { isPending, products } = useCurrentMonthProducts();

  if (isPending) return <Spinner />;

  return (
    <StyledDashboardLayout>
      <CurrentMonthSection>
        <SectionTitle>Statistiques du mois actuel (100 derniers produits)</SectionTitle>
        
        <ProductStats products={products} />

        <ProductStatesPieChart products={products} />

        <ProductStatusesPieChart products={products} />

        <ProductsAreaChart products={products} />
      </CurrentMonthSection>

      <AllTimeSection>
        <SectionTitle>Statistiques tous temps</SectionTitle>

        <AllTimeProductStats />
      </AllTimeSection>

    </StyledDashboardLayout>
  );
}

export default DashboardLayout;
