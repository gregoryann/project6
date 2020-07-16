//create index.html and empty tetris.js

<html>
<head>
    <title>Tetris</title>
</head>
<body>
    <canvas id="tetris" width="240" height="400" />
    <script src="tetris.js"></script>
</body>
</html>

//Retrieve and fill canvas with black
const canvas = document.getElementById('tetris');
const context = canvas.getContext('2d');

context.fillStyle = '#000';
context.fillRect(0, 0, canvas.width, canvas.height);
