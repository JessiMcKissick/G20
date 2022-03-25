function newSheet(){
    console.log('new');
    isHome = false;
    isNew = true;
    router();
}

function loadSheets(){
    console.log('load');
}

function exportFunc(){

}

function importFunc(){

}

// Note: Relearn how to save to browser cache, save each sheet in cache as a seperate cache entry in string form
// Allow import/export of stringified sheet data.