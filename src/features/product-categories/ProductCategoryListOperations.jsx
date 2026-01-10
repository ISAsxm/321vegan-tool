import ListOperations from "@/ui/ListOperations";
import AddAction from "@/ui/AddAction";

import CreateProductCategoryForm from "./CreateProductCategoryForm";

function ProductCategoryListOperations() {
  return (
    <ListOperations>
      <AddAction
        id="product-category-create-form"
        formComponent={<CreateProductCategoryForm />}
      />
    </ListOperations>
  );
}

export default ProductCategoryListOperations;
