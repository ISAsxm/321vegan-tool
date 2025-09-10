import ListOperations from "@/ui/ListOperations";
import AddAction from "@/ui/AddAction";

import CreateScoringCriterionForm from "./CreateScoringCriterionForm";

function ScoringCriteriaListOperations() {
  return (
    <ListOperations>
      <AddAction
        id="scoring-criteria-create-form"
        formComponent={<CreateScoringCriterionForm />}
      />
    </ListOperations>
  );
}

export default ScoringCriteriaListOperations;
