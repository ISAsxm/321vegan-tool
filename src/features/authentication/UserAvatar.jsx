import { getRand } from "@/utils/helpers";
import { USER_AVATARS } from "@/utils/constants";

import styled from "styled-components";

export const StyledUserAvatar = styled.div`
  display: flex;
  gap: 1.2rem;
  align-items: center;
  font-weight: 500;
  font-size: 1.4rem;
  color: var(--color-grey-600);
`;

export const Avatar = styled.img`
  display: block;
  width: 3.6rem;
  aspect-ratio: 1;
  object-fit: cover;
  object-position: center;
  border-radius: 50%;
  outline: 2px solid var(--color-grey-100);
  background-color: var(--color-brand-100);
`;

function UserAvatar({ user }) {
  return (
    <StyledUserAvatar>
      <Avatar
        src={
          user.avatar ||
          getRand(Object.values(USER_AVATARS).filter((i) => i !== "default"))
        }
        alt=""
      />
      <span>{user.nickname}</span>
    </StyledUserAvatar>
  );
}

export default UserAvatar;
