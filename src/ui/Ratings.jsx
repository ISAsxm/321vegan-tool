import { createContext, useContext, useEffect, useRef, useState } from "react";
import { HiOutlineStar, HiStar } from "react-icons/hi2";

import styled, { css } from "styled-components";

const RatingsGroup = styled.div`
  display: flex;
  align-items: center;
  justify-content: end;
  gap: 0.5rem;
`;

const RatingInput = styled.input.attrs({ type: "radio" })`
  margin-inline-start: -1.25rem;
  width: 0;
  height: 0;
  background-color: transparent;
  color: transparent;
  border: none;
  cursor: pointer;
  appearance: none;
  &:checked,
  &:focus {
    background-image: none;
    outline: 2px solid transparent;
    outline-offset: -1px;
  }
`;

const RatingLabel = styled.label`
  cursor: pointer;
  transition: all 0.2s;
  color: var(--color-${(props) => props.color}-700);
  ${(props) =>
    !props.$isDisabled &&
    css`
      &:hover {
        color: var(--color-${(props) => props.color}-800);
      }
    `}
  ${(props) =>
    props.$isDisabled &&
    css`
      cursor: default;
    `}
`;

const RatingContext = createContext();

function Ratings({
  id,
  required,
  onChange,
  name,
  ref,
  defaultValue = 0,
  children,
}) {
  const isRequired = useRef(required);
  const [selectedValue, setSelectedValue] = useState(defaultValue);

  useEffect(() => {
    setSelectedValue(defaultValue);
  }, [defaultValue]);

  function select(e, value) {
    setSelectedValue(value);
    onChange?.(e);
  }

  return (
    <RatingContext value={{ selectedValue, select, name, ref, isRequired }}>
      <RatingsGroup id={id} className={required ? "required" : ""}>
        {children}
      </RatingsGroup>
    </RatingContext>
  );
}

function Rating({
  value,
  disabled = false,
  color = "brand",
  children,
  ...props
}) {
  const { selectedValue, select, name, ref } = useContext(RatingContext);

  const isChecked = selectedValue >= 0 && selectedValue >= value;
  return (
    <RatingLabel color={color} $isDisabled={disabled ? true : false}>
      {isChecked ? <HiStar /> : <HiOutlineStar />}
      <RatingInput
        ref={ref}
        name={name}
        value={value}
        onChange={(e) => select(e, value)}
        checked={selectedValue === value}
        disabled={disabled}
        {...props}
      />
      {children}
    </RatingLabel>
  );
}

Ratings.Rating = Rating;

export default Ratings;
