import { useState } from "react";
import styled from "styled-components";

import { PRODUCT_STATUSES } from "@/utils/constants";

import Button from "@/ui/Button";
import Checkbox from "@/ui/Checkbox";
import Heading from "@/ui/Heading";
import Tag from "@/ui/Tag";

const SetupContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  padding: 2.4rem;
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
`;

const StatusList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;

const StatusItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;
`;

const CountText = styled.p`
  font-size: 1.4rem;
  color: var(--color-grey-500);
`;

// This method is used to select product's status to validate.
// It also shows the count of products for each status, and the total count of products to validate. 
function ValidatorSetup({ onStart, products, isPending }) {
  const [selectedStatuses, setSelectedStatuses] = useState([]);

  function handleToggle(status) {
    setSelectedStatuses((prev) =>
      prev.includes(status)
        ? prev.filter((s) => s !== status)
        : [...prev, status],
    );
  }

  const filteredCount =
    selectedStatuses.length > 0
      ? products?.filter((p) => selectedStatuses.includes(p.status)).length || 0
      : products?.length || 0;

  return (
    <SetupContainer>
      <Heading as="h2">Mode validation de produits</Heading>
      <p>
        Sélectionnez les statuts des produits que vous souhaitez vérifier.
        Les produits seront présentés un par un. <br />
        Si aucun statut n'est sélectionné, tous les produits seront inclus dans la validation. <br />
        Merci pour votre contribution ! 💚
      </p>

      <StatusList>
        {Object.entries(PRODUCT_STATUSES).filter(([key]) => key !== "NOT_FOUND").map(([key, { color, label }]) => {
          const count =
            products?.filter((p) => p.status === key).length || 0;
          return (
            <StatusItem key={key}>
              <Checkbox
                name={`status-${key}`}
                checked={selectedStatuses.includes(key)}
                onChange={() => handleToggle(key)}
              >
                <Tag type={color}>{label}</Tag>
                <CountText>({count})</CountText>
              </Checkbox>
            </StatusItem>
          );
        })}
      </StatusList>

      <CountText>
        {filteredCount} produit{filteredCount !== 1 ? "s" : ""} à vérifier
      </CountText>

      <Button
        onClick={() => onStart(selectedStatuses)}
        disabled={filteredCount === 0 || isPending}
      >
        Commencer la vérification
      </Button>
    </SetupContainer>
  );
}

export default ValidatorSetup;
