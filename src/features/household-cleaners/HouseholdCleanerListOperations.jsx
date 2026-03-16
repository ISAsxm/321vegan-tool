import { useCurrentUserContext } from "@/contexts/CurrentUserContext";

import ListOperations from "@/ui/ListOperations";
import AddAction from "@/ui/AddAction";
import ExportAction from "@/ui/ExportAction";

import CreateHouseholdCleanerForm from "./CreateHouseholdCleanerForm";

function HouseholdCleanerListOperations() {
  const { hasAccess } = useCurrentUserContext();
  return (
    <ListOperations>
      {hasAccess("admin") && <ExportAction filename="household-cleaners" />}
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
