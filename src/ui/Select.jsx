import { cloneElement, useEffect, useRef, useState } from "react";

import { useClickOutside } from "@/hooks/useClickOutside";

import Modal from "@/ui/Modal";

import {
  HiChevronUp,
  HiChevronDown,
  HiXMark,
  HiOutlinePlusCircle,
} from "react-icons/hi2";
import { GiCheckMark } from "react-icons/gi";

import styled, { css } from "styled-components";

export const SelectContainer = styled.div`
  font-size: 1.4rem;
  font-weight: 500;
  border: 1px solid var(--color-grey-300);
  border-radius: var(--border-radius-sm);
  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-sm);

  cursor: pointer;
  position: relative;

  display: flex;
  /* flex-wrap: wrap; */
  align-items: stretch;
  width: 100%;

  ${(props) =>
    props.$isDisabled &&
    css`
      background-color: var(--color-grey-200);
      color: var(--color-grey-500);
      cursor: not-allowed;
    `}
`;

export const SelectToggle = styled.div`
  user-select: none;
  font-size: 1.4rem;
  font-weight: 500;
  padding: 0.8rem 1.2rem;

  display: grid;
  grid-template-columns: 1fr 2rem;
  align-items: center;
  gap: 1rem;

  flex: 1 1 auto;

  & svg {
    pointer-events: none;
  }

  &:has(+ span) {
    padding-right: 0;
  }
`;

export const SelectedContent = styled.div`
  color: ${(props) =>
    props.$isPlaceholder ? "var(--color-grey-300)" : "inherit"};
`;

export const SelectAddAction = styled.span`
  display: inline-flex;
  align-items: center;
  font-size: 1.4rem;
  font-weight: 500;
  padding: 0.2rem 0.6rem;
  border-radius: var(--border-radius-sm);
  transition: all 0.2s;

  margin-left: -1px;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.2rem;
    height: 2.2rem;
    color: var(--color-brand-600);
  }
`;

export const SelectPicker = styled.div`
  border: 1px solid var(--color-grey-300);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-sm);
  box-shadow: var(--shadow-md);
  position: absolute;
  transform: translateY(0.6rem);
  overflow: auto;
  z-index: 99;
  width: 100%;
  max-height: 16rem;
  min-height: 5rem;
  top: 100%;

  ${(props) => (props.$align === "right" ? "right: 0" : "left: 0")};

  &::-webkit-scrollbar {
    width: 0.5rem;
  }

  &::-webkit-scrollbar-track {
    background: var(--color-grey-0);
  }

  &::-webkit-scrollbar-thumb {
    background: var(--color-grey-200);

    &:hover {
      background: var(--color-brand-500);
    }
  }
`;

export const SelectOption = styled.div`
  font-size: 1.4rem;
  padding: 0.8rem 1.2rem;
  cursor: pointer;
  display: grid;
  grid-template-columns: 1rem 1fr;
  align-items: center;
  gap: 1rem;
  text-wrap: balance;

  &:hover {
    background-color: var(--color-grey-50);
  }

  & svg {
    color: transparent;
  }

  ${(props) =>
    props.$isHilighted &&
    css`
      background-color: var(--color-grey-50);

      & svg {
        color: var(--color-brand-600);
      }
    `}

  ${(props) =>
    props.$disabled &&
    css`
      cursor: not-allowed;
      background-color: var(--color-grey-200);
      color: var(--color-grey-500);
      &:hover {
        background-color: var(--color-grey-200);
      }
    `}
`;

export const SearchBox = styled.div`
  padding: 0.6rem 0.8rem;
  input {
    padding: 0.8rem 1.2rem;
    border: 1px solid var(--color-grey-300);
    background-color: var(--color-grey-0);
    border-radius: var(--border-radius-sm);
    box-shadow: var(--shadow-sm);
    width: 100%;
  }
`;

export const MultiValuesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

export const MultiValuesItem = styled.div`
  border-radius: var(--border-radius-sm);
  background-color: var(--color-grey-200);
  color: var(--color-grey-500);
  font-size: 1.2rem;
  font-weight: 500;
  padding: 0.2rem 0.4rem;
  display: grid;
  grid-template-columns: 1fr 2rem;
  align-items: center;
  gap: 0.4rem;
`;

export const EmptyOptions = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: default;
  gap: 1rem;
  font-size: 1.4rem;
  padding: 0.8rem 1.2rem;
  color: var(--color-grey-300);
