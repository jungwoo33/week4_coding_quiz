// link to the "start_quiz" button
var start_quiz = document.querySelector("#start_quiz"); // select the "Start Quiz" button
//var id_question = document.querySelector("#question");

var class_buttons = document.querySelector(".buttons");
var id_button_0 = document.querySelector("#button_0");
var id_button_1 = document.querySelector("#button_1");
var id_button_2 = document.querySelector("#button_2");
var id_button_3 = document.querySelector("#button_3");


// pre-define global variables:
var elapsed_question_num = 0; // total elapsing (showing) questions

// create questions ===================================================== /
var my_questions = [
    {
        question: 'Commonly used data types DO NOT include:',
        choices:[
            '1. strings',
            '2. booleans',
            '3. alerts',
            '4. numbers'
        ],
        correct_answer: '3. alerts'
    },
    {
        question: 'The condition in an if/else statement is enclosed within _____.',
        choices:[
            '1. quotes',
            '2. curly brackets',
            '3. jw...',
            '4. square brackets'
        ],
        correct_answer: '2'
    }
]

// check if they are correctly coded...
// Note: this is for the test...
function console_test(){
    console.log(my_questions.length);
    console.log(my_questions[0]);
    console.log(my_questions[0].question);
    console.log(my_questions[0].choices);
    console.log(my_questions[0].choices[0]);    
}
// end of question creation ============================================ /

// create question displaying function ================================= /
//var id_quiz = document.querySelector("#quiz");
function display_next_question(){
    var quiz = document.querySelector("#quiz");
    // remove previous elements:
    if(elapsed_question_num >0){
        while(quiz.firstChild){
            quiz.removeChild(quiz.firstChild);
        }
    }

    if(elapsed_question_num < my_questions.length){
        var i = elapsed_question_num;
        //console.log(i);
        var p = document.createElement("p"); // create <p></p> element for question
        p.textContent = my_questions[i].question; // include question in <p></p>
        quiz.appendChild(p);

        var ul = document.createElement("ul"); // create unordered list (ul)
        var choice_length = my_questions[i].choices.length; //each question's choice length; This will allow me to have different length choices.
        for(var j=0; j<choice_length; j++){
            // include radio button lists
            var li = document.createElement("li");
            var input = document.createElement("input");
            input.setAttribute("type","radio");
            input.setAttribute("name","answer");
            input.setAttribute("value","0");
            var label = document.createElement("label");
            label.textContent = my_questions[i].choices[j];
            li.appendChild(input);
            li.appendChild(label);
            ul.appendChild(li);
        }
        quiz.appendChild(ul);

        // if user select an answer and click "Next" button, increase "elapsed_question_num" to move to the next question
        var next = document.querySelector("#next");
        next.addEventListener("click",display_next_question);
        elapsed_question_num++;
    }else{
        // show the final result
    }
}


// I am following the algorithm from 20-Stu_Data-Attributes:
/*
function user_selection(event){
    var element = event.target; // find the clicked element
    var user_answer = [];
    if(element.matches(".box")){ // if the clicked element is one of the "box"
        user_answer = element.dataset.number; // one of 0 ~ 3
        console.log(user_answer);
    }
}
class_buttons.addEventListener("click",user_selection);
*/


// End of question displaying function ================================= /

function generate_quiz(){
    //console_test();
    display_next_question();

    //function show_questions(){
    //}
    // call show_results
    //function show_results(){
    //}
}


// when user clicks submit, show results
//submitButton.onclick = function(){
//    show_results();
//}

// Add event listener to "start_button" when "click" it.
// When you "click" the button, call "console_test" function
//generateBtn.addEventListener("click", write_password);
start_quiz.addEventListener("click", generate_quiz);
