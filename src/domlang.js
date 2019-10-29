/* global _ */
!(function() {
    
    const _ = function(sel) {
        return new DOMLang(sel);
    };
    
    // Establish the root object, `window` (`self`) in the browser, `global`
    // on the server, or `this` in some virtual machines. We use `self`
    // instead of `window` for `WebWorker` support.
    const root = typeof self == 'object' && self.self === self && self ||
            typeof global == 'object' && global.global === global && global ||
            this ||
            {};
    const previousDomLang = root._;
    
    // Export the DOMLang object for **Node.js**, with
    // backwards-compatibility for their old module API. If we're in
    // the browser, add `_` as a global object.
    // (`nodeType` is checked to ensure that `module`
    // and `exports` are not HTML elements.)
    if (typeof exports != 'undefined' && !exports.nodeType) {
        if (typeof module != 'undefined' && !module.nodeType && module.exports) {
            exports = module.exports = _;
        }
        exports._ = _;
    } else {
        root._ = _;
    }
    
    // List of HTML entities for escaping.
    const escapeMap = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#x27;',
        '`': '&#x60;'
    };
    
    _.toObject = function(jsonString) {
        return JSON.parse(jsonString);
    };
    
    _.toJson = function(collec) {
        return JSON.stringify(collec);
    };
    
    _.toNum = _.toNumber = function(s) {
        return Number(s);
    };
    
    _.toString = function(collec) {
        return _.isLoopable(collec) ? JSON.stringify(collec) : collec.toString();
    };
    
    _.toArray = function(o) {
        const newArray = [];
        loop(o, function() {
            newArray.push(this);
        });
        return newArray;
    }
    
    _.isArray = function(o) {
        return (o.constructor.name === "HTMLCollection" || o.constructor.name === "NodeList" || Array.isArray(o));
    };
    
    _.isElement = function(o) {
        try {
            //Using W3 DOM2 (works for FF, Opera and Chrome)
            return o instanceof HTMLElement;
        }
        catch(e){
            //Browsers not supporting W3 DOM2 don't have HTMLElement and
            //an exception is thrown and we end up here. Testing some
            //properties that all elements have (works on IE7)
            return (typeof o==="object") &&
                (o.nodeType===1) && (typeof o.style === "object") &&
                (typeof o.ownerDocument ==="object");
        }
    };
    
    _.isString = function(o) {
        return typeof o === "string";
    };
    
    _.isNumber = _.isNum = function(num) {
        return typeof num === "number";
    };
    
    _.isEmpty = function(o) {
        return _.keys(o).length === 0;
    };
    
    _.isEqual = function(o1, o2) {
        return JSON.stringify(o1) == JSON.stringify((o2));
    };
    
    _.isFunction = function(method) {
        return method && {}.toString.call(method) === '[object Function]';
    };
    
    _.isLoopable = _.isIterable = function(o) {
        return !_.isEmpty(o);
    };
    
    _.isSame = function(o1, o2) {
        return (_.isElement(o1) && _.isElement(o2)) ? o1.isSameNode(o2) : o1 == o2;
    };
    
    _.escape = function(s) {
        let newS = s;
        loop(escapeMap, function(key) {
            newS = newS.replace(new RegExp(key, "g"), this);
        });
        return newS;
    };
    
    _.unescape = function(s) {
        let newS = s;
        loop(escapeMap, function(key) {
            newS = newS.replace(new RegExp(this, "g"), key);
        });
        return newS;
    };
    
    _.keys = function(o) {
        return Object.keys(o);
    };
    
    _.values = function(o) {
        let vals = [];
        let keys = _.keys(o);
        
        for (let i = 0; i < keys.length; i++) {
            vals.push(o[keys[i]]);
        }
        
        return vals;
    };
    
    _.isContains = function(arr, o) {
        let ret = false;
        loop(arr, function() {
            if(_.isSame(this, o)) {
                ret = true;
                return true;
            }
        });
        return ret;
    };
    
    _.ready = function(callback) {
        window.addEventListener("DOMContentLoaded", callback, false);
    };
    
    _.random = function(min, max=null) {
        if (_.isArray(min)) {
            let rand = 0 + Math.floor(Math.random() * (min.length));
            return min[rand];
        }
        if (max == null) {
            max = min;
            min = 0;
        }
        return min + Math.floor(Math.random() * (max - min + 1));
    };
    
    _.range = function(min, max=null) {
        const rng = [];
        
        if (_.isString(min)) {
            min = min.charCodeAt(0);
            max = max.charCodeAt(0);
            
            for (let i = min; i <= max; i++) {
                rng.push(String.fromCharCode(i));
            }
            return rng;
        }
        
        if (max == null) {
            max = min;
            min = 0;
        }
        
        for (let i = min; i <= max; i++) {
            rng.push(i);
        }
        return rng;
    };
    
    
    _.map = function(collec, callback, context) {
        let newCollec = Object.assign({}, collec);
        let keys = _.keys(collec);
        
        if (context !== null || context !== undefined) {
            for (let i = 0; i < keys.length; i++) {
                newCollec[keys[i]] = callback.call(context, keys[i], collec[keys[i]], collec);
            }
        } else {
            for (let i = 0; i < keys.length; i++) {
                newCollec[keys[i]] = callback.call(collec[keys[i]], keys[i], collec);
            }
        }
        return newCollec;
    };
    
    _.reduce = _.foldl = function(collec, callback, context) {
        let keys = _.keys(collec);
        let startValue = collec[keys[0]];
        for (let i = 1; i < keys.length; i++) {
            startValue = callback(startValue, collec[keys[i]], collec);
        }
        return startValue;
    };
    
    _.reduceRight = _.foldr = function(collec, callback, context) {
        let keys = _.keys(collec);
        let startValue = collec[keys[keys.length - 1]];
        for (let i = keys.length - 2; i >= 0; i--) {
            startValue = callback(startValue, collec[keys[i]], collec);
        }
        return startValue;
    };
    
    _.find = function(collec, callback) {
        let retValue = null;
        _.each(collec, function(key) {
            let ret = callback(key, this, collec);
            if (ret) {
                retValue = this;
                return true;
            }
        });
        return retValue;
    };
    
    _.filter = function(arr, callback) {
        let newArr = [];
        _.each(arr, function(key) {
            let ret = callback(key, this, arr);
            if (ret) {
                newArr.push(this);
            }
        });
        return newArr;
    };
    
    
    _.where = function(arr, obj) {
        let newArr = [];
        let keys = _.keys(obj);
        _.each(arr, function(key) {
            let canIAdd = true;
            for (let i = 0; i < keys.length; i++) {
                if (this[keys[i]] !== obj[keys[i]]) {
                    canIAdd = false;
                    break;
                }
            }
            
            if (canIAdd) {
                newArr.push(this);
            }
        });
        return newArr;
    };
    
    _.reject = function(arr, callback) {
        let newArr = [];
        _.each(arr, function(key) {
            let ret = callback(key, this, arr);
            if (!ret) {
                newArr.push(this);
            }
        });
        return newArr;
    };
    
    _.all = _.every = function(arr, callback) {
        let isAllOk = true;
        loop(arr, function(i) {
            let ret = callback(i, this, arr);
            if (!ret) {
                isAllOk = false;
                return true;
            }
        });
        return isAllOk;
    };
    
    _.any = _.some = function(arr, callback) {
        let isAllOk = false;
        loop(arr, function(i) {
            let ret = callback(i, this, arr);
            if (ret) {
                isAllOk = true;
                return true;
            }
        });
        return isAllOk;
    };
    
    _.invoke = function() {
        let args = arguments;
        let arr = args[0];
        _.each(arr, function(index) {
            for (let i = 1; i < args.length; i++) {
                arr[index] = this[args[i]]();
            }
        });
        return arr;
    };
    
    _.extend = function() {
        let newArr = [];
        for (let i = 0; i < arguments.length; i++) {
            newArr = newArr.concat(arguments[i])
        }
        return newArr;
    };
    
    _.clone = function(collec) {
        return _.isArray(collec) ? [].concat(collec) : Object.assign({}, collec);
    };
    
    _.has = function(collec, key) {
        return _.isContains(_.keys(collec), key);
    };
    
    _.each = _.forEach = function(o, callback, context) {
        if (_.isArray(o)) {
            for (let i = 0; i < o.length; i++) {
                let ret = false;
                if (context === undefined || context === null) {
                    ret = callback.call(o[i], i, o);
                } else {
                    ret = callback.call(context, o[i], i, o);
                }
                
                if (ret === true) break;
            }
        }else if (_.isIterable(o)) {
            let keys = _.keys(o);
            for (let i = 0; i < keys.length; i++) {
                let ret = false;
                if (context === undefined || context === null) {
                    ret = callback.call(o[keys[i]], keys[i], o);
                } else {
                    ret = callback.call(context, keys[i], o[keys[i]], o);
                }
                
                if (ret === true) break;
            }
        }
    };
    
    
    
    function drop(o, num, isEnd=false) {
        let arr;
        let itWasString = false;
        
        if (_.isString(o)) {
            itWasString = true;
            arr = o.split("");
        } else {
            arr = o;
        }
        
        isEnd ? arr.splice(arr.length - num, num) : arr.splice(0, num);
        
        return itWasString ? arr.join("") : arr;
    }
    
    _.dropLast = function(o, num=1) {
        return drop(o, num, true);
    };
    
    _.dropFirst = function(o, num=1) {
        return drop(o, num, false);
    };
    
    // TODO: implement, http and fetch method
    
    _.http = function(url, args) {
        let xhr;
        if (window.XMLHttpRequest) {
            // code for modern browsers
            xhr = new XMLHttpRequest();
        } else {
            // code for old IE browsers
            xhr = new ActiveXObject("Microsoft.XMLHTTP");
        }
        
        xhr.onreadystatechange = function() {
            if (this.readyState == 4) {
                if (this.statusText == "OK") {
                    if (_.has(args, "onSuccess")) {
                        args.onSuccess.call(this, this.responseText);
                    }
                } else {
                    if (_.has(args, "onFail")) {
                        args.onFail.call(this, this.responseText);
                    }
                }
            }
        };
        
        let data = "";
        if (_.has(args, "data")) {
            data += "?";
            loop(args.data, function(key) {
                data += (key + "=" + this + "&")
            });
            
            data = _.dropLast(data, 1);
        }
        
        let isPost = false;
        if (_.has(args, "method")) {
            if (args.method.toLowerCase() === "get") {
                xhr.open("GET", url + data, true);
            } else {
                xhr.open("POST", url, true)
                xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
                isPost = true;
            }
        } else {
            xhr.open("GET", url + data, true);
        }
        
        if (_.has(args, "headers")) {
            loop(args.headers, function(key) {
                xhr.setRequestHeader(key, this);
            });
        }
        
        if (isPost) {
            data = _.dropFirst(data, 1);
            xhr.send(data);
        } else {
            xhr.send();
        }
    };
    
    _.upload = function() {
        console.warn("_.upload() not implemented yet!");
    };
    
    
    _.eventStack = [];
    _.doms = [];
    
    _.extension = function(name, callback) {
        if (_.has(_, name)) {
            throw "The extension name '" + name + "' already exist."
        }
        _[name] = callback;
    };
    
    
    _.attrs = function(el) {
        return Array.from(el.attributes);
    };
    
    function getAttrs(el) {
        let attrs = {};
        loop(_.attrs(el), function() {
            attrs[this] = el.getAttribute(this);
        });
        return attrs;
    }
    
    // function createVirtualDOM(domChildren, virtualChildren) {
    //     for (let i = 0; i < domChildren.length; i++) {
    //         let el = domChildren[i];
    //         let dom = {
    //             tag: el.tagName.toLowerCase(),
    //             attrs: getAttrs(el),
    //             children: []
    //         };
    //         virtualChildren.push(dom);
            
    //         if (el.children.length > 0) {
    //             createVirtualDOM(el.children, virtualChildren[i].children);
    //         }
    //     }
        
    //     return virtualChildren;
    // };
    
    
    function compareDOM(oldChilds, newChilds, callback) {
        let childs = newChilds;
        if (oldChilds.length > newChilds.length) {
            childs = oldChilds;
        }
        let oldNodeCount = 0;
        let newNodeCount = 0;
        for (let i = 0; i < childs.length; i++) {
            let isUpdated = false;
            let keepTheNeedle = false;
            
            if (newChilds[newNodeCount] === undefined) {
                callback(null, oldChilds[oldNodeCount], "remove");
            } else if (oldChilds[oldNodeCount] === undefined) {
                callback(newChilds[newNodeCount], oldChilds[oldChilds.length - 1], "add")
                keepTheNeedle = true;
            } else {
                let oldVDOM = {tag: oldChilds[oldNodeCount].tagName.toLowerCase(), attrs: getAttrs(oldChilds[oldNodeCount]), children: oldChilds[oldNodeCount].children};
                let newVDOM = {tag: newChilds[newNodeCount].tagName.toLowerCase(), attrs: getAttrs(newChilds[newNodeCount]), children: newChilds[newNodeCount].children};
                
                if (newVDOM.tag !== oldVDOM.tag || _.keys(newVDOM.attrs).length !== _.keys(oldVDOM.attrs).length || 
                newVDOM.children.length !== oldVDOM.children.length || newChilds[newNodeCount].textContent !== oldChilds[oldNodeCount].textContent) {
                    callback(newChilds[newNodeCount], oldChilds[oldNodeCount], "replace");
                    isUpdated = true;
                } else {
                    loop(oldVDOM.attrs, function(key) {
                        if (!_.has(newVDOM.attrs, key) || newVDOM[key] !== oldVDOM[key]) {
                            callback(newChilds[newNodeCount], oldChilds[oldNodeCount], "replace");
                            isUpdated = true;
                            return true;
                        }
                    });
                }
            }
        
            if (newChilds[newNodeCount] !== undefined && oldChilds[oldNodeCount] !== undefined && newChilds[newNodeCount].children.length > 0 && !isUpdated) {
                compareDOM(newChilds[newNodeCount].children, oldChilds[oldNodeCount].children, callback);
            }
            
            newNodeCount++;
            if (!keepTheNeedle) oldNodeCount++;
        }
    }
    
    // _.virtualDOM = function(node) {
    //     if (_.isString(node)) {
    //         node = document.querySelector(node);
    //     } else if (_.isIterable(node)) {
    //         node = node[0];
    //     }
    //     let attrs = _.attrs(node);
    //     let dom = {tag: node.tagName.toLowerCase(), attrs: getAttrs(node), children: createVirtualDOM(node.children, [])}
        
    //     _.doms.push({
    //         node: node,
    //         dom: dom
    //     })
    // };
    
    _.render = function(oldNode, newNode) {
        if (_.isString(newNode)) {
            let tmp = document.createElement("div");
            tmp.innerHTML = newNode;
            newNode = tmp.children[0];
        }
        
        if (_.isString(oldNode)) {
            oldNode = document.querySelector(oldNode);
        } else if (_.isIterable(oldNode)) {
            oldNode = oldNode[0];
        }
        
        let pendingNodes = [];
        compareDOM(oldNode.children, newNode.children, function(newNodeRef, oldNodeRef, tag) {
            if (tag === "replace") {
                pendingNodes.push({
                    "task": "add",
                    "newNode": newNodeRef,
                    "oldNode": oldNodeRef
                });
                pendingNodes.push({
                    "task": "remove",
                    "node": oldNodeRef
                });
            } else if (tag === "add") {
                pendingNodes.push({
                    "task": "new",
                    "newNode": newNodeRef,
                    "oldNode": oldNodeRef
                });
            } else if (tag === "remove") {
                pendingNodes.push({
                    "task": "remove",
                    "node": oldNodeRef
                });
            }
        });
        
        for (let i = 0; i < pendingNodes.length; i++) {
            let pending = pendingNodes[i];
            if (pending.task === "add") {
                pending.oldNode.parentNode.insertBefore(pending.newNode, pending.oldNode);
            } else if (pending.task === "new") {
                if (pending.oldNode === undefined) {
                    oldNode.appendChild(pending.newNode);
                } else {
                    pending.oldNode.parentNode.insertBefore(pending.newNode, pending.oldNode.siblings);
                }
            }
        }
        
        for (let i = 0; i < pendingNodes.length; i++) {
            let pending = pendingNodes[i];
            if (pending.task === "remove") {
                pending.node.remove();
            }
        }
    };
    
    
    function loop(arr, callback) {
        for (let i = 0; i < arr.length; i++) {
            callback.call(arr[i], i);
        }
    }




    class DOMLang {
        constructor(sel) {
            let self = this;
            if (sel === undefined || sel === null) {
            } else if (_.isString(sel)) {
                if (/<[a-z][\s\S]*>/i.test(sel)) {
                    let el = document.createElement("div");
                    el.innerHTML = sel;
                    
                    loop(el.children, function() {
                        self.push(this);
                    });
                } else {
                    loop(document.querySelectorAll(sel), function() {
                        if (!_.isContains(self, this)) {
                            self.push(this);
                        }
                    });
                }
                
            } else if (_.isElement(sel)) {
                if (!_.isContains(self, sel)) {
                    self.push(sel);
                }
            } else if (_.isIterable(sel)) {
                loop(sel, function() {
                    if (_.isElement(this) && !_.isContains(self, this)) self.push(this);
                });
            }
        }
        
        extend() {
            let self = this;
            for (let i = 0; i < arguments.length; i++) {
                let sel = arguments[i];
                
                if (_.isElement(sel)) {
                    if (!_.isContains(this, sel)) this.push(sel);
                } else if (typeof sel === "string") {
                    loop(document.querySelectorAll(sel), function() {
                        if (!_.isContains(self, this)) self.push(this);
                    });
                } else {
                    loop(sel, function() {
                        if (!_.isContains(self, this)) self.push(this);
                    });
                }
            }
            
            return this;
        }
        
        addClass(s) {
            let cls = s.split(" ");
            loop(this, function() {
                for (let i = 0; i < cls.length; i++) {
                    this.classList.add(cls[i].trim());
                }
            });
            return this;
        }
        
        removeClass(s) {
            let cls = s.split(" ");
            loop(this, function() {
                for (let i = 0; i < cls.length; i++) {
                    this.classList.remove(cls[i].trim());
                }
            });
            return this;
        }
        
        also(callback) {
            callback.call(_(this[0]));
        }
        
        each(callback, context) {
            if (context === undefined || context === null) {
                for (let i = 0; i < this.length; i++) {
                    callback.call(_(this[i]), i, this);
                }
            } else {
                for (let i = 0; i < this.length; i++) {
                    callback.call(context, i, _(this[i]), this);
                }
            }
            return this;
        }
        
        toggleClass(s) {
            let cls = s.split(" ");
            loop(this, function() {
                for (let i = 0; i < cls.length; i++) {
                    let cl = cls[i].trim();
                    if (this.classList.contains(cl)) {
                        this.classList.remove(cl);
                    } else {
                        this.classList.add(cl);
                    }
                }
            });
            return this;
        }
        
        append() {
            for (let k = 0; k < arguments.length; k++) {
                let sel = arguments[k];
                if (_.isString(sel)) {
                    let elements = _(sel);
                    for (let i = 0; i < elements.length; i++) {
                        for (let j = 0; j < this.length; j++) {
                            this[j].appendChild(elements[i]);
                        }
                    }
                } else if (_.isElement(sel)) {
                    for (let i = 0; i < this.length; i++) {
                        this[i].appendChild(sel);
                    }
                } else if (_.isIterable(sel) || _.isArray(sel)) {
                    for (let i = 0; i < sel.length; i++) {
                        if (_.isElement(sel[i])) {
                            for (let j = 0; j < this.length; j++) {
                                this[j].appendChild(sel[i]);
                            }
                        }
                    }
                }
            }
        
            return this;
        }
        
        prepend() {
            let self = this;
            for (let k = 0; k < arguments.length; k++) {
                let sel = arguments[k];
                if (_.isString(sel)) {
                    loop(_(sel), function() {
                        let el = this;
                        loop(self, function() {
                            this.insertBefore(el, this.childNodes[0]);
                        });
                    });
                } else if (_.isElement(sel)) {
                    loop(this, function() {
                        this.insertBefore(sel, this.childNodes[0]);
                    });
                } else if (_.isIterable(sel)) {
                    loop(sel, function() {
                        let el = this;
                        if (_.isElement(el)) {
                            loop(self, function() {
                                this.insertBefore(el, this.childNodes[0]);
                            });
                        }
                    });
                }
            }
            return this;
        }
        
        render(s) {
            loop(this, function() {
                _.render(this, s);
            });
            return this;
        }
        
        html(s) {
            if (s === undefined || s === null) return this[0].innerHTML;
            
            for (let i = 0; i < this.length; i++) {
                this[i].innerHTML = s;   
            }
            return this;
        }
        
        text(s) {
            if (s === undefined || s === null) return this[0].textContent;
            
            for (let i = 0; i < this.length; i++) {
                this[i].innerHTML = _.escape(s);   
            }
            
            return this;
        }
        
        attr(key, val) {
            if (val === undefined || val === null) {
                return this[0].getAttribute(key);
            }
            
            loop(this, function() {
                this.setAttribute(key, val);
            });
            return this;
        }
        
        prop(key, val) {
            return this.attr(key, val);
        }
        
        on(event, callback) {
            return this.bind(event, callback);
        }
        
        bind(event, callback) {
            let events = event.split(" ");
            loop(this, function() {
                _.eventStack.push({
                    "element": this,
                    "callback": callback,
                    "event": event
                });
                
                for (let j = 0; j < events.length; j++) {
                    this.addEventListener(events[j].trim(), function() {
                        callback.call(_(this));
                    }, false);
                }
            });
            return this;
        }
        
        unbind(event) {
            let self = this;
            let events = event.split(" ");
            let toRemoveEvent = [];
            loop(this, function() {
                let el = this;
                for (let j = 0; j < events.length; j++) {
                    loop(_.eventStack, function(i) {
                        if (_.isSame(el, this["element"]) && events[j] === this["event"]) {
                            el.removeEventListener(events[j], this["callback"]);
                            toRemoveEvent.push(i);
                        }
                    });
                }
            });
            
            loop(toRemoveEvent, function() {
                _.eventStack.splice(this, 1);
            });
            
            return this;
        }
        
        select(sel) {
            let dom = new DOMLang();
            
            loop(this[0].querySelectorAll(sel), function() {
                dom.push(this);
            });
            return dom;
        }
        
        clear() {
            let toRemoveEvent = [];
            loop(this, function() {
                let el = this;
                loop(_.eventStack, function(i) {
                    if (_.isSame(el, this["element"])) {
                        el.removeEventListener(event, this["callback"]);
                        toRemoveEvent.push(i);
                    }
                });
            });
            
            loop(toRemoveEvent, function() {
                _.eventStack.splice(this, 1);
            });
            return this;
        }
        
        disable() {
            loop(this, function() {
                this.disabled = true;
            });
            return this;
        }
        
        enable() {
            loop(this, function() {
                this.disabled = false;
            });
            return this;
        }
        
        isDisabled() {
            return this[0].disabled
        }
        
        children(includeAll=false) {
            return includeAll ? this[0].childNodes : this[0].children;
        }
        
        click(callback) {
            return this.bind("click", callback);
        }
        
        css(style, val) {
            let self = this;
            if (val === null || val === undefined) {
                loop(_.keys(style), function() {
                    let key = this;
                    let value = style[key];
                    loop(self, function() {
                        this.style[key] = value;
                    });
                });
            } else {
                loop(this, function() {
                    this.style[style] = val;
                });
            }
            return this;
        }
        
        siblings() {
            let sibs = [];
            let currentElement = this[0];
            loop(currentElement.parentNode.children, function() {
                if (!_.isSame(this, currentElement)) {
                    sibs.push(this);
                }
            });
            
            return _(sibs);
        }
        
        first() {
            return _(this[0]);
        }
        
        last() {
            return _(this[this.length - 1]);
        }
        
        filter(sel) {
            let container = document.createElement("div");
            let newElements = [];
            
            loop(this, function() {
                container.innerHTML = "";
                container.appendChild(this.cloneNode());
                
                if (container.querySelector(sel) === null) {
                    newElements.push(this);
                }
            });
            
            return _(newElements);
        }
        
        height(val) {
            if (val === undefined || val === null || !_.isNumber(val)) return this[0].offsetHeight;
            this.css("height", val + "px");
            return this;
        }
        
        width(val) {
            if (val === undefined || val === null || !_.isNumber(val)) return this[0].offsetWidth;
            this.css("width", val + "px");
            return this;
        }
        
        innerHeight() {
            return this[0].clientHeight;
        }
        
        innerWidth() {
            return this[0].clientWidth;
        }
        
        hide() {
            loop(this, function() {
                this.style.visibility = "hidden";
            });
            return this;
        }
        
        show() {
            loop(this, function() {
                this.style.visibility = "visible";
            });
            return this;
        }
        
        offset() {
            let el = this[0];
            let _x = 0;
            let _y = 0;
            while( el && !isNaN( el.offsetLeft ) && !isNaN( el.offsetTop ) ) {
                _x += el.offsetLeft - el.scrollLeft;
                _y += el.offsetTop - el.scrollTop;
                el = el.offsetParent;
            }
            return { top: _y, left: _x, x: _x, y: _y };
        }
        
        parent() {
            return this[0].parentNode;
        }
        
        parents() {
            let ps = [];
            loop(this, function() {
                if (!_.isContains(ps, this.parentNode)) {
                    ps.push(this.parentNode);
                }
            });
            return _(ps);
        }
        
        removeAttr(key) {
            loop(this, function() {
                this.removeAttribute(key);
            });
            return this;
        }
        
        remove() {
            loop(this, function() {
                this.remove();
            });
            
            return this;
        }
        
        val() {
            return this[0].value;
        }
    }
    
    DOMLang.prototype.push = Array.prototype.push;
    DOMLang.prototype.pop = Array.prototype.pop;
    DOMLang.prototype.splice = Array.prototype.splice;
    DOMLang.prototype.get = function(index) {
        return _(this[index]);
    };
    
    _.plugin = function(name, callback) {
        DOMLang.prototype[name] = callback;
    };
    
})();
