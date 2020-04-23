const questionText = document.querySelector(".question-text");
const optionBox = document.querySelector(".option-box");
const currentQuestionNum = document.querySelector(".current-question-num");
const answerDescription= document.querySelector(".answer-description");
const nextQuestionBtn = document.querySelector(".next-question-btn");
const correctAnswers= document.querySelector(".correct-answers");
const seeResultBtn = document.querySelector(".see-result-btn");
const remainingTime = document.querySelector(".remaining-time");
const timeUpText = document.querySelector(".time-up-text");
const quizHomeBox = document.querySelector(".quiz-home-box");
const quizBox = document.querySelector(".quiz-box");
const quizOverBox = document.querySelector(".quiz-over-box");
const startAgainQuizBtn = document.querySelector(".start-again-quiz-btn")
const goHomeBtn = document.querySelector(".go-home-btn");
const categoryText = document.querySelector(".category-text");
//const startQuizBtn = document.querySelector(".start-quiz-btn");
const categoryBox=document.querySelector(".category-box");
let attempt=0;
let questionIndex  = 0;
let score=0;
let number = 0;
let myArray=[];
let interval;
let categoryIndex;



// questions and options and asnswer and answer descriptions
// array of objects
myApp=[
    {
        category:"Music",
        quizWrap:[
            {
            question:"Which is a song by The Who?",
            options:["Your Generation","Jack and Diane","Hey Jude","Pinball Wizard"],
            answer:3

            },
            {
            question:"Which female artist had a hit with the song Baby Baby in 1991?",
            options:["Faith Hill","Shania Twain","Martina McBride","Amy Grant"],
            answer:3,
            description:""
            },
            {
            question:"Which of these classic country  singers was known as the Silver Fox?",
            options:["Tom Paxton","Charlie Pride","Tom T. Hall","Charlie Rich"],
            answer:3,
            },
            {
            question:"Ole Man River is a song composed in 1927 for which musical?",
            options:["Show Boat","Willkommen","Les Miserables","The Producers"],
            answer:0,
            description:""
            },
            {
            question:"Which Justin Bieber track opens with the line 'Say the word, on my way. Any night, any day. Say the word, on my way?'",
            options:["Camila Cabello","Trevor Daniel","Yummy","Jonas Brothers"],
            answer:2,
            },
        ]
    },
    {
        category:"Environmental",
        quizWrap:[
            {
             question:"Which of the following has become the first country to make all forms of public transport free?",
             options:["Monaco","Liechtenstein","Luxembourg","Andorra"],
             answer:2,
             description:'Luxembourg in Europe has become the first country to make all forms of public transport free. It is the second smallest country in the European Union'
            },
            {
             question:"Which of the following has become the first country to make all forms of public transport free?",
             options:["Monaco","India","Japan","Singapore"],
             answer:3,
            },
            {
             question:"Which country is to host Commonwealth shooting, archery events in 2022?",
             options:["Australia","India","Brunei","Cameroon"],
             answer:3,
             description:'India to host Commonwealth shooting, archery events at Chandigarh in January 2022'
            },
            {
             question:"26 The International Criminal Police Organisation (INTERPOL) has its headquarters at",
             options:["Montreal","Bonn","Paris","London"],
             answer:2
            },
            {
             question:"30 Where is the headquarters of Botanical Survey of India located?",
             options:["Kolkata","Lucknow","Ootacmund","Darjeeling"],
             answer:0
            },
        ]
    },
    {
        category:"Computer Awareness",
        quizWrap:[
            {
             question:"How many bytes are equal to one kilobyte?",
             options:["1050","1024","1022","1000"],
             answer:1
            },
            {
             question:"Which of the following is not an input device?",
             options:["answerboard","Monitor","Joystick","Microphone"],
             answer:1,
            },
            {
             question:"The most powerful computer is_________",
             options:["super computer","micro computer","mini computer","all of these"],
             answer:0
            },
            {
             question:"Which of the following memories needs refresh ?",
             options:["drom","rom","sram","all of these"],
             answer:0
            },
            {
             question:"Every computer connected to the Internet is identified by a unique four-part string, known as",
             options:["IP address","Host name","Domain name","None of the above"],
             answer:0
            }
        ]
    },
    {
        category:"Sports",
        quizWrap:[
            {
             question:"When was the first Common Wealth Games held?",
             options:["1930","1934","1938","1948"],
             answer:0
            },
            {
             question:"In which sports is the participant called pugilist?",
             options:["Sprinter","Boxing","Wrestling","Javelin"],
             answer:1,
            },
            {
             question:"In which game the term ‘Putting’ is used?",
             options:["Chess","Hocanswer","Golf","Billiards"],
             answer:2
            },
            {
             question:"Who was the first Test Centurion in India Cricket?",
             options:["C.K. Naidu","Lala Amarnath","Vinu Mankad","Mansur Ali Pataudi"],
             answer:1
            },
            {
             question:"10 The number of players in each side in Water Polo is",
             options:["6","8","9","7"],
             answer:3
            }
        ]
    },
    
];
function createCategory(){
    //console.log(myApp[0].category);
    for(let i=0; i<myApp.length; i++){
        const categoryList=document.createElement("div");
        categoryList.innerHTML=myApp[i].category;
        categoryList.setAttribute("data-id", i);
        categoryList.setAttribute("onclick", "selectCategory(this)");
        categoryBox.appendChild(categoryList);
    }
}
function selectCategory(ele){
    categoryIndex=ele.getAttribute("data-id");
    //console.log("categoryIndex");
    categoryText.innerHTML = myApp[categoryIndex].category;
     quizHomeBox.classList.remove("show");
     quizBox.classList.add("show");
     nextQuestion();
}
function load(){
    number++;
    questionText.innerHTML=myApp[categoryIndex].quizWrap[questionIndex].question;
    createOptions();
    scoreBoard();
    currentQuestionNum.innerHTML=number + '/' + myApp[categoryIndex].quizWrap.length;
}
function createOptions(){
    optionBox.innerHTML="";
    let animationDelay=0.2;
    for(let i=0; i<myApp[categoryIndex].quizWrap[questionIndex].options.length; i++){
        const   option = document.createElement("div");
                option.innerHTML=myApp[categoryIndex].quizWrap[questionIndex].options[i];
                option.classList.add("option");
                option.id=i;
                option.style.animationDelay=animationDelay + "s";
                animationDelay=animationDelay+0.2;
                option.setAttribute("onclick","check(this)");
                optionBox.appendChild(option);
            }
}
function generateRandomQuestion(){
    const randomNumber = Math.floor(Math.random() * myApp[categoryIndex].quizWrap.length);
    let hitDuplicate=0;
    if(myArray.length == 0){
        questionIndex = randomNumber;

    }
    else{
        for(let i=0; i<myArray.length; i++){
            if(randomNumber == myArray[i]){
                hitDuplicate=1;
                console.log("duplicate found" + randomNumber);
            }
        }
        if(hitDuplicate ==1){
            generateRandomQuestion();
            return;
        }
        else{
            questionIndex = randomNumber;
        }
    }
    console.log(myArray);
    myArray.push(randomNumber);
    load();
    
}

