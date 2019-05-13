export let deck = [];

// トランプ
export const suits_def = ['♠', '♣']; //def=suits_black
export const suits_red = ['♦', '♥'];
export const allSuits = suits_def.concat( suits_red );
export const defMaxNum = 3; //13;

export const cardObj=( suit =null,
                      number =null,
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


export function init(){
  //後でリファクタする
  this.deck = [];
  suits_def.forEach(suit => {
    [...Array( defMaxNum )].map((_, i) => this.deck.push(cardObj( suit, i+1)) );
  });
  suits_red.forEach(suit => {
    [...Array( defMaxNum )].map((_, i) => this.deck.push(cardObj( suit, i+1, "red")) );
  });
    [...Array( 3          )].map((_, i) => this.deck.push(cardObj( "J", "-")) );
  // return deck;
}

export function pick( owner=null, arena=null ){
  if( this.deck.length == 0 ) return;
  let pickCard = this.deck.splice(Math.floor(Math.random() * Math.floor(this.deck.length)), 1)[0];
  if(owner){ pickCard.own = owner; }
  if(arena){ pickCard.arena = arena; }
  return pickCard;
};

export default () => {
  this.pick();
  // if( deck.length == 0 ) return;
  // return deck.splice(Math.floor(Math.random() * Math.floor(deck.length)), 1)[0];
};