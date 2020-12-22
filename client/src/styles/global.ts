import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  * {
    padding: 0;
    margin: 0;
  }

  #root {
    height: 100%;
  }

  body {
    background: #e2e2e2;
    height: 100vh;
  }
`;