function check(ele){
    const id=ele.id;
    if(id==myApp[categoryIndex].quizWrap[questionIndex].answer){
        ele.classList.add("correct");
        score++;
        scoreBoard();
    }
    else{
        ele.classList.add("wrong");
        for(let i=0; i<optionBox.children.length; i++){
            if(optionBox.children[i].id==myApp[categoryIndex].quizWrap[questionIndex].answer){
                optionBox.children[i].classList.add("show-correct");
            }
        }
    }
    attempt++;
    disableOptions();
    showAnswerDescription();
    showNextQuestionBtn();
    stopTimer();
    
    if(number == myApp[categoryIndex].quizWrap.length){
        quizOver();
      }

}
function timeIsUp() {
    showTimeUpText();
    for(let i=0; i<optionBox.children.length; i++){
        if(optionBox.children[i].id==myApp[categoryIndex].quizWrap[questionIndex].answer){
            optionBox.children[i].classList.add("show-correct");
        }
    }
    
    disableOptions();
    showAnswerDescription();
    showNextQuestionBtn();
}
if(number == myApp.length){
    quizOver();
  }
function startTimer(){
    let timeLimit=60;
    remainingTime.innerHTML=timeLimit;
    remainingTime.classList.remove("less-time");
    interval=setInterval(()=>{
        timeLimit--;
        if(timeLimit < 10){
            timeLimit="0"+timeLimit;
        }
        if( timeLimit < 6){
            remainingTime.classList.add("less-time");
        }
        remainingTime.innerHTML=timeLimit;
        if(timeLimit ==0){
            clearInterval(interval);
            timeIsUp();
        }
    },1000);
}
function stopTimer(){
    clearInterval(interval);
}
function disableOptions(){
    for(let i=0; i<optionBox.children.length; i++){
        optionBox.children[i].classList.add("already-answered");
    }
}
function showAnswerDescription() {
    if(typeof myApp[categoryIndex].quizWrap[questionIndex].describtion !== 'undefined'){
    answerDescription.classList.add("show");
    answerDescription.innerHTML=myApp[categoryIndex].quizWrap[questionIndex].describtion;
    }

}
function hideAnswerDescription(){
    answerDescription.classList.remove("show");
    answerDescription.innerHTML="";
}

