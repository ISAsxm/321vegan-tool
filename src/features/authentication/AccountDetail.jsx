import { useCurrentUser } from "./useCurrentUser";
import { useGoBack } from "@/hooks/useGoBack";

import Row from "@/ui/Row";
import Heading from "@/ui/Heading";
import ButtonText from "@/ui/ButtonText";
import Divider from "@/ui/Divider";
import Spinner from "@/ui/Spinner";

import UpdateUserProfileForm from "./UpdateUserProfileForm";
import UpdatePasswordForm from "./UpdatePasswordForm";
import UserProfileStats from "./UserProfileStats";

import { HiOutlineUser } from "react-icons/hi2";

function AccountDetail() {
  const goBack = useGoBack();
  const { isPending, user } = useCurrentUser();

  if (isPending) return <Spinner />;

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">
          <HiOutlineUser /> Mon profil
        </Heading>
        <ButtonText onClick={goBack}>&larr; Retour</ButtonText>
      </Row>

      <Row type="vertical">
        <Heading as="h3">Contributions</Heading>
        <UserProfileStats user={user} />
      </Row>

      <Divider />

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
