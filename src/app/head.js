
function header(){
    $header();
    ////////////////vars/////////////
    let hdr = pullID('header');
    let logo = pullID('logoHold');
    let navBox = pullID('navHold');
    let navi = pullID('headNav');
    ////////////////////////////////
    
    $h(1,logo,'G20 Tools (Beta 2.4.1)','','headTitle');
    // $b(hdr, 'Go back', function () { router(prevPage) }, '', '');
    // $b(hdr, 'Go home', function () { router('home()') }, '', '');
    $b(hdr, 'Go home', function () { location.reload() }, 'button', '');
} 