function showNextQuestionBtn() {
    nextQuestionBtn.classList.add("show");
}
function hideNextQuestionBtn() {
    nextQuestionBtn.classList.remove("show");
}
function showTimeUpText(){
    timeUpText.classList.add("show");
}
function hideTimeUpText(){
    timeUpText.classList.remove("show");
}
function scoreBoard(){
    correctAnswers.innerHTML=score;
}

nextQuestionBtn.addEventListener("click", nextQuestion);

function nextQuestion(){
    generateRandomQuestion();
    hideNextQuestionBtn();
    hideAnswerDescription();
    hideTimeUpText();
    startTimer();
}
function quizResult(){
    document.querySelector(".total-questions").innerHTML=myApp[categoryIndex].quizWrap.length;
    document.querySelector(".total-attemp").innerHTML=attempt;
    document.querySelector(".total-correct").innerHTML=score;
    document.querySelector(".total-wrong").innerHTML=attempt-score;
    const percentage=(score / myApp[categoryIndex].quizWrap.length)*100;
    document.querySelector(".percentage").innerHTML=percentage.toFixed(2)+"%";
}
function resetQuiz(){
    attempt=0;
    //questionIndex  = 0;
    score=0;
    number = 0;
    myArray=[];
}
function quizOver(){
    nextQuestionBtn.classList.remove("show");
    seeResultBtn.classList.add("show");
}

seeResultBtn.addEventListener("click",()=>{
    quizBox.classList.remove("show");
    seeResultBtn.classList.remove("show");
    quizOverBox.classList.add("show");
    quizResult();
});
startAgainQuizBtn.addEventListener("click",()=>{
    quizBox.classList.add("show");
    quizOverBox.classList.remove("show");
    resetQuiz();
    nextQuestion();
})
goHomeBtn.addEventListener("click",()=>{
    quizOverBox.classList.remove("show");
    quizHomeBox.classList.add("show");
    resetQuiz();
})

// startQuizBtn.addEventListener("click",()=>{
//     quizHomeBox.classList.remove("show");
//     quizBox.classList.add("show");
//     nextQuestion();
// })
 window.onload = ()=>{
     createCategory();
    
 }; 
