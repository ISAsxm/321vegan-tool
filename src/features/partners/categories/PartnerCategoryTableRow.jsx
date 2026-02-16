import { formatDistanceFromNow, formatDate } from "@/utils/helpers";

import { useDeletePartnerCategory } from "./useDeletePartnerCategory";

import Table from "@/ui/Table";
import Menus from "@/ui/Menus";
import Stacked from "@/ui/Stacked";
import Modal from "@/ui/Modal";
import ConfirmAction from "@/ui/ConfirmAction";

import UpdatePartnerCategoryForm from "./UpdatePartnerCategoryForm";

import { HiPencil, HiTrash } from "react-icons/hi2";
import styled from "styled-components";

const Ref = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
`;

function PartnerCategoryTableRow({ partnerCategory }) {
  const { isDeleting, deletePartnerCategory } = useDeletePartnerCategory();
  const {
    id: partnerCategoryId,
    name,
    created_at,
    updated_at,
  } = partnerCategory;

  return (
    <Table.Row>
      <Ref># {partnerCategoryId}</Ref>

      <Stacked>{name}</Stacked>

      <Stacked>
        <span>{formatDate(created_at)}</span>
        <span>{formatDistanceFromNow(created_at)}</span>
      </Stacked>

      <Stacked>
        <span>{formatDate(updated_at)}</span>
        <span>{formatDistanceFromNow(updated_at)}</span>
      </Stacked>

      <Modal>
        <Menus.Menu>
          <Menus.Toggle id={partnerCategoryId} />
          <Menus.List id={partnerCategoryId}>
            <Modal.Open opens="edit">
              <Menus.Button icon={<HiPencil />}>Éditer</Menus.Button>
            </Modal.Open>

            <Modal.Open opens="delete">
              <Menus.Button icon={<HiTrash />}>Supprimer</Menus.Button>
            </Modal.Open>
          </Menus.List>
        </Menus.Menu>

        <Modal.Window name="edit">
          <UpdatePartnerCategoryForm
            partnerCategoryToUpdate={partnerCategory}
          />
        </Modal.Window>

        <Modal.Window name="delete">
          <ConfirmAction
            variation="delete"
            title="Supprimer une catégorie de partenaire"
            message="Cette action est irréversible. Êtes-vous sûr de vouloir supprimer définitivement cette catégorie de partenaire ?"
            onConfirm={() => deletePartnerCategory(partnerCategoryId)}
            disabled={isDeleting}
          />
        </Modal.Window>
      </Modal>
    </Table.Row>
  );
}

export default PartnerCategoryTableRow;
