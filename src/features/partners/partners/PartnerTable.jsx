import { useSearchPartners } from "./useSearchPartners";

import Table from "@/ui/Table";
import Menus from "@/ui/Menus";
import Spinner from "@/ui/Spinner";
import Pagination from "@/ui/Pagination";
import Filters from "@/ui/Filters";
import SortBy from "@/ui/SortBy";
import PartnerTableRow from "./PartnerTableRow";

function PartnerTable() {
  const { isPending, partners, count } = useSearchPartners();

  if (isPending) return <Spinner />;

  return (
    <Menus>
      <Table columns="0.8fr 1.6fr 1.4fr 1.4fr 1.4fr 1.4fr 0.8fr 3.2rem">
        <Filters>
          <SortBy>
            <Table.Header>
              <div>Logo</div>

              <div>
                Raison sociale
                <SortBy.Sort sortByField="name" />
                <Filters.Filter>
                  <Filters.Toggle id="filterName" filterField="name" />
                  <Filters.Search id="filterName" filterField="name" />
                </Filters.Filter>
              </div>

              <div>
                Catégorie
                <SortBy.Sort sortByField="category_name" />
                <Filters.Filter>
                  <Filters.Toggle
                    id="filterParentName"
                    filterField="category"
                  />
                  <Filters.Search
                    id="filterParentName"
                    filterField="category"
                  />
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

              <div>Code Promo</div>

              <div>
                Actif{" "}
                <Filters.Filter>
                  <Filters.Toggle id="filterActive" filterField="is_active" />
                  <Filters.List
                    id="filterActive"
                    filterField="is_active"
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
          data={partners}
          render={(partner) => (
            <PartnerTableRow key={partner.id} partner={partner} />
          )}
        />

        <Table.Footer>
          <Pagination count={count} />
        </Table.Footer>
      </Table>
    </Menus>
  );
}

export default PartnerTable;
