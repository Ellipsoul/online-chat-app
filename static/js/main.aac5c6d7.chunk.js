(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],{112:function(e,t,a){"use strict";a.r(t);var n=a(0),c=a.n(n),o=a(8),r=a.n(o),l=(a(88),a(47),a(40)),s=a(11),i=a(17),m=a(139),u=a(144),g=a(147),h=a(149),p=a(71),d=a(142);function E(){var e=Object(n.useState)(""),t=Object(i.a)(e,2),a=t[0],o=t[1],r=Object(n.useState)(""),l=Object(i.a)(r,2),E=l[0],f=l[1],v=Object(n.useState)(!1),b=Object(i.a)(v,2),_=b[0],w=b[1],j=Object(n.useState)(""),O=Object(i.a)(j,2),y=O[0],k=O[1];if(E)return c.a.createElement(s.a,{to:{pathname:E,state:{name:a}}});var N=function(e){if(a.length){if(!(a.length>20))return f("/chat");k("Please enter a shorter name!"),w(!0)}else k("Please enter a non-empty name"),w(!0)},S=window.innerHeight,D=window.innerWidth,C=Object(p.a)({typography:{fontSize:.03*S}}),M=Object(p.a)({typography:{fontSize:.02*D+.02*S}});return c.a.createElement(c.a.Fragment,null,c.a.createElement(m.a,{maxWidth:"lg",className:"large_login_container"},c.a.createElement("section",{id:"login_container"},c.a.createElement("div",{id:"welcome"},"Welcome!"),c.a.createElement("div",{id:"info"},"This is a simple chat site where you can connect with your name and chat with all connected users! Made with:"),c.a.createElement("div",{id:"logos"},c.a.createElement("div",null,c.a.createElement("a",{href:"https://github.com/Ellipsoul",target:"_blank"},c.a.createElement("img",{src:"/online-chat-app/images/github_logo.png",className:"logo"}))),c.a.createElement("div",null,c.a.createElement("a",{href:"https://reactjs.org/",target:"_blank"},c.a.createElement("img",{src:"/online-chat-app/images/react_logo.png",className:"logo"}))),c.a.createElement("div",null,c.a.createElement("a",{href:"https://www.typescriptlang.org/",target:"_blank"},c.a.createElement("img",{src:"/online-chat-app/images/typescript_logo.png",className:"logo"}))),c.a.createElement("div",null,c.a.createElement("a",{href:"https://www.python.org/",target:"_blank"},c.a.createElement("img",{src:"/online-chat-app/images/python_logo.png",className:"logo"}))),c.a.createElement("div",null,c.a.createElement("a",{href:"https://flask.palletsprojects.com/en/1.1.x/",target:"_blank"},c.a.createElement("img",{src:"/online-chat-app/images/flask_logo.png",className:"logo"}))),c.a.createElement("div",null,c.a.createElement("a",{href:"https://www.heroku.com/",target:"_blank"},c.a.createElement("img",{src:"/online-chat-app/images/heroku_logo.png",className:"logo"})))),c.a.createElement("div",{id:"name_login"},c.a.createElement("div",{className:"name_input"},c.a.createElement(d.a,{theme:C},c.a.createElement(u.a,{fullWidth:!0,multiline:!0,rows:1,value:a,onChange:function(e){return o(e.target.value)},variant:"outlined",color:"primary",placeholder:"Enter name",onKeyDown:function(e){"Enter"==e.key&&N()}}))),c.a.createElement("div",{className:"name_submit_div"},c.a.createElement(d.a,{theme:M},c.a.createElement(g.a,{variant:"contained",color:"primary",className:"name_button",onClick:N},"Start Chatting!"))),c.a.createElement(h.a,{color:"secondary",anchorOrigin:{vertical:"bottom",horizontal:"center"},open:_,onClose:function(){w(!1)},autoHideDuration:3e3,message:y})))))}var f=a(33),v=a(146),b=a(67),_=a.n(b),w=a(68),j=a(69),O=a.n(j),y=a(50),k=a.n(y),N=a(70);function S(e){var t=N.isMobile?k()(e.date).format("D/M  HH:mm"):k()(e.date).format("D MMMM YYYY  HH:mm:ss");return c.a.createElement(c.a.Fragment,null,c.a.createElement("section",{className:"message_container"},c.a.createElement("div",{className:"msg_name"}," ",e.name," "),c.a.createElement("div",{className:"msg_date"}," ",t," "),c.a.createElement("div",{className:"msg_message"}," ",e.message," ")))}function D(e){var t=Object(s.g)(),a=Object(n.useState)(""),o=Object(i.a)(a,2),r=o[0],l=o[1],p=Object(n.useState)(0),d=Object(i.a)(p,2),E=d[0],b=d[1],j=Object(n.useRef)(E);j.current=E;var y=Object(n.useState)(0),k=Object(i.a)(y,2),N=k[0],D=k[1],C=Object(n.useRef)(N);C.current=N;var M=function(e){e.preventDefault();var a=t.state.name,n=new Date(Date.now()),o=r,s=n.getTime();if(0!==r.length&&r.length<1e3){O.a.post("https://online-chat-app-ellipsoul.herokuapp.com/api/send_message",{name:a,date:n.toString(),message:o,date_unix:s}),console.log("Message sent: ".concat(o)),l(""),D(C.current+1);var i=c.a.createElement(S,{key:C.current,name:a,date:n.toString(),message:o});return z((function(e){return[].concat(Object(f.a)(e),[i])})),b(s),!1}V(!0)};Object(n.useEffect)((function(){G(),ee()}),[]);var x=Object(n.useState)([[]]),H=Object(i.a)(x,2),R=H[0],W=H[1],T=Object(n.useRef)(R);T.current=R;var F=Object(n.useState)([[]]),I=Object(i.a)(F,2),Y=I[0],z=I[1];function G(){fetch("https://online-chat-app-ellipsoul.herokuapp.com/api/get_all_messages",{method:"GET",mode:"cors",headers:{content_type:"application/json"}}).then((function(e){return e.json()})).then((function(e){console.log("Retrieved all messages from server"),W(e.all_messages);var t=e.all_messages.length;D(C.current+t),z(e.all_messages.map((function(e,a){return c.a.createElement(S,{key:C.current-t+a,name:e[0],date:e[1],message:e[2]})})))}))}function A(){if(!T.current.length)return G(),null;var e=parseInt(T.current[T.current.length-1][3])>j.current?T.current[T.current.length-1][3]:j.current.toString(),a="https://online-chat-app-ellipsoul.herokuapp.com/api/get_new_messages?time=".concat(e);console.log("Getting new messages with query: ".concat(a," for user ").concat(t.state.name)),fetch(a,{method:"GET",mode:"cors",headers:{content_type:"application/json"}}).then((function(e){return e.json()})).then((function(e){if(console.log("Retrieve new messages from server for user ".concat(t.state.name)),console.log("New messages are:"),console.log(e.new_messages),e.new_messages.length){W((function(t){return[].concat(Object(f.a)(t),Object(f.a)(e.new_messages))}));var a=e.new_messages.length;D(C.current+a);var n=e.new_messages.map((function(e,t){return c.a.createElement(S,{key:C.current-a+t,name:e[0],date:e[1],message:e[2]})}));z((function(e){return[].concat(Object(f.a)(e),Object(f.a)(n))})),ee(),console.log("Should have played sound!")}}))}var B=Object(n.useRef)(null);Object(n.useEffect)((function(){B.current.scrollIntoView({behavior:"smooth"})}),[Y]);var J=window.innerHeight,K=Math.floor(J/200),L=Object(n.useState)(!1),P=Object(i.a)(L,2),q=P[0],V=P[1];Object(n.useEffect)((function(){var e=setInterval((function(){A()}),3e3);return function(){return clearInterval(e)}}),[]);var $=Object(n.useState)(!1),Q=Object(i.a)($,2),U=Q[0],X=Q[1];var Z=Object(w.a)(_.a),ee=Object(i.a)(Z,1)[0];return c.a.createElement(c.a.Fragment,null,c.a.createElement(m.a,{maxWidth:"lg",className:"large_chat_container",disableGutters:!0},c.a.createElement("section",{className:"chat_container"},c.a.createElement("div",{className:"chat_messages_container"},c.a.createElement("div",{className:"chat_messages_div"},Y,c.a.createElement("div",{ref:B}))),c.a.createElement("div",{id:"input_field_div"},c.a.createElement(v.a,{width:"100%"},c.a.createElement(u.a,{label:"Say something, ".concat(t.state.name," :)"),fullWidth:!0,multiline:!0,rows:K,value:r,onChange:function(e){return l(e.target.value)},variant:"outlined",color:"primary",onKeyDown:function(e){"Enter"==e.key&&M(e)}}))),c.a.createElement(h.a,{color:"secondary",anchorOrigin:{vertical:"bottom",horizontal:"center"},open:q,onClose:function(){V(!1)},autoHideDuration:3e3,message:"Your message is either empty or too long!"}),c.a.createElement("div",{className:"submit_button_div"},c.a.createElement(g.a,{variant:"contained",color:"primary",className:"submit_button",onClick:M},c.a.createElement("span",{id:"submit_button_text"}," Send "))))),c.a.createElement("button",{className:"hidden_button",onClick:function(){console.log("Dev menu toggled"),X(!U)}},"D"),U?c.a.createElement("div",{className:"dev_buttons_div"},c.a.createElement("button",{onClick:function(){fetch("https://online-chat-app-ellipsoul.herokuapp.com/api/clear_messages",{method:"DELETE",mode:"cors",headers:{content_type:"application/json"}}).then((function(){console.log("All messages deleted!")}))}},"DA"),c.a.createElement("button",{onClick:function(){var e=Date.now(),t="https://online-chat-app-ellipsoul.herokuapp.com/api/clear_old_messages?time=".concat(e);fetch(t,{method:"DELETE",mode:"cors",headers:{content_type:"application/json"}}).then((function(){console.log("Old messages deleted!")}))}},"DO"),c.a.createElement("button",{onClick:G},"RA"),c.a.createElement("button",{onClick:A},"RN")):null,c.a.createElement(g.a,{className:"return_button",color:"secondary",href:"https://ellipsoul.github.io/online-chat-app/"},"\u21a9"))}var C=function(){return console.log("Frontend is now running!"),c.a.createElement(c.a.Fragment,null,c.a.createElement(l.a,null,c.a.createElement(E,null),c.a.createElement(s.d,null,c.a.createElement(s.b,{exact:!0,path:"/chat"},c.a.createElement(D,null)))))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));r.a.render(c.a.createElement(c.a.StrictMode,null,c.a.createElement(C,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},47:function(e,t,a){},67:function(e,t,a){e.exports=a.p+"static/media/message_received.835574b7.mp3"},83:function(e,t,a){e.exports=a(112)},88:function(e,t,a){}},[[83,1,2]]]);
//# sourceMappingURL=main.aac5c6d7.chunk.js.map