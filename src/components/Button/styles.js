import styled, { css } from 'styled-components';
import { shade } from 'polished';

export const Container = styled.button`
    width: 100%;
    height: 40px;
    border-radius: 10px;
    border: 0;
    color: #fff;
    font-weight: bold;
    font-size: 18px;
    transition: all 0.3s;
    box-shadow: 0px 3px 6px #FF000029;

    ${(props) =>
        props.color === 'vermelho' &&
        css`
            background-color: #F41C32;

            &:hover {
                background: ${shade(0.2, '#F41C32')};
            }
        `}

    ${(props) =>
        props.color === 'vinho' &&
        css`
            background-color: #8D0000;

            &:hover {
                background: ${shade(0.2, '#8D0000')};
            }
        `}

    ${(props) =>
        props.fontsize === '20' &&
        css`
            font-size: 20px;
        `}

    ${(props) =>
        props.fontsize === '12' &&
        css`
            font-size: 12px;
        `}
`;
