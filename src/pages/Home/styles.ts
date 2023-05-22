import styled from "styled-components";

export const ImageContainer = styled.div`
  max-width: 100%;
  overflow: hidden;
  margin-right: 30px;
`;

export const Text = styled.p`
  font-size: 23px;
  margin: 0;
  margin-right: 50px;
`;

export const Tag = styled.h2`
  font-size: 35px;
  margin: 0;
  margin-top: 40px;
`;

export const Overview = styled.p`
  font-size: 20px;
`;

export const PillContainer = styled.div`
  margin-right: 15px;
`;

export const Title = styled.div`
  font-size: 30px;
  font-weight: bold;
  padding-bottom: 20px;
`;

export const ScrollContainer = styled.div`
  overflow-x: auto;
  overflow-y: hidden;
  white-space: nowrap;
  background: transparent;
  height: 100%;
  border-radius: 15px;
  width: 100%;
  ::-webkit-scrollbar {
    display: none;
  }
`;

export const GridScroll = styled.div`
  display: flex;
`;
