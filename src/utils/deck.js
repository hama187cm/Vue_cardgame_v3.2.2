export let deck = [];

export const newCards = "";

// トランプ
export const suits_def = ['♠', '♣']; //def=suits_black
export const suits_red = ['♦', '♥'];
export const allSuits = suits_def.concat( suits_red );
export const defMaxNum = 2; //13;

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
    [...Array( defMaxNum )].map((_, i) => { this.deck.push(cardObj( suit, i+1)) } );
  });
  suits_red.forEach(suit => {
    [...Array( defMaxNum )].map((_, i) => {
      let tmp = cardObj( suit, i+1, "red");
      // tmp.own = "user_a";  //deb用
      this.deck.push( tmp ); 
    });
  });
  suits_red.forEach(suit => {
    [...Array( 2 )].map((_, i) => { 
      let tmp = cardObj( "j", i+1, "purple");
      // tmp.own = "user_a";  //deb用
      // tmp.arena = true;  //deb用
      this.deck.push( tmp ); 
    } );
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

export function pickCard( deckAll ){
  let noOwnerCards = [];
  deckAll.forEach(ele => {
    if(!ele.own) noOwnerCards.push( ele );
  })
  if( noOwnerCards.length == 0 ){
    console.warn("cannot pick for no card in deck");
    return;
  }
  let pickCard = noOwnerCards.splice(Math.floor(Math.random() * Math.floor(noOwnerCards.length)), 1)[0];
  // if(owner){ pickCard.own = owner; }  //firebase.set -> listen (->Arrayに反映)が安全だと思う
  return pickCard;
};

export default () => {
  this.pick();
  // if( deck.length == 0 ) return;
  // return deck.splice(Math.floor(Math.random() * Math.floor(deck.length)), 1)[0];
};