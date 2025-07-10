import styled from "styled-components";

const HeaderDetail = styled.header`
  padding: 2rem 4rem;
  font-size: 1.8rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: var(--color-${(props) => props.type}-700);
  background-color: var(--color-${(props) => props.type}-100);

  svg {
    height: 3.2rem;
    width: 3.2rem;
  }

  & div:first-child {
    display: flex;
    align-items: center;
    gap: 1.6rem;
    font-weight: 600;
    font-size: 1.8rem;
  }

  & span {
    font-size: 2rem;
    margin-left: 4px;
  }
`;

export default HeaderDetail;
