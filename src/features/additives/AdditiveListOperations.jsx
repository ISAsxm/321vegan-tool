import ListOperations from "@/ui/ListOperations";
import AddAction from "@/ui/AddAction";

import CreateAdditiveForm from "./CreateAdditiveForm";

function AdditiveListOperations() {
  return (
    <ListOperations>
      <AddAction
        id="additive-create-form"
        formComponent={<CreateAdditiveForm />}
      />
    </ListOperations>
  );
}

export default AdditiveListOperations;
