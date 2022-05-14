/*
Non-Uglified Version for updating/editing
*/
const $=(()=>{
	const mainAttr={
    	version:"v003.00",
    };
	class BaseError extends Error{constructor(Message){super(Message).name=this.constructor.name}}
    class QueryError extends BaseError{constructor(...a){super(...a)}}
    class QueryArgumentError extends BaseError{constructor(...a){super(...a)}}
    class QueryTypeError extends BaseError{constructor(...a){super(...a)}}
	const intr={
    	has:function(o,x){
        	return Object.prototype.hasOwnProperty.call(o,x);
        },
        applyF:function(o,f,...a){
        	if(f instanceof Function){
            	return f(o,...a);
            }
            return f;
        },
        getE:function(t){
        	return document.getElementsByTagName(t.toUpperCase())[0];
        },
        applyE:function(a,b){
        	for(let k in b){
            	let v=b[k];
                if(typeof v=="object")this.applyE(a[k],v);
                else a[k]=v;
            }
        },
        makeE:function(t,p={},to){
        	let e = document.createElement(t);
            this.applyE(e,p);
            if(to){
            	to.appendChild(e);
            }
            return e;
        },
        getOrMakeE:function(t,p){
        	return this.getE(t)||this.makeE(t,p,document.head||document.body);
        },
        applyP:function(o,p){
        	for(let k in p){
            	o[k]=p[k];
            }
        },
        err:function(c,m){
        	throw new c(m);
        },
        errTypes:{
        	type:function(exp,got){
            	return `Expected any type of [${exp.toString()}], got type ${got} instead`;
            },
        },
        genError:function(t,...a){
        	return this.errTypes[t](...a);
        },
        checkType:function(v,ts){
        	let t = typeof v;
            if(typeof ts=="string"){
            	ts=[ts];
            }
            if(!ts.includes(t)){
            	this.err(QueryTypeError,this.genError("type",ts,t));
            }
        },
    };
	const methods = {
    	text:function(self,s,x){
        	s[intr.has(s,"value")?"value":"innerHTML"]=intr.applyF(s,x);
        },
        style:function(self,s,st){
        	st = intr.applyF(s,st);
            let t = typeof st;
        	if(t=="object"){
            	intr.applyP(s.style,st);	
            }else if(t=="string"){
            	let sheet = intr.getOrMakeE("style").sheet;
                sheet.insertRule(`${self.q}{${st}}`);
            }else{
            	intr.err(QueryTypeError,intr.genError("type",["object","string"],t));
            }
        },
        event:function(self,s,e,c,t){
        	intr.checkType(e,"string");
        	intr.checkType(c,"function");
        	s.addEventListener(e,c,t);
        },
        attribute:function(self,s,a){
        	let v = s.getAttribute(a);
            if(v==undefined||v==null){
            	return s[a];
            }
        	return v;
        },
        property:function(self,s,a){
        	return s[a];
        },
        write:function(self,s,...a){
        	if(s == main){
            	document.write(...a);
            }
        },
        newline:function(self,s){
        	methods.write(self,s,"<br>");
        },
        animate:function(self,s,...a){
        	return s.animate(...a);
        },
        setproperty:function(self,s,n,v){
        	s[n]=v;
        },
	remove:function(self,s){
		s.remove();	
	},
        animations:function(self,s){
        	return s.getAnimations();
        },
        loop:async function(self,s,a,f){
        	for(let i=1;i<=a;i++){
            	await f(s,i);
            }
        },
        wait:async function(self,s,t=1){
        	return await new Promise(r=>setTimeout(r,t*1000));
        },
        typewrite:async function(self,s,t="",i=0.1){
        	return await new Promise(async r=>{
        		for(let x=0;x<=t.length;x++){
            		methods.text(self,s,t.substring(0,x));
                	await methods.wait(self,s,i);
            	}
                r(self.s);
            });
        },
        self:function(self,s){
        	return s;
        },
        to:function(self,s,n){
        	if(typeof n =="string"){
            	n=document.querySelector(n);
            }
        	return applyMain(n,{a:false})
        },
        new:function(self,s,t,p,to){
        	return applyMain(intr.makeE(t,p,to),{a:false});
        },
        append:function(self,s,c){
        	if(typeof c=="string"){
            	c=document.querySelector(c);
            }
        	s.appendChild(c);
        },
        before:function(self,s,c){
        	if(typeof c=="string"){
            	c=document.querySelector(c);
            }
        	c.parentNode.insertBefore(s,c);
        },
        after:function(self,s,c){
        	if(typeof c=="string"){
            	c=document.querySelector(c);
            }
            c.after(s);
        },
        br:function(self,s){
        	return applyMain(intr.makeE("br"));
        },
        id:function(self,s,id){
        	s.id=id;
        },
	};
    const methodAliases={
    	newline:["nl"],
        attribute:["attr"],
        property:["prop","p"],
        event:["on"],
        setproperty:["setprop","sp"],
    };
    for(let k in methodAliases){
    	let v = methodAliases[k];
        v.forEach(x=>{
        	if(intr.has(methods,x))return;
        	methods[x]=methods[k];
        });
    }
    const applyMain=(to,extra={})=>{
    	let n = {};
        let self = {e:to,s:n};
        for(let k in extra){
        	if(!intr.has(self,k)){
            	self[k]=extra[k];
            }
        }
        for(let k in methods){
        	n[k]=main[k].bind(self)
        }
        return n;
    }
	const main = function(query,all=0){
		const result = document[`querySelector${all?"All":""}`](query);
        if(result===undefined){
        	return main;
        }
    	return applyMain(result,{q:query,a:all});
	}
    for(let k in methods){
    	let v = methods[k];
        let call = function(...a){
        	let self = this;
            if(self==main){
            	self=main[k];
            }
        	if(self.e instanceof window.NodeList){
            	let r = [];
            	for(let i=0;i<=self.e.length-1;i++){
                	let x = v(self,self.e[i],...a);
                    if(x===undefined){
                    	continue;
                    }
                	r.push(x);
                }
                if(r.length > 0){
                	return r;
                }
                return self.s;
            }
            let x = v(self,self.e,...a);
            if(x!==undefined){
            	return x;
            }
        	return self.s;
        };
        call.e = main;
        call.s = main;
        main[k] = call;
    }
    intr.applyP(main,mainAttr);
	return main;
})();
