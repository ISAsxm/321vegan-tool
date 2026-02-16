import ListOperations from "@/ui/ListOperations";
import AddAction from "@/ui/AddAction";

import CreatePartnerCategoryForm from "./CreatePartnerCategoryForm";

function PartnerCategoryListOperations() {
  return (
    <ListOperations>
      <AddAction
        id="partner-category-create-form"
        formComponent={<CreatePartnerCategoryForm />}
      />
    </ListOperations>
  );
}

export default PartnerCategoryListOperations;
