import { useNavigate } from "react-router-dom";
import { isToday } from "date-fns";

import { formatDate } from "@/utils/helpers";
import { useCurrentUserContext } from "@/contexts/CurrentUserContext";
import { useGoBack } from "@/hooks/useGoBack";
import { usePartner } from "./usePartner";
import { useDeletePartner } from "./useDeletePartner";

import Row from "@/ui/Row";
import Heading from "@/ui/Heading";
import HeaderDetail from "@/ui/HeaderDetail";
import Section from "@/ui/Section";
import DataBox from "@/ui/DataBox";
import DataItem from "@/ui/DataItem";
import NoDataItem from "@/ui/NoDataItem";
import ImageDetail from "@/ui/ImageDetail";
import ButtonGroup from "@/ui/ButtonGroup";
import ButtonText from "@/ui/ButtonText";
import Button from "@/ui/Button";
import Tag from "@/ui/Tag";
import Modal from "@/ui/Modal";
import ConfirmAction from "@/ui/ConfirmAction";
import Empty from "@/ui/Empty";
import Spinner from "@/ui/Spinner";

import UpdatePartnerForm from "./UpdatePartnerForm";

import { HiOutlineCheckCircle } from "react-icons/hi2";

import styled from "styled-components";

const PartnerDataBox = styled(DataBox)`
  & > section:last-child {
    padding-top: 0;
    padding-bottom: 4rem;
  }
`;

const SmallBox = styled.div`
  font-size: 1.4rem;
`;

const InfoBox = styled.div`
  display: grid;
  grid-template-areas:
    "category name name"
    "code discount discount"
    "is_active is_affiliate show_code_in_website"
    "url url url"
    "description description description";
  gap: 4rem;
  padding-top: 2rem;

  & div:first-child {
    grid-area: category;
  }
  & div:nth-child(2) {
    grid-area: name;
  }

  & div:nth-child(3) {
    grid-area: code;
  }
  & div:nth-child(4) {
    grid-area: discount;
  }
  & div:nth-child(5) {
    grid-area: is_active;
  }
  & div:nth-child(6) {
    grid-area: is_affiliate;
  }
  & div:nth-child(7) {
    grid-area: show_code_in_website;
  }
  & div:nth-child(8) {
    grid-area: url;
  }
  & div:nth-child(9) {
    grid-area: description;
  }
`;

function PartnerDetail() {
  const navigate = useNavigate();
  const goBack = useGoBack();
  const { hasAccess } = useCurrentUserContext();
  const { isPending, partner } = usePartner();
  const { isDeleting, deletePartner } = useDeletePartner();

  if (isPending) return <Spinner />;

  if (!partner) return <Empty message="Entreprise partenaire inconnue" />;

  const {
    id: partnerId,
    created_at,
    updated_at,
    name,
    url,
    logo_path,
    description,
    discount_text,
    discount_code,
    is_affiliate,
    show_code_in_website,
    is_active,
    category,
  } = partner;

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">
          Détail de l'entreprise partenaire #{partnerId}
        </Heading>
        <ButtonText onClick={goBack}>&larr; Retour</ButtonText>
      </Row>

      <PartnerDataBox>
        <HeaderDetail type={is_active ? "green" : "red"}>
          <div>
            <ImageDetail path={logo_path} alt={`Logo ${name}`} size={6} />
            <p>
              {name}
              {is_affiliate ? " ⭐️" : ""}
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
              label="Catégorie :"
              type="horizontal"
            >
              {category ? category.name : <NoDataItem>--</NoDataItem>}
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
              label="Code :"
              type="horizontal"
            >
              {discount_code || <NoDataItem>--</NoDataItem>}
            </DataItem>

            <DataItem
              icon={<HiOutlineCheckCircle />}
              label="Réduction :"
              type="horizontal"
            >
              {discount_text || <NoDataItem>--</NoDataItem>}
            </DataItem>

            <DataItem
              icon={<HiOutlineCheckCircle />}
              label="Code actif :"
              type="horizontal"
            >
              {is_active ? (
                <Tag type="green">Oui</Tag>
              ) : (
                <Tag type="red">Non</Tag>
              )}
            </DataItem>

            <DataItem
              icon={<HiOutlineCheckCircle />}
              label="Code affilié :"
              type="horizontal"
            >
              {is_affiliate ? (
                <Tag type="green">Oui</Tag>
              ) : (
                <Tag type="red">Non</Tag>
              )}
            </DataItem>

            <DataItem
              icon={<HiOutlineCheckCircle />}
              label="Code affiché sur le site web :"
              type="horizontal"
            >
              {show_code_in_website ? (
                <Tag type="green">Oui</Tag>
              ) : (
                <Tag type="red">Non</Tag>
              )}
            </DataItem>

            <DataItem
              icon={<HiOutlineCheckCircle />}
              label="Site web :"
              type="horizontal"
            >
              {url || <NoDataItem>--</NoDataItem>}
            </DataItem>

            <DataItem
              icon={<HiOutlineCheckCircle />}
              label="Description :"
              type="vertical"
            >
              {description || <NoDataItem>--</NoDataItem>}
            </DataItem>
          </InfoBox>
        </Section>
      </PartnerDataBox>

      {hasAccess("contributor") && (
        <Modal>
          <ButtonGroup $variation="end">
            <Modal.Open opens="edit">
              <Button $variation="accent">Éditer</Button>
            </Modal.Open>

            {hasAccess("admin") && (
              <Modal.Open opens="delete">
                <Button $variation="danger" disabled={isDeleting}>
                  Supprimer
                </Button>
              </Modal.Open>
            )}

            <Button $variation="secondary" onClick={goBack}>
              Retour
            </Button>
          </ButtonGroup>

          <Modal.Window name="edit">
            <UpdatePartnerForm partnerToUpdate={partner} />
          </Modal.Window>

          <Modal.Window name="delete">
            <ConfirmAction
              variation="delete"
              title="Supprimer une entreprise partenaire"
              message="Cette action est irréversible. Êtes-vous sûr de vouloir supprimer définitivement cette entreprise partenaire ?"
              onConfirm={() =>
                deletePartner(partnerId, {
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

export default PartnerDetail;
