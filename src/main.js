const $=(()=>{class t extends Error{constructor(t){super(t).name=this.constructor.name}}class e extends t{constructor(...t){super(...t)}}const n={has:function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},applyF:function(t,e,...n){return e instanceof Function?e(t,...n):e},getE:function(t){return document.getElementsByTagName(t.toUpperCase())[0]},applyE:function(t,e){for(let n in e){let r=e[n];"object"==typeof r?this.applyE(t[n],r):t[n]=r}},makeE:function(t,e={},n){let r=document.createElement(t);return this.applyE(r,e),n&&n.appendChild(r),r},getOrMakeE:function(t,e){return this.getE(t)||this.makeE(t,e,document.head||document.body)},applyP:function(t,e){for(let n in e)t[n]=e[n]},err:function(t,e){throw new t(e)},errTypes:{type:function(t,e){return`Expected any type of [${t.toString()}], got type ${e} instead`}},genError:function(t,...e){return this.errTypes[t](...e)},checkType:function(t,n){let r=typeof t;"string"==typeof n&&(n=[n]),n.includes(r)||this.err(e,this.genError("type",n,r))}},r={text:function(t,e,r){e[n.has(e,"value")?"value":"innerHTML"]=n.applyF(e,r)},style:function(t,r,o){let i=typeof(o=n.applyF(r,o));if("object"==i)n.applyP(r.style,o);else if("string"==i){n.getOrMakeE("style").sheet.insertRule(`${t.q}{${o}}`)}else n.err(e,n.genError("type",["object","string"],i))},event:function(t,e,r,o,i){n.checkType(r,"string"),n.checkType(o,"function"),e.addEventListener(r,o,i)},attribute:function(t,e,n){let r=e.getAttribute(n);return null==r||null==r?e[n]:r},property:function(t,e,n){return e[n]},write:function(t,e,...n){e==u&&document.write(...n)},newline:function(t,e){r.write(t,e,"<br>")},animate:function(t,e,...n){return e.animate(...n)},setproperty:function(t,e,n,r){e[n]=r},animations:function(t,e){return e.getAnimations()},loop:async function(t,e,n,r){for(let t=1;t<=n;t++)await r(e,t)},wait:async function(t,e,n=1){return await new Promise(t=>setTimeout(t,1e3*n))},typewrite:async function(t,e,n="",o=.1){return await new Promise(async i=>{for(let i=0;i<=n.length;i++)r.text(t,e,n.substring(0,i)),await r.wait(t,e,o);i(t.s)})},self:function(t,e){return e},to:function(t,e,n){return"string"==typeof n&&(n=document.querySelector(n)),i(n,{a:!1})},new:function(t,e,r,o,u){return i(n.makeE(r,o,u),{a:!1})},append:function(t,e,n){"string"==typeof n&&(n=document.querySelector(n)),e.appendChild(n)},before:function(t,e,n){"string"==typeof n&&(n=document.querySelector(n)),n.parentNode.insertBefore(e,n)},after:function(t,e,n){"string"==typeof n&&(n=document.querySelector(n)),n.after(e)},br:function(t,e){return i(n.makeE("br"))},id:function(t,e,n){e.id=n}},o={newline:["nl"],attribute:["attr"],property:["prop","p"],event:["on"],setproperty:["setprop","sp"]};for(let t in o){o[t].forEach(e=>{n.has(r,e)||(r[e]=r[t])})}const i=(t,e={})=>{let o={},i={e:t,s:o};for(let t in e)n.has(i,t)||(i[t]=e[t]);for(let t in r)o[t]=u[t].bind(i);return o},u=function(t,e=0){const n=document[`querySelector${e?"All":""}`](t);return void 0===n?u:i(n,{q:t,a:e})};for(let t in r){let e=r[t],n=function(...n){let r=this;if(r==u&&(r=u[t]),r.e instanceof window.NodeList){let t=[];for(let o=0;o<=r.e.length-1;o++){let i=e(r,r.e[o],...n);void 0!==i&&t.push(i)}return t.length>0?t:r.s}let o=e(r,r.e,...n);return void 0!==o?o:r.s};n.e=u,n.s=u,u[t]=n}return n.applyP(u,{version:"v002.00"}),u})();
