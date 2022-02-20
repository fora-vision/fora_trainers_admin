import styled from 'styled-components'

export const PBold = styled.p`
    //styleName: P Bold;
    font-family: Montserrat;
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: 20px;
    letter-spacing: 0em;
    text-align: left;
    margin: 0;
    word-break: break-all;
    margin-bottom: ${p => P.mb || 0};
`

export const P = styled.p`
    //styleName: P;
    font-family: Montserrat;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: 20px;
    letter-spacing: 0em;
    margin: 0;
    
    margin-bottom: ${p => P.mb || 0};
`

export const PSmall = styled.p`
    //styleName: P Small;
    font-family: Montserrat;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 17px;
    letter-spacing: 0em;
    text-align: left;
    margin: 0;

    margin-bottom: ${p => P.mb || 0};
`

export const H1 = styled.h1`
    //styleName: H1;
    font-family: Montserrat;
    font-size: 36px;
    font-style: normal;
    font-weight: 700;
    line-height: 44px;
    letter-spacing: 0em;
    text-align: left;
    margin: 0;
    word-break: break-all;

    margin-bottom: ${p => P.mb || 0};
`

export const H2 = styled.h2`
    //styleName: H2;
    font-family: Montserrat;
    font-size: 24px;
    font-style: normal;
    font-weight: 500;
    line-height: 29px;
    letter-spacing: 0em;
    text-align: left;
    margin: 0;

    margin-bottom: ${p => P.mb || 0};
`

export const H3 = styled.h3`
    //styleName: H3;
    font-family: Montserrat;
    font-size: 20px;
    font-style: normal;
    font-weight: 600;
    line-height: 24px;
    letter-spacing: 0em;
    text-align: left;
    margin: 0;

    margin-bottom: ${p => P.mb || 0};
`