import * as MathService from "./math.service";

export function isLeftSnappingNeeded(firstPolygon, secondPolygon) {
    const firstLine = secondPolygon.getRightLine();
    const secondLine = firstPolygon.getLeftLine();

    const dx = firstPolygon.vertices[0].x - secondPolygon.vertices[1].x;

    return MathService.isVerticalLinesSnapped(firstLine, secondLine) && Math.abs(dx) <= 10;
}

export function isRightSnappingNeeded(firstPolygon, secondPolygon) {
    const firstLine = secondPolygon.getLeftLine();
    const secondLine = firstPolygon.getRightLine();
    const dx = firstPolygon.vertices[1].x - secondPolygon.vertices[0].x;

    return MathService.isVerticalLinesSnapped(firstLine, secondLine) && Math.abs(dx) <= 10;
}

export function isBottomSnappingNeeded(firstPolygon, secondPolygon) {
    const firstLine = secondPolygon.getTopLine();
    const secondLine = firstPolygon.getBottomLine();

    const dy = firstPolygon.vertices[2].y - secondPolygon.vertices[0].y;

    return MathService.isHorizontalLinesSnapped(firstLine, secondLine) && Math.abs(dy) <= 10;
}

export function isTopSnappingNeeded(firstPolygon, secondPolygon) {
    const firstLine = secondPolygon.getBottomLine();
    const secondLine = firstPolygon.getTopLine();

    const dy = firstPolygon.vertices[0].y - secondPolygon.vertices[2].y;

    return MathService.isHorizontalLinesSnapped(firstLine, secondLine) && Math.abs(dy) <= 10;
}

export function snapToTheLeft(firstPolygon, secondPolygon, mouse) {
    const distanceToTheFirstVertex = secondPolygon.vertices[1].y - firstPolygon.vertices[0].y;
    const distanceToTheSecondVertex = secondPolygon.vertices[2].y - firstPolygon.vertices[3].y;

    const dy = MathService.getMinimalDistance(distanceToTheFirstVertex, distanceToTheSecondVertex);

    const dx = secondPolygon.vertices[1].x - firstPolygon.vertices[0].x;

    snapPolygon(firstPolygon, secondPolygon, mouse, dx, dy);
}

export function snapToTheRight(firstPolygon, secondPolygon, mouse) {
    const distanceToTheFirstVertex = secondPolygon.vertices[0].y - firstPolygon.vertices[1].y;
    const distanceToTheSecondVertex = secondPolygon.vertices[3].y - firstPolygon.vertices[2].y;

    const dy = MathService.getMinimalDistance(distanceToTheFirstVertex, distanceToTheSecondVertex);

    const dx = secondPolygon.vertices[0].x - firstPolygon.vertices[1].x;

    snapPolygon(firstPolygon, secondPolygon, mouse, dx, dy);
}

export function snapToTheBottom(firstPolygon, secondPolygon, mouse) {
    const distanceToTheFirstVertex = secondPolygon.vertices[0].x - firstPolygon.vertices[3].x;
    const distanceToTheSecondVertex = secondPolygon.vertices[1].x - firstPolygon.vertices[2].x;

    const dx = MathService.getMinimalDistance(distanceToTheFirstVertex, distanceToTheSecondVertex);

    const dy = secondPolygon.vertices[0].y - firstPolygon.vertices[2].y;
    
    snapPolygon(firstPolygon, secondPolygon, mouse, dx, dy);
}

export function snapToTheTop(firstPolygon, secondPolygon, mouse) {
    const distanceToTheFirstVertex = secondPolygon.vertices[3].x - firstPolygon.vertices[0].x;
    const distanceToTheSecondVertex = secondPolygon.vertices[2].x - firstPolygon.vertices[1].x;

    const dx = MathService.getMinimalDistance(distanceToTheFirstVertex, distanceToTheSecondVertex);
    
    const dy = secondPolygon.vertices[2].y - firstPolygon.vertices[0].y;

    snapPolygon(firstPolygon, secondPolygon, mouse, dx, dy);
}

export function snapPolygon(firstPolygon, secondPolygon, mouse, dx, dy) {
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