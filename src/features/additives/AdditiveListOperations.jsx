import { useCurrentUserContext } from "@/contexts/CurrentUserContext";

import ListOperations from "@/ui/ListOperations";
import AddAction from "@/ui/AddAction";
import ExportAction from "@/ui/ExportAction";

import CreateAdditiveForm from "./CreateAdditiveForm";

function AdditiveListOperations() {
  const { hasAccess } = useCurrentUserContext();
  return (
    <ListOperations>
      {hasAccess("admin") && <ExportAction filename="additives" />}
      {hasAccess("contributor") && (
        <AddAction
          id="additive-create-form"
          formComponent={<CreateAdditiveForm />}
        />
      )}
    </ListOperations>
  );
}

export default AdditiveListOperations;
