window.onload = function() {
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    var topics = [
        { name: 'Graph Neural Networks', url: 'graph_neural_networks.html', color: '#D4AF37' },
        { name: 'Supervised Learning', url: 'supervised_learning.html', color: '#FF4500' },
        { name: 'Computational Chemistry', url: 'computational_chemistry.html', color: '#800080' }
    ];

    var nodes = topics.map(function(topic, i) {
        return {
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 2,
            vy: (Math.random() - 0.5) * 2,
            radius: 100,
            color: topic.color,
            topic: topic
        };
    });

    var draggingNode = null;

    function drawNode(node) {
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = node.color;
        ctx.fill();
        ctx.fillStyle = '#000000';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.font = '16px Arial';
        ctx.fillText(node.topic.name, node.x, node.y);
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        nodes.forEach(drawNode);

        nodes.forEach(function(node, i) {
            if (node !== draggingNode) {
                node.x += node.vx;
                node.y += node.vy;
            }

            if (node.x - node.radius < 0) node.vx = Math.abs(node.vx);
            if (node.x + node.radius > canvas.width) node.vx = -Math.abs(node.vx);
            if (node.y - node.radius < 0) node.vy = Math.abs(node.vy);
            if (node.y + node.radius > canvas.height) node.vy = -Math.abs(node.vy);

            nodes.slice(i + 1).forEach(function(node2) {
                var dx = node2.x - node.x;
                var dy = node2.y - node.y;
                var dist = Math.sqrt(dx * dx + dy * dy);
                var radii = node.radius + node2.radius;

                if (dist < radii) {
                    var angle = Math.atan2(dy, dx);
                    var targetX = node.x + Math.cos(angle) * radii;
                    var targetY = node.y + Math.sin(angle) * radii;
                    var ax = (targetX - node2.x) * 0.02;
                    var ay = (targetY - node2.y) * 0.02;

                    node.vx -= ax;
                    node.vy -= ay;
                    node2.vx += ax;
                    node2.vy += ay;
                }
            });
        });

        requestAnimationFrame(animate);
    }

    animate();

    canvas.addEventListener('mousedown', function(e) {
        var rect = canvas.getBoundingClientRect();
        var x = e.clientX - rect.left;
        var y = e.clientY - rect.top;

        nodes.forEach(function(node) {
            var dx = node.x - x;
            var dy = node.y - y;
            var dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < node.radius) {
                draggingNode = node;
            }
        });
    });

    canvas.addEventListener('mousemove', function(e) {
        if (draggingNode) {
            var rect = canvas.getBoundingClientRect();
            var x = e.clientX - rect.left;
            var y = e.clientY - rect.top;

            draggingNode.x = x;
            draggingNode.y = y;
        }
    });

    canvas.addEventListener('mouseup', function(e) {
        draggingNode = null;
    });

    canvas.addEventListener('dblclick', function(e) {
        var rect = canvas.getBoundingClientRect();
        var x = e.clientX - rect.left;
        var y = e.clientY - rect.top;

        nodes.forEach(function(node) {
            var dx = node.x - x;
            var dy = node.y - y;
            var dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < node.radius) {
                window.location.href = node.topic.url;
            }
        });
    });
};
