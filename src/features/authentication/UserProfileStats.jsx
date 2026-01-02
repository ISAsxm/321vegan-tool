import DataItem from "@/ui/DataItem";

import { HiCheckBadge, HiOutlineEnvelope } from "react-icons/hi2";
import styled from "styled-components";

const StyledUserProfileStats = styled.div`
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);

  overflow: hidden;
  padding: 2rem 3rem;
  margin-bottom: 2rem;
  display: flex;
  gap: 4rem;
  align-items: center;
`;

function UserProfileStats({ user }) {
  const productsModified = user?.nb_products_modified || 0;
  const contactsMade = user?.nb_checkings || 0;
  return (
    <StyledUserProfileStats>
      <DataItem
        icon={<HiCheckBadge />}
        label="Produits modifiés :"
        type="horizontal"
      >
        <strong>{productsModified}</strong>
      </DataItem>
      <DataItem
        icon={<HiOutlineEnvelope />}
        label="Contacts effectués :"
        type="horizontal"
      >
        <strong>{contactsMade}</strong>
      </DataItem>
    </StyledUserProfileStats>
  );
}

export default UserProfileStats;
