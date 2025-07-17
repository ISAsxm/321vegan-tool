import Row from "@/ui/Row";
import Heading from "@/ui/Heading";

import ErrorReportTable from "@/features/error-reports/ErrorReportTable";

import { HiOutlineExclamationTriangle } from "react-icons/hi2";

function ErrorReports() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">
          <HiOutlineExclamationTriangle /> Erreurs signalées
        </Heading>
      </Row>

      <ErrorReportTable />
    </>
  );
}

export default ErrorReports;
