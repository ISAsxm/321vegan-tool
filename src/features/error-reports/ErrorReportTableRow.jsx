import { useNavigate } from "react-router-dom";

import { formatDistanceFromNow, formatDate } from "@/utils/helpers";

import { useUpdateErrorReport } from "./useUpdateErrorReport";

import Table from "@/ui/Table";
import Tag from "@/ui/Tag";
import Stacked from "@/ui/Stacked";
import ButtonText from "@/ui/ButtonText";
import Modal from "@/ui/Modal";
import Tooltip from "@/ui/Tooltip";
import ConfirmAction from "@/ui/ConfirmAction";
import ButtonAction from "@/ui/ButtonAction";

import { HiCheck, HiXMark } from "react-icons/hi2";
import styled from "styled-components";

const Ref = styled.div`
  font-weight: 600;
  color: var(--color-grey-600);
`;

function ErrorReportTableRow({ errorReport }) {
  const navigate = useNavigate();
  const {
    id: errorReportId,
    ean,
    comment,
    contact,
    handled,
    created_at,
    updated_at,
    product,
  } = errorReport;

  const { isUpdating, updateErrorReport } = useUpdateErrorReport();

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
        <ButtonText
          onClick={() =>
            navigate(
              product ? `/products/${product.id}` : `/products?ean=${ean}`,
            )
          }
        >
          {ean}
        </ButtonText>
      </Ref>

      <Stacked>{comment}</Stacked>

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
        <Tooltip
          content={
            handled ? "Marquer comme non traité" : "Marquer comme traité"
          }
          id={`handle-${ean}`}
        >
          <Modal.Open opens="handle">
            <ButtonAction
              $variation={handled ? "danger" : "confirm"}
              disabled={isUpdating}
            >
              {handled ? <HiXMark /> : <HiCheck />}
            </ButtonAction>
          </Modal.Open>
        </Tooltip>

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
