import styled from "styled-components";

export const ScoringCriteriaFormList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
`;

export const ScoringCriteriaFormItem = styled.div`
  display: grid;
  grid-template-columns: 1fr 4rem;
  align-items: stretch;
  gap: 0.5rem;
  width: 100%;
`;

export const ScoringCriteriaFormButtonDelete = styled.button`
  border: none;
  padding: 0.3rem;
  border-radius: var(--border-radius-sm);
  transition: all 0.2s;
  text-align: center;
  color: var(--color-red-100);
  background-color: var(--color-red-700);
  &:hover {
    background-color: var(--color-red-800);
  }
  & svg {
    color: currentColor;
  }
`;

export const ScoringCriteriaFormButtonAdd = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  border: none;
  border-radius: var(--border-radius-sm);
  box-shadow: var(--shadow-sm);
  font-size: 1.2rem;
  padding: 0.4rem 0.8rem;
  text-transform: uppercase;
  font-weight: 600;
  text-align: center;
  color: var(--color-brand-10);
  background-color: var(--color-brand-600);
  &:hover {
    background-color: var(--color-brand-700);
  }
`;
