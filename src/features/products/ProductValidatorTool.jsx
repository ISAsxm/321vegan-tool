import { useState, useCallback } from "react";
import styled from "styled-components";

import Button from "@/ui/Button";
import Heading from "@/ui/Heading";
import Spinner from "@/ui/Spinner";

import { useCurrentUserContext } from "@/contexts/CurrentUserContext";
import { useValidatorProducts } from "./useValidatorProducts";
import ValidatorSetup from "./ValidatorSetup";
import ValidatorProgress from "./ValidatorProgress";
import ProductRegister from "./ProductRegister";

const CompletedContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2.4rem;
  padding: 4.8rem 2.4rem;
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  text-align: center;
`;

const CompletedText = styled.p`
  font-size: 1.6rem;
  color: var(--color-grey-600);
`;

// 3 phases managed by the "phase" state : setup -> validating -> completed
function ProductValidatorTool() {
  const { hasAccess } = useCurrentUserContext();
  const defaultState = hasAccess("admin") ? "PUBLISHED" : "WAITING_PUBLISH";
  const [phase, setPhase] = useState("setup");
  const [selectedStatuses, setSelectedStatuses] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [productSnapshot, setProductSnapshot] = useState([]);

  const { isPending, products } = useValidatorProducts(
    selectedStatuses,
    true,
  );

  function handleStart(statuses) {
    const filtered =
      statuses.length > 0
        ? products?.filter((p) => statuses.includes(p.status)) || []
        : products || [];

    setSelectedStatuses(statuses);
    setProductSnapshot(filtered);
    setCurrentIndex(0);
    setPhase("validating");
  }

  const handleProductComplete = useCallback(() => {
    setCurrentIndex((prev) => {
      const next = prev + 1;
      if (next >= productSnapshot.length) {
        setPhase("completed");
        return prev;
      }
      return next;
    });
  }, [productSnapshot.length]);

  function handleSkip() {
    setCurrentIndex((prev) => {
      const next = prev + 1;
      if (next >= productSnapshot.length) {
        setPhase("completed");
        return prev;
      }
      return next;
    });
  }

  function handleQuit() {
    setPhase("setup");
    setCurrentIndex(0);
    setProductSnapshot([]);
    setSelectedStatuses([]);
  }

  function handleRestart() {
    setPhase("setup");
    setCurrentIndex(0);
    setProductSnapshot([]);
    setSelectedStatuses([]);
  }

  if (phase === "setup") {
    if (isPending) return <Spinner />;
    return (
      <ValidatorSetup
        onStart={handleStart}
        products={products}
        isPending={isPending}
      />
    );
  }

  if (phase === "completed") {
    return (
      <CompletedContainer>
        <Heading as="h2">Vérification terminée</Heading>
        <CompletedText>
          Vous avez traité {productSnapshot.length} produit
          {productSnapshot.length !== 1 ? "s" : ""}. Merci infiniement pour votre contribution 💚
        </CompletedText>
        <Button onClick={handleRestart}>Retour</Button>
      </CompletedContainer>
    );
  }

  const currentProduct = productSnapshot[currentIndex];

  if (!currentProduct) {
    setPhase("completed");
    return null;
  }

  return (
    <>
      <ValidatorProgress
        current={currentIndex}
        total={productSnapshot.length}
        onSkip={handleSkip}
        onQuit={handleQuit}
      />
      {}
      <ProductRegister
        key={currentProduct.ean}
        ean={currentProduct.ean}
        onClose={handleProductComplete}
        defaultState={defaultState}
      />
    </>
  );
}

export default ProductValidatorTool;
