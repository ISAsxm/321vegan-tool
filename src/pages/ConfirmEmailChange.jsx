import ConfirmEmailChangeForm from "@/features/authentication/ConfirmEmailChangeForm";
import AuthLayout from "@/ui/AuthLayout";
import Logo from "@/ui/Logo";
import Heading from "@/ui/Heading";

function ConfirmEmailChange() {
  return (
    <AuthLayout>
      <Logo />
      <Heading as="h4">Confirmation de l&apos;adresse e-mail</Heading>
      <ConfirmEmailChangeForm />
    </AuthLayout>
  );
}

export default ConfirmEmailChange;
