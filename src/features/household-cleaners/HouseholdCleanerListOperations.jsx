import { useCurrentUserContext } from "@/contexts/CurrentUserContext";

import ListOperations from "@/ui/ListOperations";
import AddAction from "@/ui/AddAction";

import CreateHouseholdCleanerForm from "./CreateHouseholdCleanerForm";

function HouseholdCleanerListOperations() {
  const { hasAccess } = useCurrentUserContext();
  return (
    <ListOperations>
      {hasAccess("contributor") && (
        <AddAction
          id="household-cleaner-create-form"
          formComponent={<CreateHouseholdCleanerForm />}
        />
      )}
    </ListOperations>
  );
}

export default HouseholdCleanerListOperations;
