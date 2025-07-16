import { useCurrentMonthProducts } from "./useCurrentMonthProducts";

import Spinner from "@/ui/Spinner";

import ProductStats from "./ProductStats";
import ProductsAreaChart from "./ProductsAreaChart";
import ProductStatesPieChart from "./ProductStatesPieChart";
import ProductStatusesPieChart from "./ProductStatusesPieChart";

import styled from "styled-components";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

function DashboardLayout() {
  const { isPending, products } = useCurrentMonthProducts();

  if (isPending) return <Spinner />;

  return (
    <StyledDashboardLayout>
      <ProductStats products={products} />

      <ProductStatesPieChart products={products} />

      <ProductStatusesPieChart products={products} />

      <ProductsAreaChart products={products} />
    </StyledDashboardLayout>
  );
}

export default DashboardLayout;
