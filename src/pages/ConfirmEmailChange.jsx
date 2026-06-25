import { Link } from "react-router-dom";
import styled from "styled-components";
import ConfirmEmailChangeForm from "@/features/authentication/ConfirmEmailChangeForm";
import Logo from "@/ui/Logo";
import Heading from "@/ui/Heading";

const ConfirmEmailChangeLayout = styled.main`
  min-height: 100vh;
  display: grid;
  grid-template-columns: 48rem;
  align-content: center;
  justify-content: center;
  gap: 3.2rem;
  background-color: var(--color-grey-50);
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

function ConfirmEmailChange() {
  return (
    <ConfirmEmailChangeLayout>
      <Logo />
      <Heading as="h4">Confirmation de l&apos;adresse e-mail</Heading>
      <ConfirmEmailChangeForm />
    </ConfirmEmailChangeLayout>
  );
}

export default ConfirmEmailChange;
