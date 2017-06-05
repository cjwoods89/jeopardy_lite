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

  // Getting a random int
  function getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min
  }

  // Load a random set of 6 categories from jeopardy API
  // using the random int function for your offset
  $(function(){

    $.get( "http://jservice.io/api/categories?count=6&offset=" + getRandomInt(1, 17000), function( data ) {

      for (var i = 0; i < data.length; i++) {
        categories[i].html(data[i].title);
        storedCats.push(data[i].id);
        // console.log(data[i].id + ' api');
        // console.log(storedCats[i] + ' stored values');
      }

    });

    // var categories = [cat1, cat2, cat3, cat4, cat5, cat6];

  });

  button.click(function(){

    buttonValue = $(this).text();
    var buttonCatNum = $(this).val();
    $("#answerInput").val('');
    // console.log(storedCats[buttonCatNum]);

    // console.log(buttonValue + ' button value');

    $.get( "http://jservice.io/api/clues?value=" + buttonValue + "&category=" + storedCats[buttonCatNum], function( data ) {

      goodAnswer = data[0].answer.toUpperCase();
      answerScore = data[0].value;

      showQuestion.css("display","block");
      question.html(data[0].question + ".");

      // console.log(data[0].category_id + " : this is the category ID of the question we pulled");
      console.log(goodAnswer);
      // console.log(answerScore);

    });

    $(this).prop('disabled', true);
    $(submit).prop('disabled', false);


  });

  submit.click(function(){

    userAnswer = $("#answerInput").val().toUpperCase();

    if (userAnswer == goodAnswer) {
      userScore = userScore + answerScore
      $("#scoreContainer #score").html(userScore);

    }

    $(this).prop('disabled', true);


  });

})();
