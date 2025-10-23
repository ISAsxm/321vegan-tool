import { Link } from "react-router-dom";
import styled from "styled-components";
import ForgotPasswordForm from "@/features/authentication/ForgotPasswordForm";
import Logo from "@/ui/Logo";
import Heading from "@/ui/Heading";

const ForgotPasswordLayout = styled.main`
  min-height: 100vh;
  display: grid;
  grid-template-columns: 48rem;
  align-content: center;
  justify-content: center;
  gap: 3.2rem;
  background-color: var(--color-grey-50);
`;

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
    <ForgotPasswordLayout>
      <Logo />
      <Heading as="h4">Mot de passe oublié</Heading>
      <Description>
        Entrez votre adresse e-mail pour recevoir un lien de réinitialisation du mot de passe.
      </Description>
      <ForgotPasswordForm />
      <BackLink>
        <Link to="/login">Retour à la connexion</Link>
      </BackLink>
    </ForgotPasswordLayout>
  );
}

export default ForgotPassword;