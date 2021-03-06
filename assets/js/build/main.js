// Vendor
/*
 * classList.js: Cross-browser full element.classList implementation.
 * 1.1.20150312
 *
 * By Eli Grey, http://eligrey.com
 * License: Dedicated to the public domain.
 *   See https://github.com/eligrey/classList.js/blob/master/LICENSE.md
 */

/*global self, document, DOMException */

/*! @source http://purl.eligrey.com/github/classList.js/blob/master/classList.js */

if ("document" in self) {

// Full polyfill for browsers with no classList support
// Including IE < Edge missing SVGElement.classList
if (!("classList" in document.createElement("_"))
  || document.createElementNS && !("classlist" in document.createElementNS("http://www.w3.org/2000/svg","g"))) {

(function (view) {

"use strict";

if (!('Element' in view)) return;

var
    classListProp = "classList"
  , protoProp = "prototype"
  , elemCtrProto = view.Element[protoProp]
  , objCtr = Object
  , strTrim = String[protoProp].trim || function () {
    return this.replace(/^\s+|\s+$/g, "");
  }
  , arrIndexOf = Array[protoProp].indexOf || function (item) {
    var
        i = 0
      , len = this.length
    ;
    for (; i < len; i++) {
      if (i in this && this[i] === item) {
        return i;
      }
    }
    return -1;
  }
  // Vendors: please allow content code to instantiate DOMExceptions
  , DOMEx = function (type, message) {
    this.name = type;
    this.code = DOMException[type];
    this.message = message;
  }
  , checkTokenAndGetIndex = function (classList, token) {
    if (token === "") {
      throw new DOMEx(
          "SYNTAX_ERR"
        , "An invalid or illegal string was specified"
      );
    }
    if (/\s/.test(token)) {
      throw new DOMEx(
          "INVALID_CHARACTER_ERR"
        , "String contains an invalid character"
      );
    }
    return arrIndexOf.call(classList, token);
  }
  , ClassList = function (elem) {
    var
        trimmedClasses = strTrim.call(elem.getAttribute("class") || "")
      , classes = trimmedClasses ? trimmedClasses.split(/\s+/) : []
      , i = 0
      , len = classes.length
    ;
    for (; i < len; i++) {
      this.push(classes[i]);
    }
    this._updateClassName = function () {
      elem.setAttribute("class", this.toString());
    };
  }
  , classListProto = ClassList[protoProp] = []
  , classListGetter = function () {
    return new ClassList(this);
  }
;
// Most DOMException implementations don't allow calling DOMException's toString()
// on non-DOMExceptions. Error's toString() is sufficient here.
DOMEx[protoProp] = Error[protoProp];
classListProto.item = function (i) {
  return this[i] || null;
};
classListProto.contains = function (token) {
  token += "";
  return checkTokenAndGetIndex(this, token) !== -1;
};
classListProto.add = function () {
  var
      tokens = arguments
    , i = 0
    , l = tokens.length
    , token
    , updated = false
  ;
  do {
    token = tokens[i] + "";
    if (checkTokenAndGetIndex(this, token) === -1) {
      this.push(token);
      updated = true;
    }
  }
  while (++i < l);

  if (updated) {
    this._updateClassName();
  }
};
classListProto.remove = function () {
  var
      tokens = arguments
    , i = 0
    , l = tokens.length
    , token
    , updated = false
    , index
  ;
  do {
    token = tokens[i] + "";
    index = checkTokenAndGetIndex(this, token);
    while (index !== -1) {
      this.splice(index, 1);
      updated = true;
      index = checkTokenAndGetIndex(this, token);
    }
  }
  while (++i < l);

  if (updated) {
    this._updateClassName();
  }
};
classListProto.toggle = function (token, force) {
  token += "";

  var
      result = this.contains(token)
    , method = result ?
      force !== true && "remove"
    :
      force !== false && "add"
  ;

  if (method) {
    this[method](token);
  }

  if (force === true || force === false) {
    return force;
  } else {
    return !result;
  }
};
classListProto.toString = function () {
  return this.join(" ");
};

if (objCtr.defineProperty) {
  var classListPropDesc = {
      get: classListGetter
    , enumerable: true
    , configurable: true
  };
  try {
    objCtr.defineProperty(elemCtrProto, classListProp, classListPropDesc);
  } catch (ex) { // IE 8 doesn't support enumerable:true
    if (ex.number === -0x7FF5EC54) {
      classListPropDesc.enumerable = false;
      objCtr.defineProperty(elemCtrProto, classListProp, classListPropDesc);
    }
  }
} else if (objCtr[protoProp].__defineGetter__) {
  elemCtrProto.__defineGetter__(classListProp, classListGetter);
}

}(self));

} else {
// There is full or partial native classList support, so just check if we need
// to normalize the add/remove and toggle APIs.

(function () {
  "use strict";

  var testElement = document.createElement("_");

  testElement.classList.add("c1", "c2");

  // Polyfill for IE 10/11 and Firefox <26, where classList.add and
  // classList.remove exist but support only one argument at a time.
  if (!testElement.classList.contains("c2")) {
    var createMethod = function(method) {
      var original = DOMTokenList.prototype[method];

      DOMTokenList.prototype[method] = function(token) {
        var i, len = arguments.length;

        for (i = 0; i < len; i++) {
          token = arguments[i];
          original.call(this, token);
        }
      };
    };
    createMethod('add');
    createMethod('remove');
  }

  testElement.classList.toggle("c3", false);

  // Polyfill for IE 10 and Firefox <24, where classList.toggle does not
  // support the second argument.
  if (testElement.classList.contains("c3")) {
    var _toggle = DOMTokenList.prototype.toggle;

    DOMTokenList.prototype.toggle = function(token, force) {
      if (1 in arguments && !this.contains(token) === !force) {
        return force;
      } else {
        return _toggle.call(this, token);
      }
    };

  }

  testElement = null;
}());

}

}

