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
// ⬇no test then no use
export const addCard_J = cardObj( "j", "-");

suits_def.forEach(suit => {
  [...Array( defMaxNum )].map((_, i) => deck.push(cardObj( suit, i+1)) );
});
suits_red.forEach(suit => {
  [...Array( defMaxNum )].map((_, i) => deck.push(cardObj( suit, i+1, "red")) );
});
[...Array( 3          )].map((_, i) => deck.push(addCard_J ) );

export function init(){
  // ※後でリファクタリング
  this.deck = [];
  suits_def.forEach(suit => {
    [...Array( defMaxNum )].map((_, i) => this.deck.push(cardObj( suit, i+1)) );
  });
  suits_red.forEach(suit => {
    [...Array( defMaxNum )].map((_, i) => this.deck.push(cardObj( suit, i+1, "red")) );
  });
  suits_red.forEach(suit => {
    [...Array( 2 )].map((_, i) => this.deck.push(cardObj( "j", i+1)) );
  });
}

// what change array to obj
// export function initCardAkkObj(){
//   //後でリファクタする
//   let cardAkkObj = {};
//   suits_def.forEach(suit => {
//     [...Array( defMaxNum )].map((_, i) => {
//       let cardObj = cardObj( suit, i+1);
//       cardAkkObj[cardObj.id] = cardObj;
//     })
//   });
//   suits_red.forEach(suit => {
//     [...Array( defMaxNum )].map((_, i) => {
//       let cardObj = cardObj( suit, i+1);
//       cardAkkObj[cardObj.id] = cardObj;
//     })
//   });
//   [...Array( 3          )].map((_, i) => {
//     let cardObj = cardObj( "j", "#");
//     cardAkkObj[cardObj.id] = cardObj;
//   });
//   return cardAkkObj;
// }
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