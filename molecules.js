let molecules = [];
let molecule_count = 20;
let colors = {
    "O": "red",
    "H": "white",
    "N": "blue",
    "C": "lightgrey",
    "S": "yellow"
}

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

function drawMolecules() {
    molecules.forEach(molecule => {
        molecule.x += molecule.vx;
        molecule.y += molecule.vy;

        if (molecule.x < 0 || molecule.x > canvas.width) molecule.vx = -molecule.vx;
        if (molecule.y < 0 || molecule.y > canvas.height) molecule.vy = -molecule.vy;

        molecule.nodes.forEach(node => {
            ctx.beginPath();
            ctx.arc(molecule.x + node.x - canvas.width / 2, molecule.y + node.y - canvas.height / 2, 5, 0, 2 * Math.PI);
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
}
