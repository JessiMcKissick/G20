let version = '1.0.1b (Unskinned)';

function header(){
    $header();
    ////////////////vars/////////////
    let hdr = pullID('header');
    let logo = pullID('logoHold');
    let navBox = pullID('navHold');
    let navi = pullID('headNav');
    ////////////////////////////////
    
    $h(1,logo,'G20 Character Sheet (Beta) ' + version,'','headTitle');
    $b(hdr, 'Go back', function () { router(prevPage) }, '', '')
    $b(hdr, 'Go home', function () { router('home()') }, '', '')


} 