(this["webpackJsonpcm-spin"]=this["webpackJsonpcm-spin"]||[]).push([[0],{33:function(e,t,n){e.exports=n(46)},38:function(e,t,n){},39:function(e,t,n){},46:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),c=n(11),o=n.n(c),i=(n(38),n(22)),l=(n(39),n(70)),m=n(71),s=n(75),p=n(76),u=n(77),h=n(74),g=n(79),E=n(80),f=n(21),d=n.n(f),w=n(81),b=n(72),v=n(48),j=n(73),k=n(29),x=n.n(k),N=n(30),y=n.n(N),C=n(78);var O=function(){var e=Object(a.useState)([]),t=Object(i.a)(e,2),n=t[0],c=t[1],o=Object(a.useState)([]),f=Object(i.a)(o,2),k=f[0],N=f[1],O=Object(l.a)((function(e){return{root:{flexGrow:1},mainContent:{marginTop:e.spacing(2)},paper:{padding:e.spacing(1),textAlign:"center",color:e.palette.text.secondary},menuButton:{marginRight:e.spacing(2)},title:{flexGrow:1},marginTop:{marginTop:e.spacing(2)},row:{marginBottom:e.spacing(1)}}}))();return Object(a.useEffect)((function(){n.length>0||fetch("https://cm-spin.herokuapp.com/").then((function(e){return e.json()})).then((function(e){return c(e)}))})),r.a.createElement(m.a,{className:"App"},r.a.createElement(w.a,{position:"static",container:!0},r.a.createElement(b.a,null,r.a.createElement(j.a,{edge:"start",className:O.menuButton,color:"inherit","aria-label":"menu"},r.a.createElement(x.a,null)),r.a.createElement(v.a,{variant:"h6",className:O.title},"Coin Master Daily Rewards"),r.a.createElement(j.a,{color:"inherit",onClick:function(){c([]),fetch("https://cm-spin.herokuapp.com/").then((function(e){return e.json()})).then((function(e){return c(e)}))}},r.a.createElement(d.a,null)))),r.a.createElement(m.a,{className:O.mainContent},0===n.length&&r.a.createElement(h.a,{variant:"indeterminate",spacing:20,container:!0}),n.map((function(e){return r.a.createElement(s.a,{container:!0,spacing:0,className:O.row},r.a.createElement(s.a,{item:!0,xs:5},r.a.createElement(v.a,{className:O.paper},e.name)),r.a.createElement(s.a,{item:!0,xs:3},r.a.createElement(v.a,{className:O.paper},e.datetime)),r.a.createElement(s.a,{item:!0,xs:4},r.a.createElement(p.a,{component:"a",variant:"contained",target:"_blank",color:"primary",href:e.url},r.a.createElement(u.a,{spacing:2,variant:"contained",color:"primary",size:"small",className:O.button,endIcon:r.a.createElement(y.a,null)},"Collect"))),r.a.createElement(s.a,{xs:12,spacing:3},r.a.createElement(C.a,{component:"hr"})))}))),r.a.createElement(C.a,{component:"hr"}),n.length>0&&r.a.createElement(g.a,{className:O.marginTop,value:k,onChange:function(e,t){N(t),c([]),fetch("https://cm-spin.herokuapp.com/").then((function(e){return e.json()})).then((function(e){return c(e)}))},showLabels:!0},r.a.createElement(E.a,{label:"Refresh",icon:r.a.createElement(d.a,null)})))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(r.a.createElement(O,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[33,1,2]]]);
//# sourceMappingURL=main.6d3124dc.chunk.js.map