import ListOperations from "@/ui/ListOperations";
import AddAction from "@/ui/AddAction";

import CreateBrandForm from "./CreateBrandForm";

function BrandListOperations() {
  return (
    <ListOperations>
      <AddAction id="brand-create-form" formComponent={<CreateBrandForm />} />
    </ListOperations>
  );
}

export default BrandListOperations;
