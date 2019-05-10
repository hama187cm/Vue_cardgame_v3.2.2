const deck = [];

// トランプ
// export const suits_black = ['♠', '♣'];
// export const suits_red   = ['♦', '♥'];
// export const suitColor2 = "red";
// export const allSuits = suits_black.concat( suits_red );
// export const maxNumber = 13;

//そっとおやすみ : https://www.tk-game-diary.net/schlafmuetze/schlafmuetze.html
export const suitColor_red = "red";
export const suits_red   = ['J','j'];
export const suits_black = ['♠', '♣',];
export const suits3   = ['♦', '♥','+','-','@'];
export const allSuits = suits_red.concat( 
                        suits_black,
                        suits3,
                        );
export const maxNumber = 4;

allSuits.forEach(suit => {
  Array.from(Array( maxNumber ), (_, i) => ++i).forEach(number => {
    deck.push({ suit, number, hide: false, whose: null, id: (suit+number)});
  });
});

export default () => {
  return deck.splice(Math.floor(Math.random() * Math.floor(deck.length)), 1)[0];
};
