import { useDarkMode } from "@/contexts/DarkModeContext";
import { PRODUCT_STATES } from "@/utils/constants";
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
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);

  padding: 2.4rem 3.2rem;
  grid-column: 1 / span 2;

  & > *:first-child {
    margin-bottom: 1.6rem;
  }

  & .recharts-pie-label-text {
    font-weight: 600;
  }
`;

const LIGHT_COLORS = {
  grey: "var(--color-grey-400)",
  yellow: "var(--color-yellow-700)",
  blue: "var(--color-blue-700)",
  silver: "var(--color-silver-700)",
  indigo: "var(--color-indigo-700)",
  green: "var(--color-green-700)",
};
const DARK_COLORS = {
  grey: "var(--color-grey-500)",
  yellow: "var(--color-yellow-100)",
  blue: "var(--color-blue-100)",
  silver: "var(--color-grey-400)",
  indigo: "var(--color-indigo-100)",
  green: "var(--color-green-100)",
};

const STATES = Object.entries(PRODUCT_STATES).map(([key, o]) => {
  return { ...o, state: key, value: Number("0") };
});

function ProductStatesPieChart({ products }) {
  const { isDarkMode } = useDarkMode();
  const data = STATES.map((s) => {
    s.value = products.filter((p) => p.state === s.state).length;
    return s;
  });

  return (
    <StyledChartBox>
      <Heading as="h2">État des produits</Heading>
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

export default ProductStatesPieChart;
