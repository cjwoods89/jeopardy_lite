(function(){

  var question = $("#question");
  var submit = $("#submitButton")
  var showQuestion = $("#questionContainer");
  var button = $(".col-md-2 button");
  var buttonValue;
  var goodAnswer;
  var userAnswer;
  var userScore = 0;
  var answerScore;
  var cat1 = $("#row1 h3");
  var cat2 = $("#row2 h3");
  var cat3 = $("#row3 h3");
  var cat4 = $("#row4 h3");
  var cat5 = $("#row5 h3");
  var cat6 = $("#row6 h3");
  var categories = [cat1, cat2, cat3, cat4, cat5, cat6];
  var storedCats = [];
  var alert = $('.alert_container');


  // Getting a random int
  function getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min
  }

  // Load a random set of 6 categories from jeopardy API using the
  // random int function for your offset and store them into an array
  $(function(){

    $.get( "http://jservice.io/api/categories?count=6&offset=" + getRandomInt(1, 17000), function( data ) {

      for (var i = 0; i < data.length; i++) {
        categories[i].html(data[i].title);
        storedCats.push(data[i].id);
      }

    });

  });

  // Pull random question according to the category of the row
  button.click(function(){

    buttonValue = $(this).text();
    var buttonCatNum = $(this).val();
    $("#answerInput").val('');

    // *************************************
    // Need to modify the get query with promises & an if statement
    // Promise the get query that I will use the below data later on loaded
    // If statement to change the returned question if the value is not on the board
    // *************************************

    $.get( "http://jservice.io/api/clues?value=" + buttonValue + "&category=" + storedCats[buttonCatNum], function( data ) {

      goodAnswer = data[0].answer.toUpperCase();
      answerScore = data[0].value;

      showQuestion.css("display","block");
      question.html(data[0].question + ".");

      console.log(goodAnswer);

    });

    $(this).prop('disabled', true);
    $(submit).prop('disabled', false);


  });

  submit.click(function(){

    userAnswer = $("#answerInput").val().toUpperCase();

    if (userAnswer == goodAnswer) {
      userScore = userScore + answerScore
      $("#scoreContainer #score").html(userScore);
      alert.append('<div class="alert alert-success alert-dismissible" role="alert">' +
      '<button type="button" class="close" data-dismiss="alert" aria-label="Close"> ' +
      '<span aria-hidden="true">&times;</span></button>' +
      '<strong>Success!</strong> Your answer was correct. ' + answerScore + ' : has been added to your score!</div>');
    } else {
      alert.append('<div class="alert alert-danger alert-dismissible" role="alert"> ' +
      '<button type="button" class="close" data-dismiss="alert" aria-label="Close"> ' +
      '<span aria-hidden="true">&times;</span></button>' +
      '<strong>Warning!</strong> Your answer was incorrect. The correct answer is: ' + goodAnswer + '. No points awarded!</div>')
    }

    $(this).prop('disabled', true);


  });

})();
