import { useNavigate } from "react-router-dom";
import { isToday } from "date-fns";

import { useCurrentUser } from "@/features/authentication/useCurrentUser";
import { useGoBack } from "@/hooks/useGoBack";
import { formatDate } from "@/utils/helpers";
import { PRODUCT_STATUSES, PRODUCT_STATES } from "@/utils/constants";

import { useProduct } from "./useProduct";
import { useUpdateProduct } from "./useUpdateProduct";
import { useDeleteProduct } from "./useDeleteProduct";

import Row from "@/ui/Row";
import Heading from "@/ui/Heading";
import HeaderDetail from "@/ui/HeaderDetail";
import Section from "@/ui/Section";
import DataBox from "@/ui/DataBox";
import ButtonGroup from "@/ui/ButtonGroup";
import ButtonText from "@/ui/ButtonText";
import Button from "@/ui/Button";
import Tag from "@/ui/Tag";
import Modal from "@/ui/Modal";
import ConfirmAction from "@/ui/ConfirmAction";
import DataItem from "@/ui/DataItem";
import NoDataItem from "@/ui/NoDataItem";
import Empty from "@/ui/Empty";
import Spinner from "@/ui/Spinner";

import UpdateProductForm from "./UpdateProductForm";

import { PiPlant } from "react-icons/pi";
import { HiOutlineCheckCircle } from "react-icons/hi2";

import styled from "styled-components";

const SmallBox = styled.div`
  font-size: 1.4rem;
`;

const InfoBox = styled.div`
  display: grid;
  grid-template-areas:
    "state status off"
    "name name brand"
    "description description description"
    "problem problem problem";
  gap: 4rem;

  & div:first-child {
    grid-area: state;
  }
  & div:nth-child(2) {
    grid-area: status;
  }
  & div:nth-child(3) {
    grid-area: off;
  }
  & div:nth-child(4) {
    grid-area: name;
  }
  & div:nth-child(5) {
    grid-area: brand;
  }
  & div:nth-child(6) {
    grid-area: description;
  }
  & div:last-child {
    grid-area: problem;
    padding-bottom: 4rem;
  }
`;

function ProductDetail() {
  const navigate = useNavigate();
  const goBack = useGoBack();
  const { isPending, product } = useProduct();
  const { isUpdating: isPublishing, updateProduct } = useUpdateProduct();
  const { isDeleting, deleteProduct } = useDeleteProduct();
  const { isPending: isPendingRoles, userRoles } = useCurrentUser();

  const isWorking = isPublishing || isDeleting;

  function publish() {
    updateProduct({
      newData: { ...product, state: "PUBLISHED" },
      id: product.id,
    });
  }

  if (isPending || isPendingRoles) return <Spinner />;
  if (!product) return <Empty message="Produit inconnu" />;

  const {
    id: productId,
    created_at,
    updated_at,
    ean,
    name,
    brand,
    status,
    state,
    description,
    problem_description,
    created_from_off,
  } = product;

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Détail du produit #{productId}</Heading>
        <ButtonText onClick={goBack}>&larr; Retour</ButtonText>
      </Row>

      <DataBox>
        <HeaderDetail type={PRODUCT_STATUSES[status].color}>
          <div>
            <PiPlant />
            <p>
              Ean <span>{ean}</span>
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
              label="État :"
              type="horizontal"
            >
              <Tag type={PRODUCT_STATES[state].color}>
                {PRODUCT_STATES[state].label}
              </Tag>
            </DataItem>

            <DataItem
              icon={<HiOutlineCheckCircle />}
              label="Statut :"
              type="horizontal"
            >
              <Tag type={PRODUCT_STATUSES[status].color}>
                {PRODUCT_STATUSES[status].label}
              </Tag>
            </DataItem>

            <DataItem
              icon={<HiOutlineCheckCircle />}
              label="Créé depuis OpenFoodFacts :"
              type="horizontal"
            >
              <Tag type={created_from_off ? "green" : "red"}>
                {created_from_off ? "OUI" : "NON"}
              </Tag>
            </DataItem>

            <DataItem
              icon={<HiOutlineCheckCircle />}
              label="Dénomination :"
              type="horizontal"
            >
              {name || <NoDataItem>--</NoDataItem>}
            </DataItem>

            <DataItem
              icon={<HiOutlineCheckCircle />}
              label="Marque :"
              type="horizontal"
            >
              {brand?.name || <NoDataItem>--</NoDataItem>}
            </DataItem>
            <DataItem
              icon={<HiOutlineCheckCircle />}
              label="Description :"
              type="horizontal"
            >
              {description || <NoDataItem>--</NoDataItem>}
            </DataItem>
            <DataItem
              icon={<HiOutlineCheckCircle />}
              label="Problèmes :"
              type="horizontal"
            >
              {problem_description || <NoDataItem>--</NoDataItem>}
            </DataItem>
          </InfoBox>
        </Section>
      </DataBox>

      {!isPendingRoles && (
        <Modal>
          <ButtonGroup>
            {userRoles.includes("contributor") && state === "CREATED" && (
              <Button
                $variation="info"
                onClick={() => navigate(`/register/${productId}`)}
              >
                Vérifier
              </Button>
            )}

            {userRoles.includes("contributor") && (
              <>
                {product.state !== "CREATED" && (
                  <Modal.Open opens="edit">
                    <Button $variation="warning">Éditer</Button>
                  </Modal.Open>
                )}
              </>
            )}

            {userRoles.includes("admin") && (
              <>
                {state === "WAITING_PUBLISH" && (
                  <Modal.Open opens="publish">
                    <Button $variation="info" disabled={isWorking}>
                      Publier
                    </Button>
                  </Modal.Open>
                )}

                <Modal.Open opens="delete">
                  <Button $variation="danger" disabled={isWorking}>
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
            <UpdateProductForm productToUpdate={product} />
          </Modal.Window>

          <Modal.Window name="publish">
            <ConfirmAction
              variation="confirm"
              title="Publier un produit"
              message="Êtes-vous sûr de vouloir publier ce produit ?"
              onConfirm={() => publish()}
              disabled={isWorking}
            />
          </Modal.Window>

          <Modal.Window name="delete">
            <ConfirmAction
              variation="delete"
              title="Supprimer un produit"
              message="Cette action est irréversible. Êtes-vous sûr de vouloir supprimer définitivement ce produit ?"
              onConfirm={() =>
                deleteProduct(productId, {
                  onSettled: () => navigate(-1),
                })
              }
              disabled={isWorking}
            />
          </Modal.Window>
        </Modal>
      )}
    </>
  );
}

export default ProductDetail;
