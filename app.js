const projects = [
  {id:"mckinney",city:"McKinney",state:"Texas",category:"roofing",kind:"Shingle replacement",title:"A roof ready for another season",summary:"An aging shingle roof becomes a crisp, weather-ready exterior.",challenge:"The home's worn shingles and exposed patches called for a full system review, including the edges and drainage points.",approach:"A complete tear-off concept with architectural shingles, underlayment, ridge treatment, and careful flashing at transitions.",detail:"The charcoal finish gives this familiar brick ranch a quieter, more cohesive curb presence.",coordinates:"33.20° N / 96.64° W",image:"mckinney"},
  {id:"scottsdale",city:"Scottsdale",state:"Arizona",category:"roofing",kind:"Tile roof restoration",title:"Desert character, renewed",summary:"A practical tile restoration for a lived-in stucco home.",challenge:"Weathered and displaced concrete tiles left several vulnerable areas on this ordinary Scottsdale home.",approach:"A tile removal and reset concept focuses on fresh underlayment, replacing damaged units, and retaining the home's character.",detail:"The repaired field looks at home in its neighborhood and is suited to the desert sun.",coordinates:"33.49° N / 111.93° W",image:"scottsdale"},
  {id:"plano",city:"Plano",state:"Texas",category:"gutters",kind:"Gutters & fascia",title:"Better water, better direction",summary:"New drainage details clean up the edge and protect the facade.",challenge:"Sagging, debris-filled gutters were sending water toward the fascia and leaving stains on the brick.",approach:"A continuous gutter and downspout concept restores a clean line while directing runoff away from the foundation.",detail:"The most useful change is easy to overlook: water now has a sensible route.",coordinates:"33.02° N / 96.70° W",image:"plano"},
  {id:"dallas",city:"Dallas",state:"Texas",category:"siding",kind:"Siding & trim",title:"A bungalow finds its rhythm",summary:"Fresh horizontal siding brings a modest home back into focus.",challenge:"Peeling, warped boards and moisture at the lower wall had begun to distract from an otherwise sound 1950s bungalow.",approach:"A fiber cement siding concept pairs a consistent horizontal profile with new trim and attention to moisture management.",detail:"A restrained cream palette keeps the original scale and porch details intact.",coordinates:"32.78° N / 96.80° W",image:"dallas"},
  {id:"tempe",city:"Tempe",state:"Arizona",category:"roofing",kind:"Low-slope roof",title:"A cooler, cleaner roofline",summary:"A reflective finish renews a low-slope desert roof.",challenge:"The aging foam coating showed uneven wear and vulnerable seams under intense Arizona sun.",approach:"The restoration concept addresses weak details first, then applies an even reflective coating across the roof plane.",detail:"The result looks deliberately simple because the work is in the surface preparation.",coordinates:"33.43° N / 111.94° W",image:"tempe"},
  {id:"arlington",city:"Arlington",state:"Texas",category:"roofing",kind:"Storm repair",title:"The storm doesn't get the last word",summary:"Localized shingle damage is resolved with a cohesive roof finish.",challenge:"Wind-lifted shingles on a visible roof plane left exposed underlayment and a risk of water entry.",approach:"A storm restoration concept documents the affected field, repairs the damaged area, and restores a uniform shingle finish.",detail:"The finished roof feels calm and complete from the street again.",coordinates:"32.74° N / 97.11° W",image:"arlington"}
];
const byId = Object.fromEntries(projects.map(project => [project.id,project]));
const asset = (project, state) => `assets/${project.image}-${state}.webp`;
const escapeHTML = text => String(text).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
const comparison = (project, extraClass="") => `<div class="compare ${extraClass}" style="--split:50%"><img src="${asset(project,'before')}" alt="Illustrative before condition for ${escapeHTML(project.city)} ${escapeHTML(project.kind.toLowerCase())}" loading="lazy"><img class="compare-after" src="${asset(project,'after')}" alt="Illustrative after condition for the same ${escapeHTML(project.city)} home" loading="lazy"><span class="compare-label before">BEFORE</span><span class="compare-label after">AFTER</span><span class="compare-handle" aria-hidden="true">↔</span><input type="range" min="1" max="99" value="50" aria-label="Reveal before or after for ${escapeHTML(project.city)} ${escapeHTML(project.kind.toLowerCase())}"></div>`;
function renderProjects(filter="all") {
  const matches = projects.filter(p => filter==="all" || p.category===filter || p.state.toLowerCase()===filter);
  document.querySelector("#project-grid").innerHTML = matches.map((p,i) => `<article class="project-card">${comparison(p)}<div class="project-info"><div class="project-meta"><span>${escapeHTML(p.kind)}</span><span>${escapeHTML(p.city)}, ${escapeHTML(p.state)}</span></div><h3>${escapeHTML(p.title)}</h3><p>${escapeHTML(p.summary)}</p><button type="button" class="project-open" data-open="${p.id}" aria-label="Explore ${escapeHTML(p.city)} project">Explore project ↗</button></div></article>`).join("");
  bindComparisons(document.querySelector("#project-grid"));
}
function bindComparisons(root) {
  root.querySelectorAll(".compare input").forEach(input => {
    input.addEventListener("input", () => input.parentElement.style.setProperty("--split",input.value+"%"));
  });
}
renderProjects();
document.querySelectorAll(".filter").forEach(button => button.addEventListener("click", () => {
  document.querySelectorAll(".filter").forEach(item => {item.classList.toggle("active",item===button);item.setAttribute("aria-pressed",String(item===button));});
  renderProjects(button.dataset.filter);
}));
const dialog = document.querySelector("#project-dialog");
let dialogTrigger;
function openProject(id) {
  const p=byId[id]; if(!p)return;
  dialogTrigger=document.activeElement;
  document.querySelector("#dialog-content").innerHTML=`<div class="dialog-hero"><img src="${asset(p,'after')}" alt="Illustrative completed ${escapeHTML(p.kind.toLowerCase())} in ${escapeHTML(p.city)}"><span>PROJECT STORY / ${escapeHTML(p.city.toUpperCase())}, ${escapeHTML(p.state.toUpperCase())}</span></div><div class="dialog-body"><span class="section-index">A CLOSER LOOK</span><h2 id="dialog-title">${escapeHTML(p.title)}<span class="period">.</span></h2><p class="dialog-lede">${escapeHTML(p.summary)}</p><div class="dialog-facts"><div><span>LOCATION</span><strong>${escapeHTML(p.city)}, ${escapeHTML(p.state)}</strong></div><div><span>SCOPE</span><strong>${escapeHTML(p.kind)}</strong></div><div><span>STORY</span><strong>Illustrative concept</strong></div></div><div class="dialog-story"><div><h3>The starting point</h3><p>${escapeHTML(p.challenge)}</p></div><div><h3>The considered response</h3><p>${escapeHTML(p.approach)} ${escapeHTML(p.detail)}</p></div></div>${comparison(p,"dialog-compare")}<p class="dialog-note">Drag the handle to compare. These are AI-generated, illustrative views of a hypothetical project, not photographs of completed IronStar work.</p></div>`;
  bindComparisons(dialog);
  dialog.showModal();document.body.classList.add("dialog-open");dialog.querySelector(".dialog-close").focus();
}
document.addEventListener("click", event => {const button=event.target.closest("[data-open]");if(button){event.preventDefault();openProject(button.dataset.open);}});
dialog.querySelector(".dialog-close").addEventListener("click",()=>dialog.close());
dialog.addEventListener("click",event=>{if(event.target===dialog)dialog.close();});
dialog.addEventListener("close",()=>{document.body.classList.remove("dialog-open");dialogTrigger?.focus();});
const services={
  roof:{tag:"THE FOUNDATION",name:"A roof made for the long haul.",description:"From shingle selection to ventilation and clean flashing, a complete replacement should solve the whole system, not just refresh the surface.",image:"detail.webp",alt:"Close-up of a finished shingle roof and flashing",project:"Explore roof projects"},
  storm:{tag:"AFTER THE WEATHER",name:"A clear path after the storm.",description:"Document the damage, protect the home, and explain the repair. A measured response helps homeowners move forward with confidence.",image:"arlington-before.webp",alt:"Illustrative storm-damaged roof on a Texas home",project:"See a storm repair story"},
  siding:{tag:"THE OUTSIDE COUNTS",name:"Character with staying power.",description:"Thoughtful siding and trim can protect a wall while keeping the proportions and personality that make a home feel like itself.",image:"dallas-after.webp",alt:"Illustrative Dallas bungalow with new horizontal siding",project:"See a siding story"},
  gutters:{tag:"THE WATER PATH",name:"A better finish at the edge.",description:"Well-placed gutters and downspouts move rain where it belongs. The detail is subtle, and the protection is anything but.",image:"plano-after.webp",alt:"Illustrative Plano home with renewed gutter system",project:"See a gutter story"}
};
const serviceToProject={roof:"mckinney",storm:"arlington",siding:"dallas",gutters:"plano"};
function selectService(button){
  const s=services[button.dataset.service];
  document.querySelectorAll(".service-nav button").forEach(tab=>{const active=tab===button;tab.setAttribute("aria-selected",String(active));tab.tabIndex=active?0:-1;});
  const panel=document.querySelector("#service-panel");
  panel.setAttribute("aria-labelledby",button.id);
  const img=document.querySelector("#service-image");img.src="assets/"+s.image;img.alt=s.alt;
  document.querySelector("#service-tag").textContent=s.tag;
  document.querySelector("#service-name").textContent=s.name;
  document.querySelector("#service-description").textContent=s.description;
  document.querySelector("#service-project").textContent=s.project+" ↗";
  document.querySelector("#service-project").dataset.open=serviceToProject[button.dataset.service];
}
document.querySelectorAll(".service-nav button").forEach((tab,index,tabs)=>{
  tab.addEventListener("click",()=>selectService(tab));
  tab.addEventListener("keydown",event=>{let next;if(event.key==="ArrowDown"||event.key==="ArrowRight")next=(index+1)%tabs.length;if(event.key==="ArrowUp"||event.key==="ArrowLeft")next=(index+tabs.length-1)%tabs.length;if(event.key==="Home")next=0;if(event.key==="End")next=tabs.length-1;if(next!==undefined){event.preventDefault();selectService(tabs[next]);tabs[next].focus();}});
});
selectService(document.querySelector("#tab-roof"));
function selectCity(id){
  const p=byId[id];if(!p)return;
  document.querySelectorAll(".map-point").forEach(point=>point.classList.toggle("active",point.dataset.city===id));
  document.querySelectorAll(".region-button").forEach(button=>{const active=button.dataset.region===p.state.toLowerCase();button.classList.toggle("active",active);button.setAttribute("aria-pressed",String(active));});
  document.querySelector("#map-coordinates").textContent=p.coordinates;
  document.querySelector("#location-number").textContent=String(projects.indexOf(p)+1).padStart(2,"0")+" / 06";
  document.querySelector("#location-name").innerHTML=escapeHTML(p.city)+",<br>"+escapeHTML(p.state);
  document.querySelector("#location-description").textContent=p.summary;
  const image=document.querySelector("#location-image");image.src=asset(p,"after");image.alt="Illustrative completed "+p.kind.toLowerCase()+" in "+p.city;
  document.querySelector("#location-open").dataset.open=id;
}
document.querySelectorAll(".map-point").forEach(point=>point.addEventListener("click",()=>selectCity(point.dataset.city)));
document.querySelectorAll(".region-button").forEach(button=>button.addEventListener("click",()=>selectCity(button.dataset.region==="texas"?"mckinney":"scottsdale")));
selectCity("mckinney");
const toggle=document.querySelector(".menu-toggle"),mobile=document.querySelector("#mobile-nav");
function closeMenu(){mobile.hidden=true;toggle.setAttribute("aria-expanded","false");toggle.setAttribute("aria-label","Open menu");}
toggle.addEventListener("click",()=>{const open=mobile.hidden;mobile.hidden=!open;toggle.setAttribute("aria-expanded",String(open));toggle.setAttribute("aria-label",open?"Close menu":"Open menu");});
mobile.querySelectorAll("a").forEach(link=>link.addEventListener("click",closeMenu));
document.addEventListener("keydown",event=>{if(event.key==="Escape")closeMenu();});
document.querySelector("#year").textContent=new Date().getFullYear();