header();
let routeTick = window.setInterval(routeCheck, 1000);
var currentPage;
//
function router(inp){
    if(isHome == true){
        home();
        winLoc('#home()');
        currentPage = '#home()';
    } else if(isNew == true){
        clear();
        engine();
        winLoc('new');
        currentPage = 'new'
    } else if(isLoad == true){

        winLoc('load');
    
    } else if(isApplet == true) {
        clear();
        toonApps();
        winLoc('applets');
        currentPage = 'applets';
    } else {
    }
    if(inp != undefined){
        clear();
        eval(inp);
        winLoc(inp);
    } else {

    }

} 
// okay SO , change winlocs to function names, set current page var to same as winloc, check current page vs win location in route check
// if different route(target page)

function routeCheck(){

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