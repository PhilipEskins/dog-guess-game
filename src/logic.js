export class Dogbreed {
  constructor(score) {
    this.score = score;
  }

  getDogInput(dogGuess, dogBreed) {
    if (dogGuess === dogBreed){
      this.score++;
      return true;
    } else {
      return false;
    }
  }
  getLetter (dogGuess, dogBreed){
      const guessArr = dogGuess.split("");
      const breedArr = dogBreed.split("");
      let counter = 0;
      for(let i = 0; i< breedArr.length; i++) {
        if(guessArr[i] === breedArr[i]) {
          counter++;
        }
      }
    return counter;
  }
  getDogList() {
    return new Promise(function(resolve, reject) {
    let request = new XMLHttpRequest();
    let url = `https://dog.ceo/api/breeds/list/all`;
    request.onload = function() {
      if (this.status === 200) {
        resolve(request.response);
      } else {
        reject(Error(request.statusText));
      }
    }
      request.open("GET", url, true);
      request.send();
    });
  }
  getDogPic() {
    return new Promise(function(resolve, reject) {
    let request = new XMLHttpRequest();
    let url = `https://dog.ceo/api/breeds/image/random`;
    request.onload = function() {
      if (this.status === 200) {
        resolve(request.response);
      } else {
        reject(Error(request.statusText));
      }
    }
      request.open("GET", url, true);
      request.send();
    });
  }
}
