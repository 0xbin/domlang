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

- [$(selector)](#dom-method-$)
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

- [$.any(arr, callback)](#extension-method-any) or [$.some(arr, callback)](#extension-method-any)
- [$.all(array, callback)](#extension-method-all) or [$.every(arr, callback)](#extension-method-all)
- [$.attrs(element)](#extension-method-attrs)
- [$.clone(collection)](#extension-method-clone)
- [$.dropLast(s, \[num=1\])](#extension-method-dropLast)
- [$.dropFirst(s, \[num=1\])](#extension-method-dropFirst)
- [$.escape(s)](#extension-method-escape)
- [$.extend(\[arguments\])](#extension-method-extend)
- [$.extension(name, callback)](#extension-method-extension)
- [$.each(collection, callback, \[context\])](#extension-method-each) or [$.forEach(collection, callback, \[context\])](#extension-method-each)
- [$.find(collection, callback)](#extension-method-find)
- [$.filter(arr, callback)](#extension-method-filter)
- [$.has(collection, key)](#extension-method-has)
- [$.http(url, args)](#extension-method-http)
- [$.isArray(obj)](#extension-method-isArray)
- [$.isElement(obj)](#extension-method-isElement)
- [$.isString(obj)](#extension-method-isString)
- [$.isNumber(obj)](#extension-method-isNumber) or [$.isNum(obj)](#extension-method-isNumber)
- [$.isEmpty(collection)](#extension-method-isEmpty)
- [$.isEqual(obj1, obj2)](#extension-method-isEqual)
- [$.isFunction(obj)](#extension-method-isFunction)
- [$.isLoopable(obj)](#extension-method-isLoopable) or [$.isIterable(obj)](#extension-method-isLoopable)
- [$.isSame(obj1, obj2)](#extension-method-isSame)
- [$.isContains(arr, obj)](#extension-method-isContains)
- [$.invoke(\[arguments\])](#extension-method-invoke)
- [$.keys(obj)](#extension-method-keys)
- [$.map(collection, callback, \[context\])](#extension-method-map)
- [$.plugin(name, callback)](#extension-method-plugin)
- [$.ready(callback)](#extension-method-ready)
- [$.random(min, \[max=null\])](#extension-method-random)
- [$.reduce(collection, callback, \[context\])](#extension-method-reduce) or [$.foldl(collection, callback, \[context\])](#extension-method-reduce)
- [$.reduceRight(collection, callback, \[context\])](#extension-method-reduceRight) or [$.foldr(collection, callback, \[context\])](#extension-method-reduceRight)
- [$.reject(arr, callback)](#extension-method-reject)
- [$.render(element, html)](#extension-method-render)
- [$.toObject(jsonString)](#extension-method-toObject)
- [$.toJson(collection)](#extension-method-toJson)
- [$.toNum(s)](#extension-method-toNum) or [$.toNumber(s)](#extension-method-toNum)
- [$.toString(obj)](#extension-method-toString)
- [$.toArray(collection)](#extension-method-toArray)
- [$.unescape(s)](#extension-method-unescape)
- [$.upload(url)](#extension-method-values) :warning:
- [$.values(obj)](#extension-method-values)
- [$.where(arr, obj)](#extension-method-where)


<h3 id="dom-method-$">$(selector)</h3>

Allows you to create a new `domlang` instance, you can pass the following as argument.

- `String`      — If it is an HTML string then it will create those element and add it to the current instance, or it will select elements from the DOM itself.
- `HTMLElement` — Add the given HTMLElement to the current instance.
- `Array`       — Add all the elements from the array to the current instance if the element is a HTMLElement.

**Example →**

```js
let buttons = $("button"); 
```

<h3 id="dom-method-addClass">.addClass(className)</h3>

Add class name to all selected elements. You can add multiple class names by seperating with a space.

**Example →**

```js
$("a").addClass("link");
$("ul").addClass("list navigation");
```


<h3 id="dom-method-append">.append([arguments])</h3>

Append HTML element(s) to the selected elements. You can pass the following as argument.

- `String`      — Select element(s) from the DOM and append them to the selected elements.
- `HTMLElement` — Append given HTMLElement to the selected elements.
- `Array`       — Append all the elements from given array to the selected elements if the array element is a HTML element.
- `arguments`   — You can pass all above parameters as arguments. Example : `$("#container").append(element1, element2)`

**Example →**

```js
let span = $("<span>+</span>");
$("ul li").append(span);
```

<h3 id="dom-method-append">.also(callback)</h3>

This is method is an utility method. The first selected element will be set to the callback for further processing, and this method will return whatever elements was before this method called.

**Example →**

```js
$("input[type='username']").also(function() {
  if (this.isDisabled()) {
    this.enable();
  }
});
```

<h3 id="dom-method-attr">.attr(key, [value])</h3>

Get or set HTML element(s) attribute. :warning: If key only passed as argument, it will return the first element's attribute.

**Example →**

```js
$("a").attr("href", "not-found.html");

let action = $("form").attr("action");
```


<h3 id="dom-method-bind">.bind(event, callback)</h3>

Bind an event listener to selected element(s). :information_source: It is a wrapper around `addEventListener` method.

**Example →**

```js
$("button").bind("click", function() {
    alert(this.text());
});
```

<h3 id="dom-method-children">.children([includeTextNodes=false])</h3>

Get all the children of the first element from the selected elements. Pass `true` as argument to include all the `text` nodes.

**Example →**

```js
$("ul").children().each(function(i) {
  this.text(this.text() + " " + i);
});
```

<h3 id="dom-method-clear">.clear()</h3>

Clear all events of selected elements.

**Example →**

```js
let buttons = $("button").bind("click", function() {
  alert("hello");
});

buttons.clear();
```

<h3 id="dom-method-click">.click(callback)</h3>

Bind a click event to selected elements.

**Example →**

```js
$("button").click(function() {
  alert(this.text());
});
```


<h3 id="dom-method-css">.css(key, [value])</h3>

Add CSS style to selected elements. You can pass the following as first argument.

- `String` — pass the CSS style property as the key and pass the CSS style property value as second argument.
- `Object` — pass a JavaScript object as the first argument with all the CSS styles as key-value pair.

**Example →**

```js
let anchors = $("a");
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
$("input[type='username']").disable();
```


<h3 id="dom-method-enable">.enable()</h3>

Enable selected form elements.

**Example →**

```js
$("input[type='username']").enable();
```


<h3 id="dom-method-extend">.extend([arguments])</h3>

Allows you to add more elements to the current instance. You can pass the following as first argument.

- `String`      — Select element(s) from the DOM and append them to the selected elements.
- `HTMLElement` — Append given HTMLElement to the selected elements.
- `Array`       — Append all the elements from given array to the selected elements if the array element is a HTML element.
- `arguments`   — You can pass all above parameters as arguments. Example : `$("#container").extend(element1, element2)`


**Example →**

```js
$("ul li").extend("ol li").css("listStyle", "none");
```


<h3 id="dom-method-each">.each(callback, [context])</h3>

Loop through each element from the current instance. if there is no context passed the current element will be used as the context. Callback has 2 arguments if the there is no context or it will have 3 arguments.

**Example →**

```js
$("input").each(function(index, elements) {
  if (this.isDisabled()) {
    this.enable();
  }
});
```

```js
let navs = ["Home", "About", "Contact"];
$("a").each(function(element, index, elements) {
  element.text(this);
}, navs);
```


<h3 id="dom-method-filter">.filter(selector)</h3>

Remove elements match the given selector from current instance.

**Example →**

```js
let buttons = $("button, input[type='submit']");
buttons.disable();
buttons.filter("button").enable(); // enable input with type submit
```


<h3 id="dom-method-first">.first()</h3>

Returns a new instance with the first element from current instance.

**Example →**

```js
let buttons = $("button");
let firstButton = buttons.first();
```


<h3 id="dom-method-get">.get(index)</h3>

Returns a new instance with the given indexed element from current instance.

**Example →**

```js
let buttons = $("button");
let secondButton = buttons.get(1);
```


<h3 id="dom-method-hide">.hide()</h3>

Hide all selected elements.

**Example →**

```js
$("img").hide();
```


<h3 id="dom-method-height">.height([height])</h3>

Return the height of the first element from selected elements. :information_source: It includes border and padding.

**Example →**

```js
let containerHeight = $("div#container").height();
$("div#container").height(containerHeight - 20);
```


<h3 id="dom-method-html">.html([html])</h3>

If no argument passed then return the `html` of the first element from selected elements, else set the given HTML to all the selected elements.

**Example →**

```js
let containerHtml = $("div#container").html();
$("div#container").html("<h1>I am inside a container</h1>");
```


<h3 id="dom-method-isDisabled">.isDisabled()</h3>

Check if the first element from selected elements is isDisabled or not.

**Example →**

```js
$("input[type='username']").also(function() {
  if (this.isDisabled()) {
    this.enable();
  }
});
```

<h3 id="dom-method-innerHeight">.innerHeight()</h3>

Return the inner height of the first element from selected elements.

**Example →**

```js
let insideHeight = $("div#container").innerHeight();
```


<h3 id="dom-method-innerWidth">.innerWidth()</h3>

Return the inner width of the first element from selected elements.

**Example →**

```js
let insideHeight = $("div#container").innerWidth();
```


<h3 id="dom-method-last">.last()</h3>

Returns a new instance with the last element from current instance.

**Example →**

```js
let buttons = $("button");
let lastButton = buttons.last();
```


<h3 id="dom-method-offset">.offset()</h3>

Return the offset of the first element from selected elements.

**Example →**

```js
let offset = $("button").offset();
console.log(offset.top, offset.left);
```


<h3 id="dom-method-on">.on(event, callback)</h3>

Bind an event listener to selected element(s). :information_source: It is a wrapper around `addEventListener` method.

**Example →**

```js
$("button").on("click", function() {
    alert(this.text());
});
```


<h3 id="dom-method-parent">.parent()</h3>

Return the parent element of the first element from selected elements.

**Example →**

```js
let form = $("input[name='username']").parent();
```

<h3 id="dom-method-parents">.parents()</h3>

Return all the parent elements of the selected elements.

**Example →**

```js
let uls = $("li").parents().filter("ol");
```


<h3 id="dom-method-prepend">.prepend([arguments])</h3>

Prepend HTML element(s) to the selected elements. You can pass the following as argument.

- `String`      — Select element(s) from the DOM and append them to the selected elements.
- `HTMLElement` — Append given HTMLElement to the selected elements.
- `Array`       — Append all the elements from given array to the selected elements if the array element is a HTML element.
- `arguments`   — You can pass all above parameters as arguments. Example : `$("#container").append(element1, element2)`

**Example →**

```js
let span = $("<span>+</span>");
$("ul li").prepend(span);
```


<h3 id="dom-method-removeClass">.removeClass(className)</h3>

Remove class name to all selected elements. You can add multiple class names by seperating with a space.

**Example →**

```js
$("a").removeClass("link");
$("ul").removeClass("list navigation");
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
$("#wrap").render(`
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
$("p").remove();
```

<h3 id="dom-method-removeAttr">.removeAttr(key)</h3>

Remove the given attribute from selected elements.

**Example →**

```js
$("input[data-dummy]").removeAttr("data-dummy");
```

<h3 id="dom-method-show">.show()</h3>

Make the selected elements visible if they were hidden.

**Example →**

```js
let buttons = $("button");
buttons.hide();

setTimeout(function() {
  buttons.show();
}, 3000);
```

<h3 id="dom-method-siblings">.siblings()</h3>

Return the siblings of the first element from selected elements.

**Example →**

```js
let allListExceptMe = $("ul li").siblings();
```

<h3 id="dom-method-toggleClass">.toggleClass(className)</h3>

Remove if the class name exist or add if the class name is not.

**Example →**

```js
$("a.green, a.red, a.active").toggleClass("active");
```

<h3 id="dom-method-text">.text(s)</h3>

Set text content of the selected elements.

**Example →**

```js
$("a.notfound").text("Not Found");
```

<h3 id="dom-method-unbind">.unbind(event)</h3>

Remove an event from selected elements.

**Example →**

```js
$("input[type='submit']").bind("click", function(e) {
  e.preventDefault();
});

$("input[type='submit']").unbind("click");
```

<h3 id="dom-method-val">.val(value)</h3>

Set the value of the selected form elements.

**Example →**

```js
$("input").text("The same values");
```


<h3 id="dom-method-width">.width([width])</h3>

Return the width of the first element from selected elements. :information_source: It includes border and padding.

**Example →**

```js
let containerWidth = $("div#container").width();
$("div#container").width(containerWidth - 20);
```
