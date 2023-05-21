"use strict";
const color = (colorID, alpha) => {
    const colorMap = {
        1: '255 128 128',
        2: '255 128 0',
        3: '255 255 128',
        4: '128 255 128',
        5: '128 255 255',
        6: '128 128 255',
    };
    return `rgba(${colorMap[colorID] || '#666'} / ${alpha || 1})`;
};
const el = (id) => document.getElementById(id);
function resizeCanvas(canvas) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
function setupCanvas() {
    const canvas = el("canvas");
    resizeCanvas(canvas);
    window.onresize = () => resizeCanvas(canvas);
    const context = canvas.getContext("2d");
    return [canvas, context];
}
function drawNodes(context, nodes) {
    function drawNode(node) {
        function drawShadow() {
            context.shadowColor = 'rgba(0 0 0 / .5)';
            context.shadowBlur = 8;
            context.shadowOffsetX = 4;
            context.shadowOffsetY = 4;
        }
        function drawRect() {
            context.roundRect(node.x, node.y, node.width, node.height, 16);
            context.lineWidth = 4;
            context.strokeStyle = color(node.color);
            context.stroke();
        }
        function fillRect() {
            context.fillStyle = color(node.color, .5);
            context.fill();
        }
        drawShadow();
        context.beginPath();
        drawRect();
        fillRect();
        context.closePath();
    }
    nodes.forEach((node) => {
        context.save();
        drawNode(node);
        context.restore();
    });
}
function draw(data) {
    const [canvas, context] = setupCanvas();
    context.translate(window.innerWidth / 2, window.innerHeight / 2);
    let isDragging = false;
    let dragStartX = 0;
    let dragStartY = 0;
    let needsRedraw = false;
    canvas.addEventListener("mousedown", handleMouseDown);
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseup", handleMouseUp);
    canvas.addEventListener("mouseleave", handleMouseUp);
    function handleMouseDown(event) {
        isDragging = true;
        dragStartX = event.clientX;
        dragStartY = event.clientY;
    }
    function handleMouseMove(event) {
        if (!isDragging)
            return;
        const offsetX = event.clientX - dragStartX;
        const offsetY = event.clientY - dragStartY;
        // Update the translation of the context by the offset
        context.translate(offsetX, offsetY);
        // Redraw the canvas
        needsRedraw = true;
        // Update the drag starting position for the next movement
        dragStartX = event.clientX;
        dragStartY = event.clientY;
    }
    function handleMouseUp(event) {
        isDragging = false;
    }
    function render() {
        if (needsRedraw) {
            context.clearRect(-window.innerWidth / 2, -window.innerHeight / 2, window.innerWidth * 2, window.innerHeight * 2);
            drawNodes(context, data.nodes);
            needsRedraw = false;
        }
        requestAnimationFrame(render);
    }
    needsRedraw = true;
    render();
}
window.onload = () => fetch('/kb/Journal/Questkarte.canvas')
    .then((response) => response.json())
    .then((data) => draw(data));
