import Row from "@/ui/Row";
import Heading from "@/ui/Heading";

import DashboardLayout from "@/features/dashboard/DashboardLayout";

import { HiOutlineHome } from "react-icons/hi2";

function Dashboard() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">
          <HiOutlineHome /> Dashboard
        </Heading>
      </Row>

      <DashboardLayout />
    </>
  );
}

export default Dashboard;
