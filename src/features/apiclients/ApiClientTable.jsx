import { useSearchApiClients } from "./useSearchApiClients";

import Table from "@/ui/Table";
import Menus from "@/ui/Menus";
import Spinner from "@/ui/Spinner";
import Pagination from "@/ui/Pagination";
import Filters from "@/ui/Filters";
import SortBy from "@/ui/SortBy";
import ApiClientTableRow from "./ApiClientTableRow";

function ApiClientTable() {
  const { isPending, clients, count } = useSearchApiClients();

  if (isPending) return <Spinner />;

  return (
    <Menus>
      <Table columns="0.6fr 1.4fr 3fr 1.4fr 1.4fr 1.4fr 3.2rem">
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
                Clé
                <Filters.Filter>
                  <Filters.Toggle id="filterKey" filterField="api_key" />
                  <Filters.Search id="filterKey" filterField="api_key" />
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
                  <Filters.Toggle id="filterStatus" filterField="is_active" />
                  <Filters.List
                    id="filterStatus"
                    filterField="is_active"
                    options={[
                      { value: "all", label: "Tous" },
                      { value: "1", label: "Activés" },
                      { value: "0", label: "Désactivés" },
                    ]}
                  />
                </Filters.Filter>
              </div>

              <div></div>
            </Table.Header>
          </SortBy>
        </Filters>

        <Table.Body
          data={clients}
          render={(client) => (
            <ApiClientTableRow key={client.id} client={client} />
          )}
        />

        <Table.Footer>
          <Pagination count={count} />
        </Table.Footer>
      </Table>
    </Menus>
  );
}

export default ApiClientTable;
