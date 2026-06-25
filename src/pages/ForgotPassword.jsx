import { Link } from "react-router-dom";
import styled from "styled-components";
import ForgotPasswordForm from "@/features/authentication/ForgotPasswordForm";
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

function ForgotPassword() {
  return (
    <AuthLayout>
      <Logo />
      <Heading as="h4">Mot de passe oublié</Heading>
      <Description>
        Entrez votre adresse e-mail pour recevoir un lien de réinitialisation du mot de passe.
      </Description>
      <ForgotPasswordForm />
      <BackLink>
        <Link to="/login">Retour à la connexion</Link>
      </BackLink>
    </AuthLayout>
  );
}

export default ForgotPassword;