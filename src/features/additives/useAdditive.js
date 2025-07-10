import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { additivesKeys } from "./queryKeyFactory";

import { getAdditive } from "@/services/apiAdditives";

export function useAdditive() {
  const { additiveId } = useParams();

  const {
    isLoading,
    data: additive,
    error,
  } = useQuery({
    queryKey: additivesKeys.detail(additiveId),
    queryFn: () => getAdditive(additiveId),
    retry: false,
  });

  return { isLoading, error, additive };
}
