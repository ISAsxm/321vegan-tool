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
  const [ingredients, setIngredients] = useState({
    lait: false,
    œuf: false,
    miel: false,
    viande: false,
    poisson: false,
  });

  function handleToggleIngredient(e) {
    const checked = e.target.checked;
    const value = e.target.value;
    setIngredients((prev) => ({
      ...prev,
      [value]: checked,
    }));
    const valueToCheck = value.replace("œ", "oe");
    let valuesArray = (defaultValue || "")
      .split(/[,;]+/)
      .map((v) => v.trim())
      .filter((v) => v);
    const isIncluded = valuesArray.some(
      (val) => val.toLowerCase().replace("œ", "oe") === valueToCheck
    );
    if (checked && !isIncluded) {
      valuesArray.push(`${value.charAt(0).toUpperCase()}${value.slice(1)}`);
    } else if (!checked && isIncluded) {
      valuesArray = valuesArray.filter(
        (val) => val.toLowerCase().replace("œ", "oe") !== valueToCheck
      );
    }
    onChange("problem_description", valuesArray.join(", "));
  }
  return (
    <StyledProblemBox>
      {children}
      <IngredientBox>
        {Object.entries(ingredients).map(([value, isChecked]) => (
          <IngredientLabel key={value} checked={isChecked}>
            <input
              type="checkbox"
              value={value}
              checked={isChecked}
              onChange={handleToggleIngredient}
            />
            {value}
          </IngredientLabel>
        ))}
      </IngredientBox>
    </StyledProblemBox>
  );
}

export default ProblemBox;
