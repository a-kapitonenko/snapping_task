import * as MathService from "./math.service";

class Polygon {
    constructor(firstX, firstY, width, height) {
        this._firstVertex = {
            x: firstX,
            y: firstY
        };
        this._vertices = [];
        this._width = width;
        this._height = height;
        this._isIntersected = false;
        this._intersections = [];
        this._isSnapped = false;

        this.__initialize();
    }

    get vertices() {
        return this._vertices;
    }

    get firstVertex() {
        return this._firstVertex;
    }

    get centerPoint() {
        return this._centerPoint;
    }
    
    get isIntersected() {
        return this._isIntersected;
    }

    get isSnapped() {
        return this._isSnapped;
    }

    get intersections() {
        return this._intersections;
    }

    set isIntersected(value) {
        this._isIntersected = value;
    }

    set isSnapped(value) {
        this._isSnapped = value;
    }

    __initialize() {
        const x = this._firstVertex.x;
        const y = this._firstVertex.y;

        const secondVertex = {
            x: x + this._width,
            y: y
        };
        const thirdVertex = {
            x: secondVertex.x,
            y: secondVertex.y + this._height  
        };
        const fourthVertex = {
            x: thirdVertex.x - this._width,
            y: thirdVertex.y
        }

        this._vertices = MathService.initializeRectangle({x,y}, secondVertex, thirdVertex, fourthVertex);
    }
    
    draw(ctx) {
        ctx.fillStyle = this.getFillStyle();
        ctx.beginPath();
        ctx.moveTo(this._vertices[0].x, this._vertices[0].y);

        this._vertices.forEach((vertex) => {
            ctx.lineTo(vertex.x, vertex.y);
        });

        ctx.fill();
    }

    isPointBelongsThePolygon(x, y) {
        const point = {x,y};

        return MathService.isPointWithinTheWindow(point, this._vertices);
    }

    isPolygonWindowIntersects(polygon) {
        const value =  polygon.vertices.some((item) => {
            return MathService.isPointWithinTheWindow(item, this._vertices);
        });

        if (!value) {
            return MathService.isWindowsItersects(polygon.vertices, this._vertices) || MathService.isWindowsItersects(this._vertices, polygon.vertices);
        }
    }

    isPolygonIntersects(secondLine) {
        let previousVertex = this._vertices.slice(-1)[0];

        return this._vertices.some((vertex) => {
            const line = MathService.initializeLine(previousVertex, vertex);

            previousVertex = vertex;

            return MathService.isLinesCross(line, secondLine);
        });
    }

    addIntersection(polygon) {
        if (this._intersections.indexOf(polygon) === -1) {
            this._intersections.push(polygon);
            this._isIntersected = true;
        }
    }

    deleteIntersection(polygon) {
        if (this._intersections.indexOf(polygon) !== -1) {
            this._intersections.splice(this._intersections.indexOf(polygon), 1);

            if (!this._intersections.length) {
                this._isIntersected = false;
            }
        }
    }

    move(dx, dy) {
        this._vertices.forEach((item) => {
            item.x += dx;
            item.y += dy;
        })
    }

    changeFirstPosition(x, y) {
        this._firstVertex = {x, y};
    }


    getFillStyle() {
        if (this._isIntersected) {
            return "#FF0000";
        } else { 
            return "#000000";
        }
    }
};

export default Polygon;