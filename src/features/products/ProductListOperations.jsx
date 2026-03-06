import { useCurrentUserContext } from "@/contexts/CurrentUserContext";

import ListOperations from "@/ui/ListOperations";
import AddAction from "@/ui/AddAction";
import ExportAction from "@/ui/ExportAction";

import CreateProductForm from "./CreateProductForm";
import ValidatorButton from "./ValidatorButton";

function ProductListOperations() {
  const { hasAccess } = useCurrentUserContext();

  return (
    <ListOperations>
      {hasAccess("contributor") && <ValidatorButton />}
      {hasAccess("admin") && <ExportAction />}
      <AddAction
        id="product-create-form"
        formComponent={<CreateProductForm />}
      />
    </ListOperations>
  );
}

export default ProductListOperations;
