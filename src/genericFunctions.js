function newSheet(){
    console.log('new');
    isHome = false;
    isNew = true;
    isApplet = false;
    router();
}

function loadSheets(){
    console.log('load');
}

function exportFunc(){

}

function importFunc(){

}

function loadApplets(){
    isHome = false;
    isApplet = true;
    router();
}


// Note: Relearn how to save to browser cache, save each sheet in cache as a seperate cache entry in string form
// Allow import/export of stringified sheet data.