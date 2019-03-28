import React, { Component } from 'react';
import shortid from 'shortid';
import { clone } from 'lodash';
import Layout from './components/Layout';
import Sidebar from './components/Sidebar';
import Workspace from './components/Workspace';
import defaultState from './default-state';
import theme from './styles/theme';

class App extends Component {
    state = defaultState;

    // refs to current grid, next grid and collage
    // these are required to map collage items to grid cells
    gridCurrentEl = null;
    gridCurrentItemEls = [];
    gridNextEl = null;
    gridNextItemEls = [];
    collageEl = null;
    collageItemEls = [];

    handleCollageMouseOver = () => {
        const collage = Object.assign({}, this.state.collage);
        collage.isHovering = true;
        this.setState({ collage });
    };
    handleCollageMouseLeave = () => {
        const collage = Object.assign({}, this.state.collage);
        collage.isHovering = false;
        this.setState({ collage });
    };

    handleSidebarImageDragStart = (e, i) => {
        const sidebar = Object.assign({}, this.state.sidebar);
        sidebar.draggingIndex = i;
        this.setState({ sidebar });
    };

    handleSidebarImageDragEnd = (e, i) => {
        const sidebar = Object.assign({}, this.state.sidebar);
        const grid = Object.assign({}, this.state.grid);
        sidebar.draggingIndex = null;

        if (this.state.grid.dragOverIndex !== null) {
            sidebar.droppingValidIndex = this.state.sidebar.draggingIndex;
        } else {
            sidebar.droppingInvalidIndex = this.state.sidebar.draggingIndex;
        }

        grid.dragOverIndex = null;

        this.setState({ sidebar, grid });
        setTimeout(this.handleSidebarImageDropEnd, theme.anim.sidebarDropping.dur); // todo sync this and differentiate between drop / invalid drop
    };

    handleSidebarImageDropEnd = () => {
        const sidebar = Object.assign({}, this.state.sidebar);
        sidebar.droppingInvalidIndex = null;
        sidebar.droppingValidIndex = null;
        this.setState({ sidebar });
    };

    handleSidebarImageDrop = () => {
        const collage = Object.assign({}, this.state.collage);
        const grid = Object.assign({}, this.state.grid);
        const item = this.state.images.items[this.state.sidebar.draggingIndex];
        const insertIndex = this.state.grid.dragOverIndex;
        const items = clone(collage.items);
        const newItem = {
            id: shortid.generate(),
            index: insertIndex,
            ...clone(item),
        };

        for (let i = 0; i < items.length; i++) {
            if (items[i].index >= insertIndex) {
                items[i].index = items[i].index + 1;
            }
        }

        items.push(newItem);
        collage.items = items;
        this.setState({ collage, grid });
    };

    handleGridOverlayDragEnter = i => {
        const grid = Object.assign({}, this.state.grid);
        grid.dragOverIndex = i;
        this.setState({ grid });
    };

    handleGridOverlayDragLeave = i => {
        const grid = Object.assign({}, this.state.grid);
        grid.dragOverIndex = null;
        this.setState({ grid });
    };

    handleCollageImageLoad = i => {
        const collage = Object.assign({}, this.state.collage);
        collage.items[i].loaded = true;
        this.setState({ collage });
    };

    handleCollageImageDragStart = i => {
        const collage = Object.assign({}, this.state.collage);
        collage.draggingIndex = i;
        this.setState({ collage });
    };

    handleCollageImageDragEnd = () => {
        const collage = Object.assign({}, this.state.collage);
        collage.draggingIndex = null;
        this.setState({ collage });
    };

    handleCollageImageDragEnter = i => {
        const collage = Object.assign({}, this.state.collage);
        collage.dragOverIndex = i;
        this.setState({ collage });
    };

    handleCollageImageDrop = i => {
        const dragIndex = this.state.collage.draggingIndex;
        const dropIndex = i;
        const collage = Object.assign({}, this.state.collage);
        const items = clone(collage.items);
        const arrDragIndex = items.findIndex(val => val.index === dragIndex);
        const arrDropIndex = items.findIndex(val => val.index === i);
        items[arrDropIndex].index = dragIndex;
        items[arrDragIndex].index = dropIndex;
        collage.items = items;
        this.setState({ collage });
    };

    handleCollageImageRemove = i => {
        const collage = Object.assign({}, this.state.collage);
        const items = clone(collage.items);
        const arrRemoveIndex = items.findIndex(val => val.index === i);
        const itemIndex = items[arrRemoveIndex].index;
        items.splice(arrRemoveIndex, 1);

        for (let i = 0; i < items.length; i++) {
            if (items[i].index > itemIndex) {
                items[i].index = items[i].index - 1;
            }
        }

        collage.items = items;
        this.setState({ collage });
    };

    render() {
        return (
            <Layout>
                <Sidebar
                    state={this.state}
                    handleSidebarImageDragStart={this.handleSidebarImageDragStart}
                    handleSidebarImageDrag={this.handleSidebarImageDrag}
                    handleSidebarImageDragEnd={this.handleSidebarImageDragEnd}
                />
                <Workspace
                    state={this.state}
                    handleGridOverlayDragEnter={this.handleGridOverlayDragEnter}
                    handleGridOverlayDragLeave={this.handleGridOverlayDragLeave}
                    handleCollageMouseOver={this.handleCollageMouseOver}
                    handleCollageMouseLeave={this.handleCollageMouseLeave}
                    handleCollageImageLoad={this.handleCollageImageLoad}
                    handleSidebarImageDrop={this.handleSidebarImageDrop}
                    handleCollageImageDragStart={this.handleCollageImageDragStart}
                    handleCollageImageDragEnd={this.handleCollageImageDragEnd}
                    handleCollageImageDrop={this.handleCollageImageDrop}
                    handleCollageImageDragEnter={this.handleCollageImageDragEnter}
                    handleCollageImageRemove={this.handleCollageImageRemove}
                />
            </Layout>
        );
    }
}

export default App;
