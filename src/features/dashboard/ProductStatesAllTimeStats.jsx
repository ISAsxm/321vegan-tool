import { PRODUCT_STATES } from "@/utils/constants";

import StatCount from "./StatCount";

import {
  HiOutlineDocumentCheck,
  HiOutlineCheck,
  HiOutlinePaperAirplane,
  HiOutlineClock,
  HiOutlineSparkles,
} from "react-icons/hi2";

import styled from "styled-components";

const StyledGroupStats = styled.div`
  grid-column: 1 / -1;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  gap: 2.4rem;
`;

const ICON_COMPONENTS = {
  CREATED: <HiOutlineDocumentCheck />,
  NEED_CONTACT: <HiOutlinePaperAirplane />,
  WAITING_BRAND_REPLY: <HiOutlineClock />,
  WAITING_PUBLISH: <HiOutlineSparkles />,
  PUBLISHED: <HiOutlineCheck />,
};

function ProductStatesAllTimeStats() {
  return (
    <StyledGroupStats>
      {Object.entries(PRODUCT_STATES).map(([key, o]) => (
        <StatCount
          key={key}
          title={o.label}
          color={o.color}
          icon={ICON_COMPONENTS[key]}
          filters={[{ field: "state", value: key }]}
        />
      ))}
    </StyledGroupStats>
  );
}

export default ProductStatesAllTimeStats;
