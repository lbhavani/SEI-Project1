const tryButton = document.querySelector('#try1');
const msgArea = document.querySelector('#msg');
const q = document.querySelector('#q');
const answers = document.querySelector('#answers');
var optionSelected = false;


var questionList = [
    {    category: "Science: Mathematics",
        correct_answer: "66",
        difficulty: "medium",
        incorrect_answers: ["67", "34", "11"],
        question: "In a complete graph G, which has 12 vertices, how many edges are there?",
        type: "multiple"
    },
    {
        category: "Science: Mathematics",
        correct_answer: "True",
        difficulty: "medium",
        incorrect_answers: ["False"],
        question: "The proof for the Chinese Remainder Theorem used in Number Theory was NOT developed by its first publisher, Sun Tzu.",
        type: "boolean"
    }

];
var curQNo=0;
var selAnswer= "";
var score=0;

function resetQuiz(){
    curQNo=0;
    selAnswer= "";
    score=0;
}

function randomGen(maxNum){
    return Math.floor(Math.random()*maxNum) ;
}

tryButton.addEventListener('click', ()=> {
    axios({
     url: 'https://opentdb.com/api.php?amount=10&category=19&difficulty=medium', 
     method: 'get'   
    })
    .then(response => {
        
        console.log (response);
        questionList = response.data.results;
        resetQuiz();
        displayQuestion(0);
    })
    .catch(error => {
        console.log(error);
    })
});

function msg(m, timePeriod){
    console.log(m);
    msgArea.textContent=m;
    // if(timePeriod==null)
    //     timePeriod=4000;
    // else if(timePeriod<0)
    //     return;
    // window.setTimeout(function(){msgArea.textContent='';}, timePeriod);
}

 function choiceSel(){

    selAnswer=this.id;
    if(optionSelected) //Probably user is selecting answer again
    this.backgroundColor="yellow";
    if(selAnswer==questionList[curQNo].correct_answer){
        msg("Correct. Great Job.")
        score++;
    } else {
        msg ("Sorry. Incorrect Answer.");
    }
    if(questionList.length==(curQNo+1)){
        
        msg("Your Score is "+score+" / "+questionList.length , -1);
    } else
        displayQuestion(curQNo+1);
}

const chlds=answers.getElementsByTagName("li");

function clearOptions(){
    while( chlds.length>0)
        answers.removeChild(chlds[0]);
}

function displayQuestion(num) {
    if(questionList==null || questionList.length<num){
        msg("No Questions. Click start.");
    }
    curQNo=num;
    q.innerHTML=questionList[num].question;
     
    clearOptions();
    
    var choices= [].concat(questionList[num].incorrect_answers);
    if(questionList[num].type=='multiple')
        choices.splice(randomGen(4),0,questionList[num].correct_answer);
    else
        choices=["True", "False"];
 
    for(i=0; i<choices.length; i++){
        var newItem = document.createElement('li')  
        newItem.setAttribute('class', 'choiceStyle');
        newItem.setAttribute('id', choices[i]);
        newItem.addEventListener('click', choiceSel);
        newItem.textContent = choices[i];
        answers.appendChild(newItem);
    }

}
displayQuestion(0);