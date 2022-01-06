import styled from 'styled-components'

export const Input = styled.input`
    width: 100%;
    height: 60px;
    padding: 0 20px;
    background: #FFFFFF;
    border-radius: 16px;
    box-sizing: border-box;
    border: 1px solid #E4E4E4;
    color: #000;

    &, &::placeholder {
        font-family: Montserrat;
        font-style: normal;
        font-weight: 500;
        font-size: 18px;
        line-height: 24px;
    }

    &::placeholder {
        color: #65656D;
    }

    &:focus {
        outline: none;
        box-shadow: 0 0 0 2px #7933D2;
    }
`