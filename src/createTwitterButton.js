/***
 * createTwitterButton(cocos2d-x(js-bindings)用)
 *   作成 : アミーゴ(@WL_Amigo)
 *
 * 必要環境 :
 *
 * つぶやくボタンを含むcc.Menuオブジェクトを作成します。
 * createTwitterButton()により作成されるcc.Menuオブジェクトを
 * Node(Layerなど)に対してaddChildすることにより、つぶやくボタンを設置することが出来ます。
 * ボタン画像は本スクリプトのCTBOPTIONで設定していますので、適切に設定して下さい。
 *
*/

/*
 より詳しい使い方
------------------
まず、本スクリプトに定義されている`CTBOPTION`を適切に変更します。

CTBOPTIONを設定後は、以下のようにしてcreateTwitterButtonで生成されるcc.Menu
オブジェクトをLayerなどにaddChildします。
```
  var exampleLayer = new cc.Layer.extend({
    ctor:function(){
      ...
      var twitterButton = createTwitterButton(size.width / 2, size.height / 2,
          "てすとついーと！",
          "http://example.com/",
          this);
      this.addChild(twitterButton, 1);
      ...
    }
  })
``` 
*/

var CTBOPTION = {
    // normalImage - 通常時のボタン画像へのパス
    normalImage : "res/twitterButton.png",
    // pushedImage - 押された時のボタン画像へのパス
    pushedImage : "res/twitterButton.png",
    // dataRelated - ツイート後に表示されるユーザー名(twitterID)(省略可能)
    dataRelated : "",
}

/***
 * Twitterにつぶやくページへ飛ばすボタンを含むMenuオブジェクトを作成します。
 * TwitterのShareボタンを再現するものなので、シェアするURLが必要になります。
 *
 * @param {number} newX - ボタンを表示させる左上のx座標
 * @param {number} newY - ボタンを表示させる左上のy座標
 * @param {string} tweetContent - ツイートする内容
 * @param {string} shareURL - シェアするページのURL
 * @param {cc.Node} addingNode - これで作成されるボタンを追加する先のNode
 *
*/
var createTwitterButton = function(newX, newY, tweetContent, shareURL, addingNode){

    var size = cc.winSize;

    var twitterButton = new cc.MenuItemImage(
        CTBOPTION.normalImage,
        CTBOPTION.pushedImage,
        function () {
            var url = "http://twitter.com/share?url=" + shareURL + "&text=" + tweetContent;
            if(CTBOPTION.dataRelated.length != 0){
                url = url + "&related=" + CTBOPTION.dataRelated;
            }
            cc.sys.openURL(url);
        }, addingNode);
        twitterButton.attr({
            x: newX,
            y: newY,
            anchorX: 0.0,
            anchorY: 0.0
        });

        var menu = new cc.Menu(twitterButton);
        menu.x = 0;
        menu.y = 0;

        return menu;

}
