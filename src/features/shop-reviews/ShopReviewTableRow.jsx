import { formatDistanceFromNow, formatDate } from "@/utils/helpers";
import { SHOP_REVIEWS_STATUSES } from "@/utils/constants";
import { useUpdateShopReviewStatus } from "./useUpdateShopReviewStatus";
import { useDeleteShopReview } from "./useDeleteShopReview";

import Tag from "@/ui/Tag";
import Table from "@/ui/Table";
import Stacked from "@/ui/Stacked";
import NoDataItem from "@/ui/NoDataItem";
import Ratings from "@/ui/Ratings";
import Modal from "@/ui/Modal";
import ButtonAction from "@/ui/ButtonAction";
import ConfirmAction from "@/ui/ConfirmAction";
import Tooltip from "@/ui/Tooltip";

import { HiTrash, HiXMark, HiCheck } from "react-icons/hi2";
import styled from "styled-components";

const RatingRow = styled.div`
  display: flex;
  justify-content: start;
  font-size: 1.4rem;
`;

const ActionCell = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;

function ShopReviewTableRow({ shopReview }) {
  const {
    id: shopReviewId,
    shop,
    user,
    rating,
    comment,
    status,
    created_at,
  } = shopReview;
  const { isUpdatingStatus, updateShopReviewStatus } =
    useUpdateShopReviewStatus();
  const { isDeleting, deleteShopReview } = useDeleteShopReview();
  const isWorking = isUpdatingStatus || isDeleting;

  function handleUpdateStatus(status) {
    updateShopReviewStatus({
      id: shopReviewId,
      newStatus: status,
    });
  }

  return (
    <Table.Row>
      <RatingRow>
        <Ratings defaultValue={rating} name={`shop-${shop.id}`} disabled={true}>
          {[...Array(6).keys()].slice(1).map((i) => (
            <Ratings.Rating
              key={`rating-${shop.id}-${i}`}
              name={`rating-${shop.id}-${i}`}
              value={i}
              disabled={true}
              color={"brand"}
            />
          ))}
        </Ratings>
      </RatingRow>
      <Stacked>{comment || <NoDataItem>--</NoDataItem>}</Stacked>
      <Stacked>{shop.name}</Stacked>

      <Stacked>{user?.nickname || <NoDataItem>--</NoDataItem>}</Stacked>

      <Stacked>
        <span>{formatDate(created_at)}</span>
        <span>{formatDistanceFromNow(created_at)}</span>
      </Stacked>

      <Tag type={SHOP_REVIEWS_STATUSES[status].color}>
        {SHOP_REVIEWS_STATUSES[status].label}
      </Tag>

      <Modal>
        <ActionCell>
          <Tooltip content="Valider" id={`approve-${shopReviewId}`}>
            <Modal.Open opens="approve">
              <ButtonAction
                disabled={isWorking || status === "APPROVED"}
                $variation="confirm"
              >
                <HiCheck />
              </ButtonAction>
            </Modal.Open>
          </Tooltip>

          <Tooltip content="Rejeter" id={`reject-${shopReviewId}`}>
            <Modal.Open opens="reject">
              <ButtonAction
                disabled={isWorking || status === "REJECTED"}
                $variation="accent"
              >
                <HiXMark />
              </ButtonAction>
            </Modal.Open>
          </Tooltip>

          <Tooltip content="Supprimer" id={`delete-${shopReviewId}`}>
            <Modal.Open opens="delete">
              <ButtonAction disabled={isWorking} $variation="danger">
                <HiTrash />
              </ButtonAction>
            </Modal.Open>
          </Tooltip>
        </ActionCell>

        <Modal.Window name="approve">
          <ConfirmAction
            variation="confirm"
            title="Valider un avis"
            message="Êtes-vous sûr de vouloir valider cet avis ?"
            onConfirm={() => handleUpdateStatus("APPROVED")}
            disabled={isWorking}
          />
        </Modal.Window>

        <Modal.Window name="reject">
          <ConfirmAction
            variation="delete"
            title="Rejeter un avis"
            message="Êtes-vous sûr de vouloir rejeter cet avis ?"
            onConfirm={() => handleUpdateStatus("REJECTED")}
            disabled={isWorking}
          />
        </Modal.Window>

        <Modal.Window name="delete">
          <ConfirmAction
            variation="delete"
            title="Supprimer un avis"
            message="Cette action est irréversible. Êtes-vous sûr de vouloir supprimer définitivement cet avis ?"
            onConfirm={() => deleteShopReview(shopReviewId)}
            disabled={isWorking}
          />
        </Modal.Window>
      </Modal>

      {/* <Modal>
        <Menus.Menu>
          <Menus.Toggle id={shopReviewId} />
          <Menus.List id={shopReviewId}>
            <Modal.Open opens="approve">
              <Menus.Button
                icon={<HiCheck />}
                disabled={isWorking || status === "APPROVED"}
              >
                Valider
              </Menus.Button>
            </Modal.Open>

            <Modal.Open opens="reject">
              <Menus.Button
                icon={<HiXMark />}
                disabled={isWorking || status === "REJECTED"}
              >
                Rejeter
              </Menus.Button>
            </Modal.Open>

            <Modal.Open opens="delete">
              <Menus.Button icon={<HiTrash />}>Supprimer</Menus.Button>
            </Modal.Open>
          </Menus.List>
        </Menus.Menu>

        <Modal.Window name="approve">
          <ConfirmAction
            variation="confirm"
            title="Valider un avis"
            message="Êtes-vous sûr de vouloir valider cet avis ?"
            onConfirm={() => handleUpdateStatus("APPROVED")}
            disabled={isWorking}
          />
        </Modal.Window>

        <Modal.Window name="reject">
          <ConfirmAction
            variation="delete"
            title="Rejeter un avis"
            message="Êtes-vous sûr de vouloir rejeter cet avis ?"
            onConfirm={() => handleUpdateStatus("REJECTED")}
            disabled={isWorking}
          />
        </Modal.Window>

        <Modal.Window name="delete">
          <ConfirmAction
            variation="delete"
            title="Supprimer un avis"
            message="Cette action est irréversible. Êtes-vous sûr de vouloir supprimer définitivement cet avis ?"
            onConfirm={() => deleteShopReview(shopReviewId)}
            disabled={isWorking}
          />
        </Modal.Window>
      </Modal> */}
    </Table.Row>
  );
}

export default ShopReviewTableRow;
