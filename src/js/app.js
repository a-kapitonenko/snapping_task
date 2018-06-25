import Mouse from './mouse';
import SelectService from './select.service';
import * as PolygonService from './polygon.service';

class App {
    constructor(canvas) {
        this.canvas = canvas;

        this.__initialize();
    }

    __initialize() {
        this.ctx = this.canvas.getContext('2d');
        this.mouse = new Mouse(0 ,0);
        this.selectService = new SelectService();

        this.canvas.setAttribute('height',window.innerHeight - 20);
        this.canvas.setAttribute('width',window.innerWidth - 20);

        this.polygons = PolygonService.initializePolygons();

        PolygonService.drawPolygons(this.polygons, this.canvas, this.ctx);
    }

    mousedownEventListener(evt) {
        this.mouse.x = evt.clientX;
        this.mouse.y = evt.clientY;
    
        this.polygons.some((item) => {
            if (item.isPointBelongsThePolygon(this.mouse.x, this.mouse.y, item)) {
                this.selectService.selectedItem = item;
                if (item._isSnapped) {
                    this.mouse.fixedX = this.mouse.x;
                    this.mouse.fixedY = this.mouse.y;
                }
            }
        });
    }

    mousemoveEventListener(evt) {
        if (this.selectService.isItemSelected) {
            this.mouse.clientX = evt.clientX;
            this.mouse.clientY = evt.clientY;
            this.mouse.incrementX = evt.clientX - this.mouse.x;
            this.mouse.incrementY = evt.clientY - this.mouse.y;

            PolygonService.snappingOfPolygons(this.polygons, this.selectService.selectedItem, this.mouse);

            this.mouse.x = evt.clientX;
            this.mouse.y = evt.clientY;

            PolygonService.intersectionOfPolygons(this.polygons, this.selectService.selectedItem);

            PolygonService.drawPolygons(this.polygons, this.canvas, this.ctx);
        }
    }

    mouseupEventListener() {
        this.mouse.clear();

        PolygonService.clearSnapping(this.polygons);

        if (this.selectService.isItemSelected) {
            PolygonService.initialPositionOfPolygons(this.selectService.selectedItem);
            PolygonService.drawPolygons(this.polygons, this.canvas, this.ctx);
        }

        this.selectService.removeSelection();
    }
}

export default App;