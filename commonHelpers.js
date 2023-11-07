import{a as p,S as m,i as u}from"./assets/vendor-2507e9f0.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))c(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const i of s.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&c(i)}).observe(document,{childList:!0,subtree:!0});function n(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function c(r){if(r.ep)return;r.ep=!0;const s=n(r);fetch(r.href,s)}})();p.defaults.headers.common["x-api-key"]="live_URYiUDVMJKnsTYSLnYWeR31PUeH8c5Yz2b0ev0a1MU6oS9U6mrAOkeE6lCc4s4wU";async function h(){return await p.get("https://api.thecatapi.com/v1/breeds").then(t=>t.data)}async function y(t){return await p.get(`https://api.thecatapi.com/v1/images/search?breed_ids=${t}`).then(e=>e.data)}const a=document.querySelector(".breed-select"),l=document.querySelector(".cat-info"),d=document.querySelector(".spinner"),g=new m({select:a,settings:{placeholderText:"Search breeds"}}),f={title:"Error",message:"❌ Oops! Something went wrong! Try reloading the page!",position:"topCenter",color:"red"};function o(t,e){t.classList.toggle("ss-hide",!e)}async function b(){try{const t=a.value;o(l,!1),o(d,!0);const e=await y(t);v(e)}catch{u.show(f)}o(d,!1)}function v(t){const e=t[0].breeds[0];l.innerHTML=`
    <div class="wrapper">
      <img class="cat-img" src="${t[0].url}" alt="Cat image"/>
      <div class="wrap">
        <h2 class="text">${e.name}</h2>
        <p><b class="primary">Description:</b> ${e.description}</p>
        <p><b class="primary">Temperament:</b> ${e.temperament}</p>
        <p><b class="primary">Country:</b> ${e.origin}</p>
        <img src="https://flagsapi.com/${e.country_code}/shiny/64.png" alt="Country code"> 
      </div>
    </div>
  `,o(l,!0)}async function w(){try{await h().then(t=>{const e=t.map(({id:n,name:c})=>({text:c,value:n}));g.setData([{placeholder:!0,text:""},...e])}),o(a,!0),a.addEventListener("change",b)}catch{u.show(f),o(a,!1)}o(d,!1)}w();
//# sourceMappingURL=commonHelpers.js.map
