import ListOperations from "@/ui/ListOperations";
import AddAction from "@/ui/AddAction";

import CreateProductForm from "./CreateProductForm";

function ProductListOperations() {
  return (
    <ListOperations>
      <AddAction
        id="product-create-form"
        formComponent={<CreateProductForm />}
      />
    </ListOperations>
  );
}

export default ProductListOperations;
