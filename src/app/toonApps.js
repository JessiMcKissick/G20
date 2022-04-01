let listApp = [
    'Alaqua',
    'Aiya',
    'Dice'
];

var tick = 0;

function applets() {
    let con = page();
    $h(2, con, 'Applets', '', 'appsTitle');
    $hr(con, 'divider', '')
    for(let i = 0; i < listApp.length; i++){
        $b(con,listApp[i],function(){router(listApp[i]+'()')},'','')
    }
    $hr(con);
    $p(con,'Applets are created on request. If you have an idea, feel free to contact me at TheJammiestOfJams#8230')
} 

