//letters
const letters ="abcdefghijklmnopqrstuvwxyz";
//get array from letters
let lettersArray = Array.from(letters);
//console.log(lettersArray);
//select letters container
let lettersContainer = document.querySelector(".letters");
//generate letters
lettersArray.forEach(letter => {
//create span
let span = document.createElement("span");
//create letter text node
let theLetter = document.createTextNode(letter);
//append the letter to span
span.appendChild(theLetter);
//add class on span
span.className = 'letter-box';
//append span to the letters container
lettersContainer.appendChild(span);
});
//object of words + categories
const words = {
    programming: ["php","javascript","go", "scala","fortran","r","mysql","python"],
    movies: ["prestige","inception","parasite","intersteller","whiplash","memento","coco","up"],
    people: ["albert eintein","hitchocock","alexander","cleopatra","mahatma ghandi"],
    countries: ["syria","palestine","yemen","egypt","bahrain","qatar"] ,
}
//get random property
let allKeys = Object.keys(words);
//random number depend on keys length
let randomPropNumber = Math.floor(Math.random() * allKeys.length);
//console.log(allKeys[1]);//l output: words[1]: movies
//category
let randomPropName = allKeys[randomPropNumber];
//category words
let randomPropValue = words[randomPropName];
//console.log(randomPropValue);
//console.log(randomPropName);
//console.log(words["movies"]);//l output: il contenuto del case movies
//random number depend on words
let randomValueNumber = Math.floor(Math.random() * randomPropValue.length);
//console.log(randomValueNumber);
//console.log(randomPropValue);
//console.log(randomPropValue[1]);
//the choosen word
let randomValueValue = randomPropValue[randomValueNumber];
//console.log(randomValueValue);
//set category info
document.querySelector(".game-info .category span").innerHTML = randomPropName ;//+ ' ' + randomValueValue ;
//select letters guess element
let lettersGuessContainer = document.querySelector(".letters-guess");
//convert chossen word to array
let letterAndSpace = Array.from(randomValueValue);
//console.log(lettersAndSpace);
//create spans depend on word
letterAndSpace.forEach(letter => {
    //create empty span
    let emptySpan = document.createElement("span");
    //if letter is space
    if(letter === ' ') {
        //add class to the span
        emptySpan.className = 'with-space';
    }
    //append span to the letters guess container
    lettersGuessContainer.appendChild(emptySpan);
});
//select guess spans
let guessSpans = document.querySelectorAll(".letters-guess span");
//set wrong attempts
let wrongAttempts = 0;
//select the draw element
let theDraw = document.querySelector(".hangman-draw");
//handle clicking on letters
document.addEventListener("click", (e) => {
    //set the choose status
let theStatus = false;
    if (e.target.className === 'letter-box') {
        e.target.classList.add("clicked");
        //get clicked letter 
        let theClickedLetter = e.target.innerHTML.toLowerCase();
        //console.log(theClickedLetter);
        //console.log(letterAndSpace);//the chosen word
        let theChosenWOrd = Array.from(randomValueValue.toLowerCase());
        theChosenWOrd.forEach((wordLetter, WordIndex) => {
            //if the clicked letter equal to one of the chossen word letter 
            if(theClickedLetter == wordLetter) {
               // console.log(`Found At Index Number ${index}`);
            theStatus = true;
               //loop on all guess spans
            guessSpans.forEach((span, spanIndex) => {
                    if (WordIndex === spanIndex) {
                        span.innerHTML = theClickedLetter;
                    }
            });
            }
        });
        //outside loop
        //console.log(theStatus);
        //if letter is wrong
        if(theStatus !=true) {
            //increase the wrong attempts
            wrongAttempts++;
            //add class wrong on the draw element
            theDraw.classList.add(`wrong-${wrongAttempts}`);
        
        //play fail sound
    document.getElementById("fail").play();
    if(wrongAttempts === 8) {
        endGame();
        lettersContainer.classList.add("finished");
    }
}
else {
    //play success sound
    document.getElementById("success").play();
}
    }
});  
//end game function
function endGame() {
    //create popup div
    let div = document.createElement("div");
    //create text
    let divText = document.createTextNode(`Game Over, The Word Is ${randomValueValue}`);
//append text to div
div.appendChild(divText);
//add class on div
div.className = 'popup';
//append to the body
document.body.appendChild(div);

}