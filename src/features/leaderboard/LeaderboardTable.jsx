import styled from "styled-components";
import { useLeaderboard } from "./useLeaderboard";
import Table from "@/ui/Table";
import Spinner from "@/ui/Spinner";
import Heading from "@/ui/Heading";
import { Avatar, StyledUserAvatar } from "@/features/authentication/UserAvatar";
import { USER_AVATARS } from "@/utils/constants";

const RANK_COLORS = ["#FFD700", "#C0C0C0", "#CD7F32"];

const Rank = styled.div`
  font-size: 1.6rem;
  font-weight: 700;
  color: ${({ $index }) => RANK_COLORS[$index] ?? "var(--color-grey-500)"};
  width: 3rem;
`;

const Count = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-brand-600);
  text-align: right;
`;

function LeaderboardTable({ sortby, title, countLabel }) {
  const { isPending, users } = useLeaderboard(sortby);

  if (isPending) return <Spinner />;

  return (
    <div>
      <Heading as="h3">{title}</Heading>
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
              <Rank $index={index}>{index + 1}</Rank>
              <StyledUserAvatar>
                <Avatar src={`/${user.avatar || USER_AVATARS.default}`} alt="" />
                <span>{user.nickname}</span>
              </StyledUserAvatar>
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
