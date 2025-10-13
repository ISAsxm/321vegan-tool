import { useNavigate } from "react-router-dom";
import { formatDistanceFromNow, formatDate } from "@/utils/helpers";

import { useCurrentUserContext } from "@/contexts/CurrentUserContext";
import { useDeleteBrand } from "./useDeleteBrand";
import { getScoresColor } from "@/features/scoring/brands/utils";

import Table from "@/ui/Table";
import Menus from "@/ui/Menus";
import Stacked from "@/ui/Stacked";
import Tag from "@/ui/Tag";
import NoDataItem from "@/ui/NoDataItem";
import Modal from "@/ui/Modal";
import ConfirmAction from "@/ui/ConfirmAction";

import UpdateBrandForm from "./UpdateBrandForm";
import BrandLogo from "./BrandLogo";

import { HiEye, HiPencil, HiTrash } from "react-icons/hi2";

function BrandTableRow({ brand }) {
  const navigate = useNavigate();
  const { hasAccess } = useCurrentUserContext();
  const { isDeleting, deleteBrand } = useDeleteBrand();
  const {
    id: brandId,
    name,
    created_at,
    updated_at,
    parent,
    score,
    boycott,
    email,
  } = brand;

  return (
    <Table.Row>
      <BrandLogo brand={brand} />

      <Stacked>
        <span>{name}</span>
        <span>{email}</span>
      </Stacked>

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

      <Tag type={getScoresColor(score)}>
        {score !== null ? `${score}%` : "N/A"}
      </Tag>

      {boycott ? <Tag type="red">Oui</Tag> : <Tag type="green">Non</Tag>}

      {hasAccess("contributor") && (
        <Modal>
          <Menus.Menu>
            <Menus.Toggle id={brandId} />
            <Menus.List id={brandId}>
              <Menus.Button
                icon={<HiEye />}
                onClick={() => navigate(`/brands/${brandId}`)}
              >
                Voir le détail
              </Menus.Button>

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
