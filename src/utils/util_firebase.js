// const $firebaseMainKey= "myBoard/"
export default {
  methods: {
      // getCard2F(sessionKey) {
      // },
      setCard2F( cardObj, roomNum=null ) {
        if(roomNum==null) roomNum=this.getRoomNum();
        firebase.database()
          .ref("myBoard/"+roomNum )   //1=dummt
          // .ref("myBoard/"+this.$route.params.id)
          .child( cardObj.suit+ cardObj.number)
          .set({
            suit:   cardObj.suit,
            number: cardObj.number,
            hide:   cardObj.hide,
            own:    cardObj.own,
            arena:  cardObj.arena,
        });
      },
      // deleteCard2F(sessionKey,index) {
      //     saveSession(sessionKey,data);
      // },
      resetCardAll_F( deckAllArr, roomNum=null ) {
        if(roomNum==null) roomNum=this.getRoomNum();
        deckAllArr.forEach(function(cardDmmy){
          firebase.database()
            .ref("myBoard/"+roomNum)
            .remove()
        });
      },
      getRoomNum( dummy="1" ){
        if(this.$route.params.id){   //dev用
          console.log("no $route.params.id");
          return dummy;
        }
        return this.$route.params.id
      },
      getUserID( dummy="user_a" ){
        if(this.$route.params.user){   //dev用
          console.log("no $route.params.user");
          return dummy;
        }
        return this.$route.params.user
      }
  }
}