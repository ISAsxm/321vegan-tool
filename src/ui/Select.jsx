import { cloneElement, useEffect, useRef, useState } from "react";

import { useClickOutside } from "@/hooks/useClickOutside";
import { useDebounce } from "@/hooks/useDebounce";

import Modal from "@/ui/Modal";
import LoaderDots from "./LoaderDots";

import {
  HiChevronUp,
  HiChevronDown,
  HiXMark,
  HiOutlinePlusCircle,
} from "react-icons/hi2";
import { GiCheckMark } from "react-icons/gi";

import styled, { css } from "styled-components";
import Input from "./Input";

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
  & input {
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
  onChange,
  createComponent,
  getOptions,
  defaultOptions = [],
  defaultValue = [],
  required = false,
  disabled = false,
  placeHolder = "Sélectionnez",
  isSearchable = false,
  isMulti = false,
  align = "left",
}) => {
  const debounce = useDebounce(1000);
  const [showPicker, setShowPicker] = useState(false);
  const [isPendingOptions, setIsPendingOptions] = useState(false);
  const [options, setOptions] = useState(defaultOptions);
  const [searchValue, setSearchValue] = useState("");
  const [selectedValue, setSelectedValue] = useState(
    isMulti
      ? [...options.filter((opt) => defaultValue.includes(opt.value))]
      : options.find((opt) => opt.value === defaultValue[0])
  );
  const searchRef = useRef();
  const inputRef = useClickOutside(() => setShowPicker(false), false);

  function addOption(opts) {
    setOptions((options) =>
      [...new Set([...options, ...opts])].filter(
        (value, index, self) =>
          index === self.findIndex((opt) => opt.value === value.value)
      )
    );
  }

  function removeOption() {
    setOptions(
      isMulti
        ? selectedValue.length > 0
          ? selectedValue
          : []
        : selectedValue
        ? [selectedValue]
        : []
    );
  }

  function unselectOption(option) {
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

  function getChoices() {
    if (!getOptions) {
      if (!searchValue) {
        return options;
      }
      return options.filter(
        (o) => o.label.toLowerCase().indexOf(searchValue.toLowerCase()) >= 0
      );
    }

    if (isMulti) {
      return selectedValue.length > 0
        ? [...new Set([...options, ...selectedValue])]
        : options;
    }
    return selectedValue
      ? [...new Set([...options, ...[selectedValue]])]
      : options;
  }

  function handleToggle() {
    if (disabled) return;
    if (getOptions) removeOption();
    setShowPicker(!showPicker);
  }

  function handleSelectOption(option) {
    if (option.disabled) return;
    let newValue;

    if (isMulti) {
      if (selectedValue.findIndex((o) => o.value === option.value) >= 0) {
        newValue = unselectOption(option);
      } else {
        newValue = [...selectedValue, option];
      }
    } else {
      newValue = option;
    }
    setSelectedValue(newValue);
    onChange(isMulti ? newValue.map((o) => o.value) : option.value);
  }

  function handleUnselectMultiOption(option) {
    const newValue = unselectOption(option);
    setSelectedValue(newValue);
    onChange(isMulti ? newValue.map((o) => o.value) : option.value);
  }

  function handleCreateOption(option) {
    addOption([option]);
    handleSelectOption(option);
  }

  const fetchOptions = async (inputValue) => {
    try {
      setIsPendingOptions(true);
      const data = await getOptions(inputValue);
      if (data) addOption(data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsPendingOptions(false);
    }
  };

  function handleSearch(e) {
    const inputSearch = e.target.value.trim();
    setSearchValue(e.target.value);
    if (getOptions) {
      removeOption();
      if (!inputSearch) return;
      debounce(() => {
        fetchOptions(inputSearch);
      });
    }
  }

  useEffect(() => {
    setSearchValue("");
    if (showPicker && searchRef.current) {
      searchRef.current.focus();
    }
  }, [showPicker]);

  const choices = getChoices();

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
          {!selectedValue || selectedValue.length === 0 ? (
            placeHolder
          ) : isMulti ? (
            <MultiValuesContainer>
              {selectedValue.map((o, i) => (
                <MultiValuesItem
                  key={`${o.value}-${i}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleUnselectMultiOption(o);
                  }}
                >
                  {o.label}
                  <HiXMark />
                </MultiValuesItem>
              ))}
            </MultiValuesContainer>
          ) : (
            selectedValue.label
          )}
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
              onCreateOption: handleCreateOption,
            })}
          </Modal.Window>
        </Modal>
      )}

      {showPicker && (
        <SelectPicker $align={align}>
          {(!!getOptions || isSearchable) && (
            <SearchBox>
              <Input
                type="search"
                id={`${name}-search`}
                onChange={handleSearch}
                value={searchValue}
                ref={searchRef}
                placeholder={!getOptions ? "Filtrer..." : "Rechercher..."}
              />
            </SearchBox>
          )}
          {isPendingOptions && (
            <EmptyOptions>
              <LoaderDots />
            </EmptyOptions>
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
