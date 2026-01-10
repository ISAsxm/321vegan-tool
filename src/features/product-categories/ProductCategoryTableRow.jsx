import { formatDistanceFromNow, formatDate } from "@/utils/helpers";

import { useCurrentUserContext } from "@/contexts/CurrentUserContext";
import { useDeleteProductCategory } from "./useDeleteProductCategory";

import Table from "@/ui/Table";
import Menus from "@/ui/Menus";
import Stacked from "@/ui/Stacked";
import NoDataItem from "@/ui/NoDataItem";
import Modal from "@/ui/Modal";
import ConfirmAction from "@/ui/ConfirmAction";

import UpdateProductCategoryForm from "./UpdateProductCategoryForm";

import { HiPencil, HiTrash } from "react-icons/hi2";
import styled from "styled-components";

const Ref = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
`;

function ProductCategoryTableRow({ productCategory }) {
  const { hasAccess } = useCurrentUserContext();
  const { isDeleting, deleteProductCategory } = useDeleteProductCategory();
  const {
    id: productCategoryId,
    name,
    created_at,
    updated_at,
    parent,
  } = productCategory;

  return (
    <Table.Row>
      <Ref># {productCategoryId}</Ref>

      <Stacked>{name}</Stacked>

      {parent ? (
        <Stacked>
          <span>{parent.name}</span>
          <span>
            {[...parent.category_tree.filter((n) => n !== parent.name)]
              .reverse()
              .join(", ")}
          </span>
        </Stacked>
      ) : (
        <NoDataItem>Aucune</NoDataItem>
      )}

      <Stacked>
        <span>{formatDate(created_at)}</span>
        <span>{formatDistanceFromNow(created_at)}</span>
      </Stacked>

      <Stacked>
        <span>{formatDate(updated_at)}</span>
        <span>{formatDistanceFromNow(updated_at)}</span>
      </Stacked>

      {hasAccess("contributor") && (
        <Modal>
          <Menus.Menu>
            <Menus.Toggle id={productCategoryId} />
            <Menus.List id={productCategoryId}>
              <Modal.Open opens="edit">
                <Menus.Button icon={<HiPencil />}>Éditer</Menus.Button>
              </Modal.Open>

              {hasAccess("admin") && (
                <Modal.Open opens="delete">
                  <Menus.Button icon={<HiTrash />}>Supprimer</Menus.Button>
                </Modal.Open>
              )}
            </Menus.List>
          </Menus.Menu>

          <Modal.Window name="edit">
            <UpdateProductCategoryForm
              productCategoryToUpdate={productCategory}
            />
          </Modal.Window>

          <Modal.Window name="delete">
            <ConfirmAction
              variation="delete"
              title="Supprimer une catégorie de produit"
              message="Cette action est irréversible. Êtes-vous sûr de vouloir supprimer définitivement cette catégorie de produit ?"
              onConfirm={() => deleteProductCategory(productCategoryId)}
              disabled={isDeleting}
            />
          </Modal.Window>
        </Modal>
      )}
    </Table.Row>
  );
}

export default ProductCategoryTableRow;
