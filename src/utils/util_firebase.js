// const $firebaseMainKey= "myBoard/"
export default {
  methods: {
    $arena(){ return "arena"},
    $newCards(){ return "newCards"},
    $hand(){ return "hand"},
    $hand2(){ return "hand2"},

    firebaseSetCard( cardObj, roomNum=null ) {  //todo: メソッド名の頭に$をつける
      this.formatCardObj(cardObj);
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
    },
    formatCardObj(cardObj){
      if(!cardObj.hide) cardObj.hide  =false;
      if(!cardObj.own) cardObj.own    =null;
      if(!cardObj.arena) cardObj.arena=null;
    },
    firebaseSetCardAll( cardAllObj, roomNum=null ) {  //todo: メソッド名の頭に$をつける
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
    firebaseResetCardAll( roomNum=null ) {  //todo: メソッド名の頭に$をつける
      // if(roomNum==null) roomNum=this.getRoomNum();
      firebase.database()
      .ref("myBoard/"+this.getRoomNum( roomNum ) ) 
        .remove()
    },
    getRoomNum( dummy="1" ){  //todo: メソッド名の頭に$をつける
      if(!this.$route.params.id){   //dev用
        console.log("no $route.params.id");
        return dummy;
      }
      return this.$route.params.id
    },
    getUserID( dummy="user_a" ){  //todo: メソッド名の頭に$をつける
      if(!this.$route.params.user){   //dev用
        console.log("no $route.params.user");
        return dummy;
      }
      return this.$route.params.user
    }
  }
}