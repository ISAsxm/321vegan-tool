import { useErrorReportsCount } from "./useErrorReportsCount";

import Stat from "./Stat";

import { HiOutlineCheck, HiOutlineExclamationTriangle } from "react-icons/hi2";
import styled from "styled-components";

const StyledGroupStats = styled.div`
  grid-column: 1 / -1;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2.4rem;
`;
function ErrorReportsStats() {
  const { isPending: isPendingUntreated, count: untreatedCount } =
    useErrorReportsCount(false);
  const { isPending: isPendingTreated, count: treatedCount } =
    useErrorReportsCount(true);

  return (
    <StyledGroupStats>
      <Stat
        title="Erreurs non traitées"
        color="yellow"
        icon={<HiOutlineExclamationTriangle />}
        value={untreatedCount}
        isPending={isPendingUntreated}
      />
      <Stat
        title="Erreurs traitées"
        color="green"
        icon={<HiOutlineCheck />}
        value={treatedCount}
        isPending={isPendingTreated}
      />
    </StyledGroupStats>
  );
}

export default ErrorReportsStats;
