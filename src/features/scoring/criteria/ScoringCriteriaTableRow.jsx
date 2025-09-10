import { formatDistanceFromNow, formatDate } from "@/utils/helpers";

import { useCurrentUserContext } from "@/contexts/CurrentUserContext";
import { useDeleteScoringCriterion } from "./useDeleteScoringCriterion";

import Table from "@/ui/Table";
import Menus from "@/ui/Menus";
import Stacked from "@/ui/Stacked";
import NoDataItem from "@/ui/NoDataItem";
import Modal from "@/ui/Modal";
import ConfirmAction from "@/ui/ConfirmAction";

import UpdateScoringCriterionForm from "./UpdateScoringCriterionForm";

import { HiPencil, HiTrash } from "react-icons/hi2";
import styled from "styled-components";

const Ref = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
`;

function ScoringCriteriaTableRow({ criterion }) {
  const { hasAccess } = useCurrentUserContext();
  const { isDeleting, deleteScoringCriterion } = useDeleteScoringCriterion();

  const { id: criterionId, name, created_at, updated_at, category } = criterion;

  return (
    <Table.Row>
      <Ref># {criterionId}</Ref>

      <Stacked>{name}</Stacked>

      <Stacked>{category.name}</Stacked>

      <Stacked>
        <span>{formatDate(created_at)}</span>
        <span>{formatDistanceFromNow(created_at)}</span>
      </Stacked>

      <Stacked>
        <span>{formatDate(updated_at)}</span>
        <span>{formatDistanceFromNow(updated_at)}</span>
      </Stacked>

      {hasAccess("contributor") && (
        <Modal>
          <Menus.Menu>
            <Menus.Toggle id={criterionId} />
            <Menus.List id={criterionId}>
              <Modal.Open opens="edit">
                <Menus.Button icon={<HiPencil />}>Éditer</Menus.Button>
              </Modal.Open>

              {hasAccess("admin") && (
                <Modal.Open opens="delete">
                  <Menus.Button icon={<HiTrash />}>Supprimer</Menus.Button>
                </Modal.Open>
              )}
            </Menus.List>
          </Menus.Menu>

          <Modal.Window name="edit">
            <UpdateScoringCriterionForm criterionToUpdate={criterion} />
          </Modal.Window>
          <Modal.Window name="delete">
            <ConfirmAction
              variation="delete"
              title="Supprimer un critère"
              message="Cette action est irréversible. Êtes-vous sûr de vouloir supprimer définitivement ce critère ?"
              onConfirm={() => deleteScoringCriterion(criterionId)}
              disabled={isDeleting}
            />
          </Modal.Window>
        </Modal>
      )}
    </Table.Row>
  );
}

export default ScoringCriteriaTableRow;
