// Swipe transition with angular 
app.controller('mainCtrl', function swipeCtrlFn($timeout, $scope) {
  var page = this;
  // Set all screen to call
  page.ngInclude = [
    { index: 0, name: 'first', url: 'includes/colors.html'}, 
    { index: 1, name: 'second', url: 'includes/picker.html' }, 
    { index: 2, name: 'third', url: 'includes/filter.html' },
  ];
  page.selectScreen = selectScreen;

  // init first page to load (picker.html)
  page.ngIncludeSelected = page.ngInclude[1];

  // Remove Transition for the first launch screen
  if(page.ngIncludeSelected == page.ngInclude[1]){
    page.Transition = true;
    $timeout(function(){
        page.Transition = false;
    },500);
  }
  
  // Function to play animation swipe left or right 
  //(all set to right, we see if we can allow swipe left)
  // We compare if the current page is more smaller than the screen calling
  function selectScreen(indexSelected) {
    if (page.ngInclude[indexSelected].index > page.ngIncludeSelected.index) {
        page.moveToLeft = false;
    } else {
        if (page.ngInclude[indexSelected].index < page.ngIncludeSelected.index) {
            page.moveToLeft = true;
        }
    }
    page.ngIncludeSelected = page.ngInclude[indexSelected];
  }

});