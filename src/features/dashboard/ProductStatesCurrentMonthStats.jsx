import { PRODUCT_STATES } from "@/utils/constants";
import { getFirstDateOfMonth } from "@/utils/helpers";

import StatCount from "./StatCount";

import {
  HiOutlineDocumentCheck,
  HiOutlineCheck,
  HiOutlinePaperAirplane,
  HiOutlineClock,
  HiOutlineSparkles,
  HiOutlineChartBar,
} from "react-icons/hi2";

import styled from "styled-components";

const StyledGroupStats = styled.div`
  grid-column: 1 / -1;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 2.4rem;
`;

const ICON_COMPONENTS = {
  CREATED: <HiOutlineDocumentCheck />,
  NEED_CONTACT: <HiOutlinePaperAirplane />,
  WAITING_BRAND_REPLY: <HiOutlineClock />,
  WAITING_PUBLISH: <HiOutlineSparkles />,
  PUBLISHED: <HiOutlineCheck />,
};

function ProductStatesCurrentMonthStats() {
  const firstDate = getFirstDateOfMonth().toISOString().slice(0, -1);
  return (
    <StyledGroupStats>
      {Object.entries(PRODUCT_STATES)
        .filter(([key]) =>
          ["CREATED", "NEED_CONTACT", "WAITING_PUBLISH", "PUBLISHED"].includes(
            key,
          ),
        )
        .map(([key, o]) => (
          <StatCount
            key={key}
            title={o.label}
            color={o.color}
            icon={ICON_COMPONENTS[key]}
            filters={[
              { field: "state", value: key },
              {
                field: "updated_at__gt",
                value: firstDate,
              },
            ]}
          />
        ))}
    </StyledGroupStats>
  );
}

export default ProductStatesCurrentMonthStats;
