import styled, { createGlobalStyle } from 'styled-components';
// Files
import backgroundImage from './images/background.jpg';

export const GlobalStyle = createGlobalStyle`
  html {
    height: 100%;
  }

  body {
    display: flex;
    justify-content: center;
    margin: 0;
    padding: 0 20px;

    background-image: url(${backgroundImage});
    background-size: cover;
  }

  * {
    box-sizing: border-box;
  }
`;

export const Wrapper = styled.div``;
