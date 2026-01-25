import {
  AreaChart,
  Area,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";
import { eachDayOfInterval, isSameDay } from "date-fns";
import {
  formatDate,
  getFirstDateOfMonth,
  getLastDateOfMonth,
} from "@/utils/helpers";

import { useDarkMode } from "@/contexts/DarkModeContext";

import Heading from "@/ui/Heading";

import styled from "styled-components";

const StyledProductsAreaChart = styled.div`
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);

  padding: 3.2rem;

  display: flex;
  flex-direction: column;
  gap: 2.4rem;

  grid-column: 1 / -1;

  /* Hack to change grid line colors */
  & .recharts-cartesian-grid-horizontal line,
  & .recharts-cartesian-grid-vertical line {
    stroke: var(--color-grey-300);
  }
`;

function ProductCurrentMonthAreaChart({ products }) {
  const { isDarkMode } = useDarkMode();

  const allDates = eachDayOfInterval({
    start: getFirstDateOfMonth(),
    end: getLastDateOfMonth(),
  });
  const data = allDates.map((date) => {
    return {
      label: formatDate(date.toISOString(), "dd MMM"),
      totalAdded: products.filter((p) =>
        isSameDay(date, new Date(p.created_at)),
      ).length,
      totalPublished: products.filter(
        (p) =>
          p.state === "PUBLISHED" && isSameDay(date, new Date(p.updated_at)),
      ).length,
    };
  });

  const colors = isDarkMode
    ? {
        totalAdded: {
          stroke: "var(--color-indigo-100)",
          fill: "var(--color-indigo-100)",
        },
        totalPublished: {
          stroke: "var(--color-green-100)",
          fill: "var(--color-green-100)",
        },
      }
    : {
        totalAdded: {
          stroke: "var(--color-indigo-700)",
          fill: "var(--color-indigo-700)",
        },
        totalPublished: {
          stroke: "var(--color-green-700)",
          fill: "var(--color-green-700)",
        },
      };

  return (
    <StyledProductsAreaChart>
      <Heading as="h2">
        Ajout de produits &mdash; Période du{" "}
        {formatDate(allDates[0].toISOString(), "dd MMM yyyy")} au{" "}
        {formatDate(allDates.at(-1).toISOString(), "dd MMM yyyy")}
      </Heading>

      <ResponsiveContainer height={300} width="100%">
        <AreaChart data={data}>
          <XAxis
            dataKey="label"
            tick={{ fill: "var(--color-grey-700)" }}
            tickLine={{ stroke: "var(--color-grey-700)" }}
          />
          <YAxis
            tick={{ fill: "var(--color-grey-700)" }}
            tickLine={{ stroke: "var(--color-grey-700)" }}
          />
          <CartesianGrid strokeDasharray="4" />
          <Tooltip contentStyle={{ backgroundColor: "var(--color-grey-0)" }} />
          <Area
            dataKey="totalAdded"
            type="monotone"
            stroke={colors.totalAdded.stroke}
            fill={colors.totalAdded.fill}
            strokeWidth={2}
            name="Total Scannés"
          />
          <Area
            dataKey="totalPublished"
            type="monotone"
            stroke={colors.totalPublished.stroke}
            fill={colors.totalPublished.fill}
            strokeWidth={2}
            name="Total Publiés"
          />
        </AreaChart>
      </ResponsiveContainer>
    </StyledProductsAreaChart>
  );
}

export default ProductCurrentMonthAreaChart;
