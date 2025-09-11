import ListOperations from "@/ui/ListOperations";
import AddAction from "@/ui/AddAction";

import CreateScoringCategoryForm from "./CreateScoringCategoryForm";

function ScoringCategoryListOperations() {
  return (
    <ListOperations>
      <AddAction
        id="scoring-caterogy-create-form"
        formComponent={<CreateScoringCategoryForm />}
      />
    </ListOperations>
  );
}

export default ScoringCategoryListOperations;
