import styled, { css } from "styled-components";

const Tag = styled.span`
  width: fit-content;
  text-transform: uppercase;
  font-size: 1.1rem;
  font-weight: 600;
  padding: 0.4rem 1.2rem;
  border-radius: 100px;

  color: var(--color-${(props) => props.type}-700);
  background-color: var(--color-${(props) => props.type}-100);

  ${(props) =>
    props.type &&
    ["silver", "grey"].includes(props.type) &&
    css`
      border: 0.5px solid var(--color-${props.type}-700);
    `}
`;

export default Tag;
