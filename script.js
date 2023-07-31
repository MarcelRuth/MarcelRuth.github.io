let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');

let resize = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.onresize = resize;
resize();

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

let draggingNode = null;

canvas.addEventListener('mousedown', (e) => {
    let rect = canvas.getBoundingClientRect();
    let x = e.clientX - rect.left;
    let y = e.clientY - rect.top;

    let closestNode = null;
    let closestDist = Infinity;

    nodes.forEach(node => {
        let dx = node.x - x;
        let dy = node.y - y;
        let dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < closestDist) {
            closestNode = node;
            closestDist = dist;
        }
    });

    if (closestDist < 10) {
        draggingNode = closestNode;
    }
});

canvas.addEventListener('mousemove', (e) => {
    if (draggingNode) {
        let rect = canvas.getBoundingClientRect();
        let x = e.clientX - rect.left;
        let y = e.clientY - rect.top;

        draggingNode.x = x;
        draggingNode.y = y;
    }
});

canvas.addEventListener('mouseup', (e) => {
    draggingNode = null;
});

canvas.addEventListener('click', (e) => {
    let rect = canvas.getBoundingClientRect();
    let x = e.clientX - rect.left;
    let y = e.clientY - rect.top;

    let node = {
        x: x,
        y: y,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2
    };

    nodes.push(node);
});

canvas.addEventListener('contextmenu', (e) => {
    e.preventDefault();

    let rect = canvas.getBoundingClientRect();
    let x = e.clientX - rect.left;
    let y = e.clientY - rect.top;

    let closestNode = null;
    let closestDist = Infinity;

    nodes.forEach(node => {
        let dx = node.x - x;
        let dy = node.y - y;
        let dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < closestDist) {
            closestNode = node;
            closestDist = dist;
        }
    });

    if (closestDist < 10) {
        nodes = nodes.filter(node => node !== closestNode);
    }
});

let step = () => {
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    nodes.forEach(node => {
        if (node !== draggingNode) {
            node.x += node.vx;
            node.y += node.vy;

            if (node.x < 0 || node.x > canvas.width) node.vx = -node.vx;
            if (node.y < 0 || node.y > canvas.height) node.vy = -node.vy;
        }

        ctx.beginPath();
        ctx.arc(node.x, node.y, 2, 0, 2 * Math.PI);
        ctx.fillStyle = "black";
        ctx.fill();
    });

    nodes.forEach((node, i) => {
        nodes.slice(i+1).forEach(node2 => {
            let dx = node.x - node2.x;
            let dy = node.y - node2.y;
            let dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < 200) {
                ctx.beginPath();
                ctx.moveTo(node.x, node.y);
                ctx.lineTo(node2.x, node2.y);
                ctx.strokeStyle = `rgba(0, 0, 0, ${ 1 - dist / 200 })`;
                ctx.stroke();
            }
        });
    });

    requestAnimationFrame(step);
}
step();
