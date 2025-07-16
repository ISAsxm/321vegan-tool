import { USER_ROLES } from "@/utils/constants";
import {
  formatDistanceFromNow,
  formatDate,
  getInitials,
} from "@/utils/helpers";

import { useDeleteUser } from "./useDeleteUser";
import { useCurrentUser } from "@/features/authentication/useCurrentUser";

import Tag from "@/ui/Tag";
import Table from "@/ui/Table";
import Menus from "@/ui/Menus";
import Modal from "@/ui/Modal";
import ConfirmAction from "@/ui/ConfirmAction";

import UpdateUserForm from "./UpdateUserForm";

import { HiPencil, HiTrash } from "react-icons/hi2";
import styled from "styled-components";

const Ref = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
`;

const UserBox = styled.span`
  display: grid;
  grid-template-columns: 4rem 1fr;
  align-items: center;
  gap: 0.8rem;
`;

const UserAvatar = styled.span`
  display: flex;
  width: 4rem;
  height: 4rem;
  aspect-ratio: 1;
  align-items: center;
  justify-content: center;
  background-color: var(--color-brand-100);
  border-radius: var(--border-radius-sm);
  outline: 2px solid var(--color-grey-100);
`;

// uncomment when there is a storage solution for files
// const UserAvatar = styled.img`
//   display: block;
//   width: 4rem;
//   aspect-ratio: 1;
//   object-fit: cover;
//   object-position: center;
//   border-radius: var(--border-radius-sm);
//   outline: 2px solid var(--color-grey-100);
// `;

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

function UserTableRow({ user }) {
  const {
    id: userId,
    nickname,
    avatar,
    email,
    is_active,
    role,
    created_at,
  } = user;
  const { isDeleting, deleteUser } = useDeleteUser();
  const { isPending: isPendingUser, user: currentUser } = useCurrentUser();

  if (isPendingUser) return null;

  return (
    <Table.Row>
      <Ref># {userId}</Ref>

      <UserBox>
        {/* uncomment when there is a storage solution for files
          <UserAvatar>
            src={avatar || "default-avatar.jpg"}
            alt={`Avatar of ${nickname}`}
          /> 
        */}
        <UserAvatar>{getInitials(nickname)}</UserAvatar>
        <Stacked>
          <span>{nickname}</span>
          <span>{email}</span>
        </Stacked>
      </UserBox>

      <Stacked>
        <span>{formatDate(created_at)}</span>
        <span>{formatDistanceFromNow(created_at)}</span>
      </Stacked>

      {is_active ? (
        <Tag type="green">Activé</Tag>
      ) : (
        <Tag type="red">Désactivé</Tag>
      )}

      <Tag type={USER_ROLES[role].color}>{USER_ROLES[role].label}</Tag>

      {user.id !== currentUser.id && (
        <Modal>
          <Menus.Menu>
            <Menus.Toggle id={userId} />
            <Menus.List id={userId}>
              <Modal.Open opens="edit">
                <Menus.Button icon={<HiPencil />}>Éditer</Menus.Button>
              </Modal.Open>

              <Modal.Open opens="delete">
                <Menus.Button icon={<HiTrash />}>Supprimer</Menus.Button>
              </Modal.Open>
            </Menus.List>
          </Menus.Menu>

          <Modal.Window name="edit">
            <UpdateUserForm userToUpdate={user} />
          </Modal.Window>
          <Modal.Window name="delete">
            <ConfirmAction
              variation="delete"
              title="Supprimer un·e utilisateurice"
              message="Cette action est irréversible. Êtes-vous sûr de vouloir supprimer définitivement cet·te utilisateurice ?"
              onConfirm={() => deleteUser(userId)}
              disabled={isDeleting}
            />
          </Modal.Window>
        </Modal>
      )}
    </Table.Row>
  );
}

export default UserTableRow;
