import { useCurrentUserContext } from "@/contexts/CurrentUserContext";

import ListOperations from "@/ui/ListOperations";
import AddAction from "@/ui/AddAction";

import CreateAdditiveForm from "./CreateAdditiveForm";

function AdditiveListOperations() {
  const { hasAccess } = useCurrentUserContext();
  return (
    <ListOperations>
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
