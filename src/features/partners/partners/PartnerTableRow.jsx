import { useNavigate } from "react-router-dom";
import { formatDistanceFromNow, formatDate } from "@/utils/helpers";

import { useDeletePartner } from "./useDeletePartner";

import Table from "@/ui/Table";
import Menus from "@/ui/Menus";
import Stacked from "@/ui/Stacked";
import Tag from "@/ui/Tag";
import NoDataItem from "@/ui/NoDataItem";
import Modal from "@/ui/Modal";
import ConfirmAction from "@/ui/ConfirmAction";
import Tooltip from "@/ui/Tooltip";
import ImageDetail from "@/ui/ImageDetail";

import UpdatePartnerForm from "./UpdatePartnerForm";

import { HiEye, HiPencil, HiTrash } from "react-icons/hi2";

function PartnerTableRow({ partner }) {
  const navigate = useNavigate();
  const { isDeleting, deletePartner } = useDeletePartner();
  const {
    id: partnerId,
    name,
    created_at,
    updated_at,
    discount_text,
    discount_code,
    is_active,
    is_affiliate,
    category,
    logo_path,
  } = partner;

  return (
    <Table.Row>
      <ImageDetail path={logo_path} alt={`Logo ${name}`} />

      <Stacked>
        {name}
        {is_affiliate ? " ⭐️" : ""}
      </Stacked>

      <Stacked>
        {category ? category.name : <NoDataItem>Aucune</NoDataItem>}
      </Stacked>

      <Stacked>
        <span>{formatDate(created_at)}</span>
        <span>{formatDistanceFromNow(created_at)}</span>
      </Stacked>

      <Stacked>
        <span>{formatDate(updated_at)}</span>
        <span>{formatDistanceFromNow(updated_at)}</span>
      </Stacked>

      <div>
        <Tooltip content={discount_text} id="discount_text">
          {" "}
          <span>{discount_code}</span>
        </Tooltip>
      </div>

      {is_active ? <Tag type="green">Oui</Tag> : <Tag type="red">Non</Tag>}

      <Modal>
        <Menus.Menu>
          <Menus.Toggle id={partnerId} />
          <Menus.List id={partnerId}>
            <Menus.Button
              icon={<HiEye />}
              onClick={() => navigate(`/partners/companies/${partnerId}`)}
            >
              Voir le détail
            </Menus.Button>

            <Modal.Open opens="edit">
              <Menus.Button icon={<HiPencil />}>Éditer</Menus.Button>
            </Modal.Open>

            <Modal.Open opens="delete">
              <Menus.Button icon={<HiTrash />}>Supprimer</Menus.Button>
            </Modal.Open>
          </Menus.List>
        </Menus.Menu>

        <Modal.Window name="edit">
          <UpdatePartnerForm partnerToUpdate={partner} />
        </Modal.Window>

        <Modal.Window name="delete">
          <ConfirmAction
            variation="delete"
            title="Supprimer une entreprise partenaire"
            message="Cette action est irréversible. Êtes-vous sûr de vouloir supprimer définitivement cette entreprise partenaire ?"
            onConfirm={() => deletePartner(partnerId)}
            disabled={isDeleting}
          />
        </Modal.Window>
      </Modal>
    </Table.Row>
  );
}

export default PartnerTableRow;
