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

import {
  SelectContainer,
  SelectToggle,
  SelectedContent,
  SelectAddAction,
  SelectPicker,
  SelectOption,
  SearchBox,
  MultiValuesContainer,
  MultiValuesItem,
  EmptyOptions,
} from "./Select";

const SelectRelationship = ({
  name,
  onChange,
  createComponent,
  getOptions,
  defaultOptions = [],
  defaultValue = [],
  required = false,
  disabled = false,
  placeHolder = "Sélectionnez",
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
    removeOption();
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
    const inputSearch = e.target.value;
    setSearchValue(inputSearch);
    if (!inputSearch) return;
    debounce(() => {
      fetchOptions(inputSearch);
    });
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
      <SelectToggle
        ref={inputRef}
        onClick={(e) => {
          if (e.target.className.includes("selectedOption")) return;
          handleToggle();
        }}
        role="listbox"
      >
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
                  className="selectedOption"
                >
                  {o.label}
                  <HiXMark
                    onClick={(e) => {
                      e.stopPropagation();
                      console.log("child click", e);
                      console.log("clickkk", e.currentTarget, e.target);
                      handleUnselectMultiOption(o);
                    }}
                  />
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
          <SearchBox>
            <input
              id={`${name}-search`}
              onChange={handleSearch}
              value={searchValue}
              ref={searchRef}
            />
          </SearchBox>
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

export default SelectRelationship;
