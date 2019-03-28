export default {
    ready: false,
    // sidebarDragIndex: null,
    // collageDragIndex: null,
    // gridDragOverIndex: null,
    dragIntentDur: 150, // minimum drag over duration to determine drag intent
    sidebar: {
        draggingIndex: null,
        droppingValidIndex: null,
        droppingInvalidIndex: null,
    },
    grid: {
        dragOverIndex: null,
        isDropping: false,
        gutter: 10,
        margin: 10,
        dim: [],
    },
    collage: {
        isHovering: false,
        draggingIndex: null,
        dragOverIndex: null,
        removingIndex: null,
        items: [],
    },
    images: {
        items: [
            {
                filename: 'bg1.jpg',
                title: 'Papers',
            },
            {
                filename: 'bg2.jpg',
                title: 'Green valley',
            },
            {
                filename: 'bg3.jpg',
                title: 'New York',
            },
            {
                filename: 'bg4.jpg',
                title: 'User',
            },
            {
                filename: 'bg5.jpg',
                title: 'Canyon',
            },
            {
                filename: 'bg6.jpg',
                title: 'Shore',
            },
            {
                filename: 'bg7.jpg',
                title: 'Reflection',
            },
            {
                filename: 'bg8.jpg',
                title: 'Winter',
            },
            {
                filename: 'bg9.jpg',
                title: 'Floral',
            },
            {
                filename: 'bg10.jpg',
                title: 'Coast',
            },
            {
                filename: 'bg11.jpg',
                title: 'Peak',
            },
            {
                filename: 'bg12.jpg',
                title: 'Asbtract building',
            },
            {
                filename: 'bg13.jpg',
                title: 'Pyramid',
            },
            {
                filename: 'bg14.jpg',
                title: 'Mountain range',
            },
            {
                filename: 'bg15.jpg',
                title: 'Abstract landscape',
            },
            {
                filename: 'bg16.jpg',
                title: 'Mediterranean city',
            },
            {
                filename: 'bg17.jpg',
                title: 'Desert canyon',
            },
        ],
    },
};
