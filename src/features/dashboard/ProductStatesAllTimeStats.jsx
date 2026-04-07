import { PRODUCT_STATES } from "@/utils/constants";

import Heading from "@/ui/Heading";

import DashboardBox from "./DashboardBox";
import StatCount from "./StatCount";

import {
  HiOutlineDocumentCheck,
  HiOutlineEnvelope,
  HiOutlineCheck,
  HiOutlineClock,
  HiOutlineSparkles,
} from "react-icons/hi2";

import styled from "styled-components";

const GroupStats = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ICON_COMPONENTS = {
  CREATED: <HiOutlineDocumentCheck />,
  NEED_CONTACT: <HiOutlineEnvelope />,
  WAITING_BRAND_REPLY: <HiOutlineClock />,
  WAITING_PUBLISH: <HiOutlineSparkles />,
  PUBLISHED: <HiOutlineCheck />,
};

function ProductStatesAllTimeStats() {
  return (
    <DashboardBox>
      <Heading as="h2">États des produits</Heading>
      <GroupStats>
        {Object.entries(PRODUCT_STATES).map(([key, o]) => (
          <StatCount
            key={key}
            title={o.label}
            color={o.color}
            icon={ICON_COMPONENTS[key]}
            filters={[{ field: "state", value: key }]}
          />
        ))}
      </GroupStats>
    </DashboardBox>
  );
}

export default ProductStatesAllTimeStats;
