let last=0;function Dice(){null!=localStorage.getItem("lastDice")&&(last=localStorage.getItem("lastDice"));let e=page();$h(2,e,"Dice Roller","",""),$hr(e),$h(3,e,"You rolled: "+last,"","ticker"),$b(e,"Roll",function(){roll()},"",""),$hr(e),$h(4,e,"Note: Due to the possibility of cheating, this dice machine should be used only for non-event rp.")}function roll(){let e=Math.floor(20*Math.random()+1);pullID("ticker").innerText="You rolled: "+e,localStorage.setItem("lastDice",e)}