/*! modernizr 3.3.1 (Custom Build) | MIT *
 * http://modernizr.com/download/?-cssanimations-setclasses !*/
!function(e,n,t){function r(e,n){return typeof e===n}function o(){var e,n,t,o,s,i,a;for(var l in C)if(C.hasOwnProperty(l)){if(e=[],n=C[l],n.name&&(e.push(n.name.toLowerCase()),n.options&&n.options.aliases&&n.options.aliases.length))for(t=0;t<n.options.aliases.length;t++)e.push(n.options.aliases[t].toLowerCase());for(o=r(n.fn,"function")?n.fn():n.fn,s=0;s<e.length;s++)i=e[s],a=i.split("."),1===a.length?Modernizr[a[0]]=o:(!Modernizr[a[0]]||Modernizr[a[0]]instanceof Boolean||(Modernizr[a[0]]=new Boolean(Modernizr[a[0]])),Modernizr[a[0]][a[1]]=o),g.push((o?"":"no-")+a.join("-"))}}function s(e){var n=_.className,t=Modernizr._config.classPrefix||"";if(S&&(n=n.baseVal),Modernizr._config.enableJSClass){var r=new RegExp("(^|\\s)"+t+"no-js(\\s|$)");n=n.replace(r,"$1"+t+"js$2")}Modernizr._config.enableClasses&&(n+=" "+t+e.join(" "+t),S?_.className.baseVal=n:_.className=n)}function i(e,n){return!!~(""+e).indexOf(n)}function a(){return"function"!=typeof n.createElement?n.createElement(arguments[0]):S?n.createElementNS.call(n,"http://www.w3.org/2000/svg",arguments[0]):n.createElement.apply(n,arguments)}function l(e){return e.replace(/([a-z])-([a-z])/g,function(e,n,t){return n+t.toUpperCase()}).replace(/^-/,"")}function f(e,n){return function(){return e.apply(n,arguments)}}function u(e,n,t){var o;for(var s in e)if(e[s]in n)return t===!1?e[s]:(o=n[e[s]],r(o,"function")?f(o,t||n):o);return!1}function d(e){return e.replace(/([A-Z])/g,function(e,n){return"-"+n.toLowerCase()}).replace(/^ms-/,"-ms-")}function c(){var e=n.body;return e||(e=a(S?"svg":"body"),e.fake=!0),e}function p(e,t,r,o){var s,i,l,f,u="modernizr",d=a("div"),p=c();if(parseInt(r,10))for(;r--;)l=a("div"),l.id=o?o[r]:u+(r+1),d.appendChild(l);return s=a("style"),s.type="text/css",s.id="s"+u,(p.fake?p:d).appendChild(s),p.appendChild(d),s.styleSheet?s.styleSheet.cssText=e:s.appendChild(n.createTextNode(e)),d.id=u,p.fake&&(p.style.background="",p.style.overflow="hidden",f=_.style.overflow,_.style.overflow="hidden",_.appendChild(p)),i=t(d,e),p.fake?(p.parentNode.removeChild(p),_.style.overflow=f,_.offsetHeight):d.parentNode.removeChild(d),!!i}function m(n,r){var o=n.length;if("CSS"in e&&"supports"in e.CSS){for(;o--;)if(e.CSS.supports(d(n[o]),r))return!0;return!1}if("CSSSupportsRule"in e){for(var s=[];o--;)s.push("("+d(n[o])+":"+r+")");return s=s.join(" or "),p("@supports ("+s+") { #modernizr { position: absolute; } }",function(e){return"absolute"==getComputedStyle(e,null).position})}return t}function h(e,n,o,s){function f(){d&&(delete P.style,delete P.modElem)}if(s=r(s,"undefined")?!1:s,!r(o,"undefined")){var u=m(e,o);if(!r(u,"undefined"))return u}for(var d,c,p,h,v,y=["modernizr","tspan"];!P.style;)d=!0,P.modElem=a(y.shift()),P.style=P.modElem.style;for(p=e.length,c=0;p>c;c++)if(h=e[c],v=P.style[h],i(h,"-")&&(h=l(h)),P.style[h]!==t){if(s||r(o,"undefined"))return f(),"pfx"==n?h:!0;try{P.style[h]=o}catch(g){}if(P.style[h]!=v)return f(),"pfx"==n?h:!0}return f(),!1}function v(e,n,t,o,s){var i=e.charAt(0).toUpperCase()+e.slice(1),a=(e+" "+b.join(i+" ")+i).split(" ");return r(n,"string")||r(n,"undefined")?h(a,n,o,s):(a=(e+" "+E.join(i+" ")+i).split(" "),u(a,n,t))}function y(e,n,r){return v(e,t,t,n,r)}var g=[],C=[],w={_version:"3.3.1",_config:{classPrefix:"",enableClasses:!0,enableJSClass:!0,usePrefixes:!0},_q:[],on:function(e,n){var t=this;setTimeout(function(){n(t[e])},0)},addTest:function(e,n,t){C.push({name:e,fn:n,options:t})},addAsyncTest:function(e){C.push({name:null,fn:e})}},Modernizr=function(){};Modernizr.prototype=w,Modernizr=new Modernizr;var _=n.documentElement,S="svg"===_.nodeName.toLowerCase(),x="Moz O ms Webkit",b=w._config.usePrefixes?x.split(" "):[];w._cssomPrefixes=b;var E=w._config.usePrefixes?x.toLowerCase().split(" "):[];w._domPrefixes=E;var N={elem:a("modernizr")};Modernizr._q.push(function(){delete N.elem});var P={style:N.elem.style};Modernizr._q.unshift(function(){delete P.style}),w.testAllProps=v,w.testAllProps=y,Modernizr.addTest("cssanimations",y("animationName","a",!0)),o(),s(g),delete w.addTest,delete w.addAsyncTest;for(var z=0;z<Modernizr._q.length;z++)Modernizr._q[z]();e.Modernizr=Modernizr}(window,document);
/*********************************************************************
*  #### Twitter Post Fetcher v15.0.1 ####
*  Coded by Jason Mayes 2015. A present to all the developers out there.
*  www.jasonmayes.com
*  Please keep this disclaimer with my code if you use it. Thanks. :-)
*  Got feedback or questions, ask here:
*  http://www.jasonmayes.com/projects/twitterApi/
*  Github: https://github.com/jasonmayes/Twitter-Post-Fetcher
*  Updates will be posted to this site.
*********************************************************************/
(function(C,p){"function"===typeof define&&define.amd?define([],p):"object"===typeof exports?module.exports=p():p()})(this,function(){function C(a){if(null===r){for(var g=a.length,c=0,k=document.getElementById(D),f="<ul>";c<g;)f+="<li>"+a[c]+"</li>",c++;k.innerHTML=f+"</ul>"}else r(a)}function p(a){return a.replace(/<b[^>]*>(.*?)<\/b>/gi,function(a,c){return c}).replace(/class="(?!(tco-hidden|tco-display|tco-ellipsis))+.*?"|data-query-source=".*?"|dir=".*?"|rel=".*?"/gi,"")}function E(a){a=a.getElementsByTagName("a");
for(var g=a.length-1;0<=g;g--)a[g].setAttribute("target","_blank")}function l(a,g){for(var c=[],k=new RegExp("(^| )"+g+"( |$)"),f=a.getElementsByTagName("*"),h=0,b=f.length;h<b;h++)k.test(f[h].className)&&c.push(f[h]);return c}function F(a){if(void 0!==a&&0<=a.innerHTML.indexOf("data-srcset"))return a=a.innerHTML.match(/data-srcset="([A-z0-9%_\.-]+)/i)[0],decodeURIComponent(a).split('"')[1]}var D="",g=20,G=!0,v=[],x=!1,y=!0,w=!0,z=null,A=!0,B=!0,r=null,H=!0,I=!1,t=!0,J=!0,K=!1,m=null,L={fetch:function(a){void 0===
a.maxTweets&&(a.maxTweets=20);void 0===a.enableLinks&&(a.enableLinks=!0);void 0===a.showUser&&(a.showUser=!0);void 0===a.showTime&&(a.showTime=!0);void 0===a.dateFunction&&(a.dateFunction="default");void 0===a.showRetweet&&(a.showRetweet=!0);void 0===a.customCallback&&(a.customCallback=null);void 0===a.showInteraction&&(a.showInteraction=!0);void 0===a.showImages&&(a.showImages=!1);void 0===a.linksInNewWindow&&(a.linksInNewWindow=!0);void 0===a.showPermalinks&&(a.showPermalinks=!0);void 0===a.dataOnly&&
(a.dataOnly=!1);if(x)v.push(a);else{x=!0;D=a.domId;g=a.maxTweets;G=a.enableLinks;w=a.showUser;y=a.showTime;B=a.showRetweet;z=a.dateFunction;r=a.customCallback;H=a.showInteraction;I=a.showImages;t=a.linksInNewWindow;J=a.showPermalinks;K=a.dataOnly;var l=document.getElementsByTagName("head")[0];null!==m&&l.removeChild(m);m=document.createElement("script");m.type="text/javascript";m.src="https://cdn.syndication.twimg.com/widgets/timelines/"+a.id+"?&lang="+(a.lang||"en")+"&callback=twitterFetcher.callback&suppress_response_codes=true&rnd="+
Math.random();l.appendChild(m)}},callback:function(a){function m(a){var b=a.getElementsByTagName("img")[0];b.src=b.getAttribute("data-src-2x");return a}var c=document.createElement("div");c.innerHTML=a.body;"undefined"===typeof c.getElementsByClassName&&(A=!1);a=[];var k=[],f=[],h=[],b=[],q=[],n=[],e=0;if(A)for(c=c.getElementsByClassName("timeline-Tweet");e<c.length;){0<c[e].getElementsByClassName("timeline-Tweet-retweetCredit").length?b.push(!0):b.push(!1);if(!b[e]||b[e]&&B)a.push(c[e].getElementsByClassName("timeline-Tweet-text")[0]),
q.push(c[e].getAttribute("data-tweet-id")),k.push(m(c[e].getElementsByClassName("timeline-Tweet-author")[0])),f.push(c[e].getElementsByClassName("dt-updated")[0]),n.push(c[e].getElementsByClassName("timeline-Tweet-timestamp")[0]),void 0!==c[e].getElementsByClassName("timeline-Tweet-media")[0]?h.push(c[e].getElementsByClassName("timeline-Tweet-media")[0]):h.push(void 0);e++}else for(c=l(c,"timeline-Tweet");e<c.length;){0<l(c[e],"timeline-Tweet-retweetCredit").length?b.push(!0):b.push(!1);if(!b[e]||
b[e]&&B)a.push(l(c[e],"timeline-Tweet-text")[0]),q.push(c[e].getAttribute("data-tweet-id")),k.push(m(l(c[e],"timeline-Tweet-author")[0])),f.push(l(c[e],"dt-updated")[0]),n.push(l(c[e],"timeline-Tweet-timestamp")[0]),void 0!==l(c[e],"timeline-Tweet-media")[0]?h.push(l(c[e],"timeline-Tweet-media")[0]):h.push(void 0);e++}a.length>g&&(a.splice(g,a.length-g),k.splice(g,k.length-g),f.splice(g,f.length-g),b.splice(g,b.length-g),h.splice(g,h.length-g),n.splice(g,n.length-g));var c=[],e=a.length,d=0;if(K)for(;d<
e;)c.push({tweet:a[d].innerHTML,author:k[d].innerHTML,time:f[d].textContent,image:F(h[d]),rt:b[d],tid:q[d],permalinkURL:void 0===n[d]?"":n[d].href}),d++;else for(;d<e;){if("string"!==typeof z){var b=f[d].getAttribute("datetime"),u=new Date(f[d].getAttribute("datetime").replace(/-/g,"/").replace("T"," ").split("+")[0]),b=z(u,b);f[d].setAttribute("aria-label",b);if(a[d].textContent)if(A)f[d].textContent=b;else{var u=document.createElement("p"),r=document.createTextNode(b);u.appendChild(r);u.setAttribute("aria-label",
b);f[d]=u}else f[d].textContent=b}b="";G?(t&&(E(a[d]),w&&E(k[d])),w&&(b+='<div class="user">'+p(k[d].innerHTML)+"</div>"),b+='<p class="tweet">'+p(a[d].innerHTML)+"</p>",y&&(b=J?b+('<p class="timePosted"><a href="'+n[d]+'">'+f[d].getAttribute("aria-label")+"</a></p>"):b+('<p class="timePosted">'+f[d].getAttribute("aria-label")+"</p>"))):(w&&(b+='<p class="user">'+k[d].textContent+"</p>"),b+='<p class="tweet">'+a[d].textContent+"</p>",y&&(b+='<p class="timePosted">'+f[d].textContent+"</p>"));H&&(b+=
'<p class="interact"><a href="https://twitter.com/intent/tweet?in_reply_to='+q[d]+'" class="twitter_reply_icon"'+(t?' target="_blank">':">")+'Reply</a><a href="https://twitter.com/intent/retweet?tweet_id='+q[d]+'" class="twitter_retweet_icon"'+(t?' target="_blank">':">")+'Retweet</a><a href="https://twitter.com/intent/favorite?tweet_id='+q[d]+'" class="twitter_fav_icon"'+(t?' target="_blank">':">")+"Favorite</a></p>");I&&void 0!==h[d]&&(b+='<div class="media"><img src="'+F(h[d])+'" alt="Image from tweet" /></div>');
c.push(b);d++}C(c);x=!1;0<v.length&&(L.fetch(v[0]),v.splice(0,1))}};return window.twitterFetcher=L});


// SILK Modules
function halfway(parameters) {

  var windowHeight = window.innerHeight;
  var elements = document.querySelectorAll(parameters.element);
  var elementHitBoxes = [];
  var scrollTimeout;

  if(document.body.contains(elements[0])) {

    document.addEventListener('scroll', calculateHalfway, false);

  }

  function calculateHalfway() {

    for(var i = 0; i < elements.length; i++) {

      elementHitBoxes[i] = elements[i].getBoundingClientRect();

      if(elementHitBoxes[i].top <= windowHeight / 2 && elementHitBoxes[i].bottom >= windowHeight / 2) {

        if(!(elements[i].classList.contains('element-halfway'))) {
          elements[i].classList.add('element-halfway');
          document.body.classList.add('halfway-lock');
          scrollTimeout = window.setTimeout(unlockScroll, 400);
        }

      }

    }

  }

  function unlockScroll() {

    document.body.classList.remove('halfway-lock');

  }

}

function harmonica(parameters) {

  var container = document.querySelector(parameters.container);
  var headings = document.querySelectorAll(parameters.container + ' ' + parameters.header);
  var currentNote;

  if(document.body.contains(container)) {

    for (var i = 0; i < headings.length; i++) {
      var openSymbolBottle = document.createElement('span');
      openSymbolBottle.classList.add('silk-harmonica__bottle');

      var openSymbolBubble = document.createElement('span');
      openSymbolBubble.classList.add('silk-harmonica__bubble');
      openSymbolBottle.appendChild(openSymbolBubble);

      var openSymbol = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      var openUseSymbol = document.createElementNS('http://www.w3.org/2000/svg', 'use');
      openUseSymbol.setAttributeNS('http://www.w3.org/1999/xlink','xlink:href','#caret-right');

      openSymbol.classList.add('silk-harmonica__symbol', 'symbol', 'symbol-caret-right');
      openSymbol.appendChild(openUseSymbol);
      openSymbolBubble.appendChild(openSymbol);
      headings[i].appendChild(openSymbolBottle);

      var closeSymbolBottle = document.createElement('span');
      closeSymbolBottle.classList.add('silk-harmonica__bottle');

      var closeSymbolBubble = document.createElement('span');
      closeSymbolBubble.classList.add('silk-harmonica__bubble');
      closeSymbolBottle.appendChild(closeSymbolBubble);

      var closeSymbol = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      var closeUseSymbol = document.createElementNS('http://www.w3.org/2000/svg', 'use');
      closeUseSymbol.setAttributeNS('http://www.w3.org/1999/xlink','xlink:href','#caret-down');

      closeSymbol.classList.add('silk-harmonica__symbol', 'symbol', 'symbol-caret-down');
      closeSymbol.appendChild(closeUseSymbol);
      closeSymbolBubble.appendChild(closeSymbol);
      headings[i].appendChild(closeSymbolBottle);

      headings[i].addEventListener('click', toggleNote, false);
    }

    headings[0].click();

  }

  function clearClasses() {

    for (var i = 0; i < headings.length; i++) {
      headings[i].classList.remove('active');
    }

  }

  function assignClasses(currentNote) {

    currentNote.classList.add('active');

  }

  function toggleNote(event) {

    currentNote = event.currentTarget;

    if(currentNote.parentNode.classList.contains('silk-harmonica--condensed')) {

      currentNote.classList.toggle('active');

    } else {

      clearClasses(currentNote);
      assignClasses(currentNote);

    }

  }

}

