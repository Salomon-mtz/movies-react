import styled from "styled-components";
import { LabelProps } from "./types";

export const ShowLabel = styled.div<LabelProps>`
  background: ${props => props.pillColor};
  color: #fff;
  padding: 6px;
  font-size: 20px;
  font-weight: 500;


  display: table;
  transition: all 0.3s;
  border-radius: 5px;
  width: auto;
  height: 35px;
`;
