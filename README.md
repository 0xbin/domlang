<!--<p align="center">-->
<!--  <a href="https://getbootstrap.com/">-->
<!--    <img src="https://getbootstrap.com/docs/4.3/assets/brand/bootstrap-solid.svg" alt="Bootstrap logo" width="72" height="72">-->
<!--  </a>-->
<!--</p>-->

<h3 align="center">DOMLang JS</h3>

<p align="center">
  A light-weight JavaScript library to make web development easier.
  <br>
  <a href="#"><strong>Explore domlang docs »</strong></a>
  <br>
  <br>
  <a href="https://github.com/0xbin/domlang/issues/new?template=bug.md">Report bug</a>
  ·
  <a href="https://github.com/0xbin/domlang/issues/new?template=feature.md&labels=feature">Request feature</a>
</p>

## Quick start

Clone the github repo `git clone https://github.com/0xWiz/domlang.git` and under the `dest` folder, you can find the minified version of the `domalang`. Add it to your HTML as you would add any JavaScript files.

Or use CDN link

```html
<script src="https://cdn.jsdelivr.net/gh/0xbin/domlang/dest/domlang.min.js"></script>
```

[![Build Status](https://travis-ci.org/0xbin/domlang.svg?branch=master)](https://travis-ci.org/0xbin/domlang)
[![License](https://img.shields.io/github/license/0xbin/domlang.svg)](https://github.com/0xbin/domlang/blob/master/LICENSE)
[![Version](https://img.shields.io/github/release/0xbin/domlang.svg)](https://github.com/0xbin/domlang/releases/latest)


## DOM methods

DOM methods makes DOM manipulation much easier.

- [_(selector)](#dom-method-_)
- [.addClass(className)](#dom-method-addClass)
- [.append(\[arugments\])](#dom-method-append)
- [.also(callback)](#dom-method-also)
- [.attr(key, \[value\])](#dom-method-attr) or [.prop(key, \[value\])](#dom-method-attr)
- [.bind(event, callback)](#dom-method-bind)
- [.children(\[includeTextNodes=false\])](#dom-method-children)
- [.clear()](#dom-method-clear)
- [.click(callback)](#dom-method-click)
- [.css(key, \[value\])](#dom-method-css)
- [.disable()](#dom-method-disable)
- [.enable()](#dom-method-enable)
- [.extend(\[arguments\])](#dom-method-extend)
- [.each(callback, \[context\])](#dom-method-each)
- [.filter(selector)](#dom-method-filter)
- [.first()](#dom-method-first)
- [.get(index)](#dom-method-get)
- [.hide()](#dom-method-hide)
- [.height(\[height\])](#dom-method-height)
- [.html(\[html\])](#dom-method-html)
- [.isDisabled()](#dom-method-isDisabled)
- [.innerHeight()](#dom-method-innerHeight)
- [.innerWidth()](#dom-method-innerWidth)
- [.last()](#dom-method-last)
- [.offset()](#dom-method-offset)
- [.on(event, callback)](#dom-method-on)
- [.parent()](#dom-method-parent)
- [.parents()](#dom-method-parents)
- [.prepend(\[arugments\])](#dom-method-prepend)
- [.removeClass(className)](#dom-method-removeClass)
- [.render(html)](#dom-method-render)
- [.remove()](#dom-method-remove)
- [.removeAttr(key)](#dom-method-removeAttr)
- [.show()](#dom-method-show)
- [.siblings()](#dom-method-siblings)
- [.toggleClass(className)](#dom-method-toggleClass)
- [.text(s)](#dom-method-text)
- [.unbind(event)](#dom-method-unbind)
- [.val(value)](#dom-method-val)
- [.width(\[width\])](#dom-method-width)


## Extension methods

Extension methods will helps to work with large collections and string.

- [_.any(arr, callback)](#extension-method-any) or [_.some(arr, callback)](#extension-method-any)
- [_.all(array, callback)](#extension-method-all) or [_.every(arr, callback)](#extension-method-all)
- [_.attrs(element)](#extension-method-attrs)
- [_.clone(collection)](#extension-method-clone)
- [_.dropLast(s, \[num=1\])](#extension-method-dropLast)
- [_.dropFirst(s, \[num=1\])](#extension-method-dropFirst)
- [_.escape(s)](#extension-method-escape)
- [_.extend(\[arguments\])](#extension-method-extend)
- [_.extension(name, callback)](#extension-method-extension)
- [_.each(collection, callback, \[context\])](#extension-method-each) or [_.forEach(collection, callback, \[context\])](#extension-method-each)
- [_.find(collection, callback)](#extension-method-find)
- [_.filter(arr, callback)](#extension-method-filter)
- [_.has(collection, key)](#extension-method-has)
- [_.http(url, args)](#extension-method-http)
- [_.isArray(obj)](#extension-method-isArray)
- [_.isElement(obj)](#extension-method-isElement)
- [_.isString(obj)](#extension-method-isString)
- [_.isNumber(obj)](#extension-method-isNumber) or [_.isNum(obj)](#extension-method-isNumber)
- [_.isEmpty(collection)](#extension-method-isEmpty)
- [_.isEqual(obj1, obj2)](#extension-method-isEqual)
- [_.isFunction(obj)](#extension-method-isFunction)
- [_.isLoopable(obj)](#extension-method-isLoopable) or [_.isIterable(obj)](#extension-method-isLoopable)
- [_.isSame(obj1, obj2)](#extension-method-isSame)
- [_.isContains(arr, obj)](#extension-method-isContains)
- [_.invoke(\[arguments\])](#extension-method-invoke)
- [_.keys(obj)](#extension-method-keys)
- [_.map(collection, callback, \[context\])](#extension-method-map)
- [_.plugin(name, callback)](#extension-method-plugin)
- [_.ready(callback)](#extension-method-ready)
- [_.random(min, \[max=null\])](#extension-method-random)
- [_.reduce(collection, callback, \[context\])](#extension-method-reduce) or [_.foldl(collection, callback, \[context\])](#extension-method-reduce)
- [_.reduceRight(collection, callback, \[context\])](#extension-method-reduceRight) or [_.foldr(collection, callback, \[context\])](#extension-method-reduceRight)
- [_.reject(arr, callback)](#extension-method-reject)
- [_.render(element, html)](#extension-method-render)
- [_.toObject(jsonString)](#extension-method-toObject)
- [_.toJson(collection)](#extension-method-toJson)
- [_.toNum(s)](#extension-method-toNum) or [_.toNumber(s)](#extension-method-toNum)
- [_.toString(obj)](#extension-method-toString)
- [_.toArray(collection)](#extension-method-toArray)
- [_.unescape(s)](#extension-method-unescape)
- [_.upload(url)](#extension-method-values) :warning:
- [_.values(obj)](#extension-method-values)
- [_.where(arr, obj)](#extension-method-where)


<h3 id="dom-method-_">_(selector)</h3>

Allows you to create a new `domlang` instance, you can pass the following as argument.

- `String`      — If it is an HTML string then it will create those element and add it to the current instance, or it will select elements from the DOM itself.
- `HTMLElement` — Add the given HTMLElement to the current instance.
- `Array`       — Add all the elements from the array to the current instance if the element is a HTMLElement.

**Example →**

```js
let buttons = _("button"); 
```

<h3 id="dom-method-addClass">.addClass(className)</h3>

Add class name to all selected elements. You can add multiple class names by seperating with a space.

**Example →**

```js
_("a").addClass("link");
_("ul").addClass("list navigation");
```


<h3 id="dom-method-append">.append([arguments])</h3>

Append HTML element(s) to the selected elements. You can pass the following as argument.

- `String`      — Select element(s) from the DOM and append them to the selected elements.
- `HTMLElement` — Append given HTMLElement to the selected elements.
- `Array`       — Append all the elements from given array to the selected elements if the array element is a HTML element.
- `arguments`   — You can pass all above parameters as arguments. Example : `_("#container").append(element1, element2)`

**Example →**

```js
let span = _("<span>+</span>");
_("ul li").append(span);
```

<h3 id="dom-method-append">.also(callback)</h3>

This is method is an utility method. The first selected element will be set to the callback for further processing, and this method will return whatever elements was before this method called.

**Example →**

```js
_("input[type='username']").also(function() {
  if (this.isDisabled()) {
    this.enable();
  }
});
```

<h3 id="dom-method-attr">.attr(key, [value])</h3>

Get or set HTML element(s) attribute. :warning: If key only passed as argument, it will return the first element's attribute.

**Example →**

```js
_("a").attr("href", "not-found.html");

let action = _("form").attr("action");
```


<h3 id="dom-method-bind">.bind(event, callback)</h3>

Bind an event listener to selected element(s). :information_source: It is a wrapper around `addEventListener` method.

**Example →**

```js
_("button").bind("click", function() {
    alert(this.text());
});
```

<h3 id="dom-method-children">.children([includeTextNodes=false])</h3>

Get all the children of the first element from the selected elements. Pass `true` as argument to include all the `text` nodes.

**Example →**

```js
_("ul").children().each(function(i) {
  this.text(this.text() + " " + i);
});
```

<h3 id="dom-method-clear">.clear()</h3>

Clear all events of selected elements.

**Example →**

```js
let buttons = _("button").bind("click", function() {
  alert("hello");
});

buttons.clear();
```

<h3 id="dom-method-click">.click(callback)</h3>

Bind a click event to selected elements.

**Example →**

```js
_("button").click(function() {
  alert(this.text());
});
```


<h3 id="dom-method-css">.css(key, [value])</h3>

Add CSS style to selected elements. You can pass the following as first argument.

- `String` — pass the CSS style property as the key and pass the CSS style property value as second argument.
- `Object` — pass a JavaScript object as the first argument with all the CSS styles as key-value pair.

**Example →**

```js
let anchors = _("a");
anchors.css("color", "green");
anchors.css({
  textStyle: "none",
  display: "inline-block",
  padding: "5px"
});
```


<h3 id="dom-method-disable">.disable()</h3>

Disable selected form elements.

**Example →**

```js
_("input[type='username']").disable();
```


<h3 id="dom-method-enable">.enable()</h3>

Enable selected form elements.

**Example →**

```js
_("input[type='username']").enable();
```


<h3 id="dom-method-extend">.extend([arguments])</h3>

Allows you to add more elements to the current instance. You can pass the following as first argument.

- `String`      — Select element(s) from the DOM and append them to the selected elements.
- `HTMLElement` — Append given HTMLElement to the selected elements.
- `Array`       — Append all the elements from given array to the selected elements if the array element is a HTML element.
- `arguments`   — You can pass all above parameters as arguments. Example : `_("#container").extend(element1, element2)`


**Example →**

```js
_("ul li").extend("ol li").css("listStyle", "none");
```


<h3 id="dom-method-each">.each(callback, [context])</h3>

Loop through each element from the current instance. if there is no context passed the current element will be used as the context. Callback has 2 arguments if the there is no context or it will have 3 arguments.

**Example →**

```js
_("input").each(function(index, elements) {
  if (this.isDisabled()) {
    this.enable();
  }
});
```

```js
let navs = ["Home", "About", "Contact"];
_("a").each(function(element, index, elements) {
  element.text(this);
}, navs);
```


<h3 id="dom-method-filter">.filter(selector)</h3>

Remove elements match the given selector from current instance.

**Example →**

```js
let buttons = _("button, input[type='submit']");
buttons.disable();
buttons.filter("button").enable(); // enable input with type submit
```


<h3 id="dom-method-first">.first()</h3>

Returns a new instance with the first element from current instance.

**Example →**

```js
let buttons = _("button");
let firstButton = buttons.first();
```


<h3 id="dom-method-get">.get(index)</h3>

Returns a new instance with the given indexed element from current instance.

**Example →**

```js
let buttons = _("button");
let secondButton = buttons.get(1);
```


<h3 id="dom-method-hide">.hide()</h3>

Hide all selected elements.

**Example →**

```js
_("img").hide();
```


<h3 id="dom-method-height">.height([height])</h3>

Return the height of the first element from selected elements. :information_source: It includes border and padding.

**Example →**

```js
let containerHeight = _("div#container").height();
_("div#container").height(containerHeight - 20);
```


<h3 id="dom-method-html">.html([html])</h3>

If no argument passed then return the `html` of the first element from selected elements, else set the given HTML to all the selected elements.

**Example →**

```js
let containerHtml = _("div#container").html();
_("div#container").html("<h1>I am inside a container</h1>");
```


<h3 id="dom-method-isDisabled">.isDisabled()</h3>

Check if the first element from selected elements is isDisabled or not.

**Example →**

```js
_("input[type='username']").also(function() {
  if (this.isDisabled()) {
    this.enable();
  }
});
```

<h3 id="dom-method-innerHeight">.innerHeight()</h3>

Return the inner height of the first element from selected elements.

**Example →**

```js
let insideHeight = _("div#container").innerHeight();
```


<h3 id="dom-method-innerWidth">.innerWidth()</h3>

Return the inner width of the first element from selected elements.

**Example →**

```js
let insideHeight = _("div#container").innerWidth();
```


<h3 id="dom-method-last">.last()</h3>

Returns a new instance with the last element from current instance.

**Example →**

```js
let buttons = _("button");
let lastButton = buttons.last();
```


<h3 id="dom-method-offset">.offset()</h3>

Return the offset of the first element from selected elements.

**Example →**

```js
let offset = _("button").offset();
console.log(offset.top, offset.left);
```


<h3 id="dom-method-on">.on(event, callback)</h3>

Bind an event listener to selected element(s). :information_source: It is a wrapper around `addEventListener` method.

**Example →**

```js
_("button").on("click", function() {
    alert(this.text());
});
```


<h3 id="dom-method-parent">.parent()</h3>

Return the parent element of the first element from selected elements.

**Example →**

```js
let form = _("input[name='username']").parent();
```

<h3 id="dom-method-parents">.parents()</h3>

Return all the parent elements of the selected elements.

**Example →**

```js
let uls = _("li").parents().filter("ol");
```


<h3 id="dom-method-prepend">.prepend([arguments])</h3>

Prepend HTML element(s) to the selected elements. You can pass the following as argument.

- `String`      — Select element(s) from the DOM and append them to the selected elements.
- `HTMLElement` — Append given HTMLElement to the selected elements.
- `Array`       — Append all the elements from given array to the selected elements if the array element is a HTML element.
- `arguments`   — You can pass all above parameters as arguments. Example : `_("#container").append(element1, element2)`

**Example →**

```js
let span = _("<span>+</span>");
_("ul li").prepend(span);
```


<h3 id="dom-method-removeClass">.removeClass(className)</h3>

Remove class name to all selected elements. You can add multiple class names by seperating with a space.

**Example →**

```js
_("a").removeClass("link");
_("ul").removeClass("list navigation");
```


<h3 id="dom-method-render">.render(html)</h3>

`.render()` is similar to `.html()` but instead of removing all elements and putting the new elements, it compare every element and update the changes only. :information_source: A useful method when you want to update a large HTML content.

**Example →**

```html
<div id="wrap">
  <h1>Heading 1</h1>
  <p>Para 1</p>
  <p>Para 2</p>
  <button>Button 1</button>
</div>
```

```js
_("#wrap").render(`
  <div id="wrap">
    <h1>Heading 1</h1>
    <p>Para 1</p>
    <p>Para 2</p>
    <button>Button 1</button>
    <button>A new button</button>
  </div>
`);
```

In this case the render method will only add the **A new button**.


<h3 id="dom-method-remove">.remove()</h3>

Remove all selected elements from the DOM.

**Example →**

```js
_("p").remove();
```

<h3 id="dom-method-removeAttr">.removeAttr(key)</h3>

Remove the given attribute from selected elements.

**Example →**

```js
_("input[data-dummy]").removeAttr("data-dummy");
```

<h3 id="dom-method-show">.show()</h3>

Make the selected elements visible if they were hidden.

**Example →**

```js
let buttons = _("button");
buttons.hide();

setTimeout(function() {
  buttons.show();
}, 3000);
```

<h3 id="dom-method-siblings">.siblings()</h3>

Return the siblings of the first element from selected elements.

**Example →**

```js
let allListExceptMe = _("ul li").siblings();
```

<h3 id="dom-method-toggleClass">.toggleClass(className)</h3>

Remove if the class name exist or add if the class name is not.

**Example →**

```js
_("a.green, a.red, a.active").toggleClass("active");
```

<h3 id="dom-method-text">.text(s)</h3>

Set text content of the selected elements.

**Example →**

```js
_("a.notfound").text("Not Found");
```

<h3 id="dom-method-unbind">.unbind(event)</h3>

Remove an event from selected elements.

**Example →**

```js
_("input[type='submit']").bind("click", function(e) {
  e.preventDefault();
});

_("input[type='submit']").unbind("click");
```

<h3 id="dom-method-val">.val(value)</h3>

Set the value of the selected form elements.

**Example →**

```js
_("input").text("The same values");
```


<h3 id="dom-method-width">.width([width])</h3>

Return the width of the first element from selected elements. :information_source: It includes border and padding.

**Example →**

```js
let containerWidth = _("div#container").width();
_("div#container").width(containerWidth - 20);
```
