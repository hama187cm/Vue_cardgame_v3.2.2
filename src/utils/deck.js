const deck = [];
//['spade', 'club', 'diamond', 'heart'].forEach(suit => {
// [100, 200, 300, 400].forEach(suit => {
['♠', '♣', '♦', '♥'].forEach(suit => {
    Array.from(Array(13), (_, i) => ++i).forEach(number => {
    
    // ["♠", "♣", "♦", "♥"]
    deck.push({ suit, number, hide: false, id: (suit+number)});
  });
});

export default () => {
  return deck.splice(Math.floor(Math.random() * Math.floor(deck.length)), 1)[0];
};
