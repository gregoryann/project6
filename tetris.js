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

//Add createPiece function and use

function createPiece(type)
{
    if (type === 'I') {
        return [
            [0, 1, 0, 0],
            [0, 1, 0, 0],
            [0, 1, 0, 0],
            [0, 1, 0, 0],
        ];
    } else if (type === 'L') {
        return [
            [0, 2, 0],
            [0, 2, 0],
            [0, 2, 2],
        ];
    } else if (type === 'J') {
        return [
            [0, 3, 0],
            [0, 3, 0],
            [3, 3, 0],
        ];
    } else if (type === 'O') {
        return [
            [4, 4],
            [4, 4],
        ];
    } else if (type === 'Z') {
        return [
            [5, 5, 0],
            [0, 5, 5],
            [0, 0, 0],
        ];
    } else if (type === 'S') {
        return [
            [0, 6, 6],
            [6, 6, 0],
            [0, 0, 0],
        ];
    } else if (type === 'T') {
        return [
            [0, 7, 0],
            [7, 7, 7],
            [0, 0, 0],
        ];
    }
}
        
//Wrap matrix drawing in function               
function drawMatrix(matrix) {
   
    //Add offset support to drawMatrix()
    function drawMatrix(matrix, offset) {
    matrix.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value !== 0) {
                context.fillStyle = colors[value];
                context.fillRect(x, y, 1, 1);
                context.fillRect(x + offset.x, y + offset.y, 1, 1);
            }
        });        
        
    });

}

//Setup arena and log with table
       

drawMatrix(matrix);
drawMatrix(matrix, {x: 5, y: 5});


//Call drawMatrix with player structure.
 drawMatrix(player.matrix, player.pos);

//Wrap drawMatrix() in draw() function      
 function draw() {
    
     //Clear in beginning of draw()
    context.fillStyle = '#000';
    context.fillRect(0, 0, canvas.width, canvas.height);
    
     //Draw arena
    drawMatrix(arena, {x: 0, y: 0});
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


//Add rotate function
function rotate(matrix, dir) {
    for (let y = 0; y < matrix.length; ++y) {
        for (let x = 0; x < y; ++x) {
            [
                matrix[x][y],
                matrix[y][x],
            ] = [
                matrix[y][x],
                matrix[x][y],
            ];
        }
    }

    if (dir > 0) {
        matrix.forEach(row => row.reverse());
    } else {
        matrix.reverse();
    }
}

function playerDrop() {
    player.pos.y++;
    
    //Collide on drop and merge
    if (collide(arena, player)) {
        player.pos.y--;
        merge(arena, player);
        playerReset();
    }   
    
    
    dropCounter = 0;
}    

function playerMove(offset) {
    player.pos.x += offset;
    if (collide(arena, player)) {
        player.pos.x -= offset;
    }
}


//Add playerReset()

function playerReset() {
   

    const pieces = 'TJLOSZI';
    player.matrix = createPiece(pieces[pieces.length * Math.random() | 0]);
    player.pos.y = 0;
    player.pos.x = (arena[0].length / 2 | 0) -
                   (player.matrix[0].length / 2 | 0);
     if (collide(arena, player)) {
        arena.forEach(row => row.fill(0));
    }
}

 //Add player rotate and bind to Q + W       
function playerRotate(dir) {
    const pos = player.pos.x;
    let offset = 1;
    rotate(player.matrix, dir);
    while (collide(arena, player)) {
        player.pos.x += offset;
        offset = -(offset + (offset > 0 ? 1 : -1));
        if (offset > player.matrix[0].length) {
            rotate(player.matrix, -dir);
            player.pos.x = pos;
            return;
        }
    }
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
        
    } else if (event.keyCode === 81) {
      playerRotate(-1);
    } else if (event.keyCode === 87) {
      playerRotate(1);
    }
    
    lastTime = time;
        
    draw();
    
    //Add keyboard control for left + right
    
    requestAnimationFrame(update);
}
   document.addEventListener('keydown', event => {
    if (event.keyCode === 37) {
        playerMove(-1);
    } else if (event.keyCode === 39) {
        playerMove(1);
    } else if (event.keyCode === 40) {
        playerDrop();
    } else if (event.keyCode === 81) {
        playerRotate(-1);
    } else if (event.keyCode === 87) {
        playerRotate(1);
    }
});
        
 const colors = [
    null,
    '#FF0D72',
    '#0DC2FF',
    '#0DFF72',
    '#F538FF',
    '#FF8E0D',
    '#FFE138',
    '#3877FF',
];       
        

update();
