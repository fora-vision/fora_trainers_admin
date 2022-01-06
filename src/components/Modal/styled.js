import styled from "styled-components";
import { PureButton } from "../button";

export const Overlay = styled.div`
    position: fixed;
    top: 0;
    
    background: rgba(0, 0, 0, 0.6);
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
`

export const Close = styled(PureButton)`
    position: absolute;
    top: 24px;
    right: 16px;
`

export const Body = styled.div`
    position: relative;
    background: #FFFFFF;
    border-radius: 16px;
    padding: 24px 16px;
`
