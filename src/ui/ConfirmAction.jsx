import Button from "./Button";
import Heading from "./Heading";

import styled from "styled-components";

const StyledConfirmAction = styled.div`
  width: 40rem;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;

  & p {
    color: var(--color-grey-500);
    margin-bottom: 1.2rem;
  }

  & div {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

const variations = {
  delete: "danger",
  confirm: "confirm",
  brand: "primary",
  info: "indigo",
};

function ConfirmAction({
  title,
  message,
  variation,
  onConfirm,
  onCloseModal,
  disabled,
  btnText = "Valider",
  showCancel = true,
}) {
  function handleConfirm() {
    onConfirm?.();
    onCloseModal();
  }

  return (
    <StyledConfirmAction>
      {title && <Heading as="h3">{title}</Heading>}
      {message && <p>{message}</p>}
      <div>
        {showCancel && (
          <Button
            $variation="secondary"
            disabled={disabled}
            onClick={onCloseModal}
          >
            Annuler
          </Button>
        )}
        <Button
          $variation={variations[variation] || "primary"}
          disabled={disabled}
          onClick={handleConfirm}
        >
          {btnText}
        </Button>
      </div>
    </StyledConfirmAction>
  );
}

export default ConfirmAction;
