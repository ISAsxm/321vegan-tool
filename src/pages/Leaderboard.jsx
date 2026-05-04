import styled from "styled-components";
import Row from "@/ui/Row";
import Heading from "@/ui/Heading";
import LeaderboardTable from "@/features/leaderboard/LeaderboardTable";
import { HiOutlineTrophy } from "react-icons/hi2";

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3.2rem;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

function Leaderboard() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">
          <HiOutlineTrophy />Classement
        </Heading>
      </Row>

      <Grid>
        <LeaderboardTable
          sortby="nb_products_modified"
          title="Produits traités"
          countLabel="Produits"
        />
        <LeaderboardTable
          sortby="nb_checkings"
          title="Contacts effectués"
          countLabel="Contacts"
        />
      </Grid>
    </>
  );
}

export default Leaderboard;