`;

const Select = ({
  name,
  options,
  onChange,
  required = false,
  disabled = false,
  defaultValue = [],
  placeHolder = "Sélectionnez",
  isMulti = false,
  isSearchable = false,
  align = "left",
  createComponent,
}) => {
  const [showPicker, setShowPicker] = useState(false);
  const [selectedValue, setSelectedValue] = useState(
    isMulti
      ? [...options.filter((opt) => defaultValue.includes(opt.value))]
      : options.find((opt) => opt.value === defaultValue[0])
  );
  const [searchValue, setSearchValue] = useState("");
  const searchRef = useRef();
  const inputRef = useClickOutside(() => setShowPicker(false), false);

  useEffect(() => {
    setSearchValue("");
    if (showPicker && searchRef.current) {
      searchRef.current.focus();
    }
  }, [showPicker]);

  function getDisplayValue() {
    if (!selectedValue || selectedValue.length === 0) {
      return placeHolder;
    }
    if (isMulti) {
      return (
        <MultiValuesContainer>
          {selectedValue.map((o, i) => (
            <MultiValuesItem key={`${o.value}-${i}`}>
              {o.label}
              <HiXMark onClick={(e) => handleUnselectMultiOption(e, o)} />
            </MultiValuesItem>
          ))}
        </MultiValuesContainer>
      );
    }
    return selectedValue.label;
  }

  function removeOption(option) {
    if (option.disabled) return;
    return selectedValue.filter((o) => o.value !== option.value);
  }

  function isSelected(option) {
    if (isMulti) {
      return selectedValue.filter((o) => o.value === option.value).length > 0;
    }
    if (!selectedValue) {
      return false;
    }
    return selectedValue.value === option.value;
  }

  function getOptions() {
    if (!searchValue) {
      return options;
    }
    return options.filter(
      (o) => o.label.toLowerCase().indexOf(searchValue.toLowerCase()) >= 0
    );
  }

  function handleToggle() {
    if (disabled) return;
    setShowPicker(!showPicker);
  }

  function handleSelectOption(option) {
    if (option.disabled) return;
    let newValue;

    if (isMulti) {
      if (selectedValue.findIndex((o) => o.value === option.value) >= 0) {
        newValue = removeOption(option);
      } else {
        newValue = [...selectedValue, option];
      }
    } else {
      newValue = option;
    }
    setSelectedValue(newValue);
    onChange(isMulti ? newValue.map((o) => o.value) : option.value);
  }

  function handleUnselectMultiOption(e, option) {
    e.stopPropagation();
    const newValue = removeOption(option);
    setSelectedValue(newValue);
    onChange(isMulti ? newValue.map((o) => o.value) : option.value);
  }

  function handleSearch(e) {
    setSearchValue(e.target.value);
  }

  const choices = getOptions();

  return (
    <SelectContainer
      $isDisabled={disabled}
      className={required ? "required" : ""}
      id={name}
    >
      <SelectToggle ref={inputRef} onClick={handleToggle} role="listbox">
        <SelectedContent
          $isPlaceholder={
            !selectedValue || selectedValue.length === 0 ? true : false
          }
        >
          {getDisplayValue()}
        </SelectedContent>
        {showPicker ? <HiChevronUp /> : <HiChevronDown />}
      </SelectToggle>
      {createComponent && (
        <Modal>
          <Modal.Open opens={`create-options-${name}`}>
            <SelectAddAction>
              <HiOutlinePlusCircle />
            </SelectAddAction>
          </Modal.Open>
          <Modal.Window name={`create-options-${name}`}>
            {cloneElement(createComponent, {
              onCreateOption: handleSelectOption,
            })}
          </Modal.Window>
        </Modal>
      )}

      {showPicker && (
        <SelectPicker $align={align}>
          {options.length > 0 && isSearchable && (
            <SearchBox>
              <input
                onChange={handleSearch}
                value={searchValue}
                ref={searchRef}
              />
            </SearchBox>
          )}
          {choices.length > 0 ? (
            choices.map((option) => (
              <SelectOption
                onClick={() => handleSelectOption(option)}
                key={option.value}
                $isHilighted={isSelected(option)}
                $disabled={option.disabled}
                role="option"
              >
                <GiCheckMark />
                {option.label}
              </SelectOption>
            ))
          ) : (
            <EmptyOptions>Aucun résultat</EmptyOptions>
          )}
        </SelectPicker>
      )}
    </SelectContainer>
  );
};

export default Select;
