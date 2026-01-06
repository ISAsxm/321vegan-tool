import ListOperations from "@/ui/ListOperations";
import AddAction from "@/ui/AddAction";

import CreateInterestingProductForm from "./CreateInterestingProductForm";

function InterestingProductListOperations() {
  return (
    <ListOperations>
      <AddAction
        id="interesting-product-create-form"
        formComponent={<CreateInterestingProductForm />}
      />
    </ListOperations>
  );
}

export default InterestingProductListOperations;
