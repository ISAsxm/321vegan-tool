import { useSearchBrands } from "./useSearchBrands";

import Table from "@/ui/Table";
import Menus from "@/ui/Menus";
import Spinner from "@/ui/Spinner";
import Pagination from "@/ui/Pagination";
import Filters from "@/ui/Filters";
import SortBy from "@/ui/SortBy";
import BrandTableRow from "./BrandTableRow";

function BrandTable() {
  const { isPending, brands, count } = useSearchBrands();

  if (isPending) return <Spinner />;

  return (
    <Menus>
      <Table columns="0.6fr 1fr 1.4fr 1.4fr 1.4fr 1.4fr 3.2rem">
        <Filters>
          <SortBy>
            <Table.Header>
              <div>Id</div>

              <div>Logo</div>

              <div>
                Nom
                <SortBy.Sort sortByField="name" />
                <Filters.Filter>
                  <Filters.Toggle id="filterName" filterField="name" />
                  <Filters.Search id="filterName" filterField="name" />
                </Filters.Filter>
              </div>

              <div>
                Maison mère
                <SortBy.Sort sortByField="parent_name" />
                <Filters.Filter>
                  <Filters.Toggle id="filterParentName" filterField="parent" />
                  <Filters.Search id="filterParentName" filterField="parent" />
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

              <div></div>
            </Table.Header>
          </SortBy>
        </Filters>

        <Table.Body
          data={brands}
          render={(brand) => <BrandTableRow key={brand.id} brand={brand} />}
        />

        <Table.Footer>
          <Pagination count={count} />
        </Table.Footer>
      </Table>
    </Menus>
  );
}

export default BrandTable;
