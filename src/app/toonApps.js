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
        console.log(listApp[i] + '()');
    }
} 

