(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{11:function(e,t,n){e.exports=n(24)},16:function(e,t,n){},18:function(e,t,n){},24:function(e,t,n){"use strict";n.r(t);var a=n(1),r=n.n(a),o=n(9),c=n.n(o),s=(n(16),n(3)),u=n(4),l=n(6),i=n(5),m=n(7),h=(n(18),n(10)),f=(n(22),function(e){function t(e){var n;return Object(s.a)(this,t),(n=Object(l.a)(this,Object(i.a)(t).call(this,e))).state={},n}return Object(m.a)(t,e),Object(u.a)(t,[{key:"render",value:function(){var e=[{Header:"Name",accessor:"name"},{Header:"Age",accessor:"age",Cell:function(e){return r.a.createElement("span",{className:"number"},e.value)}},{Header:function(e){return r.a.createElement("span",null,"Team")},accessor:"team"}];return r.a.createElement(h.a,{data:[{name:"Stephen Curry",age:30,team:"GSW"},{name:"LeBron James",age:33,team:"LAL"}],columns:e})}}]),t}(a.Component)),d=function(e){function t(e){var n;return Object(s.a)(this,t),(n=Object(l.a)(this,Object(i.a)(t).call(this,e))).state={showResults:!1,queryResult:null,query:""},n}return Object(m.a)(t,e),Object(u.a)(t,[{key:"render",value:function(){var e=this;return r.a.createElement("div",{className:"App"},r.a.createElement("h1",{style:{color:"orange"}},"Basket Ball"),r.a.createElement("h2",null,"Search for a team, player, or game"),r.a.createElement("div",null,r.a.createElement("input",{type:"text",value:this.state.query,onChange:function(t){return e.setState({query:t.text})}}),r.a.createElement("button",{onClick:function(){e.setState({showResults:!0}),e.getResults(e.state.query)}},"Search"),r.a.createElement("button",{onClick:function(){return e.setState({showResults:!1,query:""})}},"Reset")),this.state.showResults&&r.a.createElement(f,null))}},{key:"getResults",value:function(e){}}]),t}(a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(r.a.createElement(d,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[11,2,1]]]);
//# sourceMappingURL=main.42a120ab.chunk.js.map