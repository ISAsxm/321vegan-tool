import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { partnersKeys } from "./queryKeyFactory";

import { getPartner } from "@/services/apiPartners";

export function usePartner() {
  const { partnerId } = useParams();

  const {
    isPending,
    data: partner,
    error,
  } = useQuery({
    queryKey: partnersKeys.detail(partnerId),
    queryFn: () => getPartner(partnerId),
    retry: false,
  });

  return { isPending, error, partner };
}
