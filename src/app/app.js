header();
function router(inp){
    if(isHome == true){
        home();
        winLoc('home');
    } else if(isNew == true){
        clear();
        engine();
        winLoc('new');
    } else if(isLoad == true){

        winLoc('load');
    
    } else if(isApplet == true) {
        clear();
        toonApps();
        winLoc('applets');
    } else {
    }
    if(inp != undefined){
        clear();
        eval(inp);
        winLoc(inp);
    } else {

    }

} 
footer();

function clear(){
    pullID('content').remove()
}

function page() {
    $d(body, '', 'content');
    let con = pullID('content');
    return con;
}

function winLoc(inp){
    window.location.hash = inp;
}