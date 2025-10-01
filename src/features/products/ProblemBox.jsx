import { useState } from "react";
import styled from "styled-components";

const StyledProblemBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const IngredientBox = styled.div`
  display: flex;
  align-items: center;
  gap: 0.4rem;
  flex-wrap: wrap;
`;

const IngredientLabel = styled.label`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  padding: 0.6rem 1.2rem;
  border: none;
  border-radius: var(--border-radius-sm);
  box-shadow: var(--shadow-sm);
  text-transform: uppercase;
  font-size: 1rem;
  font-weight: 600;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s;
  color: var(--color-red-100);
  background-color: var(--color-red-700);

  &:hover,
  &:has(input:checked) {
    color: var(--color-red-700);
    background-color: var(--color-red-100);
  }

  & > input {
    display: none;
  }
`;

function ProblemBox({ children, defaultValue, onChange }) {
  const [ingredients, setIngredients] = useState([
    { label: "lait", isChecked: false },
    { label: "œuf", isChecked: false },
    { label: "miel", isChecked: false },
    { label: "viande", isChecked: false },
    { label: "poisson", isChecked: false },
    { label: "arôme", isChecked: false },
    { label: "arômes", isChecked: false },
    { label: "arôme naturel", isChecked: false },
    { label: "arômes naturels", isChecked: false },
    { label: "vitamine", isChecked: false },
    { label: "vitamines", isChecked: false },
    { label: "ingrédients inconnus", isChecked: false },
  ]);

  function handleToggleIngredient(e) {
    const checked = e.target.checked;
    const value = e.target.value;
    setIngredients((ingredients) =>
      ingredients.map((ingredient) =>
        ingredient.label === value
          ? { ...ingredient, isChecked: checked }
          : ingredient
      )
    );
    const valueToCheck = value
      .normalize("NFD")
      .replace(/\p{Diacritic}/gu, "")
      .replace(/\u0153/g, "oe");
    let valuesArray = (defaultValue || "")
      .split(/[,;]+/)
      .map((v) => v.trim())
      .filter((v) => v);
    const isIncluded = valuesArray.some(
      (val) =>
        val
          .toLowerCase()
          .normalize("NFD")
          .replace(/\p{Diacritic}/gu, "")
          .replace(/\u0153/g, "oe") === valueToCheck
    );
    if (checked && !isIncluded) {
      valuesArray.push(`${value.charAt(0).toUpperCase()}${value.slice(1)}`);
    } else if (!checked && isIncluded) {
      valuesArray = valuesArray.filter(
        (val) =>
          val
            .toLowerCase()
            .normalize("NFD")
            .replace(/\p{Diacritic}/gu, "")
            .replace(/\u0153/g, "oe") !== valueToCheck
      );
    }
    onChange("problem_description", valuesArray.join(", "));
  }
  return (
    <StyledProblemBox>
      {children}
      <IngredientBox>
        {ingredients.map(({ label, isChecked }) => (
          <IngredientLabel key={label} checked={isChecked}>
            <input
              type="checkbox"
              value={label}
              checked={isChecked}
              onChange={handleToggleIngredient}
            />
            {label}
          </IngredientLabel>
        ))}
      </IngredientBox>
    </StyledProblemBox>
  );
}

export default ProblemBox;
