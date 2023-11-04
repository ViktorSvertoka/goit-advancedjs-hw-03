import{a as p,i as f}from"./assets/vendor-a23d62c7.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))o(t);new MutationObserver(t=>{for(const n of t)if(n.type==="childList")for(const c of n.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&o(c)}).observe(document,{childList:!0,subtree:!0});function s(t){const n={};return t.integrity&&(n.integrity=t.integrity),t.referrerPolicy&&(n.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?n.credentials="include":t.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function o(t){if(t.ep)return;t.ep=!0;const n=s(t);fetch(t.href,n)}})();p.defaults.headers.common["x-api-key"]="live_URYiUDVMJKnsTYSLnYWeR31PUeH8c5Yz2b0ev0a1MU6oS9U6mrAOkeE6lCc4s4wU";async function h(){return await p.get("https://api.thecatapi.com/v1/breeds").then(e=>e.data)}async function y(e){return await p.get(`https://api.thecatapi.com/v1/images/search?breed_ids=${e}`).then(r=>r.data)}const i=document.querySelector(".breed-select"),a=document.querySelector(".cat-info"),d=document.querySelector(".spinner"),m={title:"Error",message:"❌ Oops! Something went wrong! Try reloading the page!",position:"topCenter",color:"red"};function u(e){e.style.display="block"}function l(e){e.style.display="none"}async function g(){try{const e=i.value;l(a),u(d);const r=await y(e);b(r)}catch{f.show(m)}l(d)}function b(e){const r=e[0].breeds[0];a.innerHTML=`
    <div class="wrapper">
      <img class="cat-img" src="${e[0].url}" alt="Cat Image"/>
      <div>
        <h2>${r.name}</h2>
        <p><b>Description:</b> ${r.description}</p>
        <p><b>Temperament:</b> ${r.temperament}</p>
      </div>
    </div>
  `,u(a)}async function v(){try{const r=(await h()).map(s=>{const o=document.createElement("option");return o.value=s.id,o.textContent=s.name,o});i.append(...r),u(i),i.addEventListener("change",g)}catch{f.show(m)}l(d)}v();
//# sourceMappingURL=commonHelpers.js.map
