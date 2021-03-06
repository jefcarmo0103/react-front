import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        outline: 0;
        box-sizing: border-box;
    }

    html, body, #root {
        min-height: 100%;
    }

    body {
        background: #fff;
        -webkit-font-smoothing: antialiased;
    }

    body, input, button {
        font-family: 'Roboto', serif;
        font-size: 14px;
    }

    button {
        cursor: pointer;

        &:disabled {
            cursor: default;
            opacity: 0.5;
        }
    }

    a:hover {
        text-decoration: underline;
    }
`;
