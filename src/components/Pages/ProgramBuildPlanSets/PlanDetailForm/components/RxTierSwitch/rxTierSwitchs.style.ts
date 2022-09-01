import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-wrap: unset;
`;

export const Label = styled.label`
  font-size: 16px;
  line-height: 26px;
  font-weight: normal;
  margin-left: 4px;
`;

export const Switch = styled.label`
  position: relative;
  display: inline-block;
  flex-shrink: 0;
  width: 50px;
  height: 26px;

  input {
    opacity: 0;
    width: 0;
    height: 0;

    &:checked + span {
      background-color: #def7ff;
      &:before {
        transform: translateX(24px);
      }
    }
  }

  span {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #fff;
    border-radius: 26px;
    border: 1px solid #c8c8c8;
    -webkit-transition: 0.4s;
    transition: 0.4s;

    &:before {
      position: absolute;
      content: "";
      height: 20px;
      width: 20px;
      left: 2px;
      bottom: 2px;
      border-radius: 50%;
      background-color: #0097f5;
      -webkit-transition: 0.4s;
      transition: 0.4s;
    }
  }
`;
