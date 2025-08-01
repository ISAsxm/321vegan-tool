import { formatDistanceFromNow, formatDate } from "@/utils/helpers";
import { CHECKING_STATUSES } from "@/utils/constants";

import { useCurrentUserContext } from "@/contexts/CurrentUserContext";
import { useDeleteChecking } from "./useDeleteChecking";

import Tag from "@/ui/Tag";
import Table from "@/ui/Table";
import Stacked from "@/ui/Stacked";
import Menus from "@/ui/Menus";
import Modal from "@/ui/Modal";
import ConfirmAction from "@/ui/ConfirmAction";
import NoDataItem from "@/ui/NoDataItem";

import UpdateCheckingForm from "./UpdateCheckingForm";

import { HiOutlineEnvelopeOpen, HiTrash } from "react-icons/hi2";

function CheckingTableRow({ checking, product }) {
  const { currentUser } = useCurrentUserContext();
  const { isDeleting, deleteChecking } = useDeleteChecking();
  const {
    id: checkingId,
    status,
    requested_on,
    responded_on,
    response,
    user,
  } = checking;

  return (
    <Table.Row>
      <Stacked>
        <span>{formatDate(requested_on)}</span>
        <span>{formatDistanceFromNow(requested_on)}</span>
      </Stacked>

      <Stacked>{user.nickname}</Stacked>

      <Stacked>
        {responded_on ? (
          <>
            <span>{formatDate(responded_on)}</span>
            <span>{formatDistanceFromNow(responded_on)}</span>
          </>
        ) : (
          <NoDataItem>--</NoDataItem>
        )}
      </Stacked>

      <Stacked>{response || <NoDataItem>--</NoDataItem>}</Stacked>

      <Tag type={CHECKING_STATUSES[status].color}>
        {CHECKING_STATUSES[status].label}
      </Tag>

      {(currentUser.id === user.id || currentUser.role === "admin") && (
        <Modal>
          <Menus.Menu>
            <Menus.Toggle id={checkingId} />
            <Menus.List id={checkingId}>
              <Modal.Open opens="register-response">
                <Menus.Button
                  icon={<HiOutlineEnvelopeOpen />}
                  disabled={responded_on ? true : false}
                >
                  Enregistrer la réponse
                </Menus.Button>
              </Modal.Open>

              <Modal.Open opens="delete">
                <Menus.Button icon={<HiTrash />}>Supprimer</Menus.Button>
              </Modal.Open>
            </Menus.List>
          </Menus.Menu>

          <Modal.Window name="register-response">
            <UpdateCheckingForm checkingToUpdate={checking} product={product} />
          </Modal.Window>

          <Modal.Window name="delete">
            <ConfirmAction
              variation="delete"
              title="Supprimer un produit"
              message="Cette action est irréversible. Êtes-vous sûr de vouloir supprimer définitivement cette prise de contact ?"
              onConfirm={() => deleteChecking(checkingId)}
              disabled={isDeleting}
            />
          </Modal.Window>
        </Modal>
      )}
    </Table.Row>
  );
}

export default CheckingTableRow;