function hero() {

  var hero = document.querySelectorAll('.hero > img');

  if(document.body.contains(hero[0])) {

    for(var i = 0; i < hero.length; i++) {

      var image = hero[i].getAttribute('src');
      hero[i].parentNode.style.backgroundImage = 'url(' + image + ')';

    }

  }

}

function silkModal() {

  var modals = document.querySelectorAll('.silk-modal');
  var openTriggers = document.querySelectorAll('.silk-modal__trigger');
  var closeTriggers = document.querySelectorAll('.silk-modal__trigger--close');
  var videoBottles = document.querySelectorAll('.silk-modal__bottle');
  var videos = document.querySelectorAll('.silk-modal__bottle iframe');

  for(var i = 0; i < openTriggers.length; i++) {

    openTriggers[i].addEventListener('click', openModal, false);
    closeTriggers[i].addEventListener('click', closeModal, false);

  }

  function openModal() {

    document.body.classList.add('modal-triggered');
    event.currentTarget.parentNode.classList.add('event-triggered');

  }

  function closeModal() {

    document.body.classList.remove('modal-triggered');

    for (var i = 0; i < modals.length; i++) {
      modals[i].classList.remove('event-triggered');

      if(document.body.contains(videos[i])) {
        videoBottles[i].removeChild(videos[i]);
        videoBottles[i].appendChild(videos[i]);
      }

    }

  }

}

