import React from 'react';
import { Container } from './styles';

const Button = ({ children, color, fontsize, ...rest}) => {
    return (
        <Container {...rest} color={color} fontsize={fontsize}>
            {children}
        </Container>
    )
}

export default Button;
