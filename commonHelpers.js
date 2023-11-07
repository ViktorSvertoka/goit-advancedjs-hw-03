import{a as p,S as m,i as u}from"./assets/vendor-2507e9f0.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const s of e)if(s.type==="childList")for(const c of s.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&n(c)}).observe(document,{childList:!0,subtree:!0});function a(e){const s={};return e.integrity&&(s.integrity=e.integrity),e.referrerPolicy&&(s.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?s.credentials="include":e.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(e){if(e.ep)return;e.ep=!0;const s=a(e);fetch(e.href,s)}})();p.defaults.headers.common["x-api-key"]="live_URYiUDVMJKnsTYSLnYWeR31PUeH8c5Yz2b0ev0a1MU6oS9U6mrAOkeE6lCc4s4wU";async function h(){return await p.get("https://api.thecatapi.com/v1/breeds").then(t=>t.data)}async function g(t){return await p.get(`https://api.thecatapi.com/v1/images/search?breed_ids=${t}`).then(r=>r.data)}const y="/goit-advancedjs-hw-03/assets/no-image-2684a41a.png",i=document.querySelector(".breed-select"),l=document.querySelector(".cat-info"),d=document.querySelector(".spinner"),b=new m({select:i,settings:{placeholderText:"Search breeds"}}),f={title:"Error",message:"❌ Oops! Something went wrong! Try reloading the page!",position:"topCenter",color:"red"};function o(t,r){t.classList.toggle("ss-hide",!r)}async function w(){try{const t=i.value;o(l,!1),o(d,!0);const r=await g(t);v(r)}catch{u.show(f)}o(d,!1)}function v(t){const{name:r,description:a,temperament:n,origin:e,country_code:s}=t[0].breeds[0],c=t[0].url;l.innerHTML=`
    <div class="wrapper">
      <img class="cat-img" src="${c}" alt="${r}"/>
      <div class="wrap">
        <h2 class="text">${r}</h2>
        <p><b class="primary">Description:</b> ${a}</p>
        <p><b class="primary">Temperament:</b> ${n}</p>
        <p><b class="primary">Country:</b> ${e}</p>
        <img src="https://flagsapi.com/${s}/shiny/64.png" alt="${e}" onerror="src='${y}'" style="width: 64px;">
      </div>
    </div>
  `,o(l,!0)}async function S(){try{await h().then(t=>{const r=t.map(({id:a,name:n})=>({text:n,value:a}));b.setData([{placeholder:!0,text:""},...r])}),o(i,!0),i.addEventListener("change",w)}catch{u.show(f),o(i,!1)}o(d,!1)}S();
//# sourceMappingURL=commonHelpers.js.map
