import { useNavigate } from "react-router-dom";
import { HiOutlineDocumentCheck } from "react-icons/hi2";

import Button from "@/ui/Button";

function ValidatorAction() {
  const navigate = useNavigate();

  return (
    <Button onClick={() => navigate("/verifications")}>
      <HiOutlineDocumentCheck />
      Vérifier
    </Button>
  );
}

export default ValidatorAction;
