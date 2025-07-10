import styled, { css } from "styled-components";

const StyledDataItem = styled.div`
  display: flex;
  gap: 1.6rem;
  padding: 0.8rem 0;

  ${(props) =>
    props.type === "horizontal" &&
    css`
      align-items: flex-start;
    `}

  ${(props) =>
    props.type === "vertical" &&
    css`
      flex-direction: column;
    `}
`;

const Label = styled.span`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  font-weight: 500;

  & svg {
    width: 2rem;
    height: 2rem;
    color: var(--color-brand-600);
  }
`;

function DataItem({ icon, label, type = "vertical", children }) {
  return (
    <StyledDataItem type={type}>
      <Label>
        {icon}
        <span>{label}</span>
      </Label>
      {children}
    </StyledDataItem>
  );
}

export default DataItem;
