import { BiLoaderAlt } from "react-icons/bi";

import styled, { keyframes, css } from "styled-components";

const sizes = {
  xs: css`
    width: 1.4rem;
    height: 1.4rem;
  `,
  s: css`
    width: 2.4rem;
    height: 2.4rem;
  `,
};

const rotate = keyframes`
  to {
    transform: rotate(1turn)
  }
`;

const SpinnerMini = styled(BiLoaderAlt)`
  ${(props) => sizes[props.size || "s"]}
  animation: ${rotate} 1.5s infinite linear;
`;

export default SpinnerMini;
