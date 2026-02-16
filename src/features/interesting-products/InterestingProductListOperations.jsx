import { useCurrentUserContext } from "@/contexts/CurrentUserContext";

import ListOperations from "@/ui/ListOperations";
import AddAction from "@/ui/AddAction";

import CreateInterestingProductForm from "./CreateInterestingProductForm";

function InterestingProductListOperations() {
  const { hasAccess } = useCurrentUserContext();
  return (
    <ListOperations>
      {hasAccess("contributor") && (
        <AddAction
          id="interesting-product-create-form"
          formComponent={<CreateInterestingProductForm />}
        />
      )}
    </ListOperations>
  );
}

export default InterestingProductListOperations;
