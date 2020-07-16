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

//Add collide function
function collide(arena, player) {
    const m = player.matrix;
    const o = player.pos;
    for (let y = 0; y < m.length; ++y) {
        for (let x = 0; x < m[y].length; ++x) {
            if (m[y][x] !== 0 &&
               (arena[y + o.y] &&
                arena[y + o.y][x + o.x]) !== 0) {
                return true;
            }
        }
    }
    return false;
}



//Add createMatrix function
function createMatrix(w, h) {
    const matrix = [];
    while (h--) {
        matrix.push(new Array(w).fill(0));
    }
    return matrix;
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

//Setup arena and log with table

const arena = createMatrix(12, 20);



 //Add player structure       
const player = {
    pos: {x: 5, y: 5},
    matrix: matrix,
};        

drawMatrix(matrix);
drawMatrix(matrix, {x: 5, y: 5});
//Call drawMatrix with player structure.
 drawMatrix(player.matrix, player.pos);

//Wrap drawMatrix() in draw() function      
 function draw() {
     //Clear in beginning of draw()
     context.fillStyle = '#000';
    context.fillRect(0, 0, canvas.width, canvas.height);
    drawMatrix(player.matrix, player.pos);
}

//Add merge function
function merge(arena, player) {
    player.matrix.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value !== 0) {
                arena[y + player.pos.y][x + player.pos.x] = value;
            }
        });
    });
}

function playerDrop() {
    player.pos.y++;
    
    //Collide on drop and merge
    if (collide(arena, player)) {
        player.pos.y--;
        merge(arena, player);
        player.pos.y = 0;
    }   
    
    
    dropCounter = 0;
}        
        
 //Add auto draw on requestAnimationFrame       
function update() {
   
 //Demonstrate time given by requestAnimationFrame
   
    function update(time) {
    console.log(time);
let dropCounter = 0;
let dropInterval = 1000;       
        
//Refactor update to measure delta time
let lastTime = 0;
function update(time = 0) {
    const deltaTime = time - lastTime;
    
    
    dropCounter += deltaTime;
    if (dropCounter > dropInterval) {
       playerDrop();
    }
    
    lastTime = time;
        
    draw();
    
    //Add keyboard control for left + right
    
    requestAnimationFrame(update);
}
   document.addEventListener('keydown', event => {
    if (event.keyCode === 37) {
        player.pos.x--;
    } else if (event.keyCode === 39) {
        player.pos.x++;
        
    //Add support for down key
       } else if (event.keyCode === 40) {
        player.pos.y++;
        dropCounter = 0;
    }
});

update();
