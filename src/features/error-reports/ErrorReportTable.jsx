import { useSearchErrorReports } from "./useSearchErrorReports";

import Table from "@/ui/Table";
import Spinner from "@/ui/Spinner";
import Pagination from "@/ui/Pagination";
import Filters from "@/ui/Filters";
import SortBy from "@/ui/SortBy";
import ErrorReportTableRow from "./ErrorReportTableRow";

function ErrorReportTable() {
  const { isPending, errorReports, count } = useSearchErrorReports();

  if (isPending) return <Spinner />;

  return (
    <Table columns="1.4fr 2fr 1.4fr 1.4fr 1.4fr 1.4fr">
        <Filters>
          <SortBy>
            <Table.Header>
              <div>
                EAN
                <Filters.Filter>
                  <Filters.Toggle id="filterEan" filterField="ean" />
                  <Filters.Search id="filterEan" filterField="ean" />
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
                Contact
                <Filters.Filter>
                  <Filters.Toggle id="filterContact" filterField="contact" />
                  <Filters.Search id="filterContact" filterField="contact" />
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
                Status{" "}
                <Filters.Filter>
                  <Filters.Toggle id="filterHandled" filterField="handled" />
                  <Filters.List
                    id="filterHandled"
                    filterField="handled"
                    options={[
                      { value: "all", label: "Tous" },
                      { value: "true", label: "Traité" },
                      { value: "false", label: "Non traité" },
                    ]}
                  />
                </Filters.Filter>
              </div>

            </Table.Header>
          </SortBy>
        </Filters>

        <Table.Body
          data={errorReports}
          render={(errorReport) => (
            <ErrorReportTableRow key={errorReport.id} errorReport={errorReport} />
          )}
        />

        <Table.Footer>
          <Pagination count={count} />
        </Table.Footer>
      </Table>
  );
}

export default ErrorReportTable;
