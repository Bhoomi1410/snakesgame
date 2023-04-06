let  canvas = document.querySelector('canvas');
let ctx= canvas.getContext('2d');

let cellSize = 50;

let boardWidth = 1000;
let boardHeight = 600;

let direction ='right';

let gameover = false;

let score = 0;



let snakeCells = [[0,0], [50,0]];
let foodCells = generateRandomCoords();

let intervalId = setInterval(function(){
    update();
    draw();
},100);


document.addEventListener('keydown', function(event){
    if(event.key==='ArrowUp')
    {
        direction ='up';
    }
    else if(event.key === 'ArrowDown')
    {
        direction='down';
    }
    else if(event.key === 'ArrowLeft')
    {
        direction = 'left';
    }
    else
    {
        direction = 'right';
    }
    // console.log(event);
})

function update(){
    //getting snake heaed
    let headX = snakeCells[snakeCells.length - 1][0];
    let headY = snakeCells[snakeCells.length - 1][1];

    //updating snake head
    let newHeadX;
    let newHeadY;


    if(direction === 'right')
    {
        newHeadX = headX + cellSize;
        newHeadY = headY;

        if(newHeadX === boardWidth)
        {
            gameover = true;
        }
    }
    else if(direction === 'down')
    {
        newHeadX = headX ;
        newHeadY = headY+ cellSize;

        if(newHeadY === boardHeight)
        {
            gameover = true;
        }
    }
    else if(direction === 'up')
    {
        newHeadX = headX ;
        newHeadY = headY- cellSize;

        if(newHeadY < 0)
        {
            gameover = true;
        }
    }
    else
    {
        newHeadX = headX -cellSize;
        newHeadY = headY;

        if(newHeadX < 0)
        {
            gameover = true;
        }
    }


    //updating snakecells array
    snakeCells.push([newHeadX, newHeadY]);
    if(newHeadX === foodCells[0] && newHeadY === foodCells[1]){
        foodCells=generateRandomCoords();
        score+=1;
    }
    else{
        snakeCells.shift();          //removing the [0,0] cell i.e last cell;
    }

                            
}

function draw(){

    if(gameover === true){
        clearInterval(intervalId);
        ctx.font = '50px sans-serif';
        ctx.fillStyle = 'green';
        ctx.fillText('Game Over', 350,300);
        return;
    }

    ctx.clearRect(0,0,boardWidth,boardHeight);

    //to draw snake
    for(let cell of snakeCells){
        ctx.fillStyle = 'yellow';
        ctx.fillRect(cell[0], cell[1],cellSize,cellSize); //(x,y,width,height)
        ctx.strokeStyle ='blue';
        ctx.strokeRect(cell[0], cell[1],cellSize,cellSize);
    }

    //to draw food
    ctx.fillStyle = 'red';
    ctx.fillRect(foodCells[0],foodCells[1], cellSize, cellSize);

    //to draw score
    ctx.font = '24px sans-serif';
    ctx.fillText(`Score: ${score}`, 20,20);
}

function generateRandomCoords(){
    return [
        Math.round((Math.random()*(boardWidth - cellSize)) / cellSize) * cellSize,
        Math.round((Math.random()*(boardHeight - cellSize)) / cellSize) * cellSize,
    ]
}
