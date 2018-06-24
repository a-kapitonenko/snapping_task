import * as MathService from "./math.service";
import * as SnappingService from "./snapping.service"
import Polygon from "./polygon";
import Mouse from "./mouse";

var config = require('../config.json');
   
export function initializePolygons() {
    const polygons = [];
    const numberOfPolygons = config.polygon.numberOfPolygons;
    const centerSpacing = config.polygon.centerSpacing;

    const pointX = config.polygon.firstPoint.X;
    let pointY = config.polygon.firstPoint.Y;

    for (let i = 0; i < numberOfPolygons; i++) {
        const width = MathService.getRandomArbitrary(config.polygon.width.min, config.polygon.width.max);
        const height = MathService.getRandomArbitrary(config.polygon.height.min, config.polygon.height.max);
        const polygon = new Polygon(pointX, pointY, width, height);

        polygons.push(polygon);
        pointY += centerSpacing; 
    }

    return polygons;
}

export function drawPolygons(polygons, canvas, ctx) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    polygons.forEach((item) => {
        item.draw(ctx);
    });
}

export function intersectionOfPolygons(polygons, selectedItem) {
    polygons.forEach((item) => {
        if (selectedItem !== item) {
            if (isPolygonsIntersects(selectedItem, item) || isPolygonsOverlapping(selectedItem, item)) {
                selectedItem.addIntersection(item);
                item.addIntersection(selectedItem);
            } else {
                selectedItem.deleteIntersection(item);
                item.deleteIntersection(selectedItem);
            }
        }
    });
}

export function isPolygonsIntersects(firstPolygon, secondPolygon) {
    if(firstPolygon.isPolygonWindowIntersects(secondPolygon)) {
        let previousVertex = secondPolygon.vertices.slice(-1)[0];

        return secondPolygon.vertices.some((vertex) => {
            const line = MathService.initializeLine(previousVertex, vertex);

            previousVertex = vertex;

            return firstPolygon.isPolygonIntersects(line);
        });
    }
}

export function isPolygonsOverlapping(firstPolygon, secondPolygon) {
    const isfirstPolygonBelongsSecondPolygon = firstPolygon.vertices.some((item) => {
        return secondPolygon.isPointBelongsThePolygon(item.x, item.y);
    });

    const isSecondPolygonBelongsFirstPolygon = secondPolygon.vertices.some((item) => {
        return firstPolygon.isPointBelongsThePolygon(item.x, item.y);
    });

    return isfirstPolygonBelongsSecondPolygon || isSecondPolygonBelongsFirstPolygon;
}

export function initialPositionOfPolygons(selectedItem) {
    if (selectedItem.isIntersected) {
        const dx = selectedItem.firstVertex.x - selectedItem.vertices[0].x;
        const dy = selectedItem.firstVertex.y - selectedItem.vertices[0].y;

        selectedItem.move(dx, dy);

        selectedItem.intersections.forEach((item) => {
            selectedItem.deleteIntersection(item);
            item.deleteIntersection(selectedItem);
        });
    } else {
        selectedItem.changeFirstPosition(selectedItem.vertices[0].x, selectedItem.vertices[0].y);
    }
}

export function snappingOfPolygons(polygons, selectedItem, mouse) {
    polygons.forEach((item) => {
        if (selectedItem !== item) {
            if (SnappingService.isLeftSnapping(selectedItem, item)) {
                SnappingService.leftSnapping(selectedItem, item, mouse)
            } else if (SnappingService.isRightSnapping(selectedItem, item)) {
                SnappingService.rightSnapping(selectedItem, item, mouse)
            } else if (SnappingService.isBottomSnapping(selectedItem, item)) {
                SnappingService.bottomSnapping(selectedItem, item, mouse)
            } else if (SnappingService.isTopSnapping(selectedItem, item)) {
                SnappingService.topSnapping(selectedItem, item, mouse)
            } else if(item.isSnapped) {
                item.isSnapped = false;
                selectedItem.isSnapped = false;
            }
        }
    });

    if(!selectedItem.isSnapped) {
        selectedItem.move(mouse.incrementX, mouse.incrementY);
    }
    
}

export function clearSnapping(polygons) {
    polygons.forEach((item) => {
        item.isSnapped = false;
    });
}