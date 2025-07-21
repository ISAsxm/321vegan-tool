import styled, { css } from "styled-components";

const variations = {
  end: css`
    justify-content: flex-end;
  `,
  start: css`
    justify-content: flex-start;
  `,
  center: css`
    justify-content: center;
  `,
  normal: css`
    justify-content: normal;
  `,
};

const ButtonGroup = styled.div`
  display: flex;
  gap: 1.2rem;
  ${(props) => variations[props.$variation || "normal"]}
`;

export default ButtonGroup;
