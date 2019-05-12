export let deck = [];

// トランプ
export const suits_black = ['♠', '♣'];
export const suits_red   = ['♦', '♥'];
export const suitColor2 = "red";
export const allSuits = suits_black.concat( suits_red );
export const maxNumber = 1; //13;

// export function makeDeck(){
//   allSuits.forEach(suit => {  〜〜〜
//   });
//   return this.deck;
// };

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

export const additional_card = ( var_suit, var_number) => {
  return {  id: var_suit+var_number,
            suit: var_suit,
            number: var_number,
            hide: false,
            own: null,
            arena: null,
  };
};

[...Array(2)].map(() => deck.push( additional_card( "J", "-") ) );
deck.push( additional_card( "j", "-") );


export function pick(){
  if( this.deck.length == 0 ) return;
  return this.deck.splice(Math.floor(Math.random() * Math.floor(this.deck.length)), 1)[0];
};

export default () => {
  this.pick();
  // if( deck.length == 0 ) return;
  // return deck.splice(Math.floor(Math.random() * Math.floor(deck.length)), 1)[0];
};