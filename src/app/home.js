function home(){
    $d(body, '', 'content');
        let con = pullID('content');
        $h(2, con, 'Character Sheets', '', 'homeTitle');
        $hr(con, 'divider', '')
    $b(con, '📜 New Sheet', function () { router('engine()')},'button','');
    $b(con,'📝 Load Sheet',function(){router('load()')}, 'button', '');
    $b(con,'📱 Applets', function(){router('applets()')}, 'button','');
    $b(con, '👑 DM Console', function(){router('dm()')}, 'button', '');
    $b(con,'❌ Delete Sheet', function(){localStorage.clear()},'button');
} 