import ListOperations from "@/ui/ListOperations";
import AddAction from "@/ui/AddAction";

import CreateApiClientForm from "./CreateApiClientForm";

function ApiClientListOperations() {
  return (
    <ListOperations>
      <AddAction
        id="apiclient-create-form"
        formComponent={<CreateApiClientForm />}
      />
    </ListOperations>
  );
}

export default ApiClientListOperations;
