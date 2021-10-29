/*
Non-Uglified Version for updating/editing
*/
const $=(()=>{
	class BaseError extends Error{constructor(Message){super(Message).name=this.constructor.name}}
    class QueryError extends BaseError{constructor(...a){super(...a)}}
    class QueryArgumentError extends BaseError{constructor(...a){super(...a)}}
    class QueryTypeError extends BaseError{constructor(...a){super(...a)}}
	const intr={
    	has:function(o,x){
        	return Object.prototype.hasOwnProperty.call(o,x);
        },
        applyF:function(o,f){
        	if(f instanceof Function){
            	return f(o);
            }
            return f;
        },
        getE:function(t){
        	return document.getElementsByTagName(t.toUpperCase())[0];
        },
        makeE:function(t,p={},to){
        	let e = document.createElement(t);
            for(let k in p){
            	e[k]=p[k];
            }
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
        	return s.getAttribute(a);
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
	};
    const methodAliases={
    	newline:["nl"],
        attribute:["attr"],
        property:["prop"],
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
	return main;
})()
