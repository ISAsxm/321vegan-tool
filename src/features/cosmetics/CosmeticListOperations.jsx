import ListOperations from "@/ui/ListOperations";
import AddAction from "@/ui/AddAction";

import CreateCosmeticForm from "./CreateCosmeticForm";

function CosmeticListOperations() {
  return (
    <ListOperations>
      <AddAction
        id="cosmetic-create-form"
        formComponent={<CreateCosmeticForm />}
      />
    </ListOperations>
  );
}

export default CosmeticListOperations;
