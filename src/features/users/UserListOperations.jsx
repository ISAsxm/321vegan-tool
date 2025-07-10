import ListOperations from "@/ui/ListOperations";
import AddAction from "@/ui/AddAction";

import CreateUserForm from "./CreateUserForm";

function UserListOperations() {
  return (
    <ListOperations>
      <AddAction id="user-create-form" formComponent={<CreateUserForm />} />
    </ListOperations>
  );
}

export default UserListOperations;
