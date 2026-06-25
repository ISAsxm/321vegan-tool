import { Link } from "react-router-dom";
import styled from "styled-components";
import ResetPasswordForm from "@/features/authentication/ResetPasswordForm";
import AuthLayout from "@/ui/AuthLayout";
import Logo from "@/ui/Logo";
import Heading from "@/ui/Heading";

const Description = styled.p`
  text-align: center;
  color: var(--color-grey-600);
`;

const BackLink = styled.p`
  text-align: center;
  
  a {
    color: var(--color-brand-600);
    text-decoration: none;
    
    &:hover {
      text-decoration: underline;
    }
  }
`;

function ResetPassword() {
  return (
    <AuthLayout>
      <Logo />
      <Heading as="h4">Réinitialiser le mot de passe</Heading>
      <Description>
        Entrez votre nouveau mot de passe.
      </Description>
      <ResetPasswordForm />
      <BackLink>
        <Link to="/login">Retour à la connexion</Link>
      </BackLink>
    </AuthLayout>
  );
}

export default ResetPassword;