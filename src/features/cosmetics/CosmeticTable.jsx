import { useSearchCosmetics } from "./useSearchCosmetics";

import Table from "@/ui/Table";
import Menus from "@/ui/Menus";
import Spinner from "@/ui/Spinner";
import Pagination from "@/ui/Pagination";
import Filters from "@/ui/Filters";
import SortBy from "@/ui/SortBy";
import CosmeticTableRow from "./CosmeticTableRow";

function CosmeticTable() {
  const { isLoading, cosmetics, count } = useSearchCosmetics();

  if (isLoading) return <Spinner />;

  return (
    <Menus>
      <Table columns="0.6fr 1.4fr 1.4fr 1.4fr 1fr 1fr 3.2rem">
        <Filters>
          <SortBy>
            <Table.Header>
              <div>Id</div>

              <div>
                Nom
                <SortBy.Sort sortByField="name" />
                <Filters.Filter>
                  <Filters.Toggle id="filterName" filterField="name" />
                  <Filters.Search id="filterName" filterField="name" />
                </Filters.Filter>
              </div>

              <div>
                Date de création
                <SortBy.Sort sortByField="created_at" />
              </div>

              <div>
                Mise à jour
                <SortBy.Sort sortByField="updated_at" />
              </div>

              <div>
                Végane{" "}
                <Filters.Filter>
                  <Filters.Toggle id="filterVegan" filterField="is_vegan" />
                  <Filters.List
                    id="filterVegan"
                    filterField="is_vegan"
                    options={[
                      { value: "all", label: "Tous" },
                      { value: "1", label: "Oui" },
                      { value: "0", label: "Non" },
                    ]}
                  />
                </Filters.Filter>
              </div>

              <div>
                Cruelty free{" "}
                <Filters.Filter>
                  <Filters.Toggle id="filterCf" filterField="is_cf" />
                  <Filters.List
                    id="filterCf"
                    filterField="is_cf"
                    options={[
                      { value: "all", label: "Tous" },
                      { value: "1", label: "Oui" },
                      { value: "0", label: "Non" },
                    ]}
                  />
                </Filters.Filter>
              </div>

              <div></div>
            </Table.Header>
          </SortBy>
        </Filters>

        <Table.Body
          data={cosmetics}
          render={(cosmetic) => (
            <CosmeticTableRow key={cosmetic.id} cosmetic={cosmetic} />
          )}
        />

        <Table.Footer>
          <Pagination count={count} />
        </Table.Footer>
      </Table>
    </Menus>
  );
}

export default CosmeticTable;
