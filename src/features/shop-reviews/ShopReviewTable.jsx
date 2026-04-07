import { useSearchShopReviews } from "./useSearchShopReviews";
import { SHOP_REVIEWS_STATUSES } from "@/utils/constants";

import Table from "@/ui/Table";
import Menus from "@/ui/Menus";
import Spinner from "@/ui/Spinner";
import Pagination from "@/ui/Pagination";
import Filters from "@/ui/Filters";
import SortBy from "@/ui/SortBy";
import ShopReviewTableRow from "./ShopReviewTableRow";

function ShopReviewTable() {
  const { isPending, shopReviews, count } = useSearchShopReviews();

  if (isPending) return <Spinner />;

  return (
    <Menus>
      <Table columns="1.4fr 2fr 1.4fr 1.8fr 1.4fr 1.4fr 3.2rem">
        <Filters>
          <SortBy>
            <Table.Header>
              <div>
                Note
                <SortBy.Sort sortByField="rating" />
                <Filters.Filter>
                  <Filters.Toggle id="filterRating" filterField="rating" />
                  <Filters.List
                    id="filterRating"
                    filterField="rating"
                    options={[
                      { value: "all", label: "Tous" },
                      ...Array.from({ length: 5 }, (_, i) => i).map((i) => {
                        return { value: i + 1, label: i + 1 };
                      }),
                    ]}
                  />
                </Filters.Filter>
              </div>

              <div>
                Commentaire
                <Filters.Filter>
                  <Filters.Toggle id="filterComment" filterField="comment" />
                  <Filters.Search id="filterComment" filterField="comment" />
                </Filters.Filter>
              </div>

              <div>
                Shop
                <Filters.Filter>
                  <Filters.Toggle id="filterShop" filterField="shop" />
                  <Filters.Search id="filterShop" filterField="shop" />
                </Filters.Filter>
              </div>

              <div>
                Utilisateurice
                <Filters.Filter>
                  <Filters.Toggle id="filterUser" filterField="user" />
                  <Filters.Search id="filterUser" filterField="user" />
                </Filters.Filter>
              </div>

              <div>
                Date de création
                <SortBy.Sort sortByField="created_at" />
              </div>

              <div>
                Status{" "}
                <Filters.Filter>
                  <Filters.Toggle id="filterStatus" filterField="status" />
                  <Filters.List
                    id="filterStatus"
                    filterField="status"
                    options={[
                      { value: "all", label: "Tous" },
                      ...Object.entries(SHOP_REVIEWS_STATUSES).map(
                        ([key, o]) => {
                          return { value: key, label: o.label };
                        },
                      ),
                    ]}
                  />
                </Filters.Filter>
              </div>

              <div></div>
            </Table.Header>
          </SortBy>
        </Filters>

        <Table.Body
          data={shopReviews}
          render={(shopReview) => (
            <ShopReviewTableRow key={shopReview.id} shopReview={shopReview} />
          )}
        />

        <Table.Footer>
          <Pagination count={count} />
        </Table.Footer>
      </Table>
    </Menus>
  );
}

export default ShopReviewTable;
