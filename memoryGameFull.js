var images = ["https://cdn.pixabay.com/photo/2013/10/16/14/04/polar-bear-196318_1280.jpg",
 "https://cdn.pixabay.com/photo/2016/03/27/21/43/sunglasses-1284392_1280.jpg",
 "https://cdn.pixabay.com/photo/2019/09/22/21/18/water-4496980_1280.jpg",
 "https://cdn.pixabay.com/photo/2020/03/20/20/00/cherry-blossoms-4951853_1280.jpg",
 "https://cdn.pixabay.com/photo/2017/11/06/23/19/composing-2925179_1280.jpg",
 "https://cdn.pixabay.com/photo/2017/11/26/15/16/smiley-2979107_1280.jpg", 
 "https://cdn.pixabay.com/photo/2017/09/19/00/08/doggy-2763664_1280.jpg", 
 "https://cdn.pixabay.com/photo/2015/02/24/15/41/dog-647528_1280.jpg", 
 "https://cdn.pixabay.com/photo/2016/11/08/05/20/buddhism-1807525_1280.jpg", 
 "https://cdn.pixabay.com/photo/2015/05/04/10/16/vegetables-752153_1280.jpg", 
 "https://cdn.pixabay.com/photo/2019/05/29/19/04/tomatoes-4238247_1280.jpg", 
 "https://cdn.pixabay.com/photo/2019/06/25/13/06/fiat-4298163_1280.jpg", 
 "https://cdn.pixabay.com/photo/2019/01/01/13/05/cat-3906675_1280.jpg", 
 "https://cdn.pixabay.com/photo/2016/02/19/11/30/pizza-1209748_1280.jpg", 
 "https://cdn.pixabay.com/photo/2018/11/25/10/31/beverage-3837110_1280.jpg", 
 "https://cdn.pixabay.com/photo/2016/08/15/14/35/lavender-field-1595580_1280.jpg", 
 "https://cdn.pixabay.com/photo/2017/07/20/17/56/herbs-2523119_1280.jpg", 
 "https://cdn.pixabay.com/photo/2017/11/28/22/19/portugal-2984814_1280.jpg", 
 "https://cdn.pixabay.com/photo/2015/03/05/13/53/coffee-660394_1280.jpg", 
 "https://cdn.pixabay.com/photo/2016/03/11/14/55/flowers-1250408_1280.jpg", 
 "https://cdn.pixabay.com/photo/2020/04/02/08/50/ronda-4994127_1280.jpg", 
 "https://cdn.pixabay.com/photo/2016/03/09/09/30/flowers-1245820_1280.jpg", 
 "https://cdn.pixabay.com/photo/2017/01/30/07/54/church-2020258_1280.jpg", 
 "https://cdn.pixabay.com/photo/2014/08/15/11/29/sea-418742_1280.jpg", 
 "https://cdn.pixabay.com/photo/2019/07/08/21/15/horse-eye-4325656_1280.jpg", 
 "https://cdn.pixabay.com/photo/2020/05/22/09/22/lynx-5204667_1280.jpg", 
 "https://cdn.pixabay.com/photo/2020/03/22/16/18/bread-4957679_1280.jpg", 
 "https://cdn.pixabay.com/photo/2017/04/01/12/20/olives-2193467_1280.jpg", 
 "https://cdn.pixabay.com/photo/2019/02/24/13/52/soap-4017608_1280.jpg", 
 "https://cdn.pixabay.com/photo/2020/05/11/15/06/food-5158705_1280.jpg", 
 "https://cdn.pixabay.com/photo/2016/05/23/15/16/herbal-tea-1410565_1280.jpg", 
 "https://cdn.pixabay.com/photo/2015/10/12/15/23/waffle-984499_1280.jpg", 
 "https://cdn.pixabay.com/photo/2020/06/21/12/37/deer-5324645_1280.jpg"]

var numCards = 14;
var cardImages = [];
var clickedImages = [];
var guessedImages = [];

$(document).ready(function(){

/* GAME */

    reset();

    $(".card").click(function(){

        if(clickedImages.length < 2 && !$(this).hasClass("clicked") && !$(this).hasClass("pair")) {
            $(this).addClass("clicked");
            clickedImages.push($(this).html());
            checkIfPair();
        }
        win();
        
    });   

    $("#reset").click(function(){
        reset();
    });


    /* FUNCTIONS */

    function reset() {
        guessedImages = [];
        $(".card").removeClass("pair").removeClass("clicked");
        $(".card").html("");
        $("#reset").text("New game");
        $("#message").text("Pick two cards!");
        setGameBoard();   
    }

    function setGameBoard(){
        pickImages();
        shuffle(cardImages);
        addImagesToCards();
    }

    function pickImages() {
        cardImages = [];
        /*képek kválasztása a kártyákra azok és megkeverése*/
        /* adjon annyi számú képet az arrayhez, amennyi card van*/
        for(i = 0; i < numCards; i++) {
            var rand = Math.floor(Math.random() * images.length);
            var randImage = images[rand];
        /*válassza ki random valahányadik tagját az eredeti arraynek*/
        /*ellenőrizze, hogy benne van-e az újban, addig csinálja, amíg olyat nem talál, ami nincs benne*/
        while(cardImages.includes(images[rand]) === true) {
            rand = Math.floor(Math.random() * images.length);
            randImage = images[rand];
        }
    /*ha talált új képet, tegye be az arraybe*/
          cardImages.push(images[rand]);
          cardImages.push(images[rand]);
        } 
      }

    function shuffle(array) {
        var currentIndex = array.length, temporaryValue, randomIndex;
      
        // While there remain elements to shuffle...
        while (0 !== currentIndex) {
      
          // Pick a remaining element...
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex -= 1;
      
          // And swap it with the current element.
          temporaryValue = array[currentIndex];
          array[currentIndex] = array[randomIndex];
          array[randomIndex] = temporaryValue;
        }
      
        return array;
      }

      function addImagesToCards() {
        $(".card").each(function(i){
            $(this).append("<img src=" + cardImages[i] + ">");
        });
    }

    function checkIfPair() {
        if(clickedImages.length === 2) {
        if(clickedImages[0] === clickedImages[1]) {
        $("#message").text("It's a pair!!!");
        setTimeout(() => { $(".clicked").addClass("pair").removeClass("clicked"); }, 700);
        setTimeout(() => { $("#message").text("Pick two cards!"); }, 1000);
        guessedImages.push(clickedImages[0]);
        clickedImages = [];
        } else {
        $("#message").text("It's not a pair! Try again!");
        setTimeout(() => {  $(".clicked").removeClass("clicked"); }, 700);
        setTimeout(() => { $("#message").text("Pick two cards!"); }, 1000);
        clickedImages = [];
        }
        }       
    }
    
    function win() {
        if (guessedImages.length === numCards) {
            setTimeout(() => { $("#message").text("Congratulations! You won!"); }, 1000);
            $("#reset").text("Play again!");
        }
    }
});

