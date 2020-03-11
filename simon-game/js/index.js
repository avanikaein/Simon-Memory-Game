
document.getElementById('on-btn').addEventListener('click', function(){
    const openingScreen = document.getElementById('opening-page');
    openingScreen.style.display = 'none';
}); 

document.getElementById('end-btn').addEventListener('click', function(){
   location.reload();
});



