import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/scss/bootstrap.scss';
import './sass/styles.scss';
import { Dogbreed } from './logic.js';

$(document).ready(function() {
  const newGame = new Dogbreed;
  let dogName = startGame();
  $("#tryAgain").hide();

  function startGame() {
    // let begin = newGame.pickbreed();
    let promise =  newGame.getDogPic();
    promise.then(function(response) {
      let body = JSON.parse(response);
      $("#picture").html(`<img src=${body.message}>`);
      let url = body.message;
      let broken = url.split('/');
      let dogTest = broken[4];
      console.log(dogTest);
      let noHyphen = dogTest.replace("-", " ");
      return dogName = noHyphen;
    }, function(error) {
      $('.showErrors').text(`There was an error processing your request: ${error.message}`);
    });
    // return dogName;
  }

  $("form#dogForm").submit(function(event) {
    console.log(dogName);
    event.preventDefault();
    const dogInput = $("#dogGuess").val();
    const dogCompare = newGame.getDogInput(dogInput.toLowerCase(), dogName)
    if (dogCompare === true) {
      $("#result").show();
      $("#result").text("You guessed correctly!");
      $("#tryAgain").show();
    } else {
      const correctCount= newGame.getLetter (dogInput.toLowerCase(), dogName)
      $("#result").show();
      $("#result").text("You guessed incorrectly! you have " + correctCount + " letter correct");
      $("#tryAgain").show();
    }
  });
  $("#tryAgain").click(function(event) {
    $("#result").hide();
    $("#tryAgain").hide();
    dogName = startGame();
  })
});
