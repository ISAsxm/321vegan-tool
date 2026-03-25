import { formatDistanceFromNow, formatDate } from "@/utils/helpers";
import { INTERESTING_PRODUCT_TYPES } from "@/utils/constants";
import { useCurrentUserContext } from "@/contexts/CurrentUserContext";
import { useDeleteInterestingProduct } from "./useDeleteInterestingProduct";

import Tag from "@/ui/Tag";
import Table from "@/ui/Table";
import Stacked from "@/ui/Stacked";
import Menus from "@/ui/Menus";
import Modal from "@/ui/Modal";
import ConfirmAction from "@/ui/ConfirmAction";
import NoDataItem from "@/ui/NoDataItem";
import ImageDetail from "@/ui/ImageDetail";

import UpdateInterestingProductForm from "./UpdateInterestingProductForm";

import { HiPencil, HiTrash } from "react-icons/hi2";

function InterestingProductTableRow({ interestingProduct }) {
  const {
    id,
    name,
    ean,
    type,
    brand_name,
    category_name,
    category,
    created_at,
    alternative_eans,
    image,
  } = interestingProduct;
  const { isDeleting, deleteInterestingProduct } =
    useDeleteInterestingProduct();
  const { hasAccess } = useCurrentUserContext();

  return (
    <Table.Row>
      <Stacked>
        <span>{ean}</span>
        <span>{alternative_eans.join(",\n")}</span>
      </Stacked>

      <Stacked>{name || <NoDataItem>Inconnue</NoDataItem>}</Stacked>

      <ImageDetail path={image} alt={`Image ${name}`} />

      <Tag type={INTERESTING_PRODUCT_TYPES[type]?.color || "silver"}>
        {INTERESTING_PRODUCT_TYPES[type]?.label || type}
      </Tag>

      <Stacked>
        <span>{category_name || <NoDataItem>Inconnue</NoDataItem>}</span>
        {category && (
          <span>{category.category_tree.slice(0, -1).join(", ")}</span>
        )}
      </Stacked>

      <Stacked>{brand_name || <NoDataItem>Inconnue</NoDataItem>}</Stacked>

      <Stacked>
        <span>{formatDate(created_at)}</span>
        <span>{formatDistanceFromNow(created_at)}</span>
      </Stacked>

      {hasAccess("contributor") && (
        <Modal>
          <Menus.Menu>
            <Menus.Toggle id={id} />
            <Menus.List id={id}>
              <Modal.Open opens="edit">
                <Menus.Button icon={<HiPencil />}>Éditer</Menus.Button>
              </Modal.Open>

              <Modal.Open opens="delete">
                <Menus.Button icon={<HiTrash />}>Supprimer</Menus.Button>
              </Modal.Open>
            </Menus.List>
          </Menus.Menu>

          <Modal.Window name="edit">
            <UpdateInterestingProductForm
              interestingProductToUpdate={interestingProduct}
            />
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
      )}
    </Table.Row>
  );
}

export default InterestingProductTableRow;
