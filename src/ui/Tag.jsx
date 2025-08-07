import styled, { css } from "styled-components";

const Tag = styled.span`
  width: fit-content;
  text-transform: uppercase;
  text-align: center;
  text-wrap: nowrap;
  font-size: 1.1rem;
  font-weight: 600;
  padding: 0.4rem 1.2rem;
  border-radius: 100px;

  color: var(--color-${(props) => props.type}-700);
  background-color: var(--color-${(props) => props.type}-100);
  border: 0.5px solid var(--color-${(props) => props.type}-700);

  ${(props) =>
    props.onClick &&
    css`
      cursor: pointer;
    `}
`;

export default Tag;
