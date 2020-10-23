(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],{49:function(e,t,n){},65:function(e,t,n){e.exports=n(78)},70:function(e,t,n){},78:function(e,t,n){"use strict";n.r(t);var a=n(0),o=n.n(a),c=n(8),r=n.n(c),s=(n(70),n(49),n(54)),l=n(11),i=n(32),m=n(24),u=n(105),g=n(111),h=n(109),d=n(114),p=n(112),f=n(43),v=n.n(f),E=n(50);function b(e){var t=E.isMobile?v()(e.date).format("D/M  HH:mm"):v()(e.date).format("D MMMM YYYY  HH:mm:ss");return o.a.createElement(o.a.Fragment,null,o.a.createElement("section",{className:"message_container"},o.a.createElement("div",{className:"msg_name"}," ",e.name," "),o.a.createElement("div",{className:"msg_date"}," ",t," "),o.a.createElement("div",{className:"msg_message"}," ",e.message," ")))}function _(e){var t=Object(a.useState)(""),n=Object(m.a)(t,2),c=n[0],r=n[1],s=Object(a.useState)(0),l=Object(m.a)(s,2),f=l[0],v=l[1],E=Object(a.useRef)(f);E.current=f;var _=Object(a.useState)(0),j=Object(m.a)(_,2),O=j[0],w=j[1],y=Object(a.useRef)(O);y.current=O;var k=function(e){e.preventDefault();var t="location.state.name",n=new Date(Date.now()),a=c,s=n.getTime();if(0!==c.length&&c.length<1e3){fetch("https://online-chat-app-ellipsoul.herokuapp.com/api/send_message",{method:"POST",mode:"cors",headers:{content_type:"application/json"},body:JSON.stringify({name:t,date:n.toString(),message:a,date_unix:s})}).then((function(e){return e.json()})),console.log("Message sent!"),r(""),w(y.current+1);var l=o.a.createElement(b,{key:y.current,name:t,date:n.toString(),message:a});return x((function(e){return[].concat(Object(i.a)(e),[l])})),v(s),!1}L(!0)};Object(a.useEffect)((function(){I()}),[]);var N=Object(a.useState)([[]]),S=Object(m.a)(N,2),D=S[0],M=S[1],C=Object(a.useRef)(D);C.current=D;var R=Object(a.useState)([[]]),H=Object(m.a)(R,2),T=H[0],x=H[1];function I(){fetch("https://online-chat-app-ellipsoul.herokuapp.com/api/get_all_messages",{method:"GET",mode:"cors",headers:{content_type:"application/json"}}).then((function(e){return e.json()})).then((function(e){console.log("Retrieved all messages from server"),M(e.all_messages);var t=e.all_messages.length;w(y.current+t),x(e.all_messages.map((function(e,n){return o.a.createElement(b,{key:y.current-t+n,name:e[0],date:e[1],message:e[2]})})))}))}function Y(){if(!C.current.length)return I(),null;var e=parseInt(C.current[C.current.length-1][3])>E.current?C.current[C.current.length-1][3]:E.current.toString(),t="https://online-chat-app-ellipsoul.herokuapp.com/api/get_new_messages?time=".concat(e);console.log("Getting new messages with query: ".concat(t," for user ","location.state.name")),fetch(t,{method:"GET",mode:"cors",headers:{content_type:"application/json"}}).then((function(e){return e.json()})).then((function(e){if(console.log("Retrieve new messages from server for user ".concat("location.state.name")),console.log("New messages are:"),console.log(e.new_messages),e.new_messages.length){M((function(t){return[].concat(Object(i.a)(t),Object(i.a)(e.new_messages))}));var t=e.new_messages.length;w(y.current+t);var n=e.new_messages.map((function(e,n){return o.a.createElement(b,{key:y.current-t+n,name:e[0],date:e[1],message:e[2]})}));x((function(e){return[].concat(Object(i.a)(e),Object(i.a)(n))}))}}))}var F=Object(a.useRef)(null);Object(a.useEffect)((function(){F.current.scrollIntoView({behavior:"smooth"})}),[T]);var G=window.innerHeight,W=Math.floor(G/200),A=Object(a.useState)(!1),J=Object(m.a)(A,2),B=J[0],L=J[1];Object(a.useEffect)((function(){var e=setInterval((function(){Y()}),1e3);return function(){return clearInterval(e)}}),[]);var q=Object(a.useState)(!1),z=Object(m.a)(q,2),K=z[0],P=z[1];return o.a.createElement(o.a.Fragment,null,o.a.createElement(u.a,{maxWidth:"lg",className:"large_chat_container",disableGutters:!0},o.a.createElement("section",{className:"chat_container"},o.a.createElement("div",{className:"chat_messages_container"},o.a.createElement("div",{className:"chat_messages_div"},T,o.a.createElement("div",{ref:F}))),o.a.createElement("div",{id:"input_field_div"},o.a.createElement(g.a,{width:"100%"},o.a.createElement(h.a,{label:"Say something, ".concat("location.state.name"," :)"),fullWidth:!0,multiline:!0,rows:W,value:c,onChange:function(e){return r(e.target.value)},variant:"outlined",color:"primary",onKeyDown:function(e){"Enter"==e.key&&k(e)}}))),o.a.createElement(d.a,{color:"secondary",anchorOrigin:{vertical:"bottom",horizontal:"center"},open:B,onClose:function(){L(!1)},autoHideDuration:3e3,message:"Your message is either empty or too long!"}),o.a.createElement("div",{className:"submit_button_div"},o.a.createElement(p.a,{variant:"contained",color:"primary",className:"submit_button",onClick:k},o.a.createElement("span",{id:"submit_button_text"}," Send "))))),o.a.createElement("button",{className:"hidden_button",onClick:function(){console.log("Dev menu toggled"),P(!K)}},"D"),K?o.a.createElement("div",{className:"dev_buttons_div"},o.a.createElement("button",{onClick:function(){fetch("https://online-chat-app-ellipsoul.herokuapp.com/api/clear_messages",{method:"DELETE",mode:"cors",headers:{content_type:"application/json"}}).then((function(){console.log("All messages deleted!")}))}},"DA"),o.a.createElement("button",{onClick:function(){var e=Date.now(),t="https://online-chat-app-ellipsoul.herokuapp.com/api/clear_old_messages?time=".concat(e);fetch(t,{method:"DELETE",mode:"cors",headers:{content_type:"application/json"}}).then((function(){console.log("Old messages deleted!")}))}},"DO"),o.a.createElement("button",{onClick:I},"RA"),o.a.createElement("button",{onClick:Y},"RN")):null)}var j=function(){return console.log("Frontend is now running!"),o.a.createElement(o.a.Fragment,null,o.a.createElement(_,null),o.a.createElement(s.a,null,o.a.createElement(l.c,null,o.a.createElement(l.a,{exact:!0,path:"/chat"},o.a.createElement(_,null)))))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));r.a.render(o.a.createElement(o.a.StrictMode,null,o.a.createElement(j,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[65,1,2]]]);
//# sourceMappingURL=main.42c9928a.chunk.js.map