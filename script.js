
//Element referrance
const bubblePanel = document.querySelector(".pbtn");
const hitDisplay = document.querySelector("#hit");
const timerDisplay = document.querySelector("#timer");
const scoreDisplay = document.querySelector("#score");
const life=document.getElementById('life');

//variable for state
let currentScore = 0;
var totalScore = 0;
let timeRemaining = 60;
let lifespan=3;
const colors = ["green", "blue", "red", "yellow", "pink", "violet"];

//display initial state
scoreDisplay.textContent = totalScore;
timerDisplay.textContent = timeRemaining;

//generate random  number for printing balloon
function generateRandomNumber(max) {
  return Math.floor(Math.random() * max);
}

//play again
function reload() {
    window.location.reload(); 
}

//checking lose
function checkLose(){
    if(lifespan==0 || timeRemaining==0){
        bubblePanel.innerHTML = `<h1 style=" caret-color: transparent;">Game Over  Score:${totalScore}</h1>
        <button onclick="reload()">Play Again</button>`;
        life.innerHTML="";
        scoreDisplay.textContent = totalScore;
        timerDisplay.textContent = timeRemaining;
        hitDisplay.textContent = "X";
    }
}


//changing balloon div content 
function changeBubble(idofbubble,idofPara){
    console.log(idofbubble)
    const win=`<img id="winimg" src="./assets/win.png" title="explode"/>`;
    const lose=`<img id="loseimg" src="./assets/lose.png" title="explode" />`;

      if(hitDisplay.textContent==idofPara.textContent){
          idofbubble.innerHTML=win;
          checkLose();
          totalScore += 10;
          scoreDisplay.textContent = totalScore;
          timerDisplay.textContent = 60;
          timeRemaining = 60;
          setTimeout(()=>{
          createBubble();
          },50)
      }else{
          idofbubble.innerHTML=lose;
          lifespan-=1;
          checkLose();
          life.innerHTML="";
          for(let i=1;i<=lifespan;i++){
            life.innerHTML+=`<img style=" caret-color: transparent;cursor:pointer;" src="./assets/lifee.png" title="remains"/>`;
          }
      }
      
}


//creating bubble
function createBubble() {
  bubblePanel.innerHTML = "";
  life.innerHTML="";
  for(let i=1;i<=lifespan;i++){
    life.innerHTML+=`<img src="./assets/lifee.png" 
    style=" caret-color: transparent;cursor:pointer;" title="remains"/>`;
  }
  const randomNumber = generateRandomNumber(10);
  hitDisplay.textContent = randomNumber;
  for (let i = 0; i < 154; i++) {
    const randomColor = generateRandomNumber(6);
    const randomBubbleNum = generateRandomNumber(10);
    bubblePanel.innerHTML += `<div class="bbox" id="id${i}" onclick="changeBubble(id${i},iid${i})">
    <svg class="bubble" style="filter:drop-shadow(0.1rem 0.1rem 1rem ${colors[randomColor]});"
    xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="${colors[randomColor]}" 
    class="bi bi-balloon-fill" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M8.48 10.901C11.211
    10.227 13 7.837 13 5A5 5 0 0 0 3 5c0 2.837 1.789 5.227 4.52 5.901l-.244.487a.25.25 0 1 0
    .448.224l.04-.08c.009.17.024.315.051.45.068.344.208.622.448 1.102l.013.028c.212.422.182.85.05
    1.246-.135.402-.366.751-.534 1.003a.25.25 0 0 0 .416.278l.004-.007c.166-.248.431-.646.588-1.115
    .16-.479.212-1.051-.076-1.629-.258-.515-.365-.732-.419-1.004a2 2 0 0 1-.037-.289l.008.017a.25.25 
    0 1 0 .448-.224zM4.352 3.356a4 4 0 0 1 3.15-2.325C7.774.997 8 1.224 8 1.5s-.226.496-.498.542c-.95
    .162-1.749.78-2.173 1.617a.6.6 0 0 1-.52.341c-.346 0-.599-.329-.457-.644"/></svg><p id="iid${i}" 
    style="color:black;caret-color: transparent; cursor:pointer;">${randomBubbleNum}</p></div>`;
  }
}
createBubble();

//managing time 
function startTimer() {
  const intervalId = setInterval(function () {
    if (timeRemaining > 0) {
      timeRemaining--;
      timerDisplay.textContent = timeRemaining;
    } 
    else {
       checkLose();
       clearInterval(intervalId)
    }
  }, 1000);
}
let isTimerStarted = false;
if (!isTimerStarted) {
  isTimerStarted = true;
  startTimer();
}
