import Button from "@/ui/Button";
import ButtonIcon from "@/ui/ButtonIcon";
import Modal from "@/ui/Modal";

import { HiOutlinePlusCircle } from "react-icons/hi";

function AddAction({ id, formComponent, variante = "btn" }) {
  return (
    <Modal>
      <Modal.Open opens={id}>
        {variante === "btn" ? (
          <Button>
            <HiOutlinePlusCircle />
            Ajouter
          </Button>
        ) : (
          <ButtonIcon>
            <HiOutlinePlusCircle />
          </ButtonIcon>
        )}
      </Modal.Open>
      <Modal.Window name={id}>{formComponent}</Modal.Window>
    </Modal>
  );
}

export default AddAction;
