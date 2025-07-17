import { useQuery } from "@tanstack/react-query";

import { countProducts } from "@/services/apiProducts";

import { productsKeys } from "@/features/products/queryKeyFactory";

export function useProductCounts() {
  // Query for CREATED products count
  const {
    isPending: isPendingCreated,
    data: { count: createdCount } = {},
    error: createdError,
  } = useQuery({
    queryKey: productsKeys.count([{ field: "state", value: "CREATED" }]),
    queryFn: () => countProducts([{ field: "state", value: "CREATED" }]),
  });

  // Query for WAITING_BRAND_REPLY products count
  const {
    isPending: isPendingWaitingContact,
    data: { count: waitingContactCount } = {},
    error: waitingContactError,
  } = useQuery({
    queryKey: productsKeys.count([
      { field: "state", value: "WAITING_BRAND_REPLY" },
    ]),
    queryFn: () =>
      countProducts([{ field: "state", value: "WAITING_BRAND_REPLY" }]),
  });

  // Query for NEED_CONTACT products count
  const {
    isPending: isPendingNeedContact,
    data: { count: needContactCount } = {},
    error: needContactError,
  } = useQuery({
    queryKey: productsKeys.count([{ field: "state", value: "NEED_CONTACT" }]),
    queryFn: () => countProducts([{ field: "state", value: "NEED_CONTACT" }]),
  });

  // Query for WAITING_PUBLISH products count
  const {
    isPending: isPendingWaitingPublish,
    data: { count: waitingPublishCount } = {},
    error: waitingPublishError,
  } = useQuery({
    queryKey: productsKeys.count([
      { field: "state", value: "WAITING_PUBLISH" },
    ]),
    queryFn: () =>
      countProducts([{ field: "state", value: "WAITING_PUBLISH" }]),
  });

  // Query for PUBLISHED products count
  const {
    isPending: isPendingPublished,
    data: { count: publishedCount } = {},
    error: publishedError,
  } = useQuery({
    queryKey: productsKeys.count([{ field: "state", value: "PUBLISHED" }]),
    queryFn: () => countProducts([{ field: "state", value: "PUBLISHED" }]),
  });

  // Query for VEGAN products count
  const {
    isPending: isPendingVegan,
    data: { count: veganCount } = {},
    error: veganError,
  } = useQuery({
    queryKey: productsKeys.count([{ field: "status", value: "VEGAN" }]),
    queryFn: () => countProducts([{ field: "status", value: "VEGAN" }]),
  });

  // Query for NON_VEGAN products count
  const {
    isPending: isPendingNonVegan,
    data: { count: nonVeganCount } = {},
    error: nonVeganError,
  } = useQuery({
    queryKey: productsKeys.count([{ field: "status", value: "NON_VEGAN" }]),
    queryFn: () => countProducts([{ field: "status", value: "NON_VEGAN" }]),
  });

  // Query for MAYBE_VEGAN products count
  const {
    isPending: isPendingMaybeVegan,
    data: { count: maybeVeganCount } = {},
    error: maybeVeganError,
  } = useQuery({
    queryKey: productsKeys.count([{ field: "status", value: "MAYBE_VEGAN" }]),
    queryFn: () => countProducts([{ field: "status", value: "MAYBE_VEGAN" }]),
  });

  // Query for NOT_FOUND products count
  const {
    isPending: isPendingNotFound,
    data: { count: notFoundCount } = {},
    error: notFoundError,
  } = useQuery({
    queryKey: productsKeys.count([{ field: "status", value: "NOT_FOUND" }]),
    queryFn: () => countProducts([{ field: "status", value: "NOT_FOUND" }]),
  });

  const isPending =
    isPendingCreated ||
    isPendingNotFound ||
    isPendingWaitingContact ||
    isPendingNeedContact ||
    isPendingWaitingPublish ||
    isPendingPublished ||
    isPendingVegan ||
    isPendingNonVegan ||
    isPendingMaybeVegan;

  const error =
    createdError ||
    notFoundError ||
    waitingContactError ||
    needContactError ||
    waitingPublishError ||
    publishedError ||
    veganError ||
    nonVeganError ||
    maybeVeganError;

  return {
    isPending,
    error,
    createdCount: createdCount || 0,
    notFoundCount: notFoundCount || 0,
    waitingContactCount: waitingContactCount || 0,
    needContactCount: needContactCount || 0,
    waitingPublishCount: waitingPublishCount || 0,
    publishedCount: publishedCount || 0,
    veganCount: veganCount || 0,
    nonVeganCount: nonVeganCount || 0,
    maybeVeganCount: maybeVeganCount || 0,
  };
}
