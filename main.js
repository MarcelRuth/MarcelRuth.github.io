let resize = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.onresize = resize;
resize();

let step = () => {
    ctx.fillStyle = "#111";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    drawGraph();
    drawMolecules();

    requestAnimationFrame(step);
}
step();
