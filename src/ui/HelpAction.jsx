import Button from "@/ui/Button";
import ButtonIcon from "@/ui/ButtonIcon";
import Modal from "@/ui/Modal";

import { HiOutlineQuestionMarkCircle } from "react-icons/hi";

function HelpAction({ id, children, variante = "btn" }) {
  return (
    <Modal>
      <Modal.Open opens={id}>
        {variante === "btn" ? (
          <Button>
            <HiOutlineQuestionMarkCircle />
            Aide
          </Button>
        ) : (
          <ButtonIcon>
            <HiOutlineQuestionMarkCircle />
          </ButtonIcon>
        )}
      </Modal.Open>
      <Modal.Window name={id}>{children}</Modal.Window>
    </Modal>
  );
}

export default HelpAction;
