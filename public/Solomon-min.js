let gen=e=>{return document.createElement(e)},pullID=e=>{return document.getElementById(e)},pullCN=e=>{return document.getElementsByClassName(e)},val=(e,o)=>{if(null==o||""==o)return pullID(e).value;pullID(e).value=o},body=pullID("root"),$g=(e,o,t,l,r,n,$,a,i)=>{let p=gen(o);"form"===o&&(void 0!==$&&(p.action=$),void 0!==a&&(p.method=a),void 0!==i&&(p.method=i)),"input"===o&&(void 0!==$&&(p.type=$),void 0!==a&&(p.name=a),"true"==i&&(p.disabled=!0)),"script"===o&&(p.src=n),"img"===o&&(p.src=t),"a"===o&&(p.href=n,p.textContent=t),p.textContent=t,"button"===o&&(p.onclick=n),l&&(p.id=l),r&&(p.className=r),n&&"img"===o&&(p.alt=n),e.appendChild(p)},$img=(e,o,t,l,r)=>{$g(e,"img",o,r,l,t)},$p=(e,o,t,l)=>{$g(e,"p",o,l,t)},$h=(e,o,t,l,r)=>{$g(o,"h"+e,t,r,l)},$d=(e,o,t)=>{$g(e,"div","",t,o)},$hr=(e,o,t)=>{$g(e,"hr","",t,o)},$nav=(e,o,t)=>{$g(e,"nav","",t,o)},$na=(e,o,t,l,r)=>{$g(e,"a",o,r,l,t)},$a=(e,o,t,l,r)=>{$g(e,"a",o,r,l,t)},$sel=(e,o,t)=>{$g(e,"select","",t,o)},$opt=(e,o,t,l)=>{$g(e,"option",o,l,t)},$l=(e,o,t,l,r)=>{"ul"===e||"ol"===e?$g(o,e,t,r,l):$h(1,body,"$l error: Type is improperly configured.")},$li=(e,o,t,l)=>{$g(e,"li",o,l,t)},$script=(e,o,t,l,r)=>{$g(e,"script",o,l,t,r)},$form=(e,o,t,l,r,n)=>{$g(e,"form","",t,o,"",l,r,n)},$input=(e,o,t,l,r,n,$,a,i)=>{i||$p(e,$,t+"label",l+"label"),$g(e,"input",o,l,t,"",r,n,a)},$b=(e,o,t,l,r)=>{$g(e,"button",o,r,l,t)},$area=(e,o,t,l,r,n)=>{null==n||""==n?$p(e,r,t+"label",l+"label"):$input(e,o+"pre",t+"pre",l+"pre","","     ",r,"",!0),$g(e,"textarea",o,l,t,"")},$header=()=>{$d(body,"","header"),$d(pullID("header"),"","logoHold"),$d(pullID("header"),"","navHold"),$nav(pullID("navHold"),"","headNav")},$foot=(e,o,t)=>{function l(){return $d(pullID("footer"),"","footNavContainer"),$nav(pullID("footNavContainer","","footNav"))}function r(){return $d(pullID("footer"),"","noticeDiv"),$p(pullID("noticeDiv"),e,"","footerNotice")}$d(body,"","footer"),!0===o?"l"===t?(l(),r()):"r"===t?(r(),l()):($h(1,body,"Footer improperly configured, see console"),console.log("Err: Position parameter not set")):$p(pullID("footer"),e,"","footerNotice")};