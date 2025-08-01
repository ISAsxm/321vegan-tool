import { formatDistanceFromNow, formatDate } from "@/utils/helpers";

import { useCurrentUserContext } from "@/contexts/CurrentUserContext";
import { useDeleteBrand } from "./useDeleteBrand";

import Table from "@/ui/Table";
import Menus from "@/ui/Menus";
import Stacked from "@/ui/Stacked";
import NoDataItem from "@/ui/NoDataItem";
import Modal from "@/ui/Modal";
import ConfirmAction from "@/ui/ConfirmAction";

import UpdateBrandForm from "./UpdateBrandForm";

import { HiPencil, HiTrash } from "react-icons/hi2";
import styled from "styled-components";

const Ref = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
`;

function BrandTableRow({ brand }) {
  const { hasAccess } = useCurrentUserContext();
  const { isDeleting, deleteBrand } = useDeleteBrand();
  const { id: brandId, name, created_at, updated_at, parent } = brand;

  return (
    <Table.Row>
      <Ref># {brandId}</Ref>

      <Stacked>{name}</Stacked>

      <Stacked>
        {parent ? parent.name : <NoDataItem>Aucune</NoDataItem>}
      </Stacked>

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
            <Menus.Toggle id={brandId} />
            <Menus.List id={brandId}>
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
            <UpdateBrandForm brandToUpdate={brand} />
          </Modal.Window>
          <Modal.Window name="delete">
            <ConfirmAction
              variation="delete"
              title="Supprimer une marque"
              message="Cette action est irréversible. Êtes-vous sûr de vouloir supprimer définitivement cette marque ?"
              onConfirm={() => deleteBrand(brandId)}
              disabled={isDeleting}
            />
          </Modal.Window>
        </Modal>
      )}
    </Table.Row>
  );
}

export default BrandTableRow;
