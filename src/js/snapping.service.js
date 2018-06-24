import * as MathService from "./math.service";

export function isLeftSnapping(firstPolygon, secondPolygon) {
    const firstLine = MathService.initializeLine(secondPolygon.vertices[1], secondPolygon.vertices[2]);
    const secondLine = MathService.initializeLine(firstPolygon.vertices[0], firstPolygon.vertices[3]);

    const dx = firstPolygon.vertices[0].x - secondPolygon.vertices[1].x;

    return MathService.isVerticalLinesSnapped(firstLine, secondLine) && Math.abs(dx) <= 10;
}

export function isRightSnapping(firstPolygon, secondPolygon) {
    const firstLine = MathService.initializeLine(secondPolygon.vertices[0], secondPolygon.vertices[3]);
    const secondLine = MathService.initializeLine(firstPolygon.vertices[1], firstPolygon.vertices[2]);

    const dx = firstPolygon.vertices[1].x - secondPolygon.vertices[0].x;

    return MathService.isVerticalLinesSnapped(firstLine, secondLine) && Math.abs(dx) <= 10;
}

export function isBottomSnapping(firstPolygon, secondPolygon) {
    const firstLine = MathService.initializeLine(secondPolygon.vertices[0], secondPolygon.vertices[1]);
    const secondLine = MathService.initializeLine(firstPolygon.vertices[3], firstPolygon.vertices[2]);

    const dy = firstPolygon.vertices[2].y - secondPolygon.vertices[0].y;

    return MathService.isHorizontalLinesSnapped(firstLine, secondLine) && Math.abs(dy) <= 10;
}

export function isTopSnapping(firstPolygon, secondPolygon) {
    const firstLine = MathService.initializeLine(secondPolygon.vertices[3], secondPolygon.vertices[2]);
    const secondLine = MathService.initializeLine(firstPolygon.vertices[0], firstPolygon.vertices[1]);

    const dy = firstPolygon.vertices[0].y - secondPolygon.vertices[2].y;

    return MathService.isHorizontalLinesSnapped(firstLine, secondLine) && Math.abs(dy) <= 10;
}

export function leftSnapping(firstPolygon, secondPolygon, mouse) {
    const dx = secondPolygon.vertices[1].x - firstPolygon.vertices[0].x;
    const dy = secondPolygon.vertices[2].y - firstPolygon.vertices[2].y;

    snapping(firstPolygon, secondPolygon, mouse, dx, dy);
}

export function rightSnapping(firstPolygon, secondPolygon, mouse) {
    const dx = secondPolygon.vertices[0].x - firstPolygon.vertices[1].x;
    const dy = secondPolygon.vertices[2].y - firstPolygon.vertices[2].y;

    snapping(firstPolygon, secondPolygon, mouse, dx, dy);
}

export function bottomSnapping(firstPolygon, secondPolygon, mouse) {
    const dx = secondPolygon.vertices[0].x - firstPolygon.vertices[0].x
    const dy = secondPolygon.vertices[0].y - firstPolygon.vertices[2].y;
    
    snapping(firstPolygon, secondPolygon, mouse, dx, dy);
}

export function topSnapping(firstPolygon, secondPolygon, mouse) {
    const dx = secondPolygon.vertices[0].x - firstPolygon.vertices[0].x
    const dy = secondPolygon.vertices[2].y - firstPolygon.vertices[0].y;

    snapping(firstPolygon, secondPolygon, mouse, dx, dy);
}

export function snapping(firstPolygon, secondPolygon, mouse, dx, dy) {
    if (!firstPolygon.isSnapped && !secondPolygon.isSnapped){
        firstPolygon.move(dx, dy);

        secondPolygon.isSnapped = true;
        firstPolygon.isSnapped = true;

        mouse.fixedX = mouse.incrementX + mouse.x;
        mouse.fixedY = mouse.incrementY + mouse.y;
    } else if (firstPolygon.isSnapped) {
        if (Math.abs(mouse.fixedX - mouse.clientX) >= 50 || Math.abs(mouse.fixedY - mouse.clientY) >= 50) {
            firstPolygon.move(mouse.clientX - mouse.fixedX, mouse.clientY - mouse.fixedY);

            firstPolygon.isSnapped = false;    
            secondPolygon.isSnapped = false;    
        }
    }
}