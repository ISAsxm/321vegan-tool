import { useNavigate } from "react-router-dom";
import { isToday } from "date-fns";

import { formatDate } from "@/utils/helpers";
import { ADDITIVES_STATUSES } from "@/utils/constants";
import { useCurrentUserContext } from "@/contexts/CurrentUserContext";
import { useGoBack } from "@/hooks/useGoBack";
import { useAdditive } from "./useAdditive";
import { useDeleteAdditive } from "./useDeleteAdditive";

import Row from "@/ui/Row";
import Heading from "@/ui/Heading";
import HeaderDetail from "@/ui/HeaderDetail";
import Section from "@/ui/Section";
import DataBox from "@/ui/DataBox";
import DataItem from "@/ui/DataItem";
import NoDataItem from "@/ui/NoDataItem";
import ButtonGroup from "@/ui/ButtonGroup";
import ButtonText from "@/ui/ButtonText";
import Button from "@/ui/Button";
import Tag from "@/ui/Tag";
import Modal from "@/ui/Modal";
import ConfirmAction from "@/ui/ConfirmAction";
import Empty from "@/ui/Empty";
import Spinner from "@/ui/Spinner";

import UpdateAdditiveForm from "./UpdateAdditiveForm";

import { HiOutlineBeaker, HiOutlineCheckCircle } from "react-icons/hi2";

import styled from "styled-components";

const SmallBox = styled.div`
  font-size: 1.4rem;
`;

const InfoBox = styled.div`
  display: grid;
  grid-template-areas:
    "status . ."
    "enumber name name"
    "description description description"
    "sources sources sources";
  gap: 4rem;

  & div:first-child {
    grid-area: status;
  }
  & div:nth-child(2) {
    grid-area: enumber;
  }
  & div:nth-child(3) {
    grid-area: name;
  }
  & div:nth-child(4) {
    grid-area: description;
  }
  & div:last-child {
    grid-area: sources;
    padding-bottom: 4rem;
  }
`;

function AdditiveDetail() {
  const navigate = useNavigate();
  const goBack = useGoBack();
  const { isPending, additive } = useAdditive();
  const { isDeleting, deleteAdditive } = useDeleteAdditive();
  const { hasAccess } = useCurrentUserContext();

  if (isPending) return <Spinner />;

  if (!additive) return <Empty message="Additif inconnu" />;

  const {
    id: additiveId,
    created_at,
    updated_at,
    name,
    e_number,
    description,
    status,
    source,
  } = additive;

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Détail de l'additif #{additiveId}</Heading>
        <ButtonText onClick={goBack}>&larr; Retour</ButtonText>
      </Row>

      <DataBox>
        <HeaderDetail type={ADDITIVES_STATUSES[status].color}>
          <div>
            <HiOutlineBeaker />
            <p>
              E-code <span>{e_number}</span>
            </p>
          </div>

          <SmallBox>
            <p>
              Ajouté le :
              {isToday(new Date(created_at))
                ? " Aujourd'hui"
                : formatDate(created_at, " dd/MM/yyyy")}
            </p>
            <p>
              Modifié le :
              {isToday(new Date(updated_at))
                ? " Aujourd'hui"
                : formatDate(updated_at, " dd/MM/yyyy")}
            </p>
          </SmallBox>
        </HeaderDetail>

        <Section>
          <InfoBox>
            <DataItem
              icon={<HiOutlineCheckCircle />}
              label="Statut :"
              type="horizontal"
            >
              <Tag type={ADDITIVES_STATUSES[status].color}>
                {ADDITIVES_STATUSES[status].label}
              </Tag>
            </DataItem>

            <DataItem
              icon={<HiOutlineCheckCircle />}
              label="E code :"
              type="horizontal"
            >
              {e_number}
            </DataItem>

            <DataItem
              icon={<HiOutlineCheckCircle />}
              label="Nom :"
              type="horizontal"
            >
              {name || <NoDataItem>--</NoDataItem>}
            </DataItem>

            <DataItem
              icon={<HiOutlineCheckCircle />}
              label="Description :"
              type="vertical"
            >
              {description || <NoDataItem>--</NoDataItem>}
            </DataItem>

            <DataItem
              icon={<HiOutlineCheckCircle />}
              label="Source :"
              type="horizontal"
            >
              {source ? (
                <ButtonText
                  as="a"
                  href={source}
                  target="_blank"
                  rel="noreferrer"
                >
                  {source}
                </ButtonText>
              ) : (
                <NoDataItem>--</NoDataItem>
              )}
            </DataItem>
          </InfoBox>
        </Section>
      </DataBox>

      {hasAccess("contributor") && (
        <Modal>
          <ButtonGroup $variation="end">
            <Modal.Open opens="edit">
              <Button $variation="accent">Éditer</Button>
            </Modal.Open>

            {hasAccess("admin") && (
              <>
                <Modal.Open opens="delete">
                  <Button $variation="danger" disabled={isDeleting}>
                    Supprimer
                  </Button>
                </Modal.Open>
              </>
            )}

            <Button $variation="secondary" onClick={goBack}>
              Retour
            </Button>
          </ButtonGroup>

          <Modal.Window name="edit">
            <UpdateAdditiveForm additiveToUpdate={additive} />
          </Modal.Window>

          <Modal.Window name="delete">
            <ConfirmAction
              variation="delete"
              title="Supprimer un additif"
              message="Cette action est irréversible. Êtes-vous sûr de vouloir supprimer définitivement cet additif ?"
              onConfirm={() =>
                deleteAdditive(additiveId, {
                  onSettled: () => navigate(-1),
                })
              }
              disabled={isDeleting}
            />
          </Modal.Window>
        </Modal>
      )}
    </>
  );
}

export default AdditiveDetail;
