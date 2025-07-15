import { formatDistanceFromNow, formatDate } from "@/utils/helpers";

import { useDeleteApiClient } from "./useDeleteApiClient";

import Tag from "@/ui/Tag";
import Table from "@/ui/Table";
import Menus from "@/ui/Menus";
import Modal from "@/ui/Modal";
import ConfirmAction from "@/ui/ConfirmAction";

import UpdateApiClientForm from "./UpdateApiClientForm";

import { HiPencil, HiTrash } from "react-icons/hi2";
import styled from "styled-components";

const Ref = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
`;

const Stacked = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;

  & span:first-child {
    font-weight: 500;
  }

  & span:last-child {
    color: var(--color-grey-500);
    font-size: 1.2rem;
  }
`;

function ApiClientTableRow({ client }) {
  const {
    id: clientId,
    name,
    api_key,
    is_active,
    created_at,
    updated_at,
  } = client;
  const { isDeleting, deleteApiClient } = useDeleteApiClient();

  return (
    <Table.Row>
      <Ref># {clientId}</Ref>

      <Stacked>{name}</Stacked>

      <Stacked>{api_key}</Stacked>

      <Stacked>
        <span>{formatDate(created_at)}</span>
        <span>{formatDistanceFromNow(created_at)}</span>
      </Stacked>

      <Stacked>
        <span>{formatDate(updated_at)}</span>
        <span>{formatDistanceFromNow(updated_at)}</span>
      </Stacked>

      {is_active ? (
        <Tag type="green">Activé</Tag>
      ) : (
        <Tag type="red">Désactivé</Tag>
      )}

      <Modal>
        <Menus.Menu>
          <Menus.Toggle id={clientId} />
          <Menus.List id={clientId}>
            <Modal.Open opens="edit">
              <Menus.Button icon={<HiPencil />}>Éditer</Menus.Button>
            </Modal.Open>

            <Modal.Open opens="delete">
              <Menus.Button icon={<HiTrash />}>Supprimer</Menus.Button>
            </Modal.Open>
          </Menus.List>
        </Menus.Menu>

        <Modal.Window name="edit">
          <UpdateApiClientForm clientToUpdate={client} />
        </Modal.Window>
        <Modal.Window name="delete">
          <ConfirmAction
            variation="delete"
            title="Supprimer un client API"
            message="Cette action est irréversible. Êtes-vous sûr de vouloir supprimer définitivement ce client API ?"
            onConfirm={() => deleteApiClient(clientId)}
            disabled={isDeleting}
          />
        </Modal.Window>
      </Modal>
    </Table.Row>
  );
}

export default ApiClientTableRow;
