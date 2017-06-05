app.controller('actionsCtrl', function($scope) {

  //Setup of the table
  function Color(hexa, nickname, name, red, green, blue){
    this.hexa = hexa;
    this.nickname = nickname;
    this.name = name;
    this.red = red;
    this.green = green;
    this.blue = blue; 
  }

  //Remove a color
  function removeColor(index){
    if(index != 0){
      colorData.splice(index, 1);
      saveColor();
    }
  }

  //Get a color
  function getColorAtIndex(index){
    return colorData[index];
  }

  //Save data to localstorage
  function saveColor(){
    var str = JSON.stringify(colorData);
    window.localStorage.setItem("colors", str);
  }

  //DELETE A COLOR
  var deleteBtn = document.getElementsByClassName("listactions_el--delete");
  var nbList = document.getElementsByClassName("listcolors_el");
      
  var resetStyle = function(){
   $(".listcolors_el--color_sample").removeClass("listcolors_el--color_sample--active");
   $(".listcolors_el--color").css({'-webkit-transform' : 'translate3d(0, 0,0)'});
   $(".listcolors_el--actions").removeClass("listcolors_el--anime");
  }   
  //Loop listcolors_el and get the include id
  for (var i = 0; i < nbList.length; i++) {

    $scope.delete = function(){ 
        removeColor(i-1);
        resetStyle();
    }
  }  
  //Show popup on TAP WHEN el--color is closed
  var showPopup = function(){
     $(".colorpopup").addClass("colorpopup--actif");
     $(".screen--colors").append("<span class='close'></span>");
  }
  var notshowPopup = function(){
     $(".colorpopup").removeClass("colorpopup--actif");
     $(".screen--colors").children("span").remove();
  }


});

