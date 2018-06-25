class Mouse {
    constructor(x, y) {
        this._x = x;
        this._y = y;
        this._fixedX = 0;
        this._fixedY = 0;
        this._incrementX = 0;
        this._incrementY = 0;
        this._clientX = 0;
        this._clientY = 0;
    }

    get x() {
        return this._x;
    }

    get y() {
        return this._y;
    }

    get fixedX() {
        return this._fixedX;
    }

    get fixedY() {
        return this._fixedY;
    }

    get incrementX() {
        return this._incrementX;
    }

    get incrementY() {
        return this._incrementY;
    }

    get clientX() {
        return this._clientX;
    }

    get clientY() {
        return this._clientY;
    }

    set x(x) {
        this._x = x;
    }
    
    set y(y) {
        this._y = y;
    }

    set fixedX(x) {
        this._fixedX = x;
    }

    set fixedY(y) {
        this._fixedY = y;
    }

    set incrementX(incrementX) {
        this._incrementX = incrementX;
    }

    set incrementY(incrementY) {
        this._incrementY = incrementY;
    }

    set clientX(x) {
        this._clientX = x;
    }

    set clientY(y) {
        this._clientY = y;
    }

    clear() {
        this._x = 0;
        this._y = 0;
        this._fixedX = 0;
        this._fixedY = 0;
        this._incrementX = 0;
        this._incrementY = 0;
        this._clientX = 0;
        this._clientY = 0;
    }
}

export default Mouse;
