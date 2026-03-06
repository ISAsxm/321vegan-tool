import { useNavigate } from "react-router-dom";
import { HiOutlineDocumentCheck } from "react-icons/hi2";

import Button from "@/ui/Button";

function ValidatorButton() {
  const navigate = useNavigate();

  return (
    <Button onClick={() => navigate("/products/validator")}>
      <HiOutlineDocumentCheck />
      Vérifier
    </Button>
  );
}

export default ValidatorButton;
