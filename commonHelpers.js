import{a as u}from"./assets/vendor-313c7975.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))f(t);new MutationObserver(t=>{for(const o of t)if(o.type==="childList")for(const a of o.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&f(a)}).observe(document,{childList:!0,subtree:!0});function i(t){const o={};return t.integrity&&(o.integrity=t.integrity),t.referrerPolicy&&(o.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?o.credentials="include":t.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function f(t){if(t.ep)return;t.ep=!0;const o=i(t);fetch(t.href,o)}})();u.defaults.headers.common["x-api-key"]="live_URYiUDVMJKnsTYSLnYWeR31PUeH8c5Yz2b0ev0a1MU6oS9U6mrAOkeE6lCc4s4wU";const l=document.querySelector(".breed-select"),p=document.querySelector(".cat-info"),d=document.querySelector(".loader"),c=document.querySelector(".error");c.style.color="red";function s(e){e.style.display="none"}function n(e){e.style.display="block"}function m(){return n(d),s(l),s(c),u.get("https://api.thecatapi.com/v1/breeds").then(e=>(n(l),e.data)).catch(e=>{throw n(c),e}).finally(()=>s(d))}function h(e){return n(d),s(c),u.get(`https://api.thecatapi.com/v1/images/search?breed_ids=${e}`).then(r=>r.data).catch(r=>{throw n(c),r}).finally(()=>s(d))}function y(e){p.innerHTML=`
    <div class="wrapper">
    <img class="cat-img" src="${e[0].url}" alt="Cat Image"/>
    <div>
    <h2>${e[0].breeds[0].name}</h2>
    <p><b>Description:</b> ${e[0].breeds[0].description}</p>
    <p><b>Temperament:</b> ${e[0].breeds[0].temperament}</p>
    </div>
    </div>
  `,n(p)}function b(){const e=l.value;h(e).then(r=>y(r)).catch(r=>{throw n(c),r})}function g(){m().then(e=>{e.forEach(r=>{const i=document.createElement("option");i.value=r.id,i.textContent=r.name,l.appendChild(i)})}).catch(e=>{throw n(c),e}),l.addEventListener("change",b)}g();
//# sourceMappingURL=commonHelpers.js.map
