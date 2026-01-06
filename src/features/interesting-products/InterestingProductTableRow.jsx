import { useNavigate } from "react-router-dom";

import { formatDistanceFromNow, formatDate } from "@/utils/helpers";
import { INTERESTING_PRODUCT_TYPES } from "@/utils/constants";
import { useCurrentUserContext } from "@/contexts/CurrentUserContext";
import { useDeleteInterestingProduct } from "./useDeleteInterestingProduct";

import ButtonText from "@/ui/ButtonText";
import Tag from "@/ui/Tag";
import Table from "@/ui/Table";
import Stacked from "@/ui/Stacked";
import Menus from "@/ui/Menus";
import Modal from "@/ui/Modal";
import ConfirmAction from "@/ui/ConfirmAction";
import NoDataItem from "@/ui/NoDataItem";

import UpdateInterestingProductForm from "./UpdateInterestingProductForm";

import { HiEye, HiPencil, HiTrash } from "react-icons/hi2";
import styled from "styled-components";

const Ref = styled.div`
  font-weight: 600;
  color: var(--color-grey-600);
`;

const Image = styled.img`
  display: block;
  width: 4rem;
  height: 4rem;
  object-fit: cover;
  border-radius: var(--border-radius-sm);
`;

function InterestingProductTableRow({ interestingProduct }) {
  const {
    id,
    name,
    ean,
    type,
    brand_name,
    category_name,
    image,
    created_at,
  } = interestingProduct;
  const navigate = useNavigate();
  const { isDeleting, deleteInterestingProduct } = useDeleteInterestingProduct();
  const { hasAccess } = useCurrentUserContext();

  return (
    <Table.Row>
      <Ref>{ean}</Ref>

      <Stacked>{name || <NoDataItem>Inconnue</NoDataItem>}</Stacked>

      <div>
        {image ? (
          <Image src={image} alt={name} />
        ) : (
          <NoDataItem>Aucune image</NoDataItem>
        )}
      </div>

      <Tag type={INTERESTING_PRODUCT_TYPES[type]?.color || "silver"}>
        {INTERESTING_PRODUCT_TYPES[type]?.label || type}
      </Tag>

      <Stacked>
        {category_name || <NoDataItem>Inconnue</NoDataItem>}
      </Stacked>

      <Stacked>
        {brand_name || <NoDataItem>Inconnue</NoDataItem>}
      </Stacked>

      <Stacked>
        <span>{formatDate(created_at)}</span>
        <span>{formatDistanceFromNow(created_at)}</span>
      </Stacked>

      <Modal>
        <Menus.Menu>
          <Menus.Toggle id={id} />
          <Menus.List id={id}>
            {hasAccess("contributor") && (
              <>
                <Modal.Open opens="edit">
                  <Menus.Button icon={<HiPencil />}>Éditer</Menus.Button>
                </Modal.Open>
                <Modal.Open opens="delete">
                  <Menus.Button icon={<HiTrash />}>Supprimer</Menus.Button>
                </Modal.Open>
              </>
            )}
          </Menus.List>
        </Menus.Menu>

        <Modal.Window name="edit">
          <UpdateInterestingProductForm interestingProductToUpdate={interestingProduct} />
        </Modal.Window>

        <Modal.Window name="delete">
          <ConfirmAction
            variation="delete"
            title="Supprimer un produit d'intérêt"
            message="Êtes-vous sûr de vouloir supprimer ce produit d'intérêt ?"
            onConfirm={() => deleteInterestingProduct(id)}
            disabled={isDeleting}
          />
        </Modal.Window>
      </Modal>
    </Table.Row>
  );
}

export default InterestingProductTableRow;
