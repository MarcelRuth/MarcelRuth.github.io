// Variables for the molecules
let molecules = [];
let molecule_count = 20;
let colors = {
    "O": "red",
    "H": "white",
    "N": "blue",
    "C": "lightgrey",
    "S": "yellow"
};

// Molecule structures
let moleculeStructures = [
    // Water (H2O)
    [{element: "O", x: 50, y: 50}, {element: "H", x: 30, y: 30}, {element: "H", x: 70, y: 30}],
    // Carbon dioxide (CO2)
    [{element: "C", x: 50, y: 50}, {element: "O", x: 30, y: 50}, {element: "O", x: 70, y: 50}],
    // Ammonia (NH3)
    [{element: "N", x: 50, y: 50}, {element: "H", x: 50, y: 30}, {element: "H", x: 30, y: 70}, {element: "H", x: 70, y: 70}],
    // Sulfur hexafluoride (SF6)
    [{element: "S", x: 50, y: 50}, {element: "F", x: 50, y: 20}, {element: "F", x: 20, y: 50}, {element: "F", x: 50, y: 80}, {element: "F", x: 80, y: 50}, {element: "F", x: 30, y: 30}, {element: "F", x: 70, y: 70}]
];

// Create molecules
for (let i = 0; i < molecule_count; i++) {
    let structure = moleculeStructures[Math.floor(Math.random() * moleculeStructures.length)];
    let molecule = {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        nodes: structure.map(atom => ({...atom, x: atom.x / 100 * canvas.width, y: atom.y / 100 * canvas.height})),
    };
    molecules.push(molecule);
}

// Animation function
let step = () => {
    ctx.fillStyle = "#111";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw the graph
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
    
    // Draw the molecules
    molecules.forEach(molecule => {
        molecule.x += molecule.vx;
        molecule.y += molecule.vy;

        if (molecule.x < 0 || molecule.x > canvas.width) molecule.vx = -molecule.vx;
        if (molecule.y < 0 || molecule.y > canvas.height) molecule.vy = -molecule.vy;

        molecule.nodes.forEach(node => {
            ctx.beginPath();
            ctx.arc(molecule.x + node.x - canvas.width / 2, molecule.y + node.y - canvas.height / 2, 7, 0, 2 * Math.PI);  // Increased node size
            ctx.fillStyle = colors[node.element];
            ctx.fill();
        });

        for (let i = 0; i < molecule.nodes.length; i++) {
            for (let j = i + 1; j < molecule.nodes.length; j++) {
                ctx.beginPath();
                ctx.moveTo(molecule.x + molecule.nodes[i].x - canvas.width / 2, molecule.y + molecule.nodes[i].y - canvas.height / 2);
                ctx.lineTo(molecule.x + molecule.nodes[j].x - canvas.width / 2, molecule.y + molecule.nodes[j].y - canvas.height / 2);
                ctx.strokeStyle = "white";
                ctx.stroke();
            }
        }
    });

    // Request the next animation frame
    requestAnimationFrame(step);
}

// Start the animation
step();