/*
 let data = {}

    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");

    const cameraOffset = {x: window.innerWidth / 2, y: window.innerHeight / 2};
    const MAX_ZOOM = 5;
    const MIN_ZOOM = 0.1;
    const SCROLL_SENSITIVITY = .0005;

    let cameraZoom = 1;

    const nodePos = {};

    function draw() {
        // makes the canvas the size of the viewport
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        // Translate to the canvas centre before zooming - so you'll always zoom on what you're looking directly at
        ctx.translate(window.innerWidth / 2, window.innerHeight / 2);
        ctx.scale(cameraZoom, cameraZoom);
        ctx.translate(
            -window.innerWidth / 2 + cameraOffset.x,
            -window.innerHeight / 2 + cameraOffset.y
        );

        function drawData() {
            data.edges.forEach(edge => {
                const from = data.nodes.find(node => node.id === edge.fromNode);
                const to = data.nodes.find(node => node.id === edge.toNode);
                if (!from || !to) return;

                // Determine control points for Bezier curve
                const dx = (to.x + (to.width / 2)) - (from.x + (from.width / 2));
                const cp1x = from.x + (from.width / 2) + dx / 3;
                const cp1y = from.y + (from.height / 2);
                const cp2x = to.x + (to.width / 2) - dx / 3;
                const cp2y = to.y + (to.height / 2);

                // Draw Bezier curve
                ctx.beginPath();
                ctx.strokeStyle = '#000';
                ctx.moveTo(from.x + (from.width / 2), from.y + (from.height / 2));
                ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, to.x + (to.width / 2), to.y + (to.height / 2));
                ctx.stroke();
                ctx.closePath();
            });

            data.nodes.forEach(node => {
                ctx.beginPath();
                ctx.fillStyle = 'ivory';
                ctx.fillRect(node.x, node.y, node.width, node.height);

                nodePos[node.id] = {
                    x: (node.x - cameraOffset.x / cameraZoom),
                    y: (node.y - cameraOffset.y / cameraZoom),
                    width: node.width / cameraZoom,
                    height: node.height / cameraZoom
                }

                ctx.fillStyle = '#000';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.font = '16px Calibri';

                const match = (input) => input.match(/\/([^/]+)\.md$/)[1];
                let formatText = node.type === 'text' ? node.text : match(node.file);
                ctx.fillText(formatText, node.x + node.width / 2, node.y + node.height / 2);
                ctx.closePath();
            });
        }

        drawData();
        requestAnimationFrame(draw);
    }

    // Gets the relevant location from a mouse or single touch event
    function getEventLocation(e) {
        if (e.touches && e.touches.length === 1) {
            return {x: e.touches[0].clientX, y: e.touches[0].clientY};
        } else if (e.clientX && e.clientY) {
            return {x: e.clientX, y: e.clientY};
        }
    }

    let isDragging = false;
    let dragStart = {x: 0, y: 0};

    function onPointerDown(e) {
        isDragging = true;
        dragStart.x = getEventLocation(e).x / cameraZoom - cameraOffset.x;
        dragStart.y = getEventLocation(e).y / cameraZoom - cameraOffset.y;
    }

    function onPointerUp(e) {
        isDragging = false;
        initialPinchDistance = null;
        lastZoom = cameraZoom;
    }

    function onPointerMove(e) {
        if (isDragging) {
            cameraOffset.x = getEventLocation(e).x / cameraZoom - dragStart.x;
            cameraOffset.y = getEventLocation(e).y / cameraZoom - dragStart.y;
        }

        const {clientX: x, clientY: y} = e;
        const mouseX = (x + window.innerWidth / 2) * cameraZoom - (window.innerWidth / 2 + cameraOffset.x);
        const mouseY = (y + window.innerHeight / 2) * cameraZoom - (window.innerHeight / 2 + cameraOffset.y);

        data.nodes.forEach(node => {
            const {x: nx, y: ny} = node;
            if (mouseX >= nx && mouseX <= nx + node.width &&
                mouseY >= ny && mouseY <= ny + node.height) {
                console.log(node.text);
            }
        });
    }

    function handleTouch(e, singleTouchHandler) {
        if (e.touches.length === 1) {
            singleTouchHandler(e);
        } else if (e.type === "touchmove" && e.touches.length === 2) {
            isDragging = false;
            handlePinch(e);
        }
    }

    let initialPinchDistance = null;
    let lastZoom = cameraZoom;

    function handlePinch(e) {
        e.preventDefault();

        let touch1 = {x: e.touches[0].clientX, y: e.touches[0].clientY};
        let touch2 = {x: e.touches[1].clientX, y: e.touches[1].clientY};

        // This is distance squared, but no need for an expensive sqrt as it's only used in ratio
        let currentDistance =
            (touch1.x - touch2.x) ** 2 + (touch1.y - touch2.y) ** 2;

        if (initialPinchDistance == null) {
            initialPinchDistance = currentDistance;
        } else {
            adjustZoom(null, currentDistance / initialPinchDistance);
        }
    }

    function adjustZoom(zoomAmount, zoomFactor) {
        if (!isDragging) {
            if (zoomAmount) {
                cameraZoom += zoomAmount;
            } else if (zoomFactor) {
                console.log(zoomFactor);
                cameraZoom = zoomFactor * lastZoom;
            }
            cameraZoom = Math.min(cameraZoom, MAX_ZOOM);
            cameraZoom = Math.max(cameraZoom, MIN_ZOOM);
        }
    }

    canvas.addEventListener("mousedown", onPointerDown);
    canvas.addEventListener("touchstart", (e) => handleTouch(e, onPointerDown));
    canvas.addEventListener("mouseup", onPointerUp);
    canvas.addEventListener("touchend", (e) => handleTouch(e, onPointerUp));
    canvas.addEventListener("mousemove", onPointerMove);
    canvas.addEventListener("touchmove", (e) => handleTouch(e, onPointerMove));
    canvas.addEventListener("wheel", (e) =>
        adjustZoom(e.deltaY * SCROLL_SENSITIVITY)
    );

    // Ready, set, go
    fetch('./../../kb/Journal/Questkarte.canvas').then(response => response.json()).then(d => {
        data = d;
        draw();
    });
*/
//# sourceMappingURL=quests.js.map