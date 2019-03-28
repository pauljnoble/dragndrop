import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import Image from './Image';
import IconNavLayout from '../Icons/NavLayouts';

class Sidebar extends Component {
    render() {
        const draggables = this.props.state.images.items.map((val, i) => (
            <Image key={i} index={i} {...val} {...this.props} />
        ));

        return (
            <Wrapper>
                <SubNav>
                    <Button active>
                        <IconNavLayout />
                    </Button>
                </SubNav>
                <Panel>
                    <Search>
                        <Filter disabled type="text" placeholder="Search" />
                    </Search>
                    <Gallery>
                        {/* very basic masonry layout ;) */}
                        <Col>{draggables.splice(0, 7)}</Col>
                        <Col>{draggables.splice(0, 4)}</Col>
                        <Col>{draggables.splice(0, 6)}</Col>
                    </Gallery>
                </Panel>
            </Wrapper>
        );
    }
}

const loadInKeyframeStyles = css`
    animation: loadIn ${props => props.theme.anim.sideBarLoad.dur}ms forwards;
    animation-timing-function: ${props => props.theme.anim.sideBarLoad.tween};
    animation-delay: ${props => `${props.theme.anim.sideBarLoad.delay}ms`};
    transform: translateX(-100%);

    @keyframes loadIn {
        from {
            transform: translateX(-100%);
        }
        to {
            transform: translateY(0);
        }
    }
`;

const loadInSubNavKeyframeStyles = css`
    animation: loadInSubNav ${props => props.theme.anim.subNavLoad.dur}ms forwards;
    animation-timing-function: ${props => props.theme.anim.subNavLoad.tween};
    animation-delay: ${props => `${props.theme.anim.subNavLoad.delay}ms`};
    transform: translateX(-100%);

    @keyframes loadInSubNav {
        from {
            transform: translateX(-100%);
        }
        to {
            transform: translateX(0);
        }
    }
`;

const loadInSearchKeyframeStyles = css`
    animation: loadInSearch ${props => props.theme.anim.searchLoad.dur}ms forwards;
    animation-timing-function: ${props => props.theme.anim.searchLoad.tween};
    animation-delay: ${props => `${props.theme.anim.searchLoad.delay}ms`};
    opacity: 0;

    @keyframes loadInSearch {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
`;

const Wrapper = styled.section`
    background: ${props => props.theme.colors.bgSidebar};
    flex-grow: 1;
    display: flex;
    flex-basis: 33.33%;
    max-width: ${props => props.theme.sideBarX}px;
    z-index: 9;
    ${loadInKeyframeStyles};
`;

const Button = styled.main`
    height: ${props => props.theme.subNavX}px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    opacity: ${props => (props.active ? 1 : 0.33)};
    ${props => props.active && 'box-shadow: inset -12px 0 12px rgba(0, 0, 0, 0.15)'};
    background-color: ${props => (props.active ? props.theme.colors.bgSidebar : 'transparent')};
`;

const SubNav = styled.nav`
    width: ${props => props.theme.subNavX}px;
    background: ${props => props.theme.colors.bgSubNav};
    flex-shrink: 0;
    padding-top: 16px;
    ${loadInSubNavKeyframeStyles};
`;

const Panel = styled.div`
    display: flex;
    flex-grow: 1;
    flex-direction: column;
`;

const Search = styled.div`
    padding: 24px 12px 12px;
    pointer-events: none;
    ${loadInSearchKeyframeStyles};
`;

const Filter = styled.input`
    font-size: 14px;
    display: block;
    border: 0;
    box-shadow: 0 0 1px 0 rgba(0, 0, 0, 0.1);
    background-color: rgba(255, 255, 255, 0.1);
    width: 100%;
    border-radius: 3px;
    padding: 8px 8px;
    outline: none;
    color: #fff;

    &::placeholder {
        color: #999;
    }

    &:active,
    &:focus {
        color: #222;
        box-shadow: 0 0 1px 0 rgba(0, 0, 0, 0.3);
        background-color: #ebeced;
    }
`;

const Gallery = styled.div`
    backface-visibility: hidden;
    display: flex;
    flex-grow: 1;
    padding: 12px;
    justify-content: space-between;
`;

const Col = styled.div`
    flex-basis: calc(33% - 7px); /* ~10px column gaps */
`;

export default Sidebar;
