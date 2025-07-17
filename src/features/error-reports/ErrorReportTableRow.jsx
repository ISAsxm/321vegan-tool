import { useNavigate } from "react-router-dom";
import { formatDistanceFromNow, formatDate } from "@/utils/helpers";

import { useUpdateErrorReport } from "./useUpdateErrorReport";
import { useCurrentUser } from "@/features/authentication/useCurrentUser";
import { useProductByEan } from "@/features/products/useProductByEan";

import Table from "@/ui/Table";
import Tag from "@/ui/Tag";
import Button from "@/ui/Button";

import { HiCheck, HiXMark } from "react-icons/hi2";
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

const Description = styled.div`
  max-width: 200px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const StatusColumn = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
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
  const navigate = useNavigate();
  const { isUpdating, updateErrorReport } = useUpdateErrorReport();
  const { isPending: isPendingRoles, userRoles } = useCurrentUser();
  const { product } = useProductByEan(ean);

  const statusInfo = handled
    ? { color: "green", label: "Traité" }
    : { color: "yellow", label: "Non traité" };

  function handleViewProduct() {
    if (product) {
      // Navigate directly to product detail if found
      window.open(`/products/${product.id}`, "_blank");
    } else {
      // Navigate to products search page with EAN filter
      navigate(`/products?ean=${ean}`);
    }
  }

  function handleToggleStatus() {
    updateErrorReport({
      id: errorReportId,
      newData: { ...errorReport, handled: !handled },
    });
  }

  if (isPendingRoles) return null;

  return (
    <Table.Row>
      <Ref>
        <Button
          variation="ghost"
          size="small"
          onClick={handleViewProduct}
          title="Voir le produit avec cet EAN"
        >
          {ean}
        </Button>
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

      <StatusColumn>
        <Tag type={statusInfo.color}>{statusInfo.label}</Tag>
        {userRoles.includes("contributor") && (
          <Button
            size="small"
            $variation={handled ? "danger" : "confirm"}
            onClick={handleToggleStatus}
            disabled={isUpdating}
            title={
              handled ? "Marquer comme non traité" : "Marquer comme traité"
            }
            style={{ minWidth: "auto", padding: "0.4rem" }}
          >
            {handled ? <HiXMark /> : <HiCheck />}
          </Button>
        )}
      </StatusColumn>
    </Table.Row>
  );
}

export default ErrorReportTableRow;
