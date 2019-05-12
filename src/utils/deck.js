export let deck = [];

// トランプ
export const suits_def = ['♠', '♣']; //def=suits_black
export const suits_red   = ['♦', '♥'];
export const allSuits = suits_def.concat( suits_red );
export const defMaxNum = 1; //13;

// export function makeDeck(){
//   allSuits.forEach(suit => {  〜〜〜
//   });
//   return this.deck;
// };

export const cardObj=( suit,
                      number =1,
                      color =null, //null= black
                      hide  =false,
                      own   =null,
                      arena =null,
) => { return { id: suit+number,
                suit: suit, number: number, color: color, hide: hide,own: own, arena: arena,
              };
};

suits_def.forEach(suit => {
  [...Array( defMaxNum )].map((_, i) => deck.push(cardObj( suit, i+1)) );
});
suits_red.forEach(suit => {
  [...Array( defMaxNum )].map((_, i) => deck.push(cardObj( suit, i+1, "red")) );
});
[...Array( 3          )].map((_, i) => deck.push(cardObj( "J", "-")) );

export function pick(){
  if( this.deck.length == 0 ) return;
  return this.deck.splice(Math.floor(Math.random() * Math.floor(this.deck.length)), 1)[0];
};

export default () => {
  this.pick();
  // if( deck.length == 0 ) return;
  // return deck.splice(Math.floor(Math.random() * Math.floor(deck.length)), 1)[0];
};