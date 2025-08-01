import { useNavigate } from "react-router-dom";

import { formatDistanceFromNow, formatDate } from "@/utils/helpers";
import { ADDITIVES_STATUSES } from "@/utils/constants";
import { useCurrentUserContext } from "@/contexts/CurrentUserContext";
import { useDeleteAdditive } from "./useDeleteAdditive";

import Tag from "@/ui/Tag";
import Table from "@/ui/Table";
import Stacked from "@/ui/Stacked";
import Menus from "@/ui/Menus";
import Modal from "@/ui/Modal";
import ConfirmAction from "@/ui/ConfirmAction";

import UpdateAdditiveForm from "./UpdateAdditiveForm";

import { HiEye, HiPencil, HiTrash } from "react-icons/hi2";
import styled from "styled-components";

const Ref = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
`;

function AdditiveTableRow({ additive }) {
  const navigate = useNavigate();
  const { isDeleting, deleteAdditive } = useDeleteAdditive();
  const { hasAccess } = useCurrentUserContext();
  const {
    id: additiveId,
    name,
    e_number,
    created_at,
    updated_at,
    status,
  } = additive;

  return (
    <Table.Row>
      <Ref># {additiveId}</Ref>

      <Stacked>{e_number}</Stacked>

      <Stacked>{name}</Stacked>

      <Stacked>
        <span>{formatDate(created_at)}</span>
        <span>{formatDistanceFromNow(created_at)}</span>
      </Stacked>

      <Stacked>
        <span>{formatDate(updated_at)}</span>
        <span>{formatDistanceFromNow(updated_at)}</span>
      </Stacked>

      <Tag type={ADDITIVES_STATUSES[status].color}>
        {ADDITIVES_STATUSES[status].label}
      </Tag>

      <Modal>
        <Menus.Menu>
          <Menus.Toggle id={additiveId} />
          <Menus.List id={additiveId}>
            <Menus.Button
              icon={<HiEye />}
              onClick={() => navigate(`/additives/${additiveId}`)}
            >
              Voir le détail
            </Menus.Button>

            {hasAccess("contributor") && (
              <Modal.Open opens="edit">
                <Menus.Button icon={<HiPencil />}>Éditer</Menus.Button>
              </Modal.Open>
            )}

            {hasAccess("admin") && (
              <Modal.Open opens="delete">
                <Menus.Button icon={<HiTrash />}>Supprimer</Menus.Button>
              </Modal.Open>
            )}
          </Menus.List>
        </Menus.Menu>

        <Modal.Window name="edit">
          <UpdateAdditiveForm additiveToUpdate={additive} />
        </Modal.Window>
        <Modal.Window name="delete">
          <ConfirmAction
            variation="delete"
            title="Supprimer un additif"
            message="Cette action est irréversible. Êtes-vous sûr de vouloir supprimer définitivement cet additif ?"
            onConfirm={() => deleteAdditive(additiveId)}
            disabled={isDeleting}
          />
        </Modal.Window>
      </Modal>
    </Table.Row>
  );
}

export default AdditiveTableRow;
