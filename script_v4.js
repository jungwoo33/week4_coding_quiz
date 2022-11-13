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
var user_selection = []; // array of user choices for each question

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
        correct_answer: '3'
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
    console.log(typeof "my_questions[0].correct_answer"); // string
}


// end of question creation ============================================ /



// create question displaying function ================================= /
//var id_quiz = document.querySelector("#quiz");
function remove_previous_question(){
    var quiz = document.querySelector("#quiz");
    // remove previous elements:
    while(quiz.firstChild){
        quiz.removeChild(quiz.firstChild);
    }
}

function display_next_question(){
    var quiz = document.querySelector("#quiz");
    
    remove_previous_question(); // remove previous question before showing the next question:
    if(elapsed_question_num < my_questions.length){
        var i = elapsed_question_num;
        //console.log(i);

        // show "Prev" button from the second question
        if(elapsed_question_num !== 0){
            var prev = document.querySelector("#prev");
            prev.style.display = "inline-block";
        }


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
            input.setAttribute("value",j+1); // 1, 2, 3, 4
            var label = document.createElement("label");
            label.textContent = my_questions[i].choices[j];
            li.appendChild(input);
            li.appendChild(label);
            ul.appendChild(li);
        }
        quiz.appendChild(ul);

        // if user select an answer and click "Next" button, 
        // reads the user selection and pushes the value to an array, and
        // increase "elapsed_question_num" to move to the next question
        var next = document.querySelector("#next");
        var prev = document.querySelector("#prev");
        document.getElementById('next').onclick = function(){
            var selected = document.querySelector('input[type=radio][name=answer]:checked');
            // if nothing is selected, show alert,
            // otherwise move foreward.
            if(selected === null){
                alert("Please choose an answer!");
            }else{
                user_selection[elapsed_question_num] = selected.value;
                //console.log(user_selection[elapsed_question_num]);
                elapsed_question_num++;    
            }
        }
        document.getElementById('prev').onclick = function(){
            elapsed_question_num--;
            remove_previous_question();
            display_next_question();
        }

        next.addEventListener("click",display_next_question);
    }else{
        // delete previous question and show the final result
        remove_previous_question();
        var score = 0;
        for(var i=0;i<my_questions.length;i++){
            //console.log(typeof(user_selection[i])); // string
            //console.log(typeof(my_questions[i].correct_answer)); // string

            if(Number(user_selection[i]) === Number(my_questions[i].correct_answer)){
                score++;
            }
        }
        var p = document.createElement("p"); // create <p></p> element for question
        p.textContent = "Your final score: "+ score + " out of " + my_questions.length; // include question in <p></p>
        quiz.appendChild(p);
    }
}

// End of question displaying function ================================= /

function generate_quiz(){
    //console_test();
    remove_previous_question();
    display_next_question();
}

start_quiz.addEventListener("click", generate_quiz);
