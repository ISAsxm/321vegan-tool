import styled from "styled-components";
import { USER_AVATARS } from "@/utils/constants";
import { useLeaderboard } from "./useLeaderboard";
import Table from "@/ui/Table";
import Spinner from "@/ui/Spinner";

const Rank = styled.div`
  font-size: 1.6rem;
  font-weight: 700;
  color: var(--color-grey-500);
  width: 3rem;
`;

const UserBox = styled.div`
  display: grid;
  grid-template-columns: 3.6rem 1fr;
  align-items: center;
  gap: 0.8rem;
`;

const UserAvatar = styled.img`
  display: block;
  width: 3.6rem;
  aspect-ratio: 1;
  object-fit: cover;
  object-position: center;
  border-radius: var(--border-radius-sm);
  outline: 2px solid var(--color-grey-100);
  background-color: var(--color-brand-100);
`;

const Count = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-brand-600);
  text-align: right;
`;

const Title = styled.h2`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-700);
  margin-bottom: 1.2rem;
`;

function LeaderboardTable({ sortby, title, countLabel }) {
  const { isPending, users } = useLeaderboard(sortby);

  if (isPending) return <Spinner />;

  return (
    <div>
      <Title>{title}</Title>
      <Table columns="3rem 1fr 8rem">
        <Table.Header>
          <div>Rang</div>
          <div>Pseudo</div>
          <div style={{ textAlign: "right" }}>{countLabel}</div>
        </Table.Header>
        <Table.Body
          data={users}
          render={(user, index) => (
            <Table.Row key={user.id}>
              <Rank>{index + 1}</Rank>
              <UserBox>
                <UserAvatar
                  src={`/${user.avatar || USER_AVATARS.default}`}
                  alt=""
                />
                <span>{user.nickname}</span>
              </UserBox>
              <Count>
                {sortby === "nb_checkings"
                  ? user.nb_checkings
                  : user.nb_products_modified}
              </Count>
            </Table.Row>
          )}
        />
      </Table>
    </div>
  );
}

export default LeaderboardTable;