function silkNav() {

  var drawerTrigger = document.querySelector('.drawer__trigger');
  drawerTrigger.addEventListener('click', triggerDrawer, false);

  function triggerDrawer() {

    document.body.classList.toggle('visible-drawer');

  }

  var nav = document.querySelector('.silk-nav');
  var revertTrigger = document.querySelector('.silk-nav__trigger--revert');
  var reverseTrigger = document.querySelector('.silk-nav__trigger--reverse');
  var nestedNavs = document.querySelectorAll('.silk-nav li ul');
  var history = [];

  revertTrigger.addEventListener('click', startOver, false);
  reverseTrigger.addEventListener('click', goBack, false);

  for (var i = 0; i < nestedNavs.length; i++) {
    var tierTitle = nestedNavs[i].previousSibling.previousSibling;
    var tierTitleClone = document.createElement('a');
    tierTitleClone.setAttribute('href', tierTitle.getAttribute('href'));
    tierTitleClone.innerHTML = tierTitle.innerHTML;
    nestedNavs[i].insertBefore(tierTitleClone, nestedNavs[i].firstChild);

    var advanceTrigger = document.createElement('button');
    advanceTrigger.setAttribute('aria-hidden', 'true');
    advanceTrigger.classList.add('silk-nav__trigger', 'silk-nav__trigger--advance');
    advanceTrigger.innerHTML = '<svg class="symbol symbol-chevron-right"><use xlink:href="#chevron-right"></use></svg><span>View Child Pages</span>';
    advanceTrigger.addEventListener('click', goForward, false);

    nestedNavs[i].parentNode.insertBefore(advanceTrigger, nestedNavs[i]);
  }

  function startOver() {

    nav.classList.remove('silk-nav--active');

    for (var i = 0; i < nestedNavs.length; i++) {
      nestedNavs[i].classList.remove('silk-nav__nest--active')
    }

    history = [];

  }

  function goBack() {

    history[history.length - 1].nextSibling.classList.remove('silk-nav__nest--active');
    history.pop();

    if(history.length == 0) {
      startOver();
    }

  }

  function goForward(event) {

    if(!(nav.classList.contains('silk-nav--active'))) {
      nav.classList.add('silk-nav--active');
    }

    event.currentTarget.nextSibling.classList.add('silk-nav__nest--active');

    history.push(event.currentTarget);

  }

}

