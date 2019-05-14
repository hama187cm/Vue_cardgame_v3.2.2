// const $firebaseMainKey= "myBoard/"
export default {
  methods: {
      firebaseSetCard( cardObj, roomNum=null ) {
        // console.log("roomNum 1:"+ roomNum)
        // if(roomNum==null) roomNum=this.getRoomNum();
        // console.log("roomNum 2:"+ roomNum);
        firebase.database()
        .ref("myBoard/"+this.getRoomNum( roomNum ) ) 
        // .ref("myBoard/"+this.$route.params.id)
        .child( cardObj.suit+ cardObj.number)
        .set({
          suit:   cardObj.suit,
          number: cardObj.number,
          hide:   cardObj.hide,
          own:    cardObj.own,
          arena:  cardObj.arena,
        });
        // console.log("roomNum 3:"+ roomNum);
      },

      firebaseSetCardAll( cardAllObj, roomNum=null ) {
        console.log("firebaseSetCardAll");
        // console.dir(cardAllObj);
        let cardAllObj_Tmp = {};
          // Old verson
          // firebase.database()
          //   .ref("myBoard/"+roomNum+"/")
          //   .child(card.id)
          //   .set({
          //     suit: card.suit,
          //     number: card.number,
          //     own: card.own,
          //     arena: card.arena,
          //     hide: card.hide,
          //  });
        cardAllObj.forEach(function( cardObj ){
          cardAllObj_Tmp[ cardObj.id ] = cardObj;
          cardAllObj_Tmp[ cardObj.id ].id = null;
          // cardAllObj_Tmp[ cardObj.id ].own = 1;  //NG
        }  );
        // console.dir(cardAllObj);
        // if(roomNum==null) roomNum=this.getRoomNum();
        firebase.database()
        .ref("myBoard/"+this.getRoomNum( roomNum ) ) 
        .set( cardAllObj_Tmp );
        console.dir( this.getRoomNum() );
      },
      // deleteCard2F(sessionKey,index) {
      //     saveSession(sessionKey,data);
      // },
      firebaseResetCardAll( roomNum=null ) {
        // if(roomNum==null) roomNum=this.getRoomNum();
        firebase.database()
        .ref("myBoard/"+this.getRoomNum( roomNum ) ) 
          .remove()
      },
      getRoomNum( dummy="1" ){
        if(!this.$route.params.id){   //dev用
          console.log("no $route.params.id");
          return dummy;
        }
        return this.$route.params.id
      },
      getUserID( dummy="user_a" ){
        if(!this.$route.params.user){   //dev用
          console.log("no $route.params.user");
          return dummy;
        }
        return this.$route.params.user
      }
  }
}