
function Dice() {
    let con = page();
    $h(2, con, 'Dice Roller', '', '');
    $hr(con);
    $h(3, con, 'You rolled: 0', '', 'ticker');
    $b(con, 'Roll', function () { roll() }, '', '');
    $hr(con);
    $h(4, con, 'Note: Due to the possibility of cheating, this dice machine should be used only for non-event rp.')
}

function roll(){
    let num = Math.floor((Math.random() * 20) + 1);
    pullID('ticker').innerText = 'You rolled: ' + num;
}
