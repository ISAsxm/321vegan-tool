import styled from "styled-components";

const StyledNoDataItem = styled.em`
  color: var(--color-grey-500);
`;

function NoDataItem({ children }) {
  return <StyledNoDataItem>{children}</StyledNoDataItem>;
}

export default NoDataItem;
