import { createContext, useContext, useEffect, useRef, useState } from "react";

import ButtonGroup from "./ButtonGroup";

import styled, { css } from "styled-components";

const sizes = {
  small: css`
    font-size: 1rem;
    padding: 0.3rem 0.6rem;
  `,
  medium: css`
    font-size: 1.2rem;
    padding: 0.4rem 0.8rem;
  `,
  large: css`
    font-size: 1.4rem;
    padding: 0.6rem 1rem;
  `,
};

const RadioInput = styled.input.attrs({ type: "radio" })`
  opacity: 0;
  width: 0;
  height: 0;
`;

const LabelButton = styled.label`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  border: none;
  border-radius: var(--border-radius-sm);
  box-shadow: var(--shadow-sm);
  text-transform: uppercase;
  font-weight: 600;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s;
  position: relative;

  color: var(--color-${(props) => props.color}-100);
  background-color: var(--color-${(props) => props.color}-700);

  ${(props) =>
    !props.$isDisabled &&
    css`
      &:hover {
        color: var(--color-${(props) => props.color}-700);
        background-color: var(--color-${(props) => props.color}-100);
      }
    `}

  ${(props) =>
    props.color &&
    ["silver", "grey"].includes(props.color) &&
    css`
      border: 0.5px solid var(--color-${props.color}-700);
    `}

  ${(props) => sizes[props.$size || "medium"]}

  ${(props) =>
    props.$isSelected &&
    css`
      &::after {
        content: "✓";
        position: absolute;
        top: -4px;
        right: -4px;
        border-radius: 50%;
        width: 1.6rem;
        height: 1.6rem;
        font-size: 1rem;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
        box-shadow: var(--shadow-sm);
        color: var(--color-brand-50);
        background-color: var(--color-brand-700);
        border: 2px solid var(--color-brand-600);
      }
    `}

  ${(props) =>
    props.$isDisabled &&
    css`
      opacity: 0.5;
      cursor: not-allowed;
    `}
`;

const RadiosContext = createContext();

function Radios({ children, id, required, onChange, defaultValue = "" }) {
  const name = useRef(id);
  const isRequired = useRef(required);
  const [selectedValue, setSelectedValue] = useState(defaultValue);

  useEffect(() => {
    setSelectedValue(defaultValue);
  }, [defaultValue]);

  function select(value) {
    setSelectedValue(value);
    onChange(value);
  }

  return (
    <RadiosContext value={{ selectedValue, select, name, isRequired }}>
      <ButtonGroup id={id} className={required ? "required" : ""}>
        {children}
      </ButtonGroup>
    </RadiosContext>
  );
}

function RadioButton({ value, color, disabled = false, children, ...props }) {
  const { selectedValue, select, name } = useContext(RadiosContext);
  return (
    <LabelButton
      color={color}
      $isSelected={selectedValue === value}
      $isDisabled={disabled}
    >
      <RadioInput
        name={name.current}
        value={value}
        onChange={() => select(value)}
        checked={selectedValue === value}
        disabled={disabled}
        {...props}
      />
      {children}
    </LabelButton>
  );
}

Radios.RadioButton = RadioButton;

export default Radios;
