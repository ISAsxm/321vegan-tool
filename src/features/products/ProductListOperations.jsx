import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import { useCurrentUserContext } from "@/contexts/CurrentUserContext";

import ListOperations from "@/ui/ListOperations";
import AddAction from "@/ui/AddAction";
import ExportAction from "@/ui/ExportAction";

import CreateProductForm from "./CreateProductForm";

const ValidatorButton = styled.button`
  font-size: 1.6rem;
  font-weight: 600;
  padding: 0.6rem 1.4rem;
  border: none;
  border-radius: var(--border-radius-sm);
  color: var(--color-indigo-700);
  background-color: var(--color-indigo-100);
  box-shadow: var(--shadow-sm);
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-indigo-200, var(--color-indigo-100));
    box-shadow: var(--shadow-md);
  }
`;

function ProductListOperations() {
  const { hasAccess } = useCurrentUserContext();
  const navigate = useNavigate();

  return (
    <ListOperations>
      {hasAccess("contributor") && (
        <ValidatorButton onClick={() => navigate("/products/validator")}>
          Passer en mode validation de produits
        </ValidatorButton>
      )}
      {hasAccess("admin") && <ExportAction />}
      <AddAction
        id="product-create-form"
        formComponent={<CreateProductForm />}
      />
    </ListOperations>
  );
}

export default ProductListOperations;
