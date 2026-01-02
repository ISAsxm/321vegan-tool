import { getInitials } from "@/utils/helpers";

import styled from "styled-components";

const StyledUserAvatar = styled.div`
  display: flex;
  gap: 1.2rem;
  align-items: center;
  font-weight: 500;
  font-size: 1.4rem;
  color: var(--color-grey-600);
`;

// const Avatar = styled.img`
//   display: block;
//   width: 4rem;
//   width: 3.6rem;
//   aspect-ratio: 1;
//   object-fit: cover;
//   object-position: center;
//   border-radius: 50%;
//   outline: 2px solid var(--color-grey-100);
// `;

const Avatar = styled.div`
  display: flex;
  width: 4rem;
  width: 3.6rem;
  aspect-ratio: 1;
  align-items: center;
  justify-content: center;
  background-color: var(--color-brand-100);
  border-radius: 50%;
  outline: 2px solid var(--color-grey-100);
`;

function UserAvatar({ user }) {
  return (
    <StyledUserAvatar>
      {/* uncomment when there is a storage solution for files
      <Avatar
        src={user.avatar || "default-avatar.jpg"}
        alt={`Avatar de ${user.nickname}`}
      /> 
      */}
      <Avatar>{getInitials(user.nickname)}</Avatar>
      <span>{user.nickname}</span>
    </StyledUserAvatar>
  );
}

export default UserAvatar;
