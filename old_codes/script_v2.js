// link to the "start_quiz" button
var click_button = document.querySelector("#start_quiz"); // select the "Start Quiz" button
var id_question = document.querySelector("#question");

var class_buttons = document.querySelector(".buttons");
var id_button_0 = document.querySelector("#button_0");
var id_button_1 = document.querySelector("#button_1");
var id_button_2 = document.querySelector("#button_2");
var id_button_3 = document.querySelector("#button_3");

var id_quiz = document.querySelector("#quiz");

// pre-define global variables:
var elapsed_question_num = 0; // total elapsing (showing) questions

// create questions ===================================================== /
var my_questions = [
    {
        question: "Commonly used data types DO NOT include:",
        choices:[
            '1. strings',
            '2. booleans',
            '3. alerts',
            '4. numbers'
        ],
        correct_answer: '3. alerts'
    },
    {
        question: "The condition in an if/else statement is enclosed within _____.",
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
function display_next_question(){
    if(elapsed_question_num < my_questions.length){
        var i = elapsed_question_num;
        var choice_length = my_questions[i].choices.length; //each question's choice length; This will allow me to have different length choices.
        id_question.textContent = my_questions[i].question;
        for(var j=0; j<choice_length; j++){
            var element = document.getElementById("choice_"+j);
            element.textContent = my_questions[i].choices[j];
            console.log(my_questions[i].choices[j]);    
        }

        // if user select an answer and click "Next" button, increase "elapsed_question_num" to move to the next question

        //elapsed_question_num++;
    }else{
        // show the final result
    }
}





//function show_questions(questions, quiz_container){
function show_questions(){    
    // we'll need a place to store the output and the answer choices
    //var output = [];
    //var answers;
    
    // for eqch question...
    for(var i=0; i<my_questions.length; i++){
        // first reset the list of answers
        //answers = [];
        var choice_length = my_questions[i].choices.length; //each question's choice length; This will allow me to have different length choices.
        id_question.textContent = my_questions[i].question;
        for(var j=0; j<choice_length; j++){
            var element = document.getElementById("choice_"+j);
            element.textContent = my_questions[i].choices[j];
            console.log(my_questions[i].choices[j]);    
        }
        // here I need to call answer selection process
/*
        if(){ // if the answer is selected, go to the next loop

        }else{
            // pause until receive answer...
        }

        user_selection();        
*/


    }
}

// I am following the algorithm from 20-Stu_Data-Attributes:
function user_selection(event){
    var element = event.target; // find the clicked element
    var user_answer = [];
    if(element.matches(".box")){ // if the clicked element is one of the "box"
        user_answer = element.dataset.number; // one of 0 ~ 3
        console.log(user_answer);
    }
}
class_buttons.addEventListener("click",user_selection);



// End of question displaying function ================================= /

function generate_quiz(){
    // call show_questions()
    //show_questions();
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
//click_button.addEventListener("click", console_test);
click_button.addEventListener("click", generate_quiz);
