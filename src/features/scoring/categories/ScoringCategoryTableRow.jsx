import { formatDistanceFromNow, formatDate } from "@/utils/helpers";

import { useCurrentUserContext } from "@/contexts/CurrentUserContext";
import { useDeleteScoringCategory } from "./useDeleteScoringCategory";

import Table from "@/ui/Table";
import Menus from "@/ui/Menus";
import Stacked from "@/ui/Stacked";
import NoDataItem from "@/ui/NoDataItem";
import Modal from "@/ui/Modal";
import ConfirmAction from "@/ui/ConfirmAction";

import UpdateScoringCategoryForm from "./UpdateScoringCategoryForm";
import ScoringCriteriaList from "@/features/scoring/criteria/ScoringCriteriaList";
import CreateScoringCriterionForm from "@/features/scoring/criteria/CreateScoringCriterionForm";

import { HiPencil, HiPlusCircle, HiTrash } from "react-icons/hi2";
import styled from "styled-components";

const Ref = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
`;

function ScoringCategoryTableRow({ category }) {
  const { hasAccess } = useCurrentUserContext();
  const { isDeleting, deleteScoringCategory } = useDeleteScoringCategory();

  const { id: categoryId, name, created_at, updated_at, criteria } = category;

  return (
    <Table.Row>
      <Ref># {categoryId}</Ref>

      <Stacked>{name}</Stacked>

      <Stacked>
        {criteria.length > 0 ? (
          <ScoringCriteriaList
            criteria={criteria}
            canDelete={hasAccess("admin")}
          />
        ) : (
          <NoDataItem>Aucun</NoDataItem>
        )}
      </Stacked>

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
            <Menus.Toggle id={categoryId} />
            <Menus.List id={categoryId}>
              <Modal.Open opens="add-criteria">
                <Menus.Button icon={<HiPlusCircle />}>
                  Ajouter un critère
                </Menus.Button>
              </Modal.Open>

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

          <Modal.Window name="add-criteria">
            <CreateScoringCriterionForm defaultCategory={category} />
          </Modal.Window>
          <Modal.Window name="edit">
            <UpdateScoringCategoryForm categoryToUpdate={category} />
          </Modal.Window>
          <Modal.Window name="delete">
            <ConfirmAction
              variation="delete"
              title="Supprimer une catégorie"
              message="Cette action est irréversible. Êtes-vous sûr de vouloir supprimer définitivement cette catégorie ?"
              onConfirm={() => deleteScoringCategory(categoryId)}
              disabled={isDeleting}
            />
          </Modal.Window>
        </Modal>
      )}
    </Table.Row>
  );
}

export default ScoringCategoryTableRow;
