header();
let routeTick = window.setInterval(routeCheck, 100);
var currentPage = '#home()';
var prevPage = '';
//
function router(inp){
    nhash = window.location.hash;
    prevPage = nhash.substring(1);
    if(inp != undefined){
        clear();
        eval(inp);
        winLoc(inp);
            currentPage = inp;
    } else {

    }
    pullID('footer').remove();
    footer();
} 
// okay SO , change winlocs to function names, set current page var to same as winloc, check current page vs win location in route check
// if different route(target page)

async function routeCheck(){
    // If win loc != current page, router current page
    if(window.location.hash.substring(1) != currentPage) {
        currentPage = window.location.hash.substring(1);
        router(currentPage);
    }
}

footer();

function clear(){
    if(pullID('content') != undefined){
        pullID('content').remove()  
        if(pullID('auxCounter') != undefined){
            pullID('auxCounter').remove(); //Fixes a weird bug
        }
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