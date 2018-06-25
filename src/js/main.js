import App from "./app";

window.onload = () => {
    const canvas = document.getElementById("canvas");
    const app = new App(canvas);

    app.canvas.addEventListener('mousedown', (evt) => app.mousedownEventListener(evt));
    app.canvas.addEventListener('mousemove', (evt) => app.mousemoveEventListener(evt));
    app.canvas.addEventListener('mouseup', () => app.mouseupEventListener());
}
