import { useSearchInterestingProducts } from "./useSearchInterestingProducts";
import { INTERESTING_PRODUCT_TYPES } from "@/utils/constants";

import Table from "@/ui/Table";
import Menus from "@/ui/Menus";
import Spinner from "@/ui/Spinner";
import Pagination from "@/ui/Pagination";
import Filters from "@/ui/Filters";
import SortBy from "@/ui/SortBy";
import InterestingProductTableRow from "./InterestingProductTableRow";

function InterestingProductTable() {
  const { isPending, interestingProducts, count } =
    useSearchInterestingProducts();

  if (isPending) return <Spinner />;

  return (
    <Menus>
      <Table columns="1.8fr 2fr 1fr 1.2fr 1.4fr 1.4fr 1.4fr 3.2rem">
        <Filters>
          <SortBy>
            <Table.Header>
              <div>
                Ean
                <Filters.Filter>
                  <Filters.Toggle id="filterEan" filterField="ean" />
                  <Filters.Search id="filterEan" filterField="ean" />
                </Filters.Filter>
              </div>

              <div>
                Nom
                <SortBy.Sort sortByField="name" />
                <Filters.Filter>
                  <Filters.Toggle id="filterName" filterField="name" />
                  <Filters.Search id="filterName" filterField="name" />
                </Filters.Filter>
              </div>

              <div>Image</div>

              <div>
                Type{" "}
                <Filters.Filter>
                  <Filters.Toggle id="filterType" filterField="type" />
                  <Filters.List
                    id="filterType"
                    filterField="type"
                    options={[
                      { value: "all", label: "Tous" },
                      ...Object.entries(INTERESTING_PRODUCT_TYPES).map(
                        ([key, o]) => {
                          return { value: key, label: o.label };
                        }
                      ),
                    ]}
                  />
                </Filters.Filter>
              </div>

              <div>
                Catégorie
                <SortBy.Sort sortByField="category_name" />
                <Filters.Filter>
                  <Filters.Toggle id="filterCategory" filterField="category" />
                  <Filters.Search id="filterCategory" filterField="category" />
                </Filters.Filter>
              </div>

              <div>
                Marque
                <SortBy.Sort sortByField="brand_name" />
                <Filters.Filter>
                  <Filters.Toggle id="filterBrand" filterField="brand" />
                  <Filters.Search id="filterBrand" filterField="brand" />
                </Filters.Filter>
              </div>

              <div>
                Date de création
                <SortBy.Sort sortByField="created_at" />
              </div>

              <div></div>
            </Table.Header>
          </SortBy>
        </Filters>

        <Table.Body
          data={interestingProducts}
          render={(interestingProduct) => (
            <InterestingProductTableRow
              key={interestingProduct.id}
              interestingProduct={interestingProduct}
            />
          )}
        />

        <Table.Footer>
          <Pagination count={count} />
        </Table.Footer>
      </Table>
    </Menus>
  );
}

export default InterestingProductTable;
