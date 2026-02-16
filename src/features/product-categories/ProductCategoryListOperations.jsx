import { useCurrentUserContext } from "@/contexts/CurrentUserContext";

import ListOperations from "@/ui/ListOperations";
import AddAction from "@/ui/AddAction";

import CreateProductCategoryForm from "./CreateProductCategoryForm";

function ProductCategoryListOperations() {
  const { hasAccess } = useCurrentUserContext();
  return (
    <ListOperations>
      {hasAccess("contributor") && (
        <AddAction
          id="product-category-create-form"
          formComponent={<CreateProductCategoryForm />}
        />
      )}
    </ListOperations>
  );
}

export default ProductCategoryListOperations;
