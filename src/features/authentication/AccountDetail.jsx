import { useCurrentUser } from "./useCurrentUser";
import { useGoBack } from "@/hooks/useGoBack";

import Row from "@/ui/Row";
import Heading from "@/ui/Heading";
import ButtonText from "@/ui/ButtonText";
import Divider from "@/ui/Divider";
import Spinner from "@/ui/Spinner";
import DataBox from "@/ui/DataBox";
import DataItem from "@/ui/DataItem";

import UpdateUserProfileForm from "./UpdateUserProfileForm";
import UpdatePasswordForm from "./UpdatePasswordForm";

import { HiOutlineUser, HiCheckBadge, HiOutlineEnvelope } from "react-icons/hi2";
import styled from "styled-components";

const StatsBox = styled(DataBox)`
  padding: 2rem 3rem;
  margin-bottom: 2rem;
  display: flex;
  gap: 4rem;
  align-items: center;
`;

function AccountDetail() {
  const goBack = useGoBack();
  const { isPending, user } = useCurrentUser();

  if (isPending) return <Spinner />;

  const productsModified = user?.nb_products_modified || 0;
  const contactsMade = user?.nb_checkings || 0;

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">
          <HiOutlineUser /> Mon profil
        </Heading>
        <ButtonText onClick={goBack}>&larr; Retour</ButtonText>
      </Row>

      <StatsBox>
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
      </StatsBox>

      <Row type="vertical">
        <Heading as="h3">Informations du profil</Heading>
        <UpdateUserProfileForm user={user} />
      </Row>

      <Divider />

      <Row type="vertical">
        <Heading as="h3">Mot de passe</Heading>
        <UpdatePasswordForm user={user} />
      </Row>
    </>
  );
}

export default AccountDetail;
