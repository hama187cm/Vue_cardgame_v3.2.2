export const deck = [];

// トランプ
export const suits_black = ['♠', '♣'];
export const suits_red   = ['♦', '♥'];
export const suitColor2 = "red";
export const allSuits = suits_black.concat( suits_red );
export const maxNumber = 2; //13;

allSuits.forEach(suit => {
  Array.from(Array( maxNumber ), (_, i) => ++i).forEach(number => {
    deck.push({
        suit
        , number
        , hide: false
        , id: (suit+number)
        , own: null
        , arena: null
    });
  });
});

export function pick(){
  if( deck.length == 0 ) return;
  return deck.splice(Math.floor(Math.random() * Math.floor(deck.length)), 1)[0];
};

export default () => {
  pick();
  // if( deck.length == 0 ) return;
  // return deck.splice(Math.floor(Math.random() * Math.floor(deck.length)), 1)[0];
};