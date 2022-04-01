header();
// let routeTick = window.setInterval(routeCheck, 1000);
var currentPage = '#home()';
//
function router(inp){
    if(inp != undefined){
        clear();
        eval(inp);
        winLoc(inp);
        if(currentPage.includes('#')){
            currentPage = inp;
            console.log('case a')

        } else {
            currentPage = '#'+inp;
            console.log('case b')
        }
    } else {

    }

} 
// okay SO , change winlocs to function names, set current page var to same as winloc, check current page vs win location in route check
// if different route(target page)

function routeCheck(){
    // If win loc != current page, router current page
    if(window.location.hash == currentPage){
        console.log('ok: ' + window.location.hash);
    } else {
        router(currentPage);
    }
}

footer();

function clear(){
    if(pullID('content') != undefined){
        pullID('content').remove()  
    }
}

function page() {
    $d(body, '', 'content');
    let con = pullID('content');
    return con;
}

function winLoc(inp){
    window.location.hash = inp;
}