import { useCurrentUserContext } from "@/contexts/CurrentUserContext";

import ListOperations from "@/ui/ListOperations";
import AddAction from "@/ui/AddAction";
import ExportAction from "@/ui/ExportAction";

import CreateCosmeticForm from "./CreateCosmeticForm";

function CosmeticListOperations() {
  const { hasAccess } = useCurrentUserContext();
  return (
    <ListOperations>
      {hasAccess("admin") && <ExportAction filename="cosmetics" />}
      {hasAccess("contributor") && (
        <AddAction
          id="cosmetic-create-form"
          formComponent={<CreateCosmeticForm />}
        />
      )}
    </ListOperations>
  );
}

export default CosmeticListOperations;
