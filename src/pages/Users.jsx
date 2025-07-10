import Row from "@/ui/Row";
import Heading from "@/ui/Heading";

import UserListOperations from "@/features/users/UserListOperations";
import UserTable from "@/features/users/UserTable";

import { HiOutlineUsers } from "react-icons/hi2";

function Users() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">
          <HiOutlineUsers /> Utilisateurices
        </Heading>
        <UserListOperations />
      </Row>

      <UserTable />
    </>
  );
}

export default Users;
