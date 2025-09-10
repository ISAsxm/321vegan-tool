import { useSearchScoringCategories } from "./useSearchScoringCategories";

import Table from "@/ui/Table";
import Menus from "@/ui/Menus";
import Spinner from "@/ui/Spinner";
import Pagination from "@/ui/Pagination";
import Filters from "@/ui/Filters";
import SortBy from "@/ui/SortBy";
import ScoringCategoryTableRow from "./ScoringCategoryTableRow";

function ScoringCategoryTable() {
  const { isPending, scoringCategories, count } = useSearchScoringCategories();

  if (isPending) return <Spinner />;

  return (
    <Menus>
      <Table columns="0.6fr 1.4fr 1.4fr 1.4fr 1.4fr 3.2rem">
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
                Critères
                <SortBy.Sort sortByField="criteria_name" />
                <Filters.Filter>
                  <Filters.Toggle
                    id="filterCriteriaName"
                    filterField="criteria"
                  />
                  <Filters.Search
                    id="filterCriteriaName"
                    filterField="criteria"
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

              <div></div>
            </Table.Header>
          </SortBy>
        </Filters>

        <Table.Body
          data={scoringCategories}
          render={(category) => (
            <ScoringCategoryTableRow key={category.id} category={category} />
          )}
        />

        <Table.Footer>
          <Pagination count={count} />
        </Table.Footer>
      </Table>
    </Menus>
  );
}

export default ScoringCategoryTable;
