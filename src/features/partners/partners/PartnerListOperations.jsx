import ListOperations from "@/ui/ListOperations";
import AddAction from "@/ui/AddAction";

import CreatePartnerForm from "./CreatePartnerForm";

function PartnerListOperations() {
  return (
    <ListOperations>
      <AddAction
        id="partner-create-form"
        formComponent={<CreatePartnerForm />}
      />
    </ListOperations>
  );
}

export default PartnerListOperations;
