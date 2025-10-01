import { useEffect, useState } from "react";
import { evaluate } from "@/utils/helpers";
import { useCopyToClipboard } from "@/hooks/useCopyToClipboard";
import { useDebounce } from "@/hooks/useDebounce";
import { useCurrentUserContext } from "@/contexts/CurrentUserContext";

import Row from "@/ui/Row";
import FormRow from "@/ui/FormRow";
import Button from "@/ui/Button";
import Radios from "@/ui/Radios";
import Textarea from "@/ui/Textarea";
import MailtoLink from "@/ui/MailtoLink";
import Heading from "@/ui/Heading";
import SpinnerMini from "@/ui/SpinnerMini";

import styled from "styled-components";

const StyledGenerateCheckingMessage = styled.div`
  width: 40rem;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;

  & p {
    color: var(--color-grey-500);
    margin-bottom: 1.2rem;
  }
`;

const TextareaBody = styled(Textarea)`
  height: 20rem;
`;

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;

const TEMPLATES = {
  simpleProblem: `Bonjour,\n\nJe souhaite savoir si le produit {{ NAME }} (code-barres {{ EAN }}) est adapté à un régime alimentaire végétalien.\nIl contient {{ PROBLEM_DESCRIPTION }}, un composant pouvant être d’origine animale ou végétale.\nPouvez-vous me confirmer son origine ?\n\nMerci par avance pour votre retour.\n\nCordialement,\n{{ USERNAME }}`,
  multiProblem: `Bonjour,\n\nJe souhaite savoir si le produit {{ NAME }} (code-barres {{ EAN }}) est adapté à un régime alimentaire végétalien.\nIl contient {{ PROBLEM_DESCRIPTION }}, des composants pouvant être d’origine animale ou végétale.\nPouvez-vous me confirmer leurs origines ?\n\nMerci par avance pour votre retour.\n\nCordialement,\n{{ USERNAME }}`,
  processProblem: `Bonjour,\n\nJe souhaite savoir si le produit {{ NAME }} (code-barres {{ EAN }}) est adapté à un régime alimentaire végétalien.\nMa question porte sur le procédé utilisé pour {{ PROBLEM_DESCRIPTION }}.\nCe procédé implique-t-il l’utilisation d’animaux ou de sous-produits d’origine animale ?\n\nMerci par avance pour votre retour.\n\nCordialement,\n{{ USERNAME }}`,
};

function GenerateCheckingMessage({ product, onCloseModal }) {
  const debounce = useDebounce(3000);
  const [body, setBody] = useState("");
  const { isCopying, isCopied, error, copyToClipboard } = useCopyToClipboard();
  const { currentUser } = useCurrentUserContext();
  const { name, ean, problem_description } = product;
  const data = {
    NAME: name || "[NOM DU PRODUIT]",
    EAN: ean,
    PROBLEM_DESCRIPTION: problem_description?.toLowerCase() || "[PROBLÈMES]",
    USERNAME: currentUser.nickname,
  };

  function handleGenerate(value) {
    setBody(evaluate(TEMPLATES[value], data));
  }

  function handleCopy() {
    copyToClipboard(body);
  }

  useEffect(() => {
    debounce(() => {
      if (isCopied) onCloseModal?.();
    });
  }, [isCopied, onCloseModal, debounce]);

  return (
    <StyledGenerateCheckingMessage>
      <Heading as="h3">Générer un message de contact</Heading>
      <p>
        Cliquez sur le bouton correspondant au besoin pour générer le message.
      </p>
      <Row type="horizontal">
        <Radios id="template" onChange={handleGenerate}>
          <Radios.RadioButton
            color="indigo"
            value="simpleProblem"
            disabled={isCopying}
          >
            Pour un ingrédient
          </Radios.RadioButton>
          <Radios.RadioButton
            color="indigo"
            value="multiProblem"
            disabled={isCopying}
          >
            Pour des ingrédients
          </Radios.RadioButton>
          <Radios.RadioButton
            color="indigo"
            value="processProblem"
            disabled={isCopying}
          >
            Pour le processus
          </Radios.RadioButton>
        </Radios>
      </Row>

      <Row type="vertical">
        <TextareaBody
          id="result"
          defaultValue={body}
          onChange={(e) => setBody(e.target.value)}
          disabled={isCopying}
        />
        {error && <Error>{error}</Error>}
      </Row>
      <FormRow>
        <Button
          $variation="secondary"
          type="reset"
          onClick={() => onCloseModal?.()}
          disabled={isCopying}
        >
          Annuler
        </Button>
        <MailtoLink
          subject="Demande d'informations concernant un produit"
          body={body}
        >
          <Button
            disabled={!body || isCopying}
            onClick={() => onCloseModal?.()}
          >
            Ouvrir le client Mail
          </Button>
        </MailtoLink>
        <Button disabled={!body || isCopying || error} onClick={handleCopy}>
          {isCopying ? <SpinnerMini /> : isCopied ? "Copié ✅" : "Copier"}
        </Button>
      </FormRow>
    </StyledGenerateCheckingMessage>
  );
}

export default GenerateCheckingMessage;
