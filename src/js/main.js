import Mouse from './mouse';
import SelectService from './select.service';
import * as PolygonService from './polygon.service';

window.onload = () => {
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext('2d');
    const mouse = new Mouse(0 ,0);
    const selectService = new SelectService();

    canvas.setAttribute('height',window.innerHeight - 20);
    canvas.setAttribute('width',window.innerWidth - 20);
    
    const polygons = PolygonService.initializePolygons();

    PolygonService.drawPolygons(polygons, canvas, ctx);

    canvas.addEventListener('mousedown', (evt) => {
        mouse.x = evt.clientX;
        mouse.y = evt.clientY;

        polygons.some((item) => {
            if (item.isPointBelongsThePolygon(mouse.x, mouse.y, item)) {
                selectService.selectedItem = item;
                if (item._isSnapped) {
                    mouse.fixedX = mouse.x;
                    mouse.fixedY = mouse.y;
                }
            }
        });
    });

    canvas.addEventListener('mousemove', (evt) => {
        if (selectService.isItemSelected) {
            mouse.clientX = evt.clientX;
            mouse.clientY = evt.clientY;
            mouse.incrementX = evt.clientX - mouse.x;
            mouse.incrementY = evt.clientY - mouse.y;

            PolygonService.snappingOfPolygons(polygons, selectService.selectedItem, mouse);

            mouse.x = evt.clientX;
            mouse.y = evt.clientY;

            PolygonService.intersectionOfPolygons(polygons, selectService.selectedItem);

            PolygonService.drawPolygons(polygons, canvas, ctx);
        }
    });

    canvas.addEventListener('mouseup', () => {
        mouse.clear();
        PolygonService.clearSnapping(polygons);

        if (selectService.isItemSelected) {
            PolygonService.initialPositionOfPolygons(selectService.selectedItem);
            PolygonService.drawPolygons(polygons, canvas, ctx);
        }

        selectService.deleteSelectedItem();
    });
}
