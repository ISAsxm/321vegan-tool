import { Link } from "react-router-dom";

import { formatDistanceFromNow, formatDate } from "@/utils/helpers";
import { useProductByEan } from "@/features/products/useProductByEan";

import { useUpdateErrorReport } from "./useUpdateErrorReport";

import Table from "@/ui/Table";
import Tag from "@/ui/Tag";
import ButtonText from "@/ui/ButtonText";
import LoaderDots from "@/ui/LoaderDots";
import Modal from "@/ui/Modal";
import ConfirmAction from "@/ui/ConfirmAction";

import { HiCheck, HiXMark } from "react-icons/hi2";
import styled, { css } from "styled-components";

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

const Description = styled.div`
  max-width: 200px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const ActionButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.6rem;
  border: none;
  border-radius: var(--border-radius-sm);
  transition: all 0.2s;

  & svg {
    width: 2.2rem;
    height: 2.2rem;
  }

  ${(props) =>
    props.$variation === "danger"
      ? css`
          color: var(--color-red-100);
          background-color: var(--color-red-700);

          &:hover {
            background-color: var(--color-red-800);
          }
        `
      : css`
          color: var(--color-green-100);
          background-color: var(--color-green-700);

          &:hover {
            background-color: var(--color-green-800);
          }
        `}
`;

function ErrorReportTableRow({ errorReport }) {
  const {
    id: errorReportId,
    ean,
    comment,
    contact,
    handled,
    created_at,
    updated_at,
  } = errorReport;

  const { isUpdating, updateErrorReport } = useUpdateErrorReport();
  const { isPending: isPendingProduct, product } = useProductByEan(ean);

  const statusInfo = handled
    ? { color: "green", label: "Traité" }
    : { color: "yellow", label: "Non traité" };

  function handleToggleStatus() {
    updateErrorReport({
      id: errorReportId,
      newData: { ...errorReport, handled: !handled },
    });
  }

  return (
    <Table.Row>
      <Ref>
        {isPendingProduct ? (
          <LoaderDots />
        ) : product ? (
          <ButtonText as={Link} to={`/products/${product.id}`} target="_blank">
            {ean}
          </ButtonText>
        ) : (
          <ButtonText
            as={Link}
            to={{
              pathname: `/products`,
              search: `?ean=${ean}`,
            }}
            target="_blank"
          >
            {ean}
          </ButtonText>
        )}
      </Ref>

      <Description title={comment}>{comment}</Description>

      <Stacked>
        <span>{contact}</span>
      </Stacked>

      <Stacked>
        <span>{formatDate(created_at)}</span>
        <span>{formatDistanceFromNow(created_at)}</span>
      </Stacked>

      <Stacked>
        <span>{formatDate(updated_at)}</span>
        <span>{formatDistanceFromNow(updated_at)}</span>
      </Stacked>

      <Tag type={statusInfo.color}>{statusInfo.label}</Tag>

      <Modal>
        <Modal.Open opens="handle">
          <ActionButton
            $variation={handled ? "danger" : "confirm"}
            disabled={isUpdating}
            title={
              handled ? "Marquer comme non traité" : "Marquer comme traité"
            }
          >
            {handled ? <HiXMark /> : <HiCheck />}
          </ActionButton>
        </Modal.Open>

        <Modal.Window name="handle">
          <ConfirmAction
            variation={handled ? "delete" : "confirm"}
            title={
              handled ? "Marquer comme non traité" : "Marquer comme traité"
            }
            message={`Êtes-vous sûr de vouloir ${
              handled ? "marquer comme non traité" : "marquer comme traité"
            } ce signalement d'erreur ?`}
            onConfirm={() => handleToggleStatus()}
            disabled={isUpdating}
          />
        </Modal.Window>
      </Modal>
    </Table.Row>
  );
}

export default ErrorReportTableRow;
