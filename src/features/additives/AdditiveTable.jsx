import { ADDITIVES_STATUSES } from "@/utils/constants";

import { useSearchAdditives } from "./useSearchAdditives";

import Table from "@/ui/Table";
import Menus from "@/ui/Menus";
import Spinner from "@/ui/Spinner";
import Pagination from "@/ui/Pagination";
import Filters from "@/ui/Filters";
import SortBy from "@/ui/SortBy";

import AdditiveTableRow from "./AdditiveTableRow";

function AdditiveTable() {
  const { isPending, additives, count } = useSearchAdditives();

  if (isPending) return <Spinner />;

  return (
    <Menus>
      <Table columns="0.6fr 1fr 1.4fr 1.4fr 1.4fr 1fr 3.2rem">
        <Filters>
          <SortBy>
            <Table.Header>
              <div>Id</div>

              <div>
                E code
                <SortBy.Sort sortByField="e_number" />
                <Filters.Filter>
                  <Filters.Toggle id="filterENumber" filterField="e_number" />
                  <Filters.Search id="filterENumber" filterField="e_number" />
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

              <div>
                Date de création
                <SortBy.Sort sortByField="created_at" />
              </div>

              <div>
                Mise à jour
                <SortBy.Sort sortByField="updated_at" />
              </div>

              <div>
                Statut{" "}
                <Filters.Filter>
                  <Filters.Toggle id="filterStatus" filterField="status" />
                  <Filters.List
                    id="filterStatus"
                    filterField="status"
                    options={[
                      { value: "all", label: "Tous" },
                      ...Object.entries(ADDITIVES_STATUSES).map(([key, o]) => {
                        return { value: key, label: o.label };
                      }),
                    ]}
                  />
                </Filters.Filter>
              </div>

              <div></div>
            </Table.Header>
          </SortBy>
        </Filters>

        <Table.Body
          data={additives}
          render={(additive) => (
            <AdditiveTableRow key={additive.id} additive={additive} />
          )}
        />

        <Table.Footer>
          <Pagination count={count} />
        </Table.Footer>
      </Table>
    </Menus>
  );
}

export default AdditiveTable;
