import Stat from "./Stat";

import {
  HiOutlineDocumentCheck,
  HiOutlineCheck,
  HiOutlineChartBar,
  HiOutlinePaperAirplane,
} from "react-icons/hi2";

function ProductStats({ products }) {
  // Stat widget 1
  const numToRegister = products.filter((p) => p.state === "CREATED").length;
  // Stat widget 2
  const numToContact = products.filter(
    (p) => p.state === "NEED_CONTACT"
  ).length;
  // Stat widget 3
  const numToPublish = products.filter(
    (p) => p.state === "WAITING_PUBLISH"
  ).length;
  // Stat widget 4
  const numOfPublished = products.filter((p) => p.state === "PUBLISHED").length;
  const checkingRate = numOfPublished / Math.max(products.length, 1);

  return (
    <>
      <Stat
        title="À vérifier"
        color="yellow"
        icon={<HiOutlineDocumentCheck />}
        value={numToRegister}
      />
      <Stat
        title="À contacter"
        color="blue"
        icon={<HiOutlinePaperAirplane />}
        value={numToContact}
      />
      <Stat
        title="À publier"
        color="indigo"
        icon={<HiOutlineCheck />}
        value={numToPublish}
      />
      <Stat
        title="Taux de publication"
        color="green"
        icon={<HiOutlineChartBar />}
        value={`${Math.round(checkingRate * 100)}%`}
      />
    </>
  );
}

export default ProductStats;
