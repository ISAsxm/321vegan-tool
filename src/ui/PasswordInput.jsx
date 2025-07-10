import { useState } from "react";

import Input from "./Input";
import ButtonIcon from "./ButtonIcon";

import { HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";

import styled from "styled-components";

const StyledPasswordInput = styled.div`
  position: relative;

  & input {
    min-width: 100%;
  }

  & span {
    display: flex;
    align-items: center;
    position: absolute;
    top: 50%;
    right: 10px;
    transform: translateY(-50%);
  }
`;

function PasswordInput(props) {
  const [isVisible, setVisible] = useState(false);

  return (
    <StyledPasswordInput>
      <Input type={!isVisible ? "password" : "text"} {...props} />
      <ButtonIcon as="span" onClick={() => setVisible((v) => !v)}>
        {isVisible ? <HiOutlineEye /> : <HiOutlineEyeOff />}
      </ButtonIcon>
    </StyledPasswordInput>
  );
}

export default PasswordInput;
