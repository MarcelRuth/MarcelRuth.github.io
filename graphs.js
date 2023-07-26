let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');

let nodes = [];
let edges = [];
let node_count = 50;

for (let i = 0; i < node_count; i++) {
    let node = {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2
    };
    nodes.push(node);
}

nodes.forEach((node, i) => {
    nodes.slice(i+1).forEach(node2 => {
        let edge = {node1: node, node2: node2};
        edges.push(edge);
    });
});

function drawGraph() {
    nodes.forEach(node => {
        node.x += node.vx;
        node.y += node.vy;

        if (node.x < 0 || node.x > canvas.width) node.vx = -node.vx;
        if (node.y < 0 || node.y > canvas.height) node.vy = -node.vy;

        ctx.beginPath();
        ctx.arc(node.x, node.y, 2, 0, 2 * Math.PI);
        ctx.fillStyle = "#FFF";
        ctx.fill();
    });

    edges.forEach(edge => {
        let dx = edge.node1.x - edge.node2.x;
        let dy = edge.node1.y - edge.node2.y;
        let dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 200) {
            ctx.beginPath();
            ctx.moveTo(edge.node1.x, edge.node1.y);
            ctx.lineTo(edge.node2.x, edge.node2.y);
            ctx.strokeStyle = `rgba(255, 255, 255, ${ 1 - dist / 200 })`;
            ctx.stroke();
        }
    });
}
