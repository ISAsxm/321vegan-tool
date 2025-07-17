import { PRODUCT_STATUSES } from "@/utils/constants";

import StatCount from "./StatCount";

import {
  HiOutlineQuestionMarkCircle,
  HiOutlineXCircle,
  HiOutlineCheckCircle,
} from "react-icons/hi2";

const ICON_COMPONENTS = {
  NOT_FOUND: <HiOutlineQuestionMarkCircle />,
  MAYBE_VEGAN: <HiOutlineQuestionMarkCircle />,
  VEGAN: <HiOutlineCheckCircle />,
  NON_VEGAN: <HiOutlineXCircle />,
};

function ProductStatusesAllTimeStats() {
  return (
    <>
      {Object.entries(PRODUCT_STATUSES).map(([key, o]) => (
        <StatCount
          key={key}
          title={o.label}
          color={o.color}
          icon={ICON_COMPONENTS[key]}
          filters={[{ field: "status", value: key }]}
        />
      ))}
    </>
  );
}

export default ProductStatusesAllTimeStats;
