import { formatDistanceFromNow, formatDate } from "@/utils/helpers";

import { useCurrentUserContext } from "@/contexts/CurrentUserContext";
import { useDeleteCosmetic } from "./useDeleteCosmetic";

import Tag from "@/ui/Tag";
import Table from "@/ui/Table";
import Stacked from "@/ui/Stacked";
import Menus from "@/ui/Menus";
import Modal from "@/ui/Modal";
import ConfirmAction from "@/ui/ConfirmAction";

import UpdateCosmeticForm from "./UpdateCosmeticForm";

import { HiPencil, HiTrash } from "react-icons/hi2";

function CosmeticTableRow({ cosmetic }) {
  const { hasAccess } = useCurrentUserContext();
  const { isDeleting, deleteCosmetic } = useDeleteCosmetic();
  const {
    id: cosmeticId,
    created_at,
    updated_at,
    brand_name,
    description,
    is_vegan: isVegan,
    is_cruelty_free: isCrueltyFree,
  } = cosmetic;

  return (
    <Table.Row>
      <Stacked>{brand_name}</Stacked>

      <Stacked>
        <span>{formatDate(created_at)}</span>
        <span>{formatDistanceFromNow(created_at)}</span>
      </Stacked>

      <Stacked>
        <span>{formatDate(updated_at)}</span>
        <span>{formatDistanceFromNow(updated_at)}</span>
      </Stacked>

      {isVegan ? <Tag type="green">Oui</Tag> : <Tag type="red">Non</Tag>}

      {isCrueltyFree ? <Tag type="green">Oui</Tag> : <Tag type="red">Non</Tag>}

      <Stacked>{description}</Stacked>

      {hasAccess("contributor") && (
        <Modal>
          <Menus.Menu>
            <Menus.Toggle id={cosmeticId} />
            <Menus.List id={cosmeticId}>
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
            <UpdateCosmeticForm cosmeticToUpdate={cosmetic} />
          </Modal.Window>
          <Modal.Window name="delete">
            <ConfirmAction
              variation="delete"
              title="Supprimer une marque"
              message="Cette action est irréversible. Êtes-vous sûr de vouloir supprimer définitivement cette marque ?"
              onConfirm={() => deleteCosmetic(cosmeticId)}
              disabled={isDeleting}
            />
          </Modal.Window>
        </Modal>
      )}
    </Table.Row>
  );
}

export default CosmeticTableRow;
