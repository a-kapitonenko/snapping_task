import * as MathService from "./math.service";
import Polygon from "./polygon"

class Rectangle  extends Polygon{
    constructor(firstX, firstY, width, height) {
        super(firstX, firstY, width, height);
    }

    getLeftLine() {
        const leftLine = MathService.initializeLine(this._vertices[0], this._vertices[3]);

        return leftLine;
    }

    getRightLine() {
        const rightLine = MathService.initializeLine(this._vertices[1], this._vertices[2]);
        
        return rightLine;
    }

    getBottomLine() {
        const bottomLine = MathService.initializeLine(this._vertices[3], this._vertices[2]);
        
        return bottomLine;
    }

    getTopLine() {
        const topLine = MathService.initializeLine(this._vertices[0], this._vertices[1]);
        
        return topLine;
    }
}

export default Rectangle;