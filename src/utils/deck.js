const deck = [];

const allSuits = ['♠', '♣', '♦', '♥'];
const maxNumber = 13;

//['spade', 'club', 'diamond', 'heart'].forEach(suit => {
// [100, 200, 300, 400].forEach(suit => {
allSuits.forEach(suit => {
  Array.from(Array( maxNumber ), (_, i) => ++i).forEach(number => {
    
    // ["♠", "♣", "♦", "♥"]
    deck.push({ suit, number, hide: false, id: (suit+number)});
  });
});

export default () => {
  return deck.splice(Math.floor(Math.random() * Math.floor(deck.length)), 1)[0];
};
