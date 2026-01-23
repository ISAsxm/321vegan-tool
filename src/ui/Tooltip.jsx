import styled from "styled-components";

const TooltipContainer = styled.div`
  position: relative;
  display: inline-block;
  cursor: help;

  &:hover .tooltip,
  &:first-child + .tooltip {
    opacity: 1;
    visibility: visible;
    transform: translateX(-50%) translateY(0);
  }
`;

const StyledTooltip = styled.div`
  position: absolute;
  bottom: calc(100% + 15px);
  left: 50%;
  transform: translateX(-50%) translateY(10px);
  padding: 0.8rem 1.3rem;
  white-space: nowrap;
  background-color: var(--color-grey-300);
  border-radius: 10px;
  box-shadow: var(--shadow-sm);
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease;
  border: 1px solid var(--color-grey-0);

  &::after {
    content: "";
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    border-width: 8px;
    border-style: solid;
    border-color: var(--color-grey-300) transparent transparent transparent;
  }
`;

function Tooltip({ children, content, id }) {
  return (
    <TooltipContainer>
      {children}
      <StyledTooltip role="tooltip" className="tooltip" id={id}>
        {content}
      </StyledTooltip>
    </TooltipContainer>
  );
}

export default Tooltip;