/**
 * SwiftSlider
 * v2.0.0
 */

'use strict';
var Swift = function (parameters) {
	this.container = document.querySelector(parameters.container);
	this.elements = document.querySelectorAll(parameters.container + ' ' + parameters.elements);
	this.elCount = this.elements.length;
	this.currentSlide = 0;
	this.cycle = parameters.cycle || false;
	this.isPaused = this.cycle ? false : true;
	this.interval = parameters.interval || 4000;
	this.pages = [];
	this.xDown = null;
	this.yDown = null;
	this.prevSymbol = parameters.prevSymbol;
	this.nextSymbol = parameters.nextSymbol;

	this.initialize.apply(this, parameters);
};

Swift.VERSION = '2.0.0';

Swift.prototype.initialize = function () {
	this.controls();
	this.pager();
	this.autoCycle();
	this.container.addEventListener('touchstart', this.touchStartHandler.bind(this), false);
	this.container.addEventListener('touchmove', this.touchMoveHandler.bind(this), false);
};

Swift.prototype.autoCycle = function () {
	var self = this;

	if (!self.cycle) {
		return;
	}
	setInterval(function () {
		if (self.isPaused) {
			return;
		}
		self.nextSlide(self.currentSlide);
	}, self.interval);

	this.pauseCycle();
};

