/* global $ */
!(function(root, doc) {
    
    let oldFoundation = null;
    if ($ !== null || $ !== undefined) {
        oldFoundation = $;
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
    
    const $ = function(sel) {
        return new DOMLang(sel);
    };
    
    $.toObject = function(jsonString) {
        return JSON.parse(jsonString);
    };
    
    $.toJson = function(collec) {
        return JSON.stringify(collec);
    };
    
    $.toNum = $.toNumber = function(s) {
        return Number(s);
    };
    
    $.toString = function(collec) {
        return $.isLoopable(collec) ? JSON.stringify(collec) : collec.toString();
    };
    
    $.toArray = function(o) {
        const newArray = [];
        loop(o, function() {
            newArray.push(this);
        });
        return newArray;
    }
    
    $.isArray = function(o) {
        return (o.constructor.name === "HTMLCollection" || o.constructor.name === "NodeList" || Array.isArray(o));
    };
    
    $.isElement = function(o) {
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
    
    $.isString = function(o) {
        return typeof o === "string";
    };
    
    $.isNumber = $.isNum = function(num) {
        return typeof num === "number";
    };
    
    $.isEmpty = function(o) {
        return $.keys(o).length === 0;
    };
    
    $.isEqual = function(o1, o2) {
        return JSON.stringify(o1) == JSON.stringify((o2));
    };
    
    $.isFunction = function(method) {
        return method && {}.toString.call(method) === '[object Function]';
    };
    
    $.isLoopable = $.isIterable = function(o) {
        return !$.isEmpty(o);
    };
    
    $.isSame = function(o1, o2) {
        return ($.isElement(o1) && $.isElement(o2)) ? o1.isSameNode(o2) : o1 == o2;
    };
    
    $.escape = function(s) {
        let newS = s;
        loop(escapeMap, function(key) {
            newS = newS.replace(new RegExp(key, "g"), this);
        });
        return newS;
    };
    
    $.unescape = function(s) {
        let newS = s;
        loop(escapeMap, function(key) {
            newS = newS.replace(new RegExp(this, "g"), key);
        });
        return newS;
    };
    
    $.keys = function(o) {
        return Object.keys(o);
    };
    
    $.values = function(o) {
        let vals = [];
        let keys = $.keys(o);
        
        for (let i = 0; i < keys.length; i++) {
            vals.push(o[keys[i]]);
        }
        
        return vals;
    };
    
    $.isContains = function(arr, o) {
        let ret = false;
        loop(arr, function() {
            if($.isSame(this, o)) {
                ret = true;
                return true;
            }
        });
        return ret;
    };
    
    $.ready = function(callback) {
        window.addEventListener("DOMContentLoaded", callback, false);
    };
    
    $.random = function(min, max=null) {
        if ($.isArray(min)) {
            let rand = 0 + Math.floor(Math.random() * (min.length - 0 + 1));
            return min[rand];
        }
        if (max == null) {
            max = min;
            min = 0;
        }
        return min + Math.floor(Math.random() * (max - min + 1));
    };
    
    
    $.map = function(collec, callback, context) {
        let newCollec = Object.assign({}, collec);
        let keys = $.keys(collec);
        
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
    
    $.reduce = $.foldl = function(collec, callback, context) {
        let keys = $.keys(collec);
        let startValue = collec[keys[0]];
        for (let i = 1; i < keys.length; i++) {
            startValue = callback(startValue, collec[keys[i]], collec);
        }
        return startValue;
    };
    
    $.reduceRight = $.foldr = function(collec, callback, context) {
        let keys = $.keys(collec);
        let startValue = collec[keys[keys.length - 1]];
        for (let i = keys.length - 2; i >= 0; i--) {
            startValue = callback(startValue, collec[keys[i]], collec);
        }
        return startValue;
    };
    
    $.find = function(collec, callback) {
        let retValue = null;
        $.each(collec, function(key) {
            let ret = callback(key, this, collec);
            if (ret) {
                retValue = this;
                return true;
            }
        });
        return retValue;
    };
    
    $.filter = function(arr, callback) {
        let newArr = [];
        $.each(arr, function(key) {
            let ret = callback(key, this, arr);
            if (ret) {
                newArr.push(this);
            }
        });
        return newArr;
    };
    
    
    $.where = function(arr, obj) {
        let newArr = [];
        let keys = $.keys(obj);
        $.each(arr, function(key) {
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
    
    $.reject = function(arr, callback) {
        let newArr = [];
        $.each(arr, function(key) {
            let ret = callback(key, this, arr);
            if (!ret) {
                newArr.push(this);
            }
        });
        return newArr;
    };
    
    $.all = $.every = function(arr, callback) {
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
    
    $.any = $.some = function(arr, callback) {
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
    
    $.invoke = function() {
        let args = arguments;
        let arr = args[0];
        $.each(arr, function(index) {
            for (let i = 1; i < args.length; i++) {
                arr[index] = this[args[i]]();
            }
        });
        return arr;
    };
    
    $.extend = function() {
        let newArr = [];
        for (let i = 0; i < arguments.length; i++) {
            newArr = newArr.concat(arguments[i])
        }
        return newArr;
    };
    
    $.clone = function(collec) {
        return $.isArray(collec) ? [].concat(collec) : Object.assign({}, collec);
    };
    
    $.has = function(collec, key) {
        return $.isContains($.keys(collec), key);
    };
    
    $.each = $.forEach = function(o, callback, context) {
        if ($.isArray(o)) {
            for (let i = 0; i < o.length; i++) {
                let ret = false;
                if (context === undefined || context === null) {
                    ret = callback.call(o[i], i, o);
                } else {
                    ret = callback.call(context, o[i], i, o);
                }
                
                if (ret === true) break;
            }
        }else if ($.isIterable(o)) {
            let keys = $.keys(o);
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
        
        if ($.isString(o)) {
            itWasString = true;
            arr = o.split("");
        } else {
            arr = o;
        }
        
        isEnd ? arr.splice(arr.length - num, num) : arr.splice(0, num);
        
        return itWasString ? arr.join("") : arr;
    }
    
    $.dropLast = function(o, num=1) {
        return drop(o, num, true);
    };
    
    $.dropFirst = function(o, num=1) {
        return drop(o, num, false);
    };
    
    // TODO: implement, http and fetch method
    
    $.http = function(url, args) {
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
                    if ($.has(args, "onSuccess")) {
                        args.onSuccess.call(this, this.responseText);
                    }
                } else {
                    if ($.has(args, "onFail")) {
                        args.onFail.call(this, this.responseText);
                    }
                }
            }
        };
        
        let data = "";
        if ($.has(args, "data")) {
            data += "?";
            loop(args.data, function(key) {
                data += (key + "=" + this + "&")
            });
            
            data = $.dropLast(data, 1);
        }
        
        let isPost = false;
        if ($.has(args, "method")) {
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
        
        if ($.has(args, "headers")) {
            loop(args.headers, function(key) {
                xhr.setRequestHeader(key, this);
            });
        }
        
        if (isPost) {
            data = $.dropFirst(data, 1);
            xhr.send(data);
        } else {
            xhr.send();
        }
    };
    
    $.upload = function() {
        console.warn("$.upload() not implemented yet!");
    };
    
    
    $.eventStack = [];
    $.doms = [];
    
    $.extension = function(name, callback) {
        if ($.has($, name)) {
            throw "The extension name '" + name + "' already exist."
        }
        $[name] = callback;
    };
    
    
    $.attrs = function(el) {
        return Array.from(el.attributes);
    };
    
    function getAttrs(el) {
        let attrs = {};
        loop($.attrs(el), function() {
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
                
                if (newVDOM.tag !== oldVDOM.tag || $.keys(newVDOM.attrs).length !== $.keys(oldVDOM.attrs).length || 
                newVDOM.children.length !== oldVDOM.children.length || newChilds[newNodeCount].textContent !== oldChilds[oldNodeCount].textContent) {
                    callback(newChilds[newNodeCount], oldChilds[oldNodeCount], "replace");
                    isUpdated = true;
                } else {
                    loop(oldVDOM.attrs, function(key) {
                        if (!$.has(newVDOM.attrs, key) || newVDOM[key] !== oldVDOM[key]) {
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
    
    // $.virtualDOM = function(node) {
    //     if ($.isString(node)) {
    //         node = document.querySelector(node);
    //     } else if ($.isIterable(node)) {
    //         node = node[0];
    //     }
    //     let attrs = $.attrs(node);
    //     let dom = {tag: node.tagName.toLowerCase(), attrs: getAttrs(node), children: createVirtualDOM(node.children, [])}
        
    //     $.doms.push({
    //         node: node,
    //         dom: dom
    //     })
    // };
    
    $.render = function(oldNode, newNode) {
        if ($.isString(newNode)) {
            let tmp = document.createElement("div");
            tmp.innerHTML = newNode;
            newNode = tmp.children[0];
        }
        
        if ($.isString(oldNode)) {
            oldNode = document.querySelector(oldNode);
        } else if ($.isIterable(oldNode)) {
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
            } else if ($.isString(sel)) {
                if (/<[a-z][\s\S]*>/i.test(sel)) {
                    let el = doc.createElement("div");
                    el.innerHTML = sel;
                    
                    loop(el.children, function() {
                        self.push(this);
                    });
                } else {
                    loop(doc.querySelectorAll(sel), function() {
                        if (!$.isContains(self, this)) {
                            self.push(this);
                        }
                    });
                }
                
            } else if ($.isElement(sel)) {
                if (!$.isContains(self, sel)) {
                    self.push(sel);
                }
            } else if ($.isIterable(sel)) {
                loop(sel, function() {
                    if ($.isElement(this) && !$.isContains(self, this)) self.push(this);
                });
            }
        }
        
        extend() {
            let self = this;
            for (let i = 0; i < arguments.length; i++) {
                let sel = arguments[i];
                
                if ($.isElement(sel)) {
                    if (!$.isContains(this, sel)) this.push(sel);
                } else if (typeof sel === "string") {
                    loop(doc.querySelectorAll(sel), function() {
                        if (!$.isContains(self, this)) self.push(this);
                    });
                } else {
                    loop(sel, function() {
                        if (!$.isContains(self, this)) self.push(this);
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
            callback.call($(this[0]));
        }
        
        each(callback, context) {
            if (context === undefined || context === null) {
                for (let i = 0; i < this.length; i++) {
                    callback.call($(this[i]), i, this);
                }
            } else {
                for (let i = 0; i < this.length; i++) {
                    callback.call(context, i, $(this[i]), this);
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
                if ($.isString(sel)) {
                    let elements = $(sel);
                    for (let i = 0; i < elements.length; i++) {
                        for (let j = 0; j < this.length; j++) {
                            this[j].appendChild(elements[i]);
                        }
                    }
                } else if ($.isElement(sel)) {
                    for (let i = 0; i < this.length; i++) {
                        this[i].appendChild(sel);
                    }
                } else if ($.isIterable(sel) || $.isArray(sel)) {
                    for (let i = 0; i < sel.length; i++) {
                        if ($.isElement(sel[i])) {
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
                if ($.isString(sel)) {
                    loop($(sel), function() {
                        let el = this;
                        loop(self, function() {
                            this.insertBefore(el, this.childNodes[0]);
                        });
                    });
                } else if ($.isElement(sel)) {
                    loop(this, function() {
                        this.insertBefore(sel, this.childNodes[0]);
                    });
                } else if ($.isIterable(sel)) {
                    loop(sel, function() {
                        let el = this;
                        if ($.isElement(el)) {
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
                $.render(this, s);
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
                this[i].innerHTML = $.escape(s);   
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
                $.eventStack.push({
                    "element": this,
                    "callback": callback,
                    "event": event
                });
                
                for (let j = 0; j < events.length; j++) {
                    this.addEventListener(events[j].trim(), function() {
                        callback.call($(this));
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
                    loop($.eventStack, function(i) {
                        if ($.isSame(el, this["element"]) && events[j] === this["event"]) {
                            el.removeEventListener(events[j], this["callback"]);
                            toRemoveEvent.push(i);
                        }
                    });
                }
            });
            
            loop(toRemoveEvent, function() {
                $.eventStack.splice(this, 1);
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
                loop($.eventStack, function(i) {
                    if ($.isSame(el, this["element"])) {
                        el.removeEventListener(event, this["callback"]);
                        toRemoveEvent.push(i);
                    }
                });
            });
            
            loop(toRemoveEvent, function() {
                $.eventStack.splice(this, 1);
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
                loop($.keys(style), function() {
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
                if (!$.isSame(this, currentElement)) {
                    sibs.push(this);
                }
            });
            
            return $(sibs);
        }
        
        first() {
            return $(this[0]);
        }
        
        last() {
            return $(this[this.length - 1]);
        }
        
        filter(sel) {
            let container = doc.createElement("div");
            let newElements = [];
            
            loop(this, function() {
                container.innerHTML = "";
                container.appendChild(this.cloneNode());
                
                if (container.querySelector(sel) === null) {
                    newElements.push(this);
                }
            });
            
            return $(newElements);
        }
        
        height(val) {
            if (val === undefined || val === null || !$.isNumber(val)) return this[0].offsetHeight;
            this.css("height", val + "px");
            return this;
        }
        
        width(val) {
            if (val === undefined || val === null || !$.isNumber(val)) return this[0].offsetWidth;
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
                if (!$.isContains(ps, this.parentNode)) {
                    ps.push(this.parentNode);
                }
            });
            return $(ps);
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
        return $(this[index]);
    };
    
    $.plugin = function(name, callback) {
        DOMLang.prototype[name] = callback;
    };
    
    root["$"] = $;
    
})(window, document);