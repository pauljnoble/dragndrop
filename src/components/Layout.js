import React from 'react';
import styled, { css, ThemeProvider } from 'styled-components';
import theme from '../styles/theme';

const Layout = ({ children, loaded }) => (
    <ThemeProvider theme={{ ...theme, loaded }}>
        <Wrapper>
            <NavStubWrapper>
                <NavStub>Drag n Drop</NavStub>
            </NavStubWrapper>
            <Main>{children}</Main>
        </Wrapper>
    </ThemeProvider>
);

const loadInKeyframeStyles = css`
    animation: navStubloadIn ${props => props.theme.anim.navLoad.dur}ms forwards;
    animation-timing-function: ${props => props.theme.anim.navLoad.tween};
    animation-delay: ${props => `${props.theme.anim.navLoad.delay}ms`};
    transform: translateY(-100%);

    @keyframes navStubloadIn {
        from {
            transform: translateY(-100%);
        }
        to {
            transform: translateY(0);
        }
    }
`;

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    min-width: 768px;
    min-height: 500px;
    background-color: ${props => props.theme.colors.bgMain};
`;

const NavStubWrapper = styled.div`
    height: ${props => props.theme.navY}px;
    background-color: ${props => props.theme.colors.bgMain};
    position: relative;
    z-index: ${props => props.theme.zIndexes.navStub};
    ${loadInKeyframeStyles};
`;

const NavStub = styled.nav`
    display: flex;
    padding: 0 16px;
    /* color: ${props => props.theme.colors.brand}; */
    color: #333;
    /* border-top: solid 2px ${props => props.theme.colors.brand}; */
    border-top: solid 2px #222;
    height: ${props => props.theme.navY}px;
    background-color: ${props => props.theme.colors.bgNav};
    box-shadow: 0 1px 0 rgba(0, 0, 0, 0.1);
    align-items: center;

    span {
        display: inline-block;
        background: ${props => props.theme.colors.brand};
        color: #fff;
        font-size: 11px;
        font-weight: bold;
        text-transform: uppercase;
        padding: 0 3px;
        margin-left: 8px;
        border-radius: 2px;
    }
`;

const Main = styled.main`
    display: flex;
    flex-direction: row;
    flex-grow: 1;
    background: ${theme.colors.bgMain};
`;

export default Layout;
