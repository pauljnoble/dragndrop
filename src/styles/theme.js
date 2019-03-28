export default {
    navY: 56,
    sideBarX: 360,
    subNavX: 60,
    sidebarDragImageX: 100,
    gridMargin: 10,
    zIndexes: {
        navStub: 1,
        dropZone: 10,
        draggable: 90,
    },
    colors: {
        brand: '#fff',
        textFaint: '#b1bbc6',
        emptySetGridBorder: '#ddd',
        bgNav: '#ffffff',
        bgEmptySetGrid: 'rgba(0, 0, 0, 0.03)',
        bgSidebar: '#414652',
        bgSubNav: '#282c33',
        bgMain: '#ebeced',
        bgGridDraggedOver: 'rgba(0, 196, 204, 0.2)',
        bgGridDraggedOff: 'rgba(0, 196, 204, 0)',
        bgSidebarImage: 'rgba(0, 0, 0, 0.1)',
        bgArtboard: '#ffffff',
        borderEmptySetDrag: 'rgba(0, 0, 0, 0.03)',
        borderEmptySetDragOver: 'rgba(0, 0, 0, 0.09)',
    },
    borders: {
        gridItem: 'dotted 2px rgba(0, 196, 204, 1)',
        sidebarImage: 'solid 1px rgba(0, 0, 0, 0.075)',
    },
    opacities: {
        sidebarDragCollageImage: 0.2,
        collageDragOverCollage: 0.5,
    },
    anim: {
        navLoad: {
            dur: 300,
            delay: 600,
            tween: 'ease-in-out',
        },
        sideBarLoad: {
            dur: 400,
            delay: 800,
            tween: 'cubic-bezier(0.23, 1, 0.32, 1)',
        },
        subNavLoad: {
            dur: 300,
            delay: 900,
            tween: 'ease-in-out',
        },
        searchLoad: {
            dur: 300,
            delay: 900,
            tween: 'ease-in-out',
        },
        artboardLoad: {
            dur: 300,
            delay: 1100,
            tween: 'ease-in-out',
        },
        sidebarDropping: {
            dur: 300,
            delay: null,
            tween: 'ease-in-out',
        },
        sidebarDropped: {
            dur: 300,
            delay: null,
            tween: 'ease-in-out',
        },
        sidebarDrag: {
            dur: 200,
            delay: null,
            tween: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        },
        sidebarDropInvalid: {
            dur: 300,
            delay: null,
            tween: 'ease-in-out',
        },
        collageFirstRender: {
            dur: 300,
            delay: null,
            tween: 'ease-in-out',
        },
        collageImageDrag: {
            dur: 150,
            delay: null,
            tween: 'ease-in-out',
        },
        gridMorph: {
            dur: 300,
            delay: null,
            tween: null, // gsap animation
        },
    },
};
