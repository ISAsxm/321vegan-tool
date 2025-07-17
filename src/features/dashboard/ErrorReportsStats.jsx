import { useUntreatedErrorReportsCount } from "@/features/error-reports/useUntreatedErrorReportsCount";

import Stat from "./Stat";
import Spinner from "@/ui/Spinner";

import { HiOutlineExclamationTriangle } from "react-icons/hi2";

function ErrorReportsStats() {
  const { isPending, untreatedCount } = useUntreatedErrorReportsCount();

  if (isPending) return <Spinner />;

  return (
    <Stat
      title="Erreurs non traitées"
      color="yellow"
      icon={<HiOutlineExclamationTriangle />}
      value={untreatedCount}
    />
  );
}

export default ErrorReportsStats;
