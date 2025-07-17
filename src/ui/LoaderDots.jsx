import styled, { keyframes } from "styled-components";

const fade = keyframes`
  from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
`;

const StyledLoaderDots = styled.div`
  width: 3.5rem;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  gap: 0.4rem;

  & div {
    width: 0.8rem;
    height: 0.8rem;
    border-radius: 50%;
    background-color: var(--color-brand-700);
    animation: ${fade} 0.8s ease-in-out alternate infinite;
  }

  & div:nth-of-type(1) {
    animation-delay: -0.4s;
  }

  & div:nth-of-type(2) {
    animation-delay: -0.2s;
  }
`;

function LoaderDots() {
  return (
    <StyledLoaderDots>
      <div></div>
      <div></div>
      <div></div>
    </StyledLoaderDots>
  );
}

export default LoaderDots;
