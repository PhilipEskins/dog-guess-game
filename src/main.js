import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/scss/bootstrap.scss';
import './sass/styles.scss';
import { Dogbreed } from './logic.js';

$(document).ready(function() {
  const newGame = new Dogbreed;
  let dropDownArr = [];
  let dogName = startGame();
  makeDropDown();
  $("#tryAgain").hide();

  function makeDropDown() {
    let promise =  newGame.getDogList();
    promise.then(function(response) {
      let body = JSON.parse(response);
      let test = body.message;
      Object.keys(test).forEach(function(element) {
        if(test[element].length > 0) {
          let dogSub = test[element];
          dogSub.forEach(function(element2) {
            let join = element + " " + element2;
            dropDownArr.push(join);
        }); }
        else {
          dropDownArr.push(element);
          // $("#dogDrop").html(`<option value="${element}">${element}</option>`);
        }
      });
    }, function(error) {
      $('.showErrors').text(`There was an error processing your request: ${error.message}`);
    });
  }

  function startGame() {
    let promise =  newGame.getDogPic();

    promise.then(function(response) {
      dropDownArr.forEach(function(element) {
        $("#dogDrop").append(`<option value="${element}">${element}</option>`);
      });
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
  }

  $("form#dogForm").submit(function(event) {
    event.preventDefault();
    const dogInput = $("#dogDrop").val();
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
