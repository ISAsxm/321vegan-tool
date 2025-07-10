import Row from "@/ui/Row";
import Heading from "@/ui/Heading";
import Divider from "@/ui/Divider";
import Spinner from "@/ui/Spinner";

import UpdateUserProfileForm from "./UpdateUserProfileForm";
import UpdatePasswordForm from "./UpdatePasswordForm";
import { useCurrentUser } from "./useCurrentUser";

import { HiOutlineUser } from "react-icons/hi2";

function AccountDetail() {
  const { isLoading, user } = useCurrentUser();

  if (isLoading) return <Spinner />;
  return (
    <>
      <Heading as="h1">
        <HiOutlineUser /> Mon profil
      </Heading>

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
