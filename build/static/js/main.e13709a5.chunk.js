(this.webpackJsonpkalina_paint=this.webpackJsonpkalina_paint||[]).push([[0],{36:function(t,e,n){},55:function(t,e,n){},81:function(t,e,n){},82:function(t,e,n){"use strict";n.r(e);var i=n(0),s=n.n(i),a=n(15),o=n.n(a),c=n(26),r=n(10),l=n(11),h=n(7),u=new(function(){function t(){Object(r.a)(this,t),this.tool=null,this.strokeStyle="#000000",Object(h.d)(this)}return Object(l.a)(t,[{key:"setTool",value:function(t){this.tool=t}},{key:"setFillColor",value:function(t){this.tool.fillColor=t}},{key:"setStrokeColor",value:function(t){this.strokeStyle=t,this.tool.strokeStyle=this.strokeStyle}},{key:"setLineWidth",value:function(t){this.tool.lineWidth=t}}]),t}()),d=(n(36),n(1)),f=Object(c.a)((function(){return Object(d.jsxs)("div",{className:"toolbar settingbar",children:[Object(d.jsx)("label",{htmlFor:"line-width",children:"Line width"}),Object(d.jsx)("input",{type:"number",id:"line-width",style:{margin:"0 10px"},defaultValue:1,min:1,max:50,onChange:function(t){return u.setLineWidth(t.target.value)}}),Object(d.jsx)("label",{htmlFor:"stroke-color",children:"Stroke color"}),Object(d.jsx)("input",{type:"color",id:"stroke-color",style:{margin:"0 10px"},onChange:function(t){return u.setStrokeColor(t.target.value)},value:u.strokeStyle})]})})),v=new(function(){function t(){Object(r.a)(this,t),this.canvas=null,this.socket=null,this.sessionid=null,this.undoList=[],this.redoList=[],this.username="",Object(h.d)(this)}return Object(l.a)(t,[{key:"setUserName",value:function(t){this.username=t}},{key:"setSocket",value:function(t){this.socket=t}},{key:"setSessionId",value:function(t){this.sessionid=t}},{key:"setCanvas",value:function(t){this.canvas=t}},{key:"pushToUndo",value:function(t){this.undoList.push(t)}},{key:"pushToRedo",value:function(t){this.redoList.push(t)}},{key:"undo",value:function(){var t=this,e=this.canvas.getContext("2d");if(this.undoList.length>0){var n=this.undoList.pop();this.redoList.push(this.canvas.toDataURL());var i=new Image;i.src=n,i.onload=function(){e.clearRect(0,0,t.canvas.width,t.canvas.height),e.drawImage(i,0,0,t.canvas.width,t.canvas.height)}}else e.clearRect(0,0,this.canvas.width,this.canvas.height)}},{key:"redo",value:function(){var t=this,e=this.canvas.getContext("2d");if(this.redoList.length>0){var n=this.redoList.pop();this.undoList.push(this.canvas.toDataURL());var i=new Image;i.src=n,i.onload=function(){e.clearRect(0,0,t.canvas.width,t.canvas.height),e.drawImage(i,0,0,t.canvas.width,t.canvas.height)}}}}]),t}()),b=n(4),g=n(21),m=n(20),j=function(){function t(e,n,i){Object(r.a)(this,t),this.canvas=e,this.socket=n,this.id=i,this.ctx=e.getContext("2d"),this.destroyEvents()}return Object(l.a)(t,[{key:"fillColor",set:function(t){this.ctx.fillStyle=t}},{key:"strokeStyle",set:function(t){this.ctx.strokeStyle=t}},{key:"lineWidth",set:function(t){this.ctx.lineWidth=t}},{key:"destroyEvents",value:function(){this.canvas.onmousemove=null,this.canvas.onmouseup=null,this.canvas.onmousedown=null,this.canvas.onmouseleave=null}}]),t}(),w=function(t){Object(g.a)(n,t);var e=Object(m.a)(n);function n(t,i,s,a){var o;return Object(r.a)(this,n),(o=e.call(this,t,i,s)).finishDraw=function(){o.mouseDown=!1,o.socket.send(JSON.stringify({method:"draw",id:o.id,figure:{type:"finish"}}))},o.isEraser=a,o.canvas.onmousemove=o.mouseMoveHadler.bind(Object(b.a)(o)),o.canvas.onmouseup=o.finishDraw.bind(Object(b.a)(o)),o.canvas.onmousedown=o.mouseDownHadler.bind(Object(b.a)(o)),o.canvas.onmouseleave=o.finishDraw.bind(Object(b.a)(o)),o}return Object(l.a)(n,[{key:"mouseDownHadler",value:function(t){this.mouseDown=!0,this.ctx.beginPath(),this.ctx.moveTo(t.pageX-t.target.offsetLeft,t.pageY-t.target.offsetTop)}},{key:"mouseMoveHadler",value:function(t){this.mouseDown&&this.socket.send(JSON.stringify({method:"draw",id:this.id,figure:{type:"brush",x:t.pageX-t.target.offsetLeft,y:t.pageY-t.target.offsetTop,color:this.ctx.fillStyle,lineWidth:this.ctx.lineWidth,strokeStyle:this.ctx.strokeStyle,isEraser:this.isEraser}}))}}],[{key:"draw",value:function(t,e,n,i,s,a,o){var c=t.fillStyle,r=t.strokeStyle,l=t.lineWidth;o?(t.fillStyle="white",t.strokeStyle="white"):(t.fillStyle=i,t.strokeStyle=a),t.lineWidth=s,t.lineTo(e,n),t.stroke(),t.fillStyle=c,t.strokeStyle=r,t.lineWidth=l}}]),n}(j),y=function(t){Object(g.a)(n,t);var e=Object(m.a)(n);function n(t,i,s){var a;return Object(r.a)(this,n),(a=e.call(this,t,i,s)).finishDraw=function(){a.mouseDown=!1,a.drawing&&a.socket.send(JSON.stringify({method:"draw",id:a.id,figure:{type:"circle",x:a.startX,y:a.startY,radius:a.radius,color:a.ctx.fillStyle,lineWidth:a.ctx.lineWidth,strokeStyle:a.ctx.strokeStyle}})),a.drawing=!1},a.drawing=!1,a.canvas.onmousemove=a.mouseMoveHadler.bind(Object(b.a)(a)),a.canvas.onmouseup=a.finishDraw.bind(Object(b.a)(a)),a.canvas.onmousedown=a.mouseDownHadler.bind(Object(b.a)(a)),a.canvas.onmouseleave=a.finishDraw.bind(Object(b.a)(a)),a}return Object(l.a)(n,[{key:"mouseDownHadler",value:function(t){this.mouseDown=!0,this.ctx.beginPath(),this.startX=t.pageX-t.target.offsetLeft,this.startY=t.pageY-t.target.offsetTop,this.saved=this.canvas.toDataURL()}},{key:"mouseMoveHadler",value:function(t){if(this.mouseDown){this.drawing=!0;var e=t.pageX-t.target.offsetLeft,n=t.pageY-t.target.offsetTop;this.radius=Math.sqrt(Math.pow(e-this.startX,2)+Math.pow(n-this.startY,2)),this.rerender(this.startX,this.startY,this.radius)}}},{key:"rerender",value:function(t,e,n){var i=this,s=new Image;s.src=this.saved,s.onload=function(){i.ctx.clearRect(0,0,i.canvas.width,i.canvas.height),i.ctx.drawImage(s,0,0,i.canvas.width,i.canvas.height),i.ctx.beginPath(),i.ctx.arc(t,e,n,0,2*Math.PI),i.ctx.fill(),i.ctx.stroke()}}}],[{key:"draw",value:function(t,e,n,i,s,a,o){var c=t.fillStyle,r=t.strokeStyle,l=t.lineWidth;t.fillStyle=s,t.strokeStyle=o,t.lineWidth=a,t.beginPath(),t.arc(e,n,i,0,2*Math.PI),t.fill(),t.stroke(),t.fillStyle=c,t.strokeStyle=r,t.lineWidth=l}}]),n}(j),k=function(t){Object(g.a)(n,t);var e=Object(m.a)(n);function n(t,i,s){var a;return Object(r.a)(this,n),(a=e.call(this,t,i,s)).finishDraw=function(){a.mouseDown=!1,a.drawing&&a.socket.send(JSON.stringify({method:"draw",id:a.id,figure:{type:"line",x:a.startX,y:a.startY,x2:a.currentX,y2:a.currentY,color:a.ctx.fillStyle,lineWidth:a.ctx.lineWidth,strokeStyle:a.ctx.strokeStyle}})),a.drawing=!1},a.drawing=!1,a.canvas.onmousemove=a.mouseMoveHadler.bind(Object(b.a)(a)),a.canvas.onmouseup=a.finishDraw.bind(Object(b.a)(a)),a.canvas.onmousedown=a.mouseDownHadler.bind(Object(b.a)(a)),a.canvas.onmouseleave=a.finishDraw.bind(Object(b.a)(a)),a}return Object(l.a)(n,[{key:"mouseDownHadler",value:function(t){this.mouseDown=!0,this.ctx.beginPath(),this.startX=t.pageX-t.target.offsetLeft,this.startY=t.pageY-t.target.offsetTop,this.saved=this.canvas.toDataURL()}},{key:"mouseMoveHadler",value:function(t){this.mouseDown&&(this.drawing=!0,this.currentX=t.pageX-t.target.offsetLeft,this.currentY=t.pageY-t.target.offsetTop,this.rerender(this.startX,this.startY,this.currentX,this.currentY))}},{key:"rerender",value:function(t,e,n,i){var s=this,a=new Image;a.src=this.saved,a.onload=function(){s.ctx.clearRect(0,0,s.canvas.width,s.canvas.height),s.ctx.drawImage(a,0,0,s.canvas.width,s.canvas.height),s.ctx.beginPath(),s.ctx.moveTo(t,e),s.ctx.lineTo(n,i),s.ctx.stroke()}}}],[{key:"draw",value:function(t,e,n,i,s,a,o,c){var r=t.fillStyle,l=t.strokeStyle,h=t.lineWidth;t.fillStyle=a,t.strokeStyle=c,t.lineWidth=o,t.beginPath(),t.moveTo(e,n),t.lineTo(i,s),t.stroke(),t.fillStyle=r,t.strokeStyle=l,t.lineWidth=h}}]),n}(j),O=function(t){Object(g.a)(n,t);var e=Object(m.a)(n);function n(t,i,s){var a;return Object(r.a)(this,n),(a=e.call(this,t,i,s)).finishDraw=function(){a.mouseDown=!1,a.drawing&&a.socket.send(JSON.stringify({method:"draw",id:a.id,figure:{type:"rect",x:a.startX,y:a.startY,width:a.width,height:a.height,color:a.ctx.fillStyle,lineWidth:a.ctx.lineWidth,strokeStyle:a.ctx.strokeStyle}})),a.drawing=!1},a.drawing=!1,a.canvas.onmousemove=a.mouseMoveHadler.bind(Object(b.a)(a)),a.canvas.onmouseup=a.finishDraw.bind(Object(b.a)(a)),a.canvas.onmousedown=a.mouseDownHadler.bind(Object(b.a)(a)),a.canvas.onmouseleave=a.finishDraw.bind(Object(b.a)(a)),a}return Object(l.a)(n,[{key:"mouseDownHadler",value:function(t){this.mouseDown=!0,this.ctx.beginPath(),this.startX=t.pageX-t.target.offsetLeft,this.startY=t.pageY-t.target.offsetTop,this.saved=this.canvas.toDataURL()}},{key:"mouseMoveHadler",value:function(t){if(this.mouseDown){this.drawing=!0;var e=t.pageX-t.target.offsetLeft,n=t.pageY-t.target.offsetTop;this.width=e-this.startX,this.height=n-this.startY,this.rerender(this.startX,this.startY,this.width,this.height)}}},{key:"rerender",value:function(t,e,n,i){var s=this,a=new Image;a.src=this.saved,a.onload=function(){s.ctx.clearRect(0,0,s.canvas.width,s.canvas.height),s.ctx.drawImage(a,0,0,s.canvas.width,s.canvas.height),s.ctx.beginPath(),s.ctx.rect(t,e,n,i),s.ctx.fill(),s.ctx.stroke()}}}],[{key:"draw",value:function(t,e,n,i,s,a,o,c){var r=t.fillStyle,l=t.strokeStyle,h=t.lineWidth;t.fillStyle=a,t.strokeStyle=c,t.lineWidth=o,t.beginPath(),t.rect(e,n,i,s),t.fill(),t.stroke(),t.fillStyle=r,t.strokeStyle=l,t.lineWidth=h}}]),n}(j),x=function(){return Object(d.jsxs)("div",{className:"toolbar",children:[Object(d.jsx)("button",{className:"toolbar__btn",onClick:function(){return u.setTool(new w(v.canvas,v.socket,v.sessionid))},children:Object(d.jsx)("i",{className:"material-icons",children:"brush"})}),Object(d.jsx)("button",{className:"toolbar__btn",onClick:function(){return u.setTool(new O(v.canvas,v.socket,v.sessionid))},children:Object(d.jsx)("i",{className:"material-icons",children:"check_box_outline_blank"})}),Object(d.jsx)("button",{className:"toolbar__btn",onClick:function(){return u.setTool(new y(v.canvas,v.socket,v.sessionid))},children:Object(d.jsx)("i",{className:"material-icons",children:"panorama_fish_eye"})}),Object(d.jsx)("button",{className:"toolbar__btn",onClick:function(){return u.setTool(new w(v.canvas,v.socket,v.sessionid,!0))},children:Object(d.jsx)("i",{className:"material-icons",children:"format_paint"})}),Object(d.jsx)("button",{className:"toolbar__btn",onClick:function(){return u.setTool(new k(v.canvas,v.socket,v.sessionid))},children:Object(d.jsx)("i",{className:"material-icons",children:"remove"})}),Object(d.jsx)("i",{className:"material-icons",style:{marginLeft:"10px"},children:"color_lens"}),Object(d.jsx)("input",{onChange:function(t){return function(t){u.setStrokeColor(t.target.value),u.setFillColor(t.target.value)}(t)},type:"color"}),Object(d.jsx)("button",{className:"toolbar__btn",onClick:function(){return v.undo()},style:{marginLeft:"auto"},children:Object(d.jsx)("i",{className:"material-icons",children:"chevron_left"})}),Object(d.jsx)("button",{className:"toolbar__btn",onClick:function(){return v.redo()},children:Object(d.jsx)("i",{className:"material-icons",children:"chevron_right"})}),Object(d.jsx)("button",{className:"toolbar__btn",onClick:function(){var t=document.createElement("a");t.href=v.canvas.toDataURL(),t.download=v.sessionid+".jpg",document.body.appendChild(t),t.click(),document.body.removeChild(t)},children:Object(d.jsx)("i",{className:"material-icons",children:"save"})})]})},p=n(31),S=n.n(p),D=n(45),L=n(24),N=n(85),C=n(86),W=(n(55),n(5)),_=n(25),T=n.n(_),R="http://localhost:5000",X=Object(c.a)((function(){var t=Object(i.useRef)(null),e=Object(i.useRef)(null),n=Object(i.useRef)(null),s=Object(i.useState)(!0),a=Object(L.a)(s,2),o=a[0],c=a[1],r=Object(i.useState)({}),l=Object(L.a)(r,2),h=l[0],f=l[1],b=Object(W.g)();Object(i.useEffect)((function(){v.setCanvas(t.current);var e=t.current.getContext("2d");T.a.get("".concat(R,"/image?id=").concat(b.id)).then((function(n){var i=new Image;i.src=n.data,i.crossOrigin="anonymous",i.onload=function(){t.current.width=i.width,t.current.height=i.height,f({width:i.width+20,height:i.height+20}),e.clearRect(0,0,t.current.width,t.current.height),e.drawImage(i,0,0,t.current.width,t.current.height)}})).catch((function(t){return g(e)}))}),[]);var g=function(e){var n=e.fillStyle;e.fillStyle="white",e.fillRect(0,0,t.current.width,t.current.height),e.fillStyle=n};Object(i.useEffect)((function(){var e=new WebSocket(R.replace(/^http/,"ws"));v.setSocket(e),v.setSessionId(b.id),u.setTool(new w(t.current,e,b.id)),e.onopen=function(){console.log("connected"),e.send(JSON.stringify({id:b.id,username:v.username||"default",method:"connection"}))},e.onmessage=function(t){var e=JSON.parse(t.data);switch(e.method){case"connection":console.log(e.username+" connected");break;case"draw":x(e);break;case"resize":j(e.size)}}}),[v.username]),Object(i.useEffect)((function(){n.current.onmousedown=function(){var t=0;new ResizeObserver((function(){return++t})).observe(n.current),n.current.onmouseup=function(){return t>1&&m()}}}),[]);var m=function(){v.socket.send(JSON.stringify({method:"resize",id:v.sessionid,size:{width:+n.current.style.width.replace("px",""),height:+n.current.style.height.replace("px","")}}))},j=function(e){n.current.style.width=e.width+"px",n.current.style.height=e.height+"px",t.current.width=e.width-20,t.current.height=e.height-20,T.a.get("".concat(R,"/image?id=").concat(b.id)).then((function(e){var n=new Image;n.crossOrigin="anonymous",n.src=e.data;var i=t.current.getContext("2d");n.onload=function(){var e=(t.current.width-n.width)/2,s=(t.current.height-n.height)/2;i.clearRect(0,0,t.current.width,t.current.height),g(i),i.drawImage(n,e,s,n.width,n.height),T.a.post("".concat(R,"/image?id=").concat(b.id),{image:t.current.toDataURL()})}}))},x=function(e){var n=e.figure,i=n.type,s=n.x,a=n.y,o=n.x2,c=n.y2,r=n.width,l=n.height,h=n.radius,u=n.color,d=n.lineWidth,f=n.strokeStyle,v=n.isEraser,b=t.current.getContext("2d");switch(i){case"brush":w.draw(b,s,a,u,d,f,v);break;case"line":k.draw(b,s,a,o,c,u,d,f);break;case"rect":O.draw(b,s,a,r,l,u,d,f);break;case"circle":y.draw(b,s,a,h,u,d,f);break;case"finish":b.beginPath()}},p=function(){var e=Object(D.a)(S.a.mark((function e(){return S.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:T.a.post("".concat(R,"/image?id=").concat(b.id),{image:t.current.toDataURL()});case 1:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return Object(d.jsxs)("div",{className:"canvas",children:[Object(d.jsxs)(N.a,{show:o,onHide:function(){},children:[Object(d.jsx)(N.a.Header,{children:Object(d.jsx)(N.a.Title,{children:"Enter your name"})}),Object(d.jsx)(N.a.Body,{children:Object(d.jsx)("input",{type:"text",ref:e})}),Object(d.jsx)(N.a.Footer,{children:Object(d.jsx)(C.a,{variant:"secondary",onClick:function(){v.setUserName(e.current.value),c(!1)},children:"Sign in"})})]}),Object(d.jsx)("div",{ref:n,className:"resize",style:{width:h.width,height:h.height},children:Object(d.jsx)("canvas",{ref:t,onMouseDown:function(){v.pushToUndo(t.current.toDataURL())},onMouseUp:p})})]})})),Y=(n(81),n(30));var I=function(){return Object(d.jsx)(Y.a,{children:Object(d.jsx)("div",{className:"app",children:Object(d.jsxs)(W.d,{children:[Object(d.jsxs)(W.b,{path:"/:id",children:[Object(d.jsx)(x,{}),Object(d.jsx)(f,{}),Object(d.jsx)(X,{})]}),Object(d.jsx)(W.a,{to:"f".concat((+new Date).toString(16))})]})})})};o.a.render(Object(d.jsx)(s.a.StrictMode,{children:Object(d.jsx)(I,{})}),document.getElementById("root"))}},[[82,1,2]]]);
//# sourceMappingURL=main.e13709a5.chunk.js.map