app.controller('pickerCtrl', function($interval, $timeout, $scope) {


    //Setup of the table
    function Color(hexa, nickname, name, red, green, blue){
        this.hexa = hexa;
        this.nickname = nickname;
        this.name = name;
        this.red = red;
        this.green = green;
        this.blue = blue; 
    }

    //Allow add btn only when color hexa is not duplicated
    function verifykHex(){ 
        var getHex = $("#colorinfo_content--sample").text();
        var start = $("#colorinfo_content--name").text();
        var btnAdd = $('#colorinfo_add');

        for (var i in colorData){
            var color = colorData[i];
            var nickname = color.nickname;
            var name = color.name;
            var hexa = color.hexa;
            var r    = color.red;
            var g    = color.green;
            var b    = color.blue;
            
            if(getHex == hexa || start == "Prélève"){
                btnAdd.removeClass("colorinfo_add--actif");
            }else{
                btnAdd.addClass("colorinfo_add--actif");
            }
        }
    }

    verifykHex();

    //Set interval to verify if hex is already in colorData


    //Add a color
    function addColor(hexa, nickname, name, red, green, blue){
        var add = new Color(hexa, nickname, name, red, green, blue);
        colorData.push(add);
        saveColor();
    }

    //Click to add color
    var btnAdd = document.getElementById('colorinfo_add');

    btnAdd.addEventListener('click', function(e){
        clicked = 1;
        var getHex = $("#colorinfo_content--sample").text();
        var getName = $("#colorinfo_content--name").text();
        var getRed = $("#red").text();
        var getGreen = $("#green").text();
        var getBlue = $("#blue").text();
        addColor(getHex, getName, getName, getRed, getGreen, getBlue);

        verifykHex();
        $('#colorinfo_add').addClass("colorinfo_add--animeAdd");
        $('#notifadd').addClass("notifadd--animeAdd");
        $timeout(function() {
            $('#colorinfo_add').removeClass("colorinfo_add--animeAdd");
            $('#notifadd').removeClass("notifadd--animeAdd");
        }, 3500);
        preventWhite();
    }, false);     


    //Verify hexa and white
    var btnPic = document.getElementsByClassName('takePictureButton')[0];
        btnPic.addEventListener('click', function(e){

        $timeout(function() {
            verifykHex();
            preventWhite();
        }, 2000);

        }, false);


    //Prevent case if color picked is white
    function preventWhite(){
      var verify = $("#notifadd_name");
      var txt = verify.text();

      if(txt.indexOf('Blanc') >= 0){
        $("#notifadd_color").addClass("sampleinfo--white");
      }
    }

    //Save data to localstorage
    function saveColor(){
        var str = JSON.stringify(colorData);
        window.localStorage.setItem("colors", str);
    }


});
