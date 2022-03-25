header();
function router(){
    if(isHome == true){
        home();
    } else if(isNew == true){
        pullID('content').remove();
        engine();
    
    } else if(isLoad == true){
    
    } else {
    
    }

}