import ListOperations from "@/ui/ListOperations";
import AddAction from "@/ui/AddAction";

import CreateHouseholdCleanerForm from "./CreateHouseholdCleanerForm";

function HouseholdCleanerListOperations() {
  return (
    <ListOperations>
      <AddAction
        id="household-cleaner-create-form"
        formComponent={<CreateHouseholdCleanerForm />}
      />
    </ListOperations>
  );
}

export default HouseholdCleanerListOperations;
