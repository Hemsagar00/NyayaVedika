# How it works

Deep mode: what the site's JavaScript is made of and what its start page did while we watched.

## Its JavaScript

Analysed 19 script(s) from https://supremetoday.ai/: 14 module(s), 34 endpoint(s), 0 route(s).

Evidence ev_5720d61d5a06a219d3c8c22a7f15a0d9a3f43d267ae71a6dc66db8e0a0363f3a.

```json
{
  "api_operations": [],
  "app_kind": "unknown",
  "bundlers": [],
  "edges": [
    {
      "from": "event:cdn.supremetoday.ai/static/js/bootstrap.bundle.min.js#document:DOMContentLoaded",
      "kind": "handled-by",
      "to": "fn:cdn.supremetoday.ai/static/js/bootstrap.bundle.min.js#document.addEventListener(DOMContentLoaded)@6"
    },
    {
      "from": "event:cdn.supremetoday.ai/static/js/bootstrap.bundle.min.js#e:transitionend",
      "kind": "handled-by",
      "to": "fn:cdn.supremetoday.ai/static/js/bootstrap.bundle.min.js#a@6"
    },
    {
      "from": "event:cdn.supremetoday.ai/static/js/footer-script.js#NewssearchBar:focus",
      "kind": "handled-by",
      "to": "fn:cdn.supremetoday.ai/static/js/footer-script.js#showNewsSuggestionList@1"
    },
    {
      "from": "event:cdn.supremetoday.ai/static/js/footer-script.js#NewssearchBar:keydown",
      "kind": "handled-by",
      "to": "fn:cdn.supremetoday.ai/static/js/footer-script.js#NewssearchBar.addEventListener(keydown)@1"
    },
    {
      "from": "event:cdn.supremetoday.ai/static/js/footer-script.js#closeBtn:click",
      "kind": "handled-by",
      "to": "fn:cdn.supremetoday.ai/static/js/footer-script.js#t@1"
    },
    {
      "from": "event:cdn.supremetoday.ai/static/js/footer-script.js#document:DOMContentLoaded",
      "kind": "handled-by",
      "to": "fn:cdn.supremetoday.ai/static/js/footer-script.js#document.addEventListener(DOMContentLoaded)@1"
    },
    {
      "from": "event:cdn.supremetoday.ai/static/js/footer-script.js#document:keydown",
      "kind": "handled-by",
      "to": "fn:cdn.supremetoday.ai/static/js/footer-script.js#document.addEventListener(keydown)@1"
    },
    {
      "from": "event:cdn.supremetoday.ai/static/js/footer-script.js#e:click",
      "kind": "handled-by",
      "to": "fn:cdn.supremetoday.ai/static/js/footer-script.js#e.addEventListener(click)@1"
    },
    {
      "from": "event:cdn.supremetoday.ai/static/js/footer-script.js#e:click",
      "kind": "handled-by",
      "to": "fn:cdn.supremetoday.ai/static/js/footer-script.js#startSpeech@1"
    },
    {
      "from": "event:cdn.supremetoday.ai/static/js/footer-script.js#e:end",
      "kind": "handled-by",
      "to": "fn:cdn.supremetoday.ai/static/js/footer-script.js#e.onend@1"
    },
    {
      "from": "event:cdn.supremetoday.ai/static/js/footer-script.js#e:error",
      "kind": "handled-by",
      "to": "fn:cdn.supremetoday.ai/static/js/footer-script.js#e.onerror@1"
    },
    {
      "from": "event:cdn.supremetoday.ai/static/js/footer-script.js#e:keydown",
      "kind": "handled-by",
      "to": "fn:cdn.supremetoday.ai/static/js/footer-script.js#e.addEventListener(keydown)@1"
    },
    {
      "from": "event:cdn.supremetoday.ai/static/js/footer-script.js#modal:click",
      "kind": "handled-by",
      "to": "fn:cdn.supremetoday.ai/static/js/footer-script.js#modal.addEventListener(click)@1"
    },
    {
      "from": "event:cdn.supremetoday.ai/static/js/footer-script.js#n:click",
      "kind": "handled-by",
      "to": "fn:cdn.supremetoday.ai/static/js/footer-script.js#n.addEventListener(click)@1"
    },
    {
      "from": "event:cdn.supremetoday.ai/static/js/footer-script.js#o:readystatechange",
      "kind": "handled-by",
      "to": "fn:cdn.supremetoday.ai/static/js/footer-script.js#o.onreadystatechange@1"
    },
    {
      "from": "event:cdn.supremetoday.ai/static/js/footer-script.js#speechSynthesis:voiceschanged",
      "kind": "handled-by",
      "to": "fn:cdn.supremetoday.ai/static/js/footer-script.js#loadVoices@1"
    },
    {
      "from": "event:cdn.supremetoday.ai/static/js/footer-script.js#t:click",
      "kind": "handled-by",
      "to": "fn:cdn.supremetoday.ai/static/js/footer-script.js#stopSpeech@1"
    },
    {
      "from": "event:cdn.supremetoday.ai/static/js/footer-script.js#t:click",
      "kind": "handled-by",
      "to": "fn:cdn.supremetoday.ai/static/js/footer-script.js#t.addEventListener(click)@1"
    },
    {
      "from": "event:cdn.supremetoday.ai/static/js/footer-script.js#t:keydown",
      "kind": "handled-by",
      "to": "fn:cdn.supremetoday.ai/static/js/footer-script.js#t.addEventListener(keydown)@1"
    },
    {
      "from": "event:cdn.supremetoday.ai/static/js/footer-script.js#t:readystatechange",
      "kind": "handled-by",
      "to": "fn:cdn.supremetoday.ai/static/js/footer-script.js#t.onreadystatechange@1"
    },
    {
      "from": "event:cdn.supremetoday.ai/static/js/footer-script.js#window:scroll",
      "kind": "handled-by",
      "to": "fn:cdn.supremetoday.ai/static/js/footer-script.js#window.addEventListener(scroll)@1"
    },
    {
      "from": "event:cdn.supremetoday.ai/static/js/home_slider_functions.js#e:beforeChange",
      "kind": "handled-by",
      "to": "fn:cdn.supremetoday.ai/static/js/home_slider_functions.js#e.on(beforeChange)@1"
    },
    {
      "from": "event:cdn.supremetoday.ai/static/js/home_slider_functions.js#e:init",
      "kind": "handled-by",
      "to": "fn:cdn.supremetoday.ai/static/js/home_slider_functions.js#e.on(init)@1"
    },
    {
      "from": "event:cdn.supremetoday.ai/static/js/jquery.min.js#e:load",
      "kind": "handled-by",
      "to": "fn:cdn.supremetoday.ai/static/js/jquery.min.js#Q@2"
    },
    {
      "from": "event:cdn.supremetoday.ai/static/js/jquery.min.js#s:abort",
      "kind": "handled-by",
      "to": "fn:cdn.supremetoday.ai/static/js/jquery.min.js#r@2"
    },
    {
      "from": "event:cdn.supremetoday.ai/static/js/jquery.min.js#s:readystatechange",
      "kind": "handled-by",
      "to": "fn:cdn.supremetoday.ai/static/js/jquery.min.js#s.onreadystatechange@2"
    },
    {
      "from": "event:cdn.supremetoday.ai/static/js/jquery.min.js#t:unload",
      "kind": "handled-by",
      "to": "fn:cdn.supremetoday.ai/static/js/jquery.min.js#J@2"
    },
    {
      "from": "event:cdn.supremetoday.ai/static/js/jquery.min.js#v:DOMContentLoaded",
      "kind": "handled-by",
      "to": "fn:cdn.supremetoday.ai/static/js/jquery.min.js#Q@2"
    },
    {
      "from": "event:cdn.supremetoday.ai/static/js/slick.min.js#r:error",
      "kind": "handled-by",
      "to": "fn:cdn.supremetoday.ai/static/js/slick.min.js#r.onerror@1"
    },
    {
      "from": "event:cdn.supremetoday.ai/static/js/slick.min.js#r:load",
      "kind": "handled-by",
      "to": "fn:cdn.supremetoday.ai/static/js/slick.min.js#r.onload@1"
    },
    {
      "from": "event:scripts.clarity.ms/0.8.77/clarity.js#i:message",
      "kind": "handled-by",
      "to": "fn:scripts.clarity.ms/0.8.77/clarity.js#i.onmessage@2"
    },
    {
      "from": "event:scripts.clarity.ms/0.8.77/clarity.js#n:error",
      "kind": "handled-by",
      "to": "fn:scripts.clarity.ms/0.8.77/clarity.js#n.onerror@2"
    },
    {
      "from": "event:scripts.clarity.ms/0.8.77/clarity.js#n:load",
      "kind": "handled-by",
      "to": "fn:scripts.clarity.ms/0.8.77/clarity.js#n.onload@2"
    },
    {
      "from": "event:scripts.clarity.ms/0.8.77/clarity.js#o:readystatechange",
      "kind": "handled-by",
      "to": "fn:scripts.clarity.ms/0.8.77/clarity.js#o.onreadystatechange@2"
    },
    {
      "from": "event:scripts.clarity.ms/0.8.77/clarity.js#o:timeout",
      "kind": "handled-by",
      "to": "fn:scripts.clarity.ms/0.8.77/clarity.js#o.ontimeout@2"
    },
    {
      "from": "event:supremetoday.ai/static/js/mobile_app_prompt.js#document:DOMContentLoaded",
      "kind": "handled-by",
      "to": "fn:supremetoday.ai/static/js/mobile_app_prompt.js#initMobileAppPrompt@23"
    },
    {
      "from": "event:supremetoday.ai/static/js/mobile_app_prompt.js#toggle:click",
      "kind": "handled-by",
      "to": "fn:supremetoday.ai/static/js/mobile_app_prompt.js#toggle.addEventListener(click)@53"
    },
    {
      "from": "event:supremetoday.ai/static/js/mobile_app_prompt.js#window:scroll",
      "kind": "handled-by",
      "to": "fn:supremetoday.ai/static/js/mobile_app_prompt.js#updatePromptVisibility@47"
    },
    {
      "from": "event:supremetoday.ai/static/js/search-suggestion-dismiss.js#document:click",
      "kind": "handled-by",
      "to": "fn:supremetoday.ai/static/js/search-suggestion-dismiss.js#document.addEventListener(click)@25"
    },
    {
      "from": "event:supremetoday.ai/static/js/search-suggestion-dismiss.js#document:input",
      "kind": "handled-by",
      "to": "fn:supremetoday.ai/static/js/search-suggestion-dismiss.js#document.addEventListener(input)@32"
    },
    {
      "from": "event:supremetoday.ai/static/js/search-suggestion-dismiss.js#document:keydown",
      "kind": "handled-by",
      "to": "fn:supremetoday.ai/static/js/search-suggestion-dismiss.js#document.addEventListener(keydown)@21"
    },
    {
      "from": "event:supremetoday.ai/static/js/search-suggestion-dismiss.js#document:pointerdown",
      "kind": "handled-by",
      "to": "fn:supremetoday.ai/static/js/search-suggestion-dismiss.js#document.addEventListener(pointerdown)@12"
    },
    {
      "from": "event:www.google-analytics.com/analytics.js#E:keyup",
      "kind": "handled-by",
      "to": "fn:www.google-analytics.com/analytics.js#a@16"
    },
    {
      "from": "event:www.google-analytics.com/analytics.js#E:mousedown",
      "kind": "handled-by",
      "to": "fn:www.google-analytics.com/analytics.js#a@16"
    },
    {
      "from": "event:www.google-analytics.com/analytics.js#E:submit",
      "kind": "handled-by",
      "to": "fn:www.google-analytics.com/analytics.js#b@7"
    },
    {
      "from": "event:www.google-analytics.com/analytics.js#c:load",
      "kind": "handled-by",
      "to": "fn:www.google-analytics.com/analytics.js#d@22"
    },
    {
      "from": "event:www.google-analytics.com/analytics.js#d:error",
      "kind": "handled-by",
      "to": "fn:www.google-analytics.com/analytics.js#d.onerror@45"
    },
    {
      "from": "event:www.google-analytics.com/analytics.js#e:load",
      "kind": "handled-by",
      "to": "fn:www.google-analytics.com/analytics.js#e.onload@41"
    },
    {
      "from": "event:www.google-analytics.com/analytics.js#g:readystatechange",
      "kind": "handled-by",
      "to": "fn:www.google-analytics.com/analytics.js#g.onreadystatechange@45"
    },
    {
      "from": "event:www.gstatic.com/firebasejs/8.6.1/firebase-analytics.js#i:error",
      "kind": "handled-by",
      "to": "fn:www.gstatic.com/firebasejs/8.6.1/firebase-analytics.js#i.onerror@1"
    },
    {
      "from": "event:www.gstatic.com/firebasejs/8.6.1/firebase-analytics.js#i:success",
      "kind": "handled-by",
      "to": "fn:www.gstatic.com/firebasejs/8.6.1/firebase-analytics.js#i.onsuccess@1"
    },
    {
      "from": "event:www.gstatic.com/firebasejs/8.6.1/firebase-analytics.js#i:upgradeneeded",
      "kind": "handled-by",
      "to": "fn:www.gstatic.com/firebasejs/8.6.1/firebase-analytics.js#i.onupgradeneeded@1"
    },
    {
      "from": "event:www.gstatic.com/firebasejs/8.6.1/firebase-analytics.js#n:abort",
      "kind": "handled-by",
      "to": "fn:www.gstatic.com/firebasejs/8.6.1/firebase-analytics.js#n.onabort@1"
    },
    {
      "from": "event:www.gstatic.com/firebasejs/8.6.1/firebase-analytics.js#n:complete",
      "kind": "handled-by",
      "to": "fn:www.gstatic.com/firebasejs/8.6.1/firebase-analytics.js#n.oncomplete@1"
    },
    {
      "from": "event:www.gstatic.com/firebasejs/8.6.1/firebase-analytics.js#n:error",
      "kind": "handled-by",
      "to": "fn:www.gstatic.com/firebasejs/8.6.1/firebase-analytics.js#n.onerror@1"
    },
    {
      "from": "event:www.gstatic.com/firebasejs/8.6.1/firebase-analytics.js#n:success",
      "kind": "handled-by",
      "to": "fn:www.gstatic.com/firebasejs/8.6.1/firebase-analytics.js#n.onsuccess@1"
    },
    {
      "from": "event:www.gstatic.com/firebasejs/8.6.1/firebase-analytics.js#n:upgradeneeded",
      "kind": "handled-by",
      "to": "fn:www.gstatic.com/firebasejs/8.6.1/firebase-analytics.js#n.onupgradeneeded@1"
    },
    {
      "from": "event:www.gstatic.com/firebasejs/8.6.1/firebase-analytics.js#r:success",
      "kind": "handled-by",
      "to": "fn:www.gstatic.com/firebasejs/8.6.1/firebase-analytics.js#r.onsuccess@1"
    },
    {
      "from": "fn:cdn.supremetoday.ai/static/js/bootstrap.bundle.min.js#$@6",
      "kind": "calls",
      "to": "fn:cdn.supremetoday.ai/static/js/bootstrap.bundle.min.js#D@6"
    },
    {
      "from": "fn:cdn.supremetoday.ai/static/js/bootstrap.bundle.min.js#Ae@6",
      "kind": "calls",
      "to": "fn:cdn.supremetoday.ai/static/js/bootstrap.bundle.min.js#we@6"
    },
    {
      "from": "fn:cdn.supremetoday.ai/static/js/bootstrap.bundle.min.js#An._addEventListeners@6",
      "kind": "calls",
      "to": "fn:cdn.supremetoday.ai/static/js/bootstrap.bundle.min.js#N.on@6"
    },
    {
      "from": "fn:cdn.supremetoday.ai/static/js/bootstrap.bundle.min.js#An._adjustDialog@6",
      "kind": "calls",
      "to": "fn:cdn.supremetoday.ai/static/js/bootstrap.bundle.min.js#p@6"
    },
    {
      "from": "fn:cdn.supremetoday.ai/static/js/bootstrap.bundle.min.js#An._showElement@6",
      "kind": "calls",
      "to": "fn:cdn.supremetoday.ai/static/js/bootstrap.bundle.min.js#d@6"
    },
    {
      "from": "fn:cdn.supremetoday.ai/static/js/bootstrap.bundle.min.js#An._showElement@6",
      "kind": "calls",
      "to": "fn:cdn.supremetoday.ai/static/js/bootstrap.bundle.min.js#z.findOne@6"
    },
    {
      "from": "fn:cdn.supremetoday.ai/static/js/bootstrap.bundle.min.js#An._triggerBackdropTransition@6",
      "kind": "calls",
      "to": "fn:cdn.supremetoday.ai/static/js/bootstrap.bundle.min.js#N.trigger@6"
    },
    {
      "from": "fn:cdn.supremetoday.ai/static/js/bootstrap.bundle.min.js#An.constructor@6",
      "kind": "calls",
      "to": "fn:cdn.supremetoday.ai/static/js/bootstrap.bundle.min.js#z.findOne@6"
    },
    {
      "from": "fn:cdn.supremetoday.ai/static/js/bootstrap.bundle.min.js#An.dispose@6",
      "kind": "calls",
      "to": "fn:cdn.supremetoday.ai/static/js/bootstrap.bundle.min.js#N.off@6"
    },
    {
      "from": "fn:cdn.supremetoday.ai/static/js/bootstrap.bundle.min.js#An.hide@6",
      "kind": "calls",
      "to": "fn:cdn.supremetoday.ai/static/js/bootstrap.bundle.min.js#N.trigger@6"
    },
    {
      "from": "fn:cdn.supremetoday.ai/static/js/bootstrap.bundle.min.js#An.show@6",
      "kind": "calls",
      "to": "fn:cdn.supremetoday.ai/static/js/bootstrap.bundle.min.js#N.trigger@6"
    },
    {
      "from": "fn:cdn.supremetoday.ai/static/js/bootstrap.bundle.min.js#Ce@6",
      "kind": "calls",
      "to": "fn:cdn.supremetoday.ai/static/js/bootstrap.bundle.min.js#ce@6"
    },
    {
      "from": "fn:cdn.supremetoday.ai/static/js/bootstrap.bundle.min.js#D@6",
      "kind": "calls",
      "to": "fn:cdn.supremetoday.ai/static/js/bootstrap.bundle.min.js#k@6"
    },
    {
      "from": "fn:cdn.supremetoday.ai/static/js/bootstrap.bundle.min.js#Ee@6",
      "kind": "calls",
      "to": "fn:cdn.supremetoday.ai/static/js/bootstrap.bundle.min.js#fe@6"
    },
    {
      "from": "fn:cdn.supremetoday.ai/static/js/bootstrap.bundle.min.js#F.getDataAttribute@6",
      "kind": "calls",
      "to": "fn:cdn.supremetoday.ai/static/js/bootstrap.bundle.min.js#M@6"
    },
    {
      "from": "fn:cdn.supremetoday.ai/static/js/bootstrap.bundle.min.js#F.getDataAttribute@6",
      "kind": "calls",
      "to": "fn:cdn.supremetoday.ai/static/js/bootstrap.bundle.min.js#j@6"
    },
    {
      "from": "fn:cdn.supremetoday.ai/static/js/bootstrap.bundle.min.js#F.getDataAttributes@6",
      "kind": "calls",
      "to": "fn:cdn.supremetoday.ai/static/js/bootstrap.bundle.min.js#j@6"
    },
    {
      "from": "fn:cdn.supremetoday.ai/static/js/bootstrap.bundle.min.js#F.removeDataAttribute@6",
      "kind": "calls",
      "to": "fn:cdn.supremetoday.ai/static/js/bootstrap.bundle.min.js#M@6"
    },
    {
      "from": "fn:cdn.supremetoday.ai/static/js/bootstrap.bundle.min.js#F.setDataAttribute@6",
      "kind": "calls",
      "to": "fn:cdn.supremetoday.ai/static/js/bootstrap.bundle.min.js#M@6"
    },
    {
      "from": "fn:cdn.supremetoday.ai/static/js/bootstrap.bundle.min.js#Fe.fn@6",
      "kind": "calls",
      "to": "fn:cdn.supremetoday.ai/static/js/bootstrap.bundle.min.js#Me@6"
    },
    {
      "from": "fn:cdn.supremetoday.ai/static/js/bootstrap.bundle.min.js#Fe.fn@6",
      "kind": "calls",
      "to": "fn:cdn.supremetoday.ai/static/js/bootstrap.bundle.min.js#Pe@6"
    },
    {
      "from": "fn:cdn.supremetoday.ai/static/js/bootstrap.bundle.min.js#Fe.fn@6",
      "kind": "calls",
      "to": "fn:cdn.supremetoday.ai/static/js/bootstrap.bundle.min.js#me@6"
    },
    {
      "from": "fn:cdn.supremetoday.ai/static/js/bootstrap.bundle.min.js#Ft._configAfterMerge@6",
      "kind": "calls",
      "to": "fn:cdn.supremetoday.ai/static/js/bootstrap.bundle.min.js#r@6"
    },
    {
      "from": "fn:cdn.supremetoday.ai/static/js/bootstrap.bundle.min.js#Ft._getFirstLevelChildren@6",
      "kind": "calls",
      "to": "fn:cdn.supremetoday.ai/static/js/bootstrap.bundle.min.js#z.find@6"
    },
    {
      "from": "fn:cdn.supremetoday.ai/static/js/bootstrap.bundle.min.js#Ft._initializeChildren@6",
      "kind": "calls",
      "to": "fn:cdn.supremetoday.ai/static/js/bootstrap.bundle.min.js#z.getElementFromSelector@6"
    },
    {
      "from": "fn:cdn.supremetoday.ai/static/js/bootstrap.bundle.min.js#Ft.constructor@6",
      "kind": "calls",
      "to": "fn:cdn.supremetoday.ai/static/js/bootstrap.bundle.min.js#z.find@6"
    },
    {
      "from": "fn:cdn.supremetoday.ai/static/js/bootstrap.bundle.min.js#Ft.constructor@6",
      "kind": "calls",
      "to": "fn:cdn.supremetoday.ai/static/js/bootstrap.bundle.min.js#z.getSelectorFromElement@6"
    },
    {
      "from": "fn:cdn.supremetoday.ai/static/js/bootstrap.bundle.min.js#Ft.hide@6",
      "kind": "calls",
      "to": "fn:cdn.supremetoday.ai/static/js/bootstrap.bundle.min.js#N.trigger@6"
    },
    {
      "from": "fn:cdn.supremetoday.ai/static/js/bootstrap.bundle.min.js#Ft.hide@6",
      "kind": "calls",
      "to": "fn:cdn.supremetoday.ai/static/js/bootstrap.bundle.min.js#d@6"
    },
    {
      "from": "fn:cdn.supremetoday.ai/static/js/bootstrap.bundle.min.js#Ft.hide@6",
      "kind": "calls",
      "to": "fn:cdn.supremetoday.ai/static/js/bootstrap.bundle.min.js#z.getElementFromSelector@6"
    },
    {
      "from": "fn:cdn.supremetoday.ai/static/js/bootstrap.bundle.min.js#Ft.show@6",
      "kind": "calls",
      "to": "fn:cdn.supremetoday.ai/static/js/bootstrap.bundle.min.js#N.trigger@6"
    },
    {
      "from": "fn:cdn.supremetoday.ai/static/js/bootstrap.bundle.min.js#Ge@6",
      "kind": "calls",
      "to": "fn:cdn.supremetoday.ai/static/js/bootstrap.bundle.min.js#Oe@6"
    },
    {
      "from": "fn:cdn.supremetoday.ai/static/js/bootstrap.bundle.min.js#Ge@6",
      "kind": "calls",
      "to": "fn:cdn.supremetoday.ai/static/js/bootstrap.bundle.min.js#Ue@6"
    },
    {
      "from": "fn:cdn.supremetoday.ai/static/js/bootstrap.bundle.min.js#Ge@6",
      "kind": "calls",
      "to": "fn:cdn.supremetoday.ai/static/js/bootstrap.bundle.min.js#de@6"
    },
    {
      "from": "fn:cdn.supremetoday.ai/static/js/bootstrap.bundle.min.js#H._mergeConfigObj@6",
      "kind": "calls",
      "to": "fn:cdn.supremetoday.ai/static/js/bootstrap.bundle.min.js#F.getDataAttribute@6"
    },
    {
      "from": "fn:cdn.supremetoday.ai/static/js/bootstrap.bundle.min.js#H._mergeConfigObj@6",
      "kind": "calls",
      "to": "fn:cdn.supremetoday.ai/static/js/bootstrap.bundle.min.js#F.getDataAttributes@6"
    },
    {
      "from": "fn:cdn.supremetoday.ai/static/js/bootstrap.bundle.min.js#H._mergeConfigObj@6",
      "kind": "calls",
      "to": "fn:cdn.supremetoday.ai/static/js/bootstrap.bundle.min.js#o@6"
    },
    {
      "from": "fn:cdn.supremetoday.ai/static/js/bootstrap.bundle.min.js#H._typeCheckConfig@6",
      "kind": "calls",
      "to": "fn:cdn.supremetoday.ai/static/js/bootstrap.bundle.min.js#o@6"
    },
    {
      "from": "fn:cdn.supremetoday.ai/static/js/bootstrap.bundle.min.js#Je@6",
      "kind": "calls",
      
```

