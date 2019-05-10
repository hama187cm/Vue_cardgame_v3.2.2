const deck = [];

// トランプ
export const suits_black = ['♠', '♣'];
export const suits_red   = ['♦', '♥'];
export const suitColor2 = "red";
export const allSuits = suits_black.concat( suits_red );
export const maxNumber = 13;

allSuits.forEach(suit => {
  Array.from(Array( maxNumber ), (_, i) => ++i).forEach(number => {
    deck.push({ suit, number, hide: false, whose: null, id: (suit+number)});
  });
});

export default () => {
  return deck.splice(Math.floor(Math.random() * Math.floor(deck.length)), 1)[0];
};
