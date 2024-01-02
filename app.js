let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset");
let newGame=document.querySelector('#new-game');
let winner=document.querySelector('#winner');
let msgBox=document.querySelector('#msg');
let playerx=document.getElementById('x');
let playero=document.getElementById('o');

let oScore=0;
let xScore=0;


let turnO = true;
//player x or player O

//winning pattern array
const winningPattern = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8]
];


//fuction for reset game
const resetGame=()=>{
turnO=true;//making it default value
enableButtons(); //calling enablebuttonsmethod to make button enable and innertext empty
//hiding new game button and winner message div --> they are only get visible only after winner is declared
newGame.classList.add('hide');
msg.classList.add('hide');
playero.innerText=0;
playerx.innerText=0;
xScore=0;
oScore=0;
}
const nextGame=()=>{
    turnO=true;//making it default value
    enableButtons(); //calling enablebuttonsmethod to make button enable and innertext empty
    //hiding new game button and winner message div --> they are only get visible only after winner is declared
    newGame.classList.add('hide');
    msg.classList.add('hide');
    }


//for adding x or o in boxes 
boxes.forEach((box)=>{
    box.addEventListener('click',()=>{
        //for first time this will run for Player O
        if(turnO){
            box.classList.add('playerO');
            box.innerText='O';
            turnO=false;
        }
         //for second time this will run for Player X
        else{
            box.classList.add('playerX');
            box.innerText='X';
            turnO=true;
        }
        box.disabled=true; // after adding data to the boxes we disable the box so that user cant click again and if click value will not chnage
        checkWinner(); // here we call check winner function for evry box 
       
    })

    
})

//function for disable button --> means you cant again click when winnner is declared all boxes will get disables
const disableButtons=()=>{
    for(let box of boxes){
        box.disabled=true;
    }
}
//enable buttons method for enabling all the button  use when we click on reset button
const enableButtons=()=>{
    for(let box of boxes){
        box.disabled=false;
        box.innerText="";
        box.classList.remove('playerX', 'playerO');
    }
}
resetBtn.addEventListener('click',resetGame);
newGame.addEventListener('click',nextGame);


//this is used to check who is winner
const checkWinner = () =>{
    let isBoardFull = true; // Track whether the board is full
    //getting each pattern from winningpatterns
    for(let pattern of winningPattern){

        /*
        boxes[pattern[0]].innerText;
        pattern = [0,1,2] --> it is winning pattern for first iteration
        boxes[pattern[0]]= first box .inner text=taking value of box1 
        takign 3 varible for 3 value 
        condition --> not shoulb be empty and if ot true then values are same like X X X  or O O O 

        O X O
        X 0 X     NOW HERE [2, 4, 6] pattern of iteration has same values means box[2]=0 box[4]= box[6]=O winner=0 
        0         after winner is declared all the boxes are disables

        */
        let value1=boxes[pattern[0]].innerText;
        let value2=boxes[pattern[1]].innerText;
        let value3=boxes[pattern[2]].innerText;

        if(value1 != "" && value2 != "" && value3 != "" ){
            if(value1 === value2 && value2 === value3){
                if (value1.toUpperCase() === 'X') {
                    xScore++;
                } else if (value1.toUpperCase() === 'O') {
                    oScore++;
                }
              
               
               showWinner(value1); // call the function to show name of winner on screen 
               playero.innerText=oScore;
               playerx.innerText=xScore;

               disableButtons(); //after winner is declared all the boxes are disabled
               return;
            }
           
        }
        else{
            isBoardFull=false;
        }
        
    }
    if (isBoardFull) {
        winner.innerHTML=`Match Draw`;
         // Display draw message
        newGame.classList.remove('hide');
        msg.classList.remove('hide');
        disableButtons(); // Disable buttons for a draw
    }
    
}

// function to show name of winner on screen 
const showWinner=(value)=>{
winner.innerHTML=`Winner is ${value}`;
//removing class hide from these tag to show them on screen after winner is declared 
newGame.classList.remove('hide');
msg.classList.remove('hide');
}





