import { Link } from "react-router-dom";
import styled from "styled-components";

export const Header = styled.header`
    position: absolute;
    top: 0;
    
    background: #FFFFFF;
    width: 100%;
`

export const Logo = styled.img`
    width: 40px;
    height: 40px;
    margin-right: 48px;
`

export const HeaderButton = styled(Link)`
    position: relative;
    height: 80px;
    display: flex;
    align-items: center;
    margin-right: 32px;
    color: ${p => p.isSelected ? '#020209' : '#65656D'};

    &:after {
        transition: 0.2s opacity;
        opacity: ${p => p.isSelected ? 1 : 0};
        position: absolute;
        bottom: 0;

        content: "";
        background: #7933D2;
        border-radius: 8px 8px 0px 0px;
        height: 5px;
        width: 100%;
    }

    :hover {
        &:after {
            opacity: 0.5;
        }
    }
`

export const Navigation = styled.div`
    height: 80px;
    display: flex;
    align-items: center;
    margin: auto;
    width: 1200px;
    box-sizing: border-box;
`
