"use strict";(self.webpackChunkfreedom_ui=self.webpackChunkfreedom_ui||[]).push([[291],{14204:function(A,i,e){e.r(i),e.d(i,{default:function(){return n}});var g=e(97695),m=e(39188),t=e(57689),v=e(68523);function n(){return t.createElement("div",{className:"rolling-demo"},t.createElement(m.Z,{time:5},t.createElement("div",{className:"model-box"},new Array(5).fill(0).map(function(D,_){return t.createElement("div",{className:"rolling-item",key:_},"hello world ",_)}))))}},84427:function(A,i,e){e.r(i),e.d(i,{default:function(){return _}});var g=e(97695),m=e(39188),t=e(54306),v=e.n(t),n=e(57689),D=e(68523);function _(){var l=(0,n.useState)(!0),I=v()(l,2),W=I[0],x=I[1];return n.createElement(n.Fragment,null,n.createElement("button",{onClick:function(){return x(!W)}},"\u70B9\u51FB\u6539\u53D8\u72B6\u6001"),n.createElement("br",null),n.createElement("br",null),n.createElement("div",{className:"rolling-demo"},n.createElement(m.Z,{value:W},n.createElement("div",{className:"model-box"},new Array(5).fill(0).map(function(U,R){return n.createElement("div",{className:"rolling-item",key:R},"hello world ",R)})))))}},85826:function(A,i,e){e.r(i),e.d(i,{default:function(){return n}});var g=e(97695),m=e(39188),t=e(57689),v=e(68523);function n(){return t.createElement("div",{className:"rolling-demo"},t.createElement(m.Z,{speed:50,isDragControl:!0},t.createElement("div",{className:"model-box"},new Array(5).fill(0).map(function(D,_){return t.createElement("div",{className:"rolling-item",key:_},"hello world ",_)}))))}},12589:function(A,i,e){e.r(i),e.d(i,{default:function(){return n}});var g=e(97695),m=e(39188),t=e(57689),v=e(68523);function n(){return t.createElement("div",{className:"rolling-demo"},t.createElement(m.Z,{speed:250},t.createElement("div",{className:"model-box"},new Array(5).fill(0).map(function(D,_){return t.createElement("div",{className:"rolling-item",key:_},"hello world ",_)}))))}},17104:function(A,i,e){e.r(i),e.d(i,{default:function(){return n}});var g=e(97695),m=e(39188),t=e(57689),v=e(68523);function n(){return t.createElement("div",{className:"rolling-demo"},t.createElement(m.Z,{action:"click"},t.createElement("div",{className:"model-box"},new Array(5).fill(0).map(function(D,_){return t.createElement("div",{className:"rolling-item",key:_},"hello world ",_)}))))}},39188:function(A,i,e){var g=e(57213),m=e.n(g),t=e(54306),v=e.n(t),n=e(57689),D="fd-rolling",_=(0,n.forwardRef)(function(l,I){var W=l.style,x=l.className,U=l.children,R=l.time,j=R===void 0?10:R,w=l.direction,E=w===void 0?"y":w,h=l.value,z=l.action,G=z===void 0?"hover":z,H=l.speed,ae=l.isDragControl,ie=l.scrollAble,J=l.onDomChange,d=l.onChange,le=(0,n.useState)(h!=null?h:!0),Q=v()(le,2),f=Q[0],ue=Q[1],M=(0,n.useRef)("rollingsAnnualTasks".concat(Math.floor(Math.random()*1e5))),C=(0,n.useRef)(null),V=(0,n.useRef)(null),_e=(0,n.useState)(!1),p=v()(_e,2),s=p[0],q=p[1],ce=(0,n.useState)(!1),ee=v()(ce,2),K=ee[0],se=ee[1],k=(0,n.useRef)(null),F=(0,n.useRef)(0),Z=function(r){var a=y(),c=a.fatherDistance,u=a.currDistance;u!==F.current&&(F.current=u,r&&J&&J(u,r),q(c>u),f&&ne(c>u))},X=(0,n.useRef)(Z);X.current=Z,(0,n.useEffect)(function(){return X.current(),k.current=new MutationObserver(function(o){X.current(o)}),C.current&&k.current.observe(C.current,{attributes:!0,childList:!0,characterData:!0,subtree:!0}),function(){var o;S(),(o=k.current)===null||o===void 0||o.disconnect()}},[]),(0,n.useEffect)(function(){typeof h=="boolean"&&P(h)},[h]),(0,n.useEffect)(function(){!K&&f&&b()},[f,K]),(0,n.useEffect)(function(){s?S():b()},[s]);var y=function(){var r=C.current,a=V.current;if(!r||!a)return{currDistance:0,fatherDistance:0};var c=(E==="x"?r.offsetWidth:r.offsetHeight)/(s?1:2),u=E==="x"?a.offsetWidth:a.offsetHeight;return{fatherDistance:u,currDistance:c}},Y=(0,n.useMemo)(function(){var o=y(),r=o.currDistance;return typeof H=="number"?r/H:j},[j,H,f,s,K]),P=function(r){typeof h=="boolean"&&ue(r)},me=function(){P(!0),b()},S=function(){var r=document.styleSheets[0];if(r){var a=[].slice.call(r.cssRules),c=a.findIndex(function(u){return u.name===M.current});return c!==-1&&r.deleteRule(c),r}},b=function(){var r=C.current;if(r){var a=y(),c=a.currDistance;F.current=c;var u=S();!f||!u||(r.style.animationPlayState="",u.insertRule("@keyframes ".concat(M.current," {0%{ transform: translateX(0%);}100%{transform: translate").concat(E==="x"?"X":"Y","(-").concat(c,"px);}}"),0),K||se(!0))}},de=function(){s||G==="hover"&&(P(!1),d==null||d(!1))},fe=function(){s||G==="hover"&&(P(!0),d==null||d(!0))},ve=function(){s||l.action==="click"&&(d==null||d(!f),P(!f))},Ee=function(){s||l.action==="dblclick"&&(d==null||d(!f),P(!f))},ne=function(r){return q(r),s},De=function(r){if(!(!ae||s)){var a=document.getElementById(M.current);if(a){var c=a.getAnimations(),u=E==="y"?r.clientY:r.clientX,O=y().currDistance,N=O/Y,B,T=function(te){var Me=E==="y"?te.clientY:te.clientX,ge=Me-u;c.forEach(function(oe){B||(B=oe.currentTime||0);var $=B-ge/N*1e3;oe.currentTime=$<0?Y*1e3+$:$})};document.addEventListener("mousemove",T);var L=function re(){document.removeEventListener("mousemove",T),document.removeEventListener("mouseup",re)};document.addEventListener("mouseup",L)}}},he=function(r){if(!(!ie||s)){r.preventDefault();var a=E==="y"?r.wheelDeltaY:r.wheelDeltaX,c=y(),u=c.fatherDistance,O=u/5*2;a=a>O?O:a<-O?-O:a;var N=document.getElementById(M.current);if(N){var B=N.getAnimations();B.forEach(function(T){var L=(T.currentTime||0)-a*10;T.currentTime=L<0?j*1e3+L:L})}}};return(0,n.useImperativeHandle)(I,function(){return{clearAnimation:S,controlAnimation:b,changeForcedStop:ne,startAnimation:me,animationName:M.current,isRolling:f,forcedStop:s,checkDistance:Z}}),n.createElement("div",{className:D,ref:V},n.createElement("div",{id:M.current,ref:C,className:"".concat(x," ").concat(D,"-box ").concat(E==="x"?D+"-flex":""),style:m()(m()({},W||{}),{},{animation:"".concat(M.current," ").concat(Y,"s linear infinite"),animationPlayState:f?"running":"paused",height:E==="x"?"100%":void 0,width:E==="y"?"100%":void 0}),onMouseEnter:de,onMouseLeave:fe,onMouseDown:De,onClick:ve,onDoubleClick:Ee,onWheel:he},U,!s&&U))});i.Z=_},97695:function(){},68523:function(){}}]);
