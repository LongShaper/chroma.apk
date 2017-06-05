//On initialise Angular 
var app = angular.module('App', ['ngAnimate', 'ngTouch']);

//Initialise ColorData base
var colorData = [];

function Color(hexa, nickname, name, red, green, blue){
  this.hexa = hexa;
  this.nickname = nickname;
  this.name = name;
  this.red = red;
  this.green = green;
  this.blue = blue; 
}
//Add a color
function addColor(hexa, nickname, name, red, green, blue){
  var add = new Color(hexa, nickname, name, red, green, blue);
  colorData.push(add);
  saveColor();
}
//Save data to localstorage
function saveColor(){
  var str = JSON.stringify(colorData);
  window.localStorage.setItem("colors", str);
}

//Get data from localstorage & convert into an object
function getColor(){
  var str = window.localStorage.getItem("colors");
  colorData = JSON.parse(str);
  if(!colorData){
    //Setting default colors 
    colorData = [];
  }
}
getColor();


//Initialise Camera Smartphone
var camera = {
  startCamera: function(){
    CameraPreview.startCamera({
      x: 0,
      y: 0, 
      width: window.screen.width, 
      height: window.screen.height,  
      camera: "back", 
      toBack: true, 
      previewDrag: true, 
      tapPhoto: false});
  },

  takePicture: function(){
    CameraPreview.takePicture({width:window.screen.width, height:window.screen.height, quality: 100},function(imgData){

      //Get pixel color with canvas
      var canvas = document.getElementById("canvas");

      canvas.height = window.screen.height;
      canvas.width = window.screen.width;

      function rgbToHex(r, g, b) {
        if (r > 255 || g > 255 || b > 255)
        throw "Invalid color component";
        return ((r << 16) | (g << 8) | b).toString(16);
      }
      //Get img from Camera
      var getImg = 'data:image/jpeg;base64,' + imgData;
      function drawImageFromSource(sourceurl){
        var img = new Image();

        img.addEventListener("load", function () {
         
          canvas.getContext("2d").drawImage(img, 0, 0, img.width, img.height, 0, 0, canvas.width, canvas.height);
            
          //On position le cibleur dans le canvas
          var height = canvas.height/2.6;
          var width = canvas.width/2;

          var context = canvas.getContext('2d');
          var pixelData = context.getImageData(width, height, 20, 20).data; 

          var hex = "#" + ("000000" + rgbToHex(pixelData[0], pixelData[1], pixelData[2])).slice(-6);
          //Get RGB
          var rouge = Math.floor((pixelData[0]/255)*100);
          var vert = Math.floor((pixelData[1]/255)*100);
          var bleu = Math.floor((pixelData[2]/255)*100);

          // Find color name with ntc.js
          var n_match = ntc.name(hex);
          var n_name = n_match[1];

          // Change preview piker info in HTML
          document.getElementById("colorinfo_content").style.borderColor = hex;
          document.getElementsByClassName("pickerzone_preview")[0].style.borderColor = hex;
          document.getElementById("colorinfo_content--sample").style.backgroundColor = hex;
          document.getElementById("notifadd_color").style.backgroundColor = hex;
          document.getElementById("colorinfo_content--name").innerHTML = n_name;
          document.getElementById("notifadd_name").innerHTML = n_name;
          document.getElementById("colorinfo_content--sample").innerHTML = hex;
          document.getElementById("notifadd_color").innerHTML = hex;
          document.getElementById("red").innerHTML = rouge;
          document.getElementById("green").innerHTML = vert;
          document.getElementById("blue").innerHTML = bleu;


        });
        img.setAttribute("src", sourceurl);
      }
      drawImageFromSource(getImg); 
    

    });
  },
  
  init: function(){
    document.getElementsByClassName('takePictureButton')[0].addEventListener('click', this.takePicture , false);
  }

}

//On device ready 
document.addEventListener('deviceready', function(){
  //On lance le plugin caméra preview une fois que le device est ready
  camera.startCamera();
  camera.init();  

}, false);

//On vérifie si c'est pas la 1er fois qu'on lance l'app
var applaunchCount = window.localStorage.getItem('launchCount');

if(applaunchCount){
    
}else{
  window.localStorage.setItem('launchCount',1);
  /*location.replace("uob.html");*/

  //We add delfaut color for the first time
  addColor("#F5E500","Jaune Banane","Jaune clair","96","90","0");
  addColor("#77B5FE","Bleu de Papa","Bleu ciel","47","71","100");
  addColor("#BF3030","Rouge Fraise","Rouge froncé","75","19","19");
}
