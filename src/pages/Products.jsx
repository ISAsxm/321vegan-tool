import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import { useCurrentUserContext } from "@/contexts/CurrentUserContext";

import Row from "@/ui/Row";
import Heading from "@/ui/Heading";
import ProductTable from "@/features/products/ProductTable";
import ProductListOperations from "@/features/products/ProductListOperations";

import { PiPlant } from "react-icons/pi";

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

const TitleRow = styled.div`
  display: flex;
  align-items: center;
  gap: 1.6rem;
`;

function Products() {
  const navigate = useNavigate();
  const { hasAccess } = useCurrentUserContext();

  return (
    <>
      <Row type="horizontal">
        <TitleRow>
          <Heading as="h1">
            <PiPlant /> Produits
          </Heading>
          {hasAccess("contributor") && (
            <ValidatorButton onClick={() => navigate("/products/validator")}>
              Passer en mode validation de produits
            </ValidatorButton>
          )}
        </TitleRow>
        <ProductListOperations />
      </Row>

      <ProductTable />
    </>
  );
}

export default Products;
