import { formatDistanceFromNow, formatDate } from "@/utils/helpers";

import { useCurrentUserContext } from "@/contexts/CurrentUserContext";
import { useDeleteHouseholdCleaner } from "./useDeleteHouseholdCleaner";

import Tag from "@/ui/Tag";
import Table from "@/ui/Table";
import Stacked from "@/ui/Stacked";
import NoDataItem from "@/ui/NoDataItem";
import Menus from "@/ui/Menus";
import Modal from "@/ui/Modal";
import ConfirmAction from "@/ui/ConfirmAction";
import ButtonText from "@/ui/ButtonText";

import UpdateHouseholdCleanerForm from "./UpdateHouseholdCleanerForm";

import { HiPencil, HiTrash } from "react-icons/hi2";

function HouseholdCleanerTableRow({ householdCleaner }) {
  const { hasAccess } = useCurrentUserContext();
  const { isDeleting, deleteHouseholdCleaner } = useDeleteHouseholdCleaner();
  const {
    id: householdCleanerId,
    created_at,
    updated_at,
    brand_name,
    description,
    source,
    is_vegan: isVegan,
    is_cruelty_free: isCrueltyFree,
  } = householdCleaner;

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

      <Stacked>{description || <NoDataItem>--</NoDataItem>}</Stacked>

      {source ? (
        <ButtonText as="a" href={source} target="_blank" rel="noreferrer">
          {source}
        </ButtonText>
      ) : (
        <NoDataItem>--</NoDataItem>
      )}

      {hasAccess("contributor") && (
        <Modal>
          <Menus.Menu>
            <Menus.Toggle id={householdCleanerId} />
            <Menus.List id={householdCleanerId}>
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
            <UpdateHouseholdCleanerForm
              householdCleanerToUpdate={householdCleaner}
            />
          </Modal.Window>
          <Modal.Window name="delete">
            <ConfirmAction
              variation="delete"
              title="Supprimer une marque"
              message="Cette action est irréversible. Êtes-vous sûr de vouloir supprimer définitivement cette marque ?"
              onConfirm={() => deleteHouseholdCleaner(householdCleanerId)}
              disabled={isDeleting}
            />
          </Modal.Window>
        </Modal>
      )}
    </Table.Row>
  );
}

export default HouseholdCleanerTableRow;
