import{a as p,S as m,i as u}from"./assets/vendor-7e69f3e5.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))a(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const i of s.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&a(i)}).observe(document,{childList:!0,subtree:!0});function c(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function a(r){if(r.ep)return;r.ep=!0;const s=c(r);fetch(r.href,s)}})();p.defaults.headers.common["x-api-key"]="live_URYiUDVMJKnsTYSLnYWeR31PUeH8c5Yz2b0ev0a1MU6oS9U6mrAOkeE6lCc4s4wU";async function h(){return await p.get("https://api.thecatapi.com/v1/breeds").then(t=>t.data)}async function y(t){return await p.get(`https://api.thecatapi.com/v1/images/search?breed_ids=${t}`).then(e=>e.data)}const o=document.getElementById("breed-select"),l=document.querySelector(".cat-info"),d=document.querySelector(".spinner"),g=new m({select:o,settings:{placeholderText:"Search breeds"}}),f={title:"Error",message:"❌ Oops! Something went wrong! Try reloading the page!",position:"topCenter",color:"red"};function n(t,e){t.classList.toggle("ss-hide",!e)}async function b(){try{const t=o.value;n(l,!1),n(d,!0);const e=await y(t);w(e)}catch{u.show(f)}n(d,!1)}function w(t){const e=t[0].breeds[0];l.innerHTML=`
    <div class="wrapper">
      <img class="cat-img" src="${t[0].url}" alt="Cat Image"/>
      <div class="wrap">
        <h2 class="text">${e.name}</h2>
        <p><b class="primary">Description:</b> ${e.description}</p>
        <p><b class="primary">Temperament:</b> ${e.temperament}</p>
        <p><b class="primary">Country:</b> ${e.origin}</p>
      </div>
    </div>
  `,n(l,!0)}async function v(){try{await h().then(t=>{const e=t.map(({id:c,name:a})=>({text:a,value:c}));g.setData([{placeholder:!0,text:""},...e])}),n(o,!0),o.addEventListener("change",b)}catch{u.show(f),n(o,!1)}n(d,!1)}v();
//# sourceMappingURL=commonHelpers.js.map