Swift.prototype.pauseCycle = function (id) {
	var self = this;
	this.container.addEventListener('mouseover', function () {
		self.isPaused = true;
	});
	this.container.addEventListener('mouseout', function () {
		self.isPaused = false;
	});
};

Swift.prototype.touchStartHandler = function (event) {
	this.xDown = event.touches[0].clientX;
	this.yDown = event.touches[0].clientY;
};

Swift.prototype.touchMoveHandler = function (event) {

	if (!this.xDown || !this.yDown) {
		return;
	}

	var xUp = event.touches[0].clientX;
	var yUp = event.touches[0].clientY;

	var xDiff = this.xDown - xUp;
	var yDiff = this.yDown - yUp;

	if (Math.abs(xDiff) > Math.abs(yDiff)) {
		if (xDiff > 0) {
			this.nextSlide();
		} else {
			this.previousSlide();
		}
	}

	/* reset values */
	this.xDown = null;
	this.yDown = null;

};


Swift.prototype.clearClasses = function () {
	for (var i = 0; i < this.elements.length; i++) {
		this.pages[i].classList.remove('active');
		this.elements[i].classList.remove('active');
	}
};

Swift.prototype.assignClasses = function (index) {
	this.pages[index].classList.add('active');
	this.elements[index].classList.add('active');
};