## Ten seconds of it

Watched https://supremetoday.ai/ for 10000ms: 4 request outline(s), 5 console entr(y/ies).

Evidence ev_1b63b43566a8b95ed99e02dd71e1d71ccf7ebaf1ee46782876f69d37cbb7878f.

```json
{
  "accessibility": null,
  "console": {
    "count": 5,
    "entries": [
      {
        "level": "error",
        "source": "javascript"
      },
      {
        "level": "error",
        "source": "network"
      },
      {
        "level": "warning",
        "source": "javascript"
      },
      {
        "level": "warning",
        "source": "javascript"
      },
      {
        "level": "warning",
        "source": "javascript"
      }
    ],
    "has_text": false
  },
  "dom": {
    "attribute_names": [
      "action",
      "alt",
      "aria-controls",
      "aria-current",
      "aria-describedby",
      "aria-expanded",
      "aria-haspopup",
      "aria-hidden",
      "aria-label",
      "aria-labelledby",
      "aria-live",
      "aria-modal",
      "aria-pressed",
      "as",
      "async",
      "autocomplete",
      "charset",
      "class",
      "content",
      "cx",
      "cy",
      "d",
      "data-bs-dismiss",
      "data-bs-target",
      "data-bs-toggle",
      "data-coverage-key",
      "data-coverage-theme",
      "data-flag-code",
      "data-floating-menu-ready",
      "data-id",
      "data-original-label",
      "data-platform",
      "data-st-portrait-close",
      "data-tooltip",
      "decoding",
      "defer",
      "dir",
      "fetchpriority",
      "fill",
      "focusable",
      "frameborder",
      "height",
      "hidden",
      "href",
      "hreflang",
      "http-equiv",
      "id",
      "lang",
      "loading",
      "method",
      "name",
      "onchange",
      "onclick",
      "onerror",
      "onkeyup",
      "onload",
      "open",
      "placeholder",
      "property",
      "r",
      "rel",
      "role",
      "rx",
      "selected",
      "sizes",
      "src",
      "stroke",
      "stroke-linecap",
      "stroke-linejoin",
      "stroke-width",
      "style",
      "tabindex",
      "target",
      "title",
      "type",
      "value",
      "viewbox",
      "width",
      "x",
      "xmlns",
      "y"
    ],
    "elements_by_name": {
      "a": 255,
      "aside": 1,
      "body": 2,
      "br": 1,
      "button": 54,
      "circle": 2,
      "details": 5,
      "div": 517,
      "footer": 1,
      "form": 1,
      "h2": 13,
      "h5": 2,
      "head": 2,
      "html": 2,
      "i": 50,
      "iframe": 1,
      "img": 196,
      "input": 11,
      "li": 52,
      "link": 11,
      "meta": 30,
      "nav": 6,
      "noscript": 2,
      "option": 18,
      "p": 105,
      "path": 63,
      "rect": 1,
      "script": 35,
      "section": 33,
      "select": 4,
      "span": 289,
      "strong": 5,
      "style": 9,
      "summary": 5,
      "svg": 55,
      "title": 1,
      "ul": 10
    },
    "text_nodes": 483,
    "total_nodes": 2354,
    "truncated": false
  },
  "dropped_events": 0,
  "frame_origins": [
    "about:blank",
    "https://supremetoday.ai"
  ],
  "network": {
    "request_count": 4,
    "requests": [
      {
        "initiator": "script",
        "method": "POST",
        "mime_type": "text/plain",
        "response_headers": {
          "credentials_present": [],
          "kept": {
            "access-control-allow-credentials": {
              "value_length": 4
            },
            "access-control-allow-origin": {
              "value_length": 23
            },
            "connection": {
              "value_length": 10
            },
            "date": {
              "value_length": 29
            },
            "request-context": {
              "value_length": 49
            },
            "server": {
              "value_length": 5
            },
            "vary": {
              "value_length": 6
            }
          }
        },
        "status": 204,
        "type": "XHR",
        "url": "https://l.clarity.ms/collect"
      },
      {
        "initiator": "script",
        "method": "POST",
        "mime_type": "text/plain",
        "response_headers": {
          "credentials_present": [],
          "kept": {
            "access-control-allow-credentials": {
              "value_length": 4
            },
            "access-control-allow-origin": {
              "value_length": 23
            },
            "alt-svc": {
              "value_length": 46
            },
            "cache-control": "no-cache, no-store, must-revalidate",
            "content-length": "0",
            "content-security-policy-report-only": "script-src 'none'; form-action 'none'; frame-src 'none'; report-uri https://csp.withgoogle.com/csp/scaffolding/ascnsrsggc:201:0",
            "content-type": "text/plain",
            "cross-origin-opener-policy-report-only": {
              "value_length": 39
            },
            "cross-origin-resource-policy": "cross-origin",
            "date": {
              "value_length": 29
            },
            "expires": {
              "value_length": 29
            },
            "pragma": {
              "value_length": 8
            },
            "report-to": {
              "value_length": 141
            },
            "server": {
              "value_length": 6
            }
          }
        },
        "status": 204,
        "type": "Fetch",
        "url": "https://analytics.google.com/g/collect?v=2&tid=G-T2JK4ZSXLT&gtm=45je6bh1v884886209za208xf1&_p=1795173538796&gcd=13l3l3l3l1l1&npa=0&dma=0&_eu=AAAAACQC&_fid=dHRUkImosMDI8euWbsjuz9&cid=268540421.1795172747&frm=0&ibt=1&ngs=1&pscdl=noapi&rcb=0&sr=800x600&uaa=x86&uab=64&uafvl=Not-A.Brand%3B99.0.0.0%7CGoogle%2520Chrome%3B157.0.8103.79%7CChromium%3B157.0.8103.79&uam=&uamb=0&uap=Windows&uapv=19.0.0&uaw=0&ul=en-gb&_s=1&tag_exp=115616985~115938465~115938469~120213116~120385422~120469145~120469153~121246026~121246034~123785234&sid=1795172747&sct=1&seg=1&dl=https%3A%2F%2Fsupremetoday.ai%2F&dt=Indian%20Legal%20News%20%26%20Court%20Updates%20%7C%20Supreme%20Today%20AI&en=page_view&_ee=1&ep.origin=firebase&tfd=5918"
      },
      {
        "initiator": "script",
        "method": "POST",
        "mime_type": "text/plain",
        "response_headers": {
          "credentials_present": [],
          "kept": {
            "access-control-allow-credentials": {
              "value_length": 4
            },
            "access-control-allow-origin": {
              "value_length": 23
            },
            "connection": {
              "value_length": 10
            },
            "date": {
              "value_length": 29
            },
            "request-context": {
              "value_length": 49
            },
            "server": {
              "value_length": 5
            },
            "vary": {
              "value_length": 6
            }
          }
        },
        "status": 204,
        "type": "XHR",
        "url": "https://l.clarity.ms/collect"
      },
      {
        "initiator": "script",
        "method": "POST",
        "mime_type": "text/plain",
        "response_headers": {
          "credentials_present": [],
          "kept": {
            "access-control-allow-credentials": {
              "value_length": 4
            },
            "access-control-allow-headers": {
              "value_length": 13
            },
            "access-control-allow-origin": {
              "value_length": 23
            },
            "alt-svc": {
              "value_length": 46
            },
            "content-encoding": "gzip",
            "content-length": "131",
            "content-type": "text/plain; charset=UTF-8",
            "cross-origin-resource-policy": "cross-origin",
            "date": {
              "value_length": 29
            },
            "server": {
              "value_length": 7
            },
            "x-frame-options": {
              "value_length": 10
            },
            "x-xss-protection": {
              "value_length": 1
            }
          }
        },
        "status": 200,
        "type": "Fetch",
        "url": "https://translate.googleapis.com/element/log?format=json&hasfast=true&authuser=0"
      }
    ]
  },
  "origin": "https://supremetoday.ai/",
  "resources": [
    {
      "mime_type": "",
      "type": "Image",
      "url": "https://supremetoday-s3.b-cdn.net/supreme-today-landscape-ad/home-landscape-ad.gif"
    },
    {
      "mime_type": "image/png",
      "type": "Image",
      "url": "https://cdn.supremetoday.ai/static/img/presentation-overview-black.png"
    },
    {
      "mime_type": "image/svg+xml",
      "type": "Image",
      "url": "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%23454545' stroke-width='1.8'%3E%3Ccircle cx='12' cy='12' r='9'/%3E%3Cpath d='M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18'/%3E%3C/svg%3E"
    },
    {
      "mime_type": "image/png",
      "type": "Image",
      "url": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAUCAMAAADImI+JAAAANlBMVEX////w8vfyxcx8jbJCWpAOLHFVa5sBIWnIEC7WTGLnv8qAkLTheYpecqHx0digrMfz3+T21dqBS5WQAAAApUlEQVQoz8WTyxpFMAyEpyqOuhTv/7IntImmurAzC59kfsIIhA5wnn6iASMLgzbIT2Fk6joUaAUKBsiJm+kJ0iyuR1mQBam8Cex1dINkZ6EesSZwrR8JfdYWl7AcbCRw5ypytYmPpy6w3X6jL8HXL6PxOODgTPYEcnXmFe94cuBsdJzwpIFrRwK3WPkJLQqL2aUoUVisXjOvLizWWNyMVljrV0gz/wdhEi0lRIbcAAAAAElFTkSuQmCC"
    },
    {
      "mime_type": "text/javascript",
      "type": "Script",
      "url": "https://supremetoday.ai/static/js/search-suggestion-dismiss.js?v=1"
    },
    {
      "mime_type": "image/png",
      "type": "Image",
      "url": "https://cdn.supremetoday.ai/static/img/user-manual-white.png"
    },
    {
      "mime_type": "image/png",
      "type": "Image",
      "url": "https://www.gstatic.com/images/branding/product/2x/translate_24dp.png"
    },
    {
      "mime_type": "text/javascript",
      "type": "Script",
      "url": "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
    },
    {
      "mime_type": "image/png",
      "type": "Image",
      "url": "https://cdn.supremetoday.ai/static/img/Icon-512.png"
    },
    {
      "mime_type": "image/svg+xml",
      "type": "Image",
      "url": "https://cdn.supremetoday.ai/static/img/icon-youtube-light.svg"
    },
    {
      "mime_type": "image/webp",
      "type": "Image",
      "url": "https://supremetoday-s3.b-cdn.net/sc-quashes-fir-against-lt-earc.webp"
    },
    {
      "mime_type": "image/png",
      "type": "Image",
      "url": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAUCAMAAADImI+JAAAASFBMVEX/////ubn/oqL/Z2f/Jib/09P/7e3/AAD/+/v/Gxv/W1v/rq7/eXn/nZ3/DAz/OTn/AwP/Pj7//Pz/QED/PT3/g4P/xsb/xcWY5npoAAAAkUlEQVQoz43TyQ7DIAxFUQbDNZCx4///aTdt00ohsXdPHIFsGce33E79nO5AvRjhGCxQVYs41fMbpUIVw9MzwHwKk4sA0aUj6IdW7iNAGEobfBfmBbgC3IAld6HKllhEuzDwV6HfjJ+2OPmjrlP5pJKOx5PfsuSTOWZZY61xlWxYiufDuD3eG2FrRpiSEe5+hRcblQ+AegtNbgAAAABJRU5ErkJggg=="
    },
    {
      "mime_type": "image/webp",
      "type": "Image",
      "url": "https://supremetoday-s3.b-cdn.net/supreme-court-highway-encroachment-procedure.webp"
    },
    {
      "mime_type": "image/webp",
      "type": "Image",
      "url": "https://supremetoday-s3.b-cdn.net/madras-hc-plea-tvk-mla-harassment-case.webp"
    },
    {
      "mime_type": "image/svg+xml",
      "type": "Image",
      "url": "https://cdn.supremetoday.ai/static/img/icon-search.svg"
    },
    {
      "mime_type": "image/png",
      "type": "Image",
      "url": "https://cdn.supremetoday.ai/static/img/brochure-black.png"
    },
    {
      "mime_type": "image/svg+xml",
      "type": "Image",
      "url": "https://cdn.supremetoday.ai/static/img/icon_x.svg"
    },
    {
      "mime_type": "image/webp",
      "type": "Image",
      "url": "https://supremetoday-s3.b-cdn.net/sc-quashes-criminal-fir-against-lenders.webp"
    },
    {
      "mime_type": "text/javascript",
      "type": "Script",
      "url": "https://www.gstatic.com/firebasejs/8.4.1/firebase-app.js"
    },
    {
      "mime_type": "image/png",
      "type": "Image",
      "url": "https://cdn.supremetoday.ai/static/img/banner-bg.png"
    },
    {
      "mime_type": "image/svg+xml",
      "type": "Image",
      "url": "https://cdn.supremetoday.ai/static/img/phone-icon.svg"
    },
    {
      "mime_type": "text/javascript",
      "type": "Script",
      "url": "https://cdn.supremetoday.ai/static/js/slick.min.js"
    },
    {
      "mime_type": "image/png",
      "type": "Image",
      "url": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAUAgMAAACCKJcoAAAACVBMVEUAh1H///+q18VeAlDgAAAAFUlEQVQI12NgYGBQDQ2NYICAYcUEAOKRFw2YFuXeAAAAAElFTkSuQmCC"
    },
    {
      "mime_type": "font/ttf",
      "type": "Font",
      "url": "https://cdn.supremetoday.ai/static/fonts/Gloock-Regular.ttf"
    },
    {
      "mime_type": "image/png",
      "type": "Image",
      "url": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAbCAMAAAA5zj1cAAAAb1BMVEUAAAAAZABoAADANjbdf38CZwK7AQEAZgC7AAD////PTk7jmJg5ajnPz88YAAAwAwPfiIgPDw8jVgVRAAA7AACfAADJbm60AgAvLy9wh3A1SADehIQsLCybm5t6enqDg4OWlpa9vb3moKDlnJy6urrsuKwtAAAAsUlEQVQ4y9WR2Q6CMBBFp63AWOhKoSwqbv//jQZNTKgN5cHEeF86OT2ZzLQAf5eue1eHdVMYAKUAjEi0nM7gOHdwPCVEc5dej15eTHizDyIYliUyEXLYBWlxFrENOeS4DG1Qa2xogPMPUVHkHKlKirJGxrCWSREcXm/o4HsdN884bz3Gtt78jpt/JisWIb31WnvbkyXPQrGqioHzYT5XRVKRIrP2Vax2fMIYi4mx/FJ8AA5WGYfXRmywAAAAAElFTkSuQmCC"
    },
    {
      "mime_type": "image/png",
      "type": "Image",
      "url": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAbCAMAAAA5zj1cAAAAhFBMVEUAd0ngPDEAFIkAAAD///+/3dH/uBwUfEUIe0+8pyf8/vw3lHBhjzcxIwXU6ODwtB7iRjwNII+SxbHpcWmhoCyIYg6DXg7XmxfSmBYrjmd6uKCYoM/87Ovm6PP1v7vl7u7osiBJV6vzsa3d7edMijuLwaxIiTyEvaerstheRAo7SqT87+6ZeG5DAAAAyElEQVQ4y63T2RaCIBAG4IkhKsvM9t0W29///YIsRByQi/7r/3yHZQZAZR3x/ajlDRRZDflrElJsRmEAJbr1oCB6nW+ze4v4yYnCUiQa7XtQwLkw0IsTBcS4gp4dqCxiFR1zEv0UMV6Iw1WjGSdSFBFnQkxLtF3Pr1hFqaCOiXqL+DDu9AdRnTEPOGPgrSWX5AHvaP/MJmW1EH+9ezJGFe3poThVtOZxd2R0rAl3cKpo7oyTU0W9hZzfU9ZYlFzm4XRRLrWXk3kD8dcRLMX+MrkAAAAASUVORK5CYII="
    },
    {
      "mime_type": "image/png",
      "type": "Image",
      "url": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAeCAMAAABpA6zvAAAAflBMVEUAAAAkAgbGECQICAiAChepDh9NBg7OESb80RYHAAFPT0/SISPPFiT5wRbzqhjZOyHdTx/m5uYaGhrVKyPneRzpgRvlcR2wsLDkaB5ubm4qKir8zhXgWR/rihqGhoY9PT1CQkJWVla/v780NDQPDw/wmxn////X19fY2NjaRSGeDzEwAAABA0lEQVQ4y42S6VKDMBhFP41KJCskUNbSVury/i9oU4vN2sn9AzOcyZkbLrw9F1kBeHrNBOH9JRMEiOupEj4Y14tRB2BUf8YRMNATVfBxbmUIunrSsY5hjDkJQVtPmkbjazgNwLq+6zn+T+uD5W5XbnrJRsZu4NkHUVWhTU+IVJOhdNNNAViWyG5PjV7Qrg3LeO3pJFlT0DkJWu3J5Tj+Y4MfN2ZZvMtXs9R3EPXVvjYvh++vg6uXgrYWePzc/514Ovl6oZWlXobj9bmuK3L/PRFFugxEp2d/6vtEex8cBu9Qe3rwMJbeWc+jy3fXE8mm99aT1gfrSekhJ0afBRp9HnjR/wJmTxin1TnTWgAAAABJRU5ErkJggg=="
    },
    {
      "mime_type": "image/png",
      "type": "Image",
      "url": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAQBAMAAACW+SCeAAAAKlBMVEX///+KFTiWLEzPnq3ly9OiRWH+/f2+fJH+/Pz8+PncuMPcucOxY3uwYXgli/3YAAAAQElEQVQY02NgAAE2d0VBJAAWY+CwxSLIMCsQi0ojQSwqWbCoZDPFptIZm0psTsIqiF27KbFOwu742djMtCHsJAAW/xQZyhbn1gAAAABJRU5ErkJggg=="
    },
    {
      "mime_type": "text/javascript",
      "type": "Script",
      "url": "https://cdn.supremetoday.ai/static/js/footer-script.js?v=11.41"
    },
    {
      "mime_type": "image/webp",
      "type": "Image",
      "url": "https://supremetoday-s3.b-cdn.net/chennai-supreme-court-bench-demand_small.webp"
    },
    {
      "mime_type": "image/png",
      "type": "Image",
      "url": "https://cdn.supremetoday.ai/static/img/brochure-white.png"
    },
    {
      "mime_type": "image/svg+xml",
      "type": "Image",
      "url": "https://cdn.supremetoday.ai/static/img/icon_linkedin.svg"
    },
    {
      "mime_type": "image/webp",
      "type": "Image",
      "url": "https://supremetoday-s3.b-cdn.net/supreme-court-mop-delay-notice_small.webp"
    },
    {
      "mime_type": "text/javascript",
      "type": "Script",
      "url": "https://www.gstatic.com/firebasejs/8.6.1/firebase-analytics.js"
    },
    {
      "mime_type": "image/svg+xml",
      "type": "Image",
      "url": "https://cdn.supremetoday.ai/static/img/icon-instagram.svg"
    },
    {
      "mime_type": "image/svg+xml",
      "type": "Image",
      "url": "https://cdn.supremetoday.ai/static/img/new_logo.svg"
    },
    {
      "mime_type": "image/webp",
      "type": "Image",
      "url": "https://supremetoday-s3.b-cdn.net/sc-rejects-review-plea-ujjain-mosque-demolition.webp"
    },
    {
      "mime_type": "image/webp",
      "type": "Image",
      "url": "https://supremetoday-s3.b-cdn.net/sc-refuses-stay-azam-khan-bail_small.webp"
    },
    {
      "mime_type": "image/svg+xml",
      "type": "Image",
      "url": "data:image/svg+xml,%0A%3Csvg width='16' height='9' viewBox='0 0 16 9' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M14.1876 .799607C12.2751 2.71211 10.4001 4.62461 8.48757 6.53711C8.37507 6.64961 8.30007 6.72461 8.18757 6.83711C6.46257 5.11211 4.73757 3.38711 2.97507 1.62461C2.71257 1.36211 2.41257 1.06211 2.15007 .799607C1.47507 .124608 .387573 1.17461 1.10007 1.84961L6.83757 7.58711L7.66257 8.41211C7.96257 8.71211 8.45007 8.71211 8.71257 8.41211C10.6251 6.49961 12.5376 4.62461 14.4501 2.71211C14.7126 2.44961 15.0126 2.14961 15.2751 1.88711C15.9501 1.21211 14.9001 .124608 14.1876 .799607Z' fill='%23fff'/%3E%3C/svg%3E%0A"
    },
    {
      "mime_type": "image/svg+xml",
      "type": "Image",
      "url": "https://cdn.supremetoday.ai/static/img/image-telegram.svg"
    },
    {
      "mime_type": "image/png",
      "type": "Image",
      "url": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAbCAMAAAA5zj1cAAAAVFBMVEXuHCX1eH794+T3mJzyU1rxRUv2io7/////+fn//v7uJC32g4j7vsH5pqn6t7rwOkL81dfzXGL/9PX0bnT3kJX7y8393N3+7e71fYLzY2nwNT35sLPTyISVAAAAmUlEQVQYGe3B13XDMBAEwEXcOyQSzJb679NugBC/9TyDbzeZjieycsIDQUmPBxyrVnwQABS7MPacPe75eWs/zcq188+ccKeTIpdcUeczkxF3JtXK1Znc3xSJBrccRawPoRlXPEaM1aOG1S024YOw+lZWXSrGXgsp+1sOTRiKdMp4SqPHSD94sqRNyAkjYZfZAHjZgme2hH/AL5JVBleYonGCAAAAAElFTkSuQmCC"
    },
    {
      "mime_type": "image/webp",
      "type": "Image",
      "url": "https://supremetoday-s3.b-cdn.net/calcutta-hc-dismisses-student-death-probe-plea.webp"
    },
    {
      "mime_type": "text/javascript",
      "type": "Script",
      "url": "https://cdn.supremetoday.ai/static/js/jquery.min.js"
    },
    {
      "mime_type": "font/ttf",
      "type": "Font",
      "url": "https://cdn.supremetoday.ai/static/fonts/Inter-Regular.ttf"
    },
    {
      "mime_type": "image/png",
      "type": "Image",
      "url": "https://cdn.supremetoday.ai/static/img/login-guide-white.png"
    },
    {
      "mime_type": "image/png",
      "type": "Image",
      "url": "https://cdn.supremetoday.ai/static/img/presentation-overview-white.png"
    },
    {
      "mime_type": "image/png",
      "type": "Image",
      "url": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAUCAMAAADImI+JAAAAe1BMVEWNFTrccQXwpir6qh7xqCvwpyvcpyf/vikAU07rdACLEzicKzf9tiTRkyKEEjXuriXcqSn2tSX9vCe9cialVyWGHi6vVyyjRSzoqSSzXynDfSSOHDSbOS+QLi2WQSbcoCJ8ES+eMzKPOiWMKC7loiaxaCSmTirdmSXCiR4lgVLLAAABEElEQVQoz42S2W7DIBBFp2mSaUmAsBjwhhe8/f8X1rh9aGpT5bwgoaPhirmALwKIj8g9IvF8OR8SxetH5O1z5R27vAQAAs+Y7vRXtNwA1P5HYIzFoxJmJ97KibChYswqpT2Vw0QI2JrsxThHtgPnV9osXqtm1DHMoRhkqyk6x5UotNZ5UqxlS6lrOA3tpPuekqR4Z5lv6NL0xhhFFSREonlVDoI7J7efLlIi+KVXv1Yyp54mbSFoNL4H/jMx0FkIiYKrkQvEOpmx51lRUfQMiOMDhuTELI/bwHHNZrC+F8cZuyneE9W4dc12FqMMUNn9Cq3I40sky2I0FrI2lIel6PIb7CjzrWbPxT1dDtka/hpfXzgfThA9A20AAAAASUVORK5CYII="
    },
    {
      "mime_type": "image/png",
      "type": "Image",
      "url": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAUBAMAAAANaGKIAAAAElBMVEUAAAAAhD1UVFRVrX7IEC7///8VlrW7AAAAJElEQVQY02NwAQFBVMBAX0FjVAARDEUFdBZUQgUQQQY0QC9BAGh6Q2h5ljhMAAAAAElFTkSuQmCC"
    },
    {
      "mime_type": "text/javascript",
      "type": "Script",
      "url": "https://supremetoday.ai/static/js/mobile_app_prompt.js?v=11.43"
    },
    {
      "mime_type": "image/svg+xml",
      "type": "Image",
      "url": "https://cdn.supremetoday.ai/static/img/dropdown-popup-arrow.svg"
    },
    {
      "mime_type": "image/webp",
      "type": "Image",
      "url": "https://supremetoday-s3.b-cdn.net/plea-to-remove-for
```
