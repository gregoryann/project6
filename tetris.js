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
context.scale(20, 20);

context.fillStyle = '#000';
context.fillRect(0, 0, canvas.width, canvas.height);
const matrix = [
    [0, 1, 0],
    [1, 1, 1],
    [0, 0, 0],
];

matrix.forEach((row, y) => {
    row.forEach((value, x) => {
        if (value !== 0) {
            context.fillStyle = 'red';
            context.fillRect(x, y, 1, 1);
        }
        
//Wrap matrix drawing in function               
function drawMatrix(matrix) {
   
    //Add offset support to drawMatrix()
    function drawMatrix(matrix, offset) {
    matrix.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value !== 0) {
                context.fillStyle = 'red';
                context.fillRect(x, y, 1, 1);
                context.fillRect(x + offset.x,
                                 y + offset.y,
                                 1, 1);
            }
        });        
        
    });
});
}
 //Add player structure       
const player = {
    pos: {x: 5, y: 5},
    matrix: matrix,
};        
drawMatrix(matrix);
drawMatrix(matrix, {x: 5, y: 5});
