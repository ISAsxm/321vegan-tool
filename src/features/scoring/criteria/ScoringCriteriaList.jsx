import { useDeleteScoringCriterion } from "./useDeleteScoringCriterion";
import UpdateScoringCriterionForm from "./UpdateScoringCriterionForm";
import Modal from "@/ui/Modal";
import ConfirmAction from "@/ui/ConfirmAction";

import { HiPencil, HiTrash } from "react-icons/hi2";
import styled from "styled-components";

const StyledScoringCriteriaList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const CriterionItem = styled.li`
  border-radius: var(--border-radius-sm);
  background-color: var(--color-brand-700);
  color: var(--color-brand-10);
  font-size: 1.2rem;
  padding: 0.4rem 0.6rem;
  display: grid;
  grid-template-columns: 1fr 4rem;
  align-items: center;
  gap: 0.4rem;
  width: 100%;
`;

const CriteriaButtonGroup = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 0.4rem;
`;

const CriterionButton = styled.button`
  background: none;
  border: none;
  padding: 0.3rem;
  border-radius: var(--border-radius-sm);
  transition: all 0.2s;
  text-align: center;

  & svg {
    color: currentColor;
  }
`;

const CriterionButtonEdit = styled(CriterionButton)`
  color: var(--color-orange-100);
  background-color: var(--color-orange-700);
  &:hover {
    background-color: var(--color-orange-800);
  }
`;
const CriterionButtonDelete = styled(CriterionButton)`
  color: var(--color-red-100);
  background-color: var(--color-red-700);
  &:hover {
    background-color: var(--color-red-800);
  }
`;

function ScoringCriteriaList({ criteria, canDelete }) {
  const { isDeleting, deleteScoringCriterion } = useDeleteScoringCriterion();
  return (
    <StyledScoringCriteriaList>
      <Modal>
        {criteria.map((criterion) => (
          <CriterionItem key={criterion.id}>
            {criterion.name}{" "}
            <CriteriaButtonGroup>
              <Modal.Open opens={`edit-criterion-${criterion.id}`}>
                <CriterionButtonEdit disabled={isDeleting}>
                  <HiPencil />
                </CriterionButtonEdit>
              </Modal.Open>{" "}
              {canDelete && (
                <Modal.Open opens={`delete-criterion-${criterion.id}`}>
                  <CriterionButtonDelete disabled={isDeleting}>
                    <HiTrash />
                  </CriterionButtonDelete>
                </Modal.Open>
              )}
            </CriteriaButtonGroup>
            <Modal.Window name={`edit-criterion-${criterion.id}`}>
              <UpdateScoringCriterionForm criterionToUpdate={criterion} />
            </Modal.Window>
            <Modal.Window name={`delete-criterion-${criterion.id}`}>
              <ConfirmAction
                variation="delete"
                title="Supprimer un critère"
                message="Cette action est irréversible. Êtes-vous sûr de vouloir supprimer définitivement ce critère ?"
                onConfirm={() => deleteScoringCriterion(criterion.id)}
                disabled={isDeleting}
              />
            </Modal.Window>
          </CriterionItem>
        ))}
      </Modal>
    </StyledScoringCriteriaList>
  );
}

export default ScoringCriteriaList;
