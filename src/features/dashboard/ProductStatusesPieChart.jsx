import { useDarkMode } from "@/contexts/DarkModeContext";
import { PRODUCT_STATUSES } from "@/utils/constants";
import Heading from "@/ui/Heading";

import styled from "styled-components";
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const StyledChartBox = styled.div`
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);

  padding: 2.4rem 3.2rem;
  grid-column: 3 / span 2;

  & > *:first-child {
    margin-bottom: 1.6rem;
  }

  & .recharts-pie-label-text {
    font-weight: 600;
  }
`;

const LIGHT_COLORS = {
  green: "var(--color-green-700)",
  yellow: "var(--color-yellow-700)",
  red: "var(--color-red-700)",
  silver: "var(--color-silver-700)",
};
const DARK_COLORS = {
  green: "var(--color-green-100)",
  yellow: "var(--color-yellow-100)",
  red: "var(--color-red-700)",
  silver: "var(--color-grey-400)",
};

const STATUSES = Object.entries(PRODUCT_STATUSES).map(([key, o]) => {
  return { ...o, status: key, value: Number("0") };
});

function ProductStatusesPieChart({ products }) {
  const { isDarkMode } = useDarkMode();
  const data = STATUSES.map((s) => {
    s.value = products.filter((p) => p.status === s.status).length;
    return s;
  });

  return (
    <StyledChartBox>
      <Heading as="h2">Statut des produits</Heading>
      <ResponsiveContainer width="100%" height={240}>
        <PieChart>
          <Pie
            data={data}
            nameKey="label"
            dataKey="value"
            innerRadius={85}
            outerRadius={110}
            cx="40%"
            cy="50%"
            paddingAngle={3}
          >
            {data.map((entry) => (
              <Cell
                fill={
                  isDarkMode
                    ? DARK_COLORS[entry.color]
                    : LIGHT_COLORS[entry.color]
                }
                stroke={
                  isDarkMode
                    ? DARK_COLORS[entry.color]
                    : LIGHT_COLORS[entry.color]
                }
                key={entry.status}
              />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: "var(--color-grey-0)",
            }}
            itemStyle={{ color: "var(--color-grey-700)" }}
          />
          <Legend
            verticalAlign="middle"
            align="right"
            width="30%"
            layout="vertical"
            iconSize={15}
            iconType="circle"
          />
        </PieChart>
      </ResponsiveContainer>
    </StyledChartBox>
  );
}

export default ProductStatusesPieChart;
