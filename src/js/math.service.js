export function getRandomArbitrary(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

export function isLinesCross(firstLine, secondLine) {
    if (firstLine[1].x === firstLine[0].x || secondLine[1].x === secondLine[0].x) {
        return isVerticalLineCross(firstLine, secondLine);
    }

    const slopeFirstLine = getSlope(firstLine);
    const slopeSecondLine = getSlope(secondLine);

    if (slopeFirstLine === slopeSecondLine) {
        return false;
    }

    const coeffFirstLine = getCoeffLine(firstLine, slopeFirstLine);
    const coeffSecondLine = getCoeffLine(secondLine, slopeSecondLine);

    const x = Math.round((coeffSecondLine - coeffFirstLine) / (slopeFirstLine - slopeSecondLine));
    const y = Math.round(slopeFirstLine * x + coeffFirstLine);

    return isPointBelongsLine(x, y, firstLine) && isPointBelongsLine(x, y, secondLine);
}

export function isVerticalLineCross(firstLine, secondLine) {
    let x, slope, coeffLine;

    if (firstLine[1].x === firstLine[0].x && secondLine[1].x === secondLine[0].x) {
        return false;
    } else if (firstLine[0].x === firstLine[1].x) {
        x = firstLine[0].x;
        slope = getSlope(secondLine);
        coeffLine = getCoeffLine(secondLine, slope);
    } else if (secondLine[0].x === secondLine[1].x){
        x = secondLine[0].x;
        slope = getSlope(firstLine);
        coeffLine = getCoeffLine(firstLine, slope);
    }

    const y = Math.round(slope * x + coeffLine);

    return isPointBelongsLine(x, y, firstLine) && isPointBelongsLine(x, y, secondLine);
}

export function getSlope(line) {
    if (line[1].x === line[0].x) {
        return 0;
    }
    return (line[1].y - line[0].y) / (line[1].x - line[0].x);
}

export function getCoeffLine(line, slope) {
    return line[0].y - slope * line[0].x;
}

export function isPointBelongsLine(x, y, line) {
    return isXBelongsLine(x, line) && isYBelongsLine(y, line);
}

export function isXBelongsLine (x, line) {
    return (line[0].x <= x) && (x <= line[1].x) || (line[1].x <= x  )&& (x <= line[0].x);
}

export function isYBelongsLine (y, line) {
    return (line[0].y <= y) && (y <= line[1].y) || (line[1].y <= y ) && (y <= line[0].y);
}

export function initializeLine(firstVertex, secondVertex) {
    const line = [];

    line.push(firstVertex);
    line.push(secondVertex);

    return line;
}

export function isPointWithinTheBorder(x, y, line) {
    return x > (line[0].x - line[1].x) * (y - line[1].y) / (line[0].y - line[1].y) + line[1].x;
}

export function isPointWithinTheWindow(point, window) { 
    return point.x > window[0].x && point.x < window[1].x && point.y > window[0].y && point.y < window[2].y;
}

export function isWindowsItersects(first, second) {
    const x = first[0].x <= second[0].x && first[1].x >= second[1].x;
    const y = first[0].y >= second[0].y && first[3].y <= second[3].y;
    return x && y;
}

export function initializeRectangle(firstVertex, secondVertex, thirdVertex, fourthVertex) {
    const rectangle = [];

    rectangle.push(firstVertex);
    rectangle.push(secondVertex);
    rectangle.push(thirdVertex);
    rectangle.push(fourthVertex);

    return rectangle;
}

export function isVerticalLinesSnapped(firstLine, secondLine) {
    const isFirstLineBelongSecondLine = isVertexBelongVerticalLine(firstLine[0], secondLine) || isVertexBelongVerticalLine(firstLine[1], secondLine);
    const isSecondLineBelongFirstLine = isVertexBelongVerticalLine(secondLine[0], firstLine) || isVertexBelongVerticalLine(secondLine[1], firstLine);
    
    return isFirstLineBelongSecondLine || isSecondLineBelongFirstLine;
}

export function isHorizontalLinesSnapped(firstLine, secondLine) {
    const isFirstLineBelongSecondLine = isVertexBelongHorizontalLine(firstLine[0], secondLine) || isVertexBelongHorizontalLine(firstLine[1], secondLine);
    const isSecondLineBelongFirstLine = isVertexBelongHorizontalLine(secondLine[0], firstLine) || isVertexBelongHorizontalLine(secondLine[1], firstLine);
    
    return isFirstLineBelongSecondLine || isSecondLineBelongFirstLine;
}

export function isVertexBelongVerticalLine(vertex, line) {
    return (line[0].y + 0) <= vertex.y && vertex.y <= (line[1].y - 0)
}

export function isVertexBelongHorizontalLine(vertex, line) {
    return (line[0].x + 0) <= vertex.x && vertex.x <= (line[1].x - 0)
}