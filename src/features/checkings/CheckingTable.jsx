import Table from "@/ui/Table";
import Menus from "@/ui/Menus";
import CheckingTableRow from "./CheckingTableRow";

function CheckingTable({ checkings, product }) {
  return (
    <Menus>
      <Table columns="1.4fr 1.4fr 1.4fr 2fr 1.4fr 3.2rem">
        <Table.Header>
          <div>Contacté le</div>

          <div>Contacté par</div>

          <div>Répondu le</div>

          <div>Problèmes</div>

          <div>Réponse</div>

          <div></div>
        </Table.Header>

        <Table.Body
          data={checkings}
          render={(checking) => (
            <CheckingTableRow
              key={checking.id}
              checking={checking}
              product={product}
            />
          )}
        />
      </Table>
    </Menus>
  );
}

export default CheckingTable;
