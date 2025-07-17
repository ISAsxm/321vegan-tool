import { useProductCounts } from "./useProductCounts";

import SpinnerMini from "@/ui/SpinnerMini";

import Stat from "./Stat";

import {
  HiOutlineDocumentCheck,
  HiOutlineCheck,
  HiOutlineChartBar,
  HiOutlinePaperAirplane,
  HiOutlineQuestionMarkCircle,
  HiOutlineClock,
  HiOutlineCheckCircle,
  HiOutlineXCircle,
} from "react-icons/hi2";

import styled from "styled-components";

const StatsGroup = styled.div`
  grid-column: 1 / -1;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2.4rem;
`;

const SubTitle = styled.h3`
  grid-column: 1 / -1;
  font-size: 1.6rem;
  font-weight: 500;
  color: var(--color-grey-600);
  margin: 1rem 0 0 0;
  padding: 1rem 0;
  border-bottom: 1px solid var(--color-grey-300);
`;

function AllTimeProductStats() {
  const {
    isPending,
    createdCount,
    notFoundCount,
    waitingContactCount,
    needContactCount,
    waitingPublishCount,
    publishedCount,
    veganCount,
    nonVeganCount,
    maybeVeganCount,
  } = useProductCounts();

  if (isPending) {
    return (
      <>
        <SubTitle>États produits</SubTitle>
        <StatsGroup>
          {Array.from({ length: 5 }, (_, i) => (
            <Stat
              key={i}
              title="Chargement..."
              color="grey"
              icon={<SpinnerMini />}
              value="..."
            />
          ))}
        </StatsGroup>
        <SubTitle>Statuts produits</SubTitle>
        <StatsGroup>
          {Array.from({ length: 4 }, (_, i) => (
            <Stat
              key={i + 5}
              title="Chargement..."
              color="grey"
              icon={<SpinnerMini />}
              value="..."
            />
          ))}
        </StatsGroup>
      </>
    );
  }

  return (
    <>
      <SubTitle>États produits</SubTitle>
      <StatsGroup>
        <Stat
          title="À vérifier"
          color="grey"
          icon={<HiOutlineDocumentCheck />}
          value={createdCount}
        />
        <Stat
          title="En attente contact"
          color="blue"
          icon={<HiOutlineClock />}
          value={waitingContactCount}
        />
        <Stat
          title="À contacter"
          color="yellow"
          icon={<HiOutlinePaperAirplane />}
          value={needContactCount}
        />
        <Stat
          title="À publier"
          color="indigo"
          icon={<HiOutlineCheck />}
          value={waitingPublishCount}
        />
        <Stat
          title="Publiés"
          color="green"
          icon={<HiOutlineCheck />}
          value={publishedCount}
        />
      </StatsGroup>

      <SubTitle>Statuts produits</SubTitle>

      <StatsGroup>
        <Stat
          title="VEGAN"
          color="green"
          icon={<HiOutlineCheckCircle />}
          value={veganCount}
        />
        <Stat
          title="MAYBE VEGAN"
          color="yellow"
          icon={<HiOutlineCheckCircle />}
          value={maybeVeganCount}
        />
        <Stat
          title="NON VEGAN"
          color="red"
          icon={<HiOutlineXCircle />}
          value={nonVeganCount}
        />
        <Stat
          title="Inconnu"
          color="silver"
          icon={<HiOutlineQuestionMarkCircle />}
          value={notFoundCount}
        />
      </StatsGroup>
    </>
  );
}

export default AllTimeProductStats;
