import { useUntreatedErrorReportsCount } from "@/features/error-reports/useUntreatedErrorReportsCount";

import Stat from "./Stat";

import { HiOutlineExclamationTriangle } from "react-icons/hi2";

function ErrorReportsStats() {
  const { isPending, untreatedCount } = useUntreatedErrorReportsCount();

  return (
    <Stat
      title="Erreurs non traitées"
      color="yellow"
      icon={<HiOutlineExclamationTriangle />}
      value={untreatedCount}
      isPending={isPending}
    />
  );
}

export default ErrorReportsStats;
