import { useNavigate } from "react-router-dom";

import { useCurrentUser } from "@/features/authentication/useCurrentUser";
import { formatDistanceFromNow, formatDate } from "@/utils/helpers";
import { PRODUCT_STATUSES, PRODUCT_STATES } from "@/utils/constants";

import { useDeleteProduct } from "./useDeleteProduct";

import Tag from "@/ui/Tag";
import Table from "@/ui/Table";
import Menus from "@/ui/Menus";
import Modal from "@/ui/Modal";
import ConfirmAction from "@/ui/ConfirmAction";
import NoDataItem from "@/ui/NoDataItem";

import UpdateProductForm from "./UpdateProductForm";

import { HiDocumentCheck, HiEye, HiPencil, HiTrash } from "react-icons/hi2";
import styled from "styled-components";

const Ref = styled.div`
  font-weight: 600;
  color: var(--color-grey-600);
`;

const Stacked = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;

  & span:first-child {
    font-weight: 500;
  }

  & span:last-child {
    color: var(--color-grey-500);
    font-size: 1.2rem;
  }
`;

function ProductTableRow({ product }) {
  const {
    id: productId,
    name,
    ean,
    status,
    state,
    brand,
    created_at,
    updated_at,
  } = product;
  const navigate = useNavigate();
  const { isDeleting, deleteProduct } = useDeleteProduct();
  const { isLoading: isLoadingRoles, userRoles } = useCurrentUser();

  return (
    <Table.Row>
      <Ref>{ean}</Ref>

      <Stacked>{name || <NoDataItem>Inconnue</NoDataItem>}</Stacked>

      <Stacked>{brand?.name || <NoDataItem>Inconnue</NoDataItem>}</Stacked>

      <Stacked>
        <span>{formatDate(created_at)}</span>
        <span>{formatDistanceFromNow(created_at)}</span>
      </Stacked>

      <Stacked>
        <span>{formatDate(updated_at)}</span>
        <span>{formatDistanceFromNow(updated_at)}</span>
      </Stacked>

      <Tag type={PRODUCT_STATUSES[status].color}>
        {PRODUCT_STATUSES[status].label}
      </Tag>

      <Tag type={PRODUCT_STATES[state].color}>
        {PRODUCT_STATES[state].label}
      </Tag>

      <Modal>
        <Menus.Menu>
          <Menus.Toggle id={productId} />
          <Menus.List id={productId}>
            <Menus.Button
              icon={<HiEye />}
              onClick={() => navigate(`/products/${productId}`)}
            >
              Voir le détail
            </Menus.Button>
            {!isLoadingRoles && (
              <>
                {userRoles.includes("contributor") &&
                  product.state === "CREATED" && (
                    <Menus.Button
                      icon={<HiDocumentCheck />}
                      onClick={() => navigate(`/register/${productId}`)}
                    >
                      Vérifier
                    </Menus.Button>
                  )}
                {userRoles.includes("contributor") &&
                  product.state !== "CREATED" && (
                    <Modal.Open opens="edit">
                      <Menus.Button icon={<HiPencil />}>Éditer</Menus.Button>
                    </Modal.Open>
                  )}
                {userRoles.includes("admin") && (
                  <Modal.Open opens="delete">
                    <Menus.Button icon={<HiTrash />}>Supprimer</Menus.Button>
                  </Modal.Open>
                )}
              </>
            )}
          </Menus.List>
        </Menus.Menu>

        <Modal.Window name="edit">
          <UpdateProductForm productToUpdate={product} />
        </Modal.Window>
        <Modal.Window name="delete">
          <ConfirmAction
            variation="delete"
            title="Supprimer un produit"
            message="Cette action est irréversible. Êtes-vous sûr de vouloir supprimer définitivement ce produit ?"
            onConfirm={() => deleteProduct(productId)}
            disabled={isDeleting}
          />
        </Modal.Window>
      </Modal>
    </Table.Row>
  );
}

export default ProductTableRow;
