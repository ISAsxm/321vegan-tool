import { useQuery } from "@tanstack/react-query";

import { getSearchProducts } from "@/services/apiProducts";

import { productsKeys } from "@/features/products/queryKeyFactory";

export function useProductCounts() {
  // Query for CREATED products count
  const {
    isPending: isPendingCreated,
    data: { count: createdCount } = {},
    error: createdError,
  } = useQuery({
    queryKey: productsKeys.list(
      [{ field: "state", value: "CREATED" }],
      "created_at-desc",
      1,
      1
    ),
    queryFn: () =>
      getSearchProducts({
        filters: [{ field: "state", value: "CREATED" }],
        sortBy: "created_at-desc",
        page: 1,
        size: 1,
      }),
  });

  // Query for NOT_FOUND products count
  const {
    isPending: isPendingNotFound,
    data: { count: notFoundCount } = {},
    error: notFoundError,
  } = useQuery({
    queryKey: productsKeys.list(
      [{ field: "status", value: "NOT_FOUND" }],
      "created_at-desc",
      1,
      1
    ),
    queryFn: () =>
      getSearchProducts({
        filters: [{ field: "status", value: "NOT_FOUND" }],
        sortBy: "created_at-desc",
        page: 1,
        size: 1,
      }),
  });

  // Query for WAITING_BRAND_REPLY products count
  const {
    isPending: isPendingWaitingContact,
    data: { count: waitingContactCount } = {},
    error: waitingContactError,
  } = useQuery({
    queryKey: productsKeys.list(
      [{ field: "state", value: "WAITING_BRAND_REPLY" }],
      "created_at-desc",
      1,
      1
    ),
    queryFn: () =>
      getSearchProducts({
        filters: [{ field: "state", value: "WAITING_BRAND_REPLY" }],
        sortBy: "created_at-desc",
        page: 1,
        size: 1,
      }),
  });

  // Query for NEED_CONTACT products count
  const {
    isPending: isPendingNeedContact,
    data: { count: needContactCount } = {},
    error: needContactError,
  } = useQuery({
    queryKey: productsKeys.list(
      [{ field: "state", value: "NEED_CONTACT" }],
      "created_at-desc",
      1,
      1
    ),
    queryFn: () =>
      getSearchProducts({
        filters: [{ field: "state", value: "NEED_CONTACT" }],
        sortBy: "created_at-desc",
        page: 1,
        size: 1,
      }),
  });

  // Query for WAITING_PUBLISH products count
  const {
    isPending: isPendingWaitingPublish,
    data: { count: waitingPublishCount } = {},
    error: waitingPublishError,
  } = useQuery({
    queryKey: productsKeys.list(
      [{ field: "state", value: "WAITING_PUBLISH" }],
      "created_at-desc",
      1,
      1
    ),
    queryFn: () =>
      getSearchProducts({
        filters: [{ field: "state", value: "WAITING_PUBLISH" }],
        sortBy: "created_at-desc",
        page: 1,
        size: 1,
      }),
  });

  // Query for PUBLISHED products count
  const {
    isPending: isPendingPublished,
    data: { count: publishedCount } = {},
    error: publishedError,
  } = useQuery({
    queryKey: productsKeys.list(
      [{ field: "state", value: "PUBLISHED" }],
      "created_at-desc",
      1,
      1
    ),
    queryFn: () =>
      getSearchProducts({
        filters: [{ field: "state", value: "PUBLISHED" }],
        sortBy: "created_at-desc",
        page: 1,
        size: 1,
      }),
  });

  // Query for VEGAN products count
  const {
    isPending: isPendingVegan,
    data: { count: veganCount } = {},
    error: veganError,
  } = useQuery({
    queryKey: productsKeys.list(
      [{ field: "status", value: "VEGAN" }],
      "created_at-desc",
      1,
      1
    ),
    queryFn: () =>
      getSearchProducts({
        filters: [{ field: "status", value: "VEGAN" }],
        sortBy: "created_at-desc",
        page: 1,
        size: 1,
      }),
  });

  // Query for NON_VEGAN products count
  const {
    isPending: isPendingNonVegan,
    data: { count: nonVeganCount } = {},
    error: nonVeganError,
  } = useQuery({
    queryKey: productsKeys.list(
      [{ field: "status", value: "NON_VEGAN" }],
      "created_at-desc",
      1,
      1
    ),
    queryFn: () =>
      getSearchProducts({
        filters: [{ field: "status", value: "NON_VEGAN" }],
        sortBy: "created_at-desc",
        page: 1,
        size: 1,
      }),
  });

  // Query for MAYBE_VEGAN products count
  const {
    isPending: isPendingMaybeVegan,
    data: { count: maybeVeganCount } = {},
    error: maybeVeganError,
  } = useQuery({
    queryKey: productsKeys.list(
      [{ field: "status", value: "MAYBE_VEGAN" }],
      "created_at-desc",
      1,
      1
    ),
    queryFn: () =>
      getSearchProducts({
        filters: [{ field: "status", value: "MAYBE_VEGAN" }],
        sortBy: "created_at-desc",
        page: 1,
        size: 1,
      }),
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
