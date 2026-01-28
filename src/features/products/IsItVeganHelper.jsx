import Button from "@/ui/Button";
import FormRow from "@/ui/FormRow";
import { HiOutlineCheckCircle } from "react-icons/hi2";
import styled from "styled-components";

const StyledIsItVeganHelper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
`;

const IsItVeganHelperList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
`;

const StyledIsItVeganHelperItem = styled.li`
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;

  & > p {
    line-height: 1.75rem;
  }
`;
const IsItVeganHelperIcon = styled.div`
  flex-shrink: 0;
  & > svg {
    color: var(--color-yellow-800);
    width: 1.75rem;
    height: 1.75rem;
  }
`;

const problems = [
  "les arômes et arômes naturels : peuvent être d'origine animale excepté “arômes naturels de X“ quand “X“ est d'origine végétale",
  "les exhausteurs de goût (e627, e63x) : peuvent être d'origine animale excepté E621 (Glutamate monosodique) qui est toujours vegan",
  "le E471 (mono et diglycérides d’acide gras) : peut être d'origine animale si hors UE",
  "le E270 (acide lactique) : peut être d'origine animale si hors UE",
  "la vitamine D : peut être issue de la laine de mouton (lanoline)",
  "la taurine : peut être d'origine animale",
  "les vins : le processus de clarification (collage) peut comporter des auxiliaires technologiques d'origine animale",
  "les alcools fort : le processus de clarification (collage) peut comporter des auxiliaires technologiques d'origine animale",
  "les bières : le processus de clarification (collage) peut comporter des auxiliaires technologiques d'origine animale, elles peuvent également contenir du lactose ou du miel",
  "les cidres : le processus de filtration peut comporter des auxiliaires technologiques d'origine animale",
  "les jus de pommes, d'oranges, de raisins et de fruits concentrés : le processus de filtration peut comporter des auxiliaires technologiques d'origine animale, ils peuvent également être enrichi en oméga-3 venant d'huile de poisson ou en vitamines D issue de laine de mouton (lanoline)",
  "les cocos : des singes peuvent être utilisés pour la récolte",
  "les truffes : des chiens ou des cochons peuvent être utilisés pour la récolte",
  "la margarine : peut contenir du babeurre ou être enrichie en lactose, en oméga-3 venant d'huile de poisson et en vitamines D issue de laine de mouton (lanoline)",
  "les pommes et agrumes : non bio peuvent être enduites de cire d'abeille ou de shellac",
  "les bananes : non bio sont toujours enduites de chitosane (produit servant à ralentir la maturation composé de l’exosquelette des crustacés ou de l’endosquelette des calmars)",
  "le café : Kopi Luwak (Indonésie, exploitation des civettes), Coatis (Pérou, exploitation des coatis), Jacu (Brésil, exploitation des jacu bird), Black Ivory (Thaïlande, exploitation des éléphant.e.s)",
  "le riz : peut provenir de rizières qui servent à élever des crevettes",
];

function IsItVeganHelper({ onCloseModal }) {
  return (
    <StyledIsItVeganHelper>
      <h3>Liste des potentiels problèmes&nbsp;:</h3>
      <IsItVeganHelperList>
        {problems.map((problem, i) => (
          <IsItVeganHelperItem key={i} problem={problem} />
        ))}
      </IsItVeganHelperList>
      <FormRow>
        <Button $variation="secondary" onClick={() => onCloseModal?.()}>
          Fermer
        </Button>
      </FormRow>
    </StyledIsItVeganHelper>
  );
}

export default IsItVeganHelper;

function IsItVeganHelperItem({ problem }) {
  return (
    <StyledIsItVeganHelperItem>
      <IsItVeganHelperIcon>
        <HiOutlineCheckCircle />
      </IsItVeganHelperIcon>
      <p>{problem}</p>
    </StyledIsItVeganHelperItem>
  );
}