Swift.prototype.pager = function () {

	var pager = document.createElement('div');
	pager.classList.add('swift-pager');

	this.container.appendChild(pager);

	for (var i = 0; i < this.elements.length; i++) {
		this.pages.push(document.createElement('span'));
		pager.appendChild(this.pages[i]);
		this.pages[i].addEventListener('click', this.slide.bind(this, i), false);
	}

	this.pages[this.currentSlide].click();
};

Swift.prototype.slide = function (index) {
	this.currentSlide = index;
	this.clearClasses();
	this.assignClasses(index);
};

Swift.prototype.nextSlide = function () {

	if (this.currentSlide == this.elements.length - 1) {
		this.currentSlide = -1;
	}

	this.currentSlide = this.currentSlide + 1;
	this.slide(this.currentSlide);
};

Swift.prototype.previousSlide = function () {
	if (this.currentSlide === 0) {
		this.currentSlide = this.elements.length;
	}

	this.currentSlide = this.currentSlide - 1;
	this.slide(this.currentSlide);
};

Swift.prototype.controls = function () {
	var controller = document.createElement('div');
	var prev = document.createElement('button');
	var next = document.createElement('button');
	// Controls Container
	controller.classList.add('swift-controls');
	this.container.appendChild(controller);
	// Prev
	prev.addEventListener('click', this.previousSlide.bind(this), false);
	prev.classList.add('swift-control', 'swift-prev');
	prev.innerHTML = '<svg class="symbol symbol-' + this.prevSymbol + '"><use xlink:href="#' + this.prevSymbol + '"></use></svg><span>Previous</span>';
	// Next
	next.addEventListener('click', this.nextSlide.bind(this), false);
	next.classList.add('swift-control', 'swift-next');
	next.innerHTML = '<svg class="symbol symbol-' + this.nextSymbol + '"><use xlink:href="#' + this.nextSymbol + '"></use></svg><span>Next</span>';

	controller.appendChild(prev);
	controller.appendChild(next);
};

function triggerParent(parameters) {

  var triggers = document.querySelectorAll(parameters.trigger);

  if(document.body.contains(triggers[0])) {

    for(var i = 0; i < triggers.length; i++) {
      triggers[i].addEventListener('click', toggleParentClass, false);
    }

    function toggleParentClass(event) {

      event.currentTarget.parentNode.classList.toggle('event-triggered');

    }

  }

}

