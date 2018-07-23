var MatchGame = {};

/*
  Sets up a new game after HTML document has loaded.
  Renders a 4x4 board of cards.
*/
$(document).ready(function() {
  var $game = $('#game');
  var values = MatchGame.generateCardValues();
  MatchGame.renderCards(values, $game);
});

/*
  Generates and returns an array of matching card values.
 */

MatchGame.generateCardValues = function () {
// step 23 - create an empty array
//unplaced value array
var cardsInorder = [];

// step 24 - use a for loop to go through card values 1 through 8 within the array
for (var i = 1; i <= 8; i++) {
  //step 25 Inside the loop, add the current value to your array of unplaced values, twice.
  //these values will go into var cardsInorder.
  cardsInorder.push(i);
  cardsInorder.push(i);
}

//step 26 - create a randomly ordered array
var randomCards = [];

// step 27 - Create a while loop that runs until the sequentially-ordered array is empty (0).
//.length is the length of the cardsInorder array
while (cardsInorder.length > 0) {
  //step 28 - generate a random index in the array of in-order, unplaced values (a random number from 0 to the length of the unplaced values array
  //step 29 - Access the value in the unplaced values array (cardsInorder) at the random index you just created. Add this value to the end of your randomly-placed values array.
  var randomIndex = Math.floor(Math.random() * cardsInorder.length);
  //step 30 - Remove the element at the random index from the sequentially-ordered values array.
  var randomValues = cardsInorder.splice(randomIndex, 1)[0];
  randomCards.push(randomValues);
}
//step 31 -  Return the randomly-ordered array from the function.
return randomCards;

};

/*
  Converts card values to jQuery card objects and adds them to the supplied game
  object.
*/

MatchGame.renderCards = function(randomCards, $game) {
  var colors = [
      'hsl(25, 85%, 65%)',
      'hsl(55, 85%, 65%)',
      'hsl(90, 85%, 65%)',
      'hsl(160, 85%, 65%)',
      'hsl(220, 85%, 65%)',
      'hsl(265, 85%, 65%)',
      'hsl(310, 85%, 65%)',
      'hsl(360, 85%, 65%)'];

//step 35 - Start the method by emptying the HTML of the $game object.
$game.empty();
$game.data('flippedCards', []);
//step 36 - you will generate jQuery card objects for each value in the cardValues array. Start by looping through each value in the randomCards array argument.
for (var j = 0; j < randomCards.length; j++) {
    var value = randomCards[j];
    var color = colors[value - 1];
    var data = {
      value: value,
      color: color,
      //In addition to knowing the card's value, you need to know whether or not the card has been flipped. Add a data attribute to the jQuery card object representing whether or not the card has been flipped. This value should default to false.
      isFlipped: false
    };

    //step 37 - inside the loop, create a jQuery object for a new card. This object should be instantiated — created — with the same HTML code you used to render a card in your index.html file.
    var $cardElement = $('<div class="col-xs-3 card"></div>');

    //step 38 Using the data method, add a data attribute representing the card's value on the new card object, setting the value of the data attribute equal to the value at the current index in the cardValues array.
    $cardElement.data(data);

    $game.append($cardElement);
  };

//
$('.card').click(function() {
 MatchGame.flipCard($(this), $('#game'));
});
};

/*
  Flips over a given card and checks to see if two cards are flipped over.
  Updates styles on flipped cards depending whether they are a match or not.
 */

MatchGame.flipCard = function($card, $game) {
  if ($card.data('isFlipped')) {
      return;
    }

    $card.css('background-color', $card.data('color'))
        .text($card.data('value'))
        .data('isFlipped', true);

    var flippedCards = $game.data('flippedCards');
    flippedCards.push($card);

    if (flippedCards.length === 2) {
      if (flippedCards[0].data('value') === flippedCards[1].data('value')) {
        var matchCss = {
          backgroundColor: 'rgb(153, 153, 153)',
          color: 'rgb(204, 204, 204)'
        };
        flippedCards[0].css(matchCss);
        flippedCards[1].css(matchCss);
      } else {
        var card1 = flippedCards[0];
        var card2 = flippedCards[1];
        window.setTimeout(function() {
          card1.css('background-color', 'rgb(32, 64, 86)')
              .text('')
              .data('isFlipped', false);
          card2.css('background-color', 'rgb(32, 64, 86)')
              .text('')
              .data('isFlipped', false);
        }, 350);
      }
      $game.data('flippedCards', []);
    }
};
