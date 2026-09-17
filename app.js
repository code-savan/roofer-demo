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
const icon = name => `<svg class="icon" aria-hidden="true"><use href="#i-${name}"/></svg>`;
const comparison = (project, extraClass="") => `<div class="compare ${extraClass}" style="--split:50%"><img src="${asset(project,'before')}" alt="Illustrative before condition for ${escapeHTML(project.city)} ${escapeHTML(project.kind.toLowerCase())}" loading="lazy"><img class="compare-after" src="${asset(project,'after')}" alt="Illustrative after condition for the same ${escapeHTML(project.city)} home" loading="lazy"><span class="compare-label before">BEFORE</span><span class="compare-label after">AFTER</span><span class="compare-handle" aria-hidden="true">↔</span><input type="range" min="1" max="99" value="50" aria-label="Reveal before or after for ${escapeHTML(project.city)} ${escapeHTML(project.kind.toLowerCase())}"></div>`;
function renderProjects(filter="all") {
  const matches = projects.filter(p => filter==="all" || p.category===filter || p.state.toLowerCase()===filter);
  document.querySelector("#project-grid").innerHTML = matches.map((p,i) => `<article class="project-card">${comparison(p)}<div class="project-info"><div class="project-meta"><span>${escapeHTML(p.kind)}</span><span>${escapeHTML(p.city)}, ${escapeHTML(p.state)}</span></div><h3>${escapeHTML(p.title)}</h3><p>${escapeHTML(p.summary)}</p><button type="button" class="project-open" data-open="${p.id}" aria-label="Explore ${escapeHTML(p.city)} project">Explore project ${icon("arrow")}</button></div></article>`).join("");
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
let serviceImageRequest=0;
function selectService(button){
  const s=services[button.dataset.service];
  document.querySelectorAll(".service-nav button").forEach(tab=>{const active=tab===button;tab.setAttribute("aria-selected",String(active));tab.tabIndex=active?0:-1;});
  const panel=document.querySelector("#service-panel");
  panel.setAttribute("aria-labelledby",button.id);
  const img=document.querySelector("#service-image"),request=++serviceImageRequest;
  if(!img.getAttribute("src")?.endsWith("/"+s.image)){
    img.classList.add("switching");
    const next=new Image();
    next.onload=()=>{if(request!==serviceImageRequest)return;img.src=next.src;img.alt=s.alt;requestAnimationFrame(()=>img.classList.remove("switching"));};
    next.onerror=()=>{if(request!==serviceImageRequest)return;img.src="assets/"+s.image;img.alt=s.alt;img.classList.remove("switching");};
    next.src="assets/"+s.image;
  }else img.classList.remove("switching");
  document.querySelector("#service-tag").textContent=s.tag;
  document.querySelector("#service-name").textContent=s.name;
  document.querySelector("#service-description").textContent=s.description;
  document.querySelector("#service-project").innerHTML=escapeHTML(s.project)+" "+icon("arrow");
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
const toggle=document.querySelector(".menu-toggle"),mobile=document.querySelector("#mobile-nav"),backdrop=document.querySelector(".nav-backdrop");
let previousFocus;
function closeMenu(){
  if(!mobile.classList.contains("is-open"))return;
  mobile.classList.remove("is-open");mobile.inert=true;mobile.setAttribute("aria-hidden","true");
  toggle.setAttribute("aria-expanded","false");toggle.setAttribute("aria-label","Open menu");
  document.body.classList.remove("menu-open");
  backdrop.addEventListener("transitionend",()=>{if(!mobile.classList.contains("is-open"))backdrop.hidden=true;},{once:true});
  if(matchMedia("(prefers-reduced-motion: reduce)").matches)backdrop.hidden=true;
  previousFocus?.focus();
}
function openMenu(){
  previousFocus=document.activeElement;backdrop.hidden=false;mobile.inert=false;mobile.setAttribute("aria-hidden","false");
  toggle.setAttribute("aria-expanded","true");toggle.setAttribute("aria-label","Close menu");
  document.body.classList.add("menu-open");
  requestAnimationFrame(()=>mobile.classList.add("is-open"));
  mobile.querySelector(".drawer-close").focus();
}
toggle.addEventListener("click",()=>mobile.classList.contains("is-open")?closeMenu():openMenu());
mobile.querySelector(".drawer-close").addEventListener("click",closeMenu);
backdrop.addEventListener("click",closeMenu);
mobile.querySelectorAll("a").forEach(link=>link.addEventListener("click",closeMenu));
document.addEventListener("keydown",event=>{
  if(event.key==="Escape")closeMenu();
  if(event.key==="Tab"&&mobile.classList.contains("is-open")){
    const focusable=[...mobile.querySelectorAll("a,button")],first=focusable[0],last=focusable.at(-1);
    if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus();}
    else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus();}
  }
});
matchMedia("(min-width: 761px)").addEventListener("change",event=>{if(event.matches)closeMenu();});
document.querySelector("#year").textContent=new Date().getFullYear();

// Keep the planning model explicit. Interior area is converted to approximate
// roof surface by story count and a 25% slope/overhang allowance. The rates are
// illustrative, not contractor prices or an offer to perform work.
const estimateState={size:1800,stories:1,material:"asphalt"};
const planningRates={asphalt:[6,10],metal:[10,16],tile:[12,20]};
const money=value=>new Intl.NumberFormat("en-US",{style:"currency",currency:"USD",maximumFractionDigits:0}).format(value);
function estimate(){
  const roofArea=Math.round(estimateState.size/estimateState.stories*1.25/50)*50;
  const [low,high]=planningRates[estimateState.material];
  const lower=Math.round(roofArea*low/100)*100,upper=Math.round(roofArea*high/100)*100;
  document.querySelector("#estimate-value").textContent=money(lower)+"–"+money(upper);
  document.querySelector("#estimate-assumption").textContent="Based on roughly "+roofArea.toLocaleString()+" sq ft of roof surface. Actual roof area and scope require inspection.";
  return {lower,upper,roofArea};
}
document.querySelectorAll("[data-size],[data-stories],[data-material]").forEach(button=>button.addEventListener("click",()=>{
  const key=button.dataset.size?"size":button.dataset.stories?"stories":"material";
  estimateState[key]=key==="material"?button.dataset[key]:Number(button.dataset[key]);
  document.querySelectorAll("[data-"+key+"]").forEach(item=>item.setAttribute("aria-pressed",String(item===button)));
  estimate();
}));
estimate();

const requestState={step:0,service:"",timing:"",zip:"",name:"",phone:"",estimate:""};
const serviceChoices=[
  ["Roof replacement","A new roof"],["Storm or leak","Repair and protect"],
  ["Siding","Exterior walls"],["Gutters","Water control"],["Not sure yet","Help me decide"]
];
const timingChoices=[["As soon as possible","Something needs attention"],["In the next few weeks","Ready to plan"],["Just exploring","Looking ahead"]];
const requestStep=document.querySelector("#request-step"),requestNext=document.querySelector("#request-next"),requestBack=document.querySelector("#request-back");
function choices(items,key){
  return `<div class="request-choice-grid" role="group" aria-label="${key==="service"?"Choose a service":"Choose a timeframe"}">${items.map(([name,detail])=>`<button type="button" class="request-choice" data-request="${key}" data-value="${escapeHTML(name)}" aria-pressed="${requestState[key]===name}">${icon(key==="service"?"arrow":"check")}<span>${escapeHTML(name)}<small style="display:block;color:#75847c;font-weight:500;margin-top:2px">${escapeHTML(detail)}</small></span></button>`).join("")}</div>`;
}
function renderRequest(){
  const step=requestState.step;
  document.querySelector("#request-progress").textContent=String(step+1).padStart(2,"0")+" / 03";
  document.querySelector("#request-progress-fill").style.width=(step+1)*100/3+"%";
  requestBack.hidden=step===0;
  requestNext.innerHTML=(step===2?"Open email to send":"Continue")+" "+icon("arrow");
  document.querySelector("#request-helper").textContent=step===2?"Your email app will open with your request ready to send.":"You can also call us directly. No account needed.";
  if(step===0)requestStep.innerHTML=`<h3>What can we help with?</h3><p class="request-lede">Choose the closest fit. We can work out the details together.</p>${choices(serviceChoices,"service")}<p class="request-error" role="alert"></p>`;
  if(step===1)requestStep.innerHTML=`<h3>When do you need a hand?</h3><p class="request-lede">A rough timeline is all we need for now.</p>${choices(timingChoices,"timing")}<label class="request-field full" style="margin-top:20px;display:block">ZIP code or city (optional)<input id="request-zip" autocomplete="postal-code" placeholder="e.g. McKinney, TX" maxlength="70" value="${escapeHTML(requestState.zip)}"></label><p class="request-error" role="alert"></p>`;
  if(step===2)requestStep.innerHTML=`<h3>Where can we reach you?</h3><p class="request-lede">A name and a reachable number are enough.</p><div class="request-inputs"><label class="request-field">Your name<input id="request-name" autocomplete="name" placeholder="Your name" maxlength="80" value="${escapeHTML(requestState.name)}"></label><label class="request-field">Phone number<input id="request-phone" autocomplete="tel" inputmode="tel" placeholder="(555) 000-0000" maxlength="30" value="${escapeHTML(requestState.phone)}"></label></div><div class="request-summary"><strong>YOUR REQUEST</strong>${escapeHTML(requestState.service)} · ${escapeHTML(requestState.timing)}${requestState.zip?" · "+escapeHTML(requestState.zip):""}${requestState.estimate?"<br>"+escapeHTML(requestState.estimate):""}</div><p class="request-error" role="alert"></p>`;
  requestStep.querySelectorAll("[data-request]").forEach(button=>button.addEventListener("click",()=>{
    requestState[button.dataset.request]=button.dataset.value;
    requestStep.querySelectorAll("[data-request]").forEach(item=>item.setAttribute("aria-pressed",String(item===button)));
    requestStep.querySelector(".request-error").textContent="";
  }));
  requestStep.querySelector("#request-zip")?.addEventListener("input",event=>requestState.zip=event.target.value);
  requestStep.querySelector("#request-name")?.addEventListener("input",event=>requestState.name=event.target.value);
  requestStep.querySelector("#request-phone")?.addEventListener("input",event=>requestState.phone=event.target.value);
}
function requestText(){
  return `Hello IronStar, I'd like to discuss a project.\n\nService: ${requestState.service}\nTiming: ${requestState.timing}\nLocation: ${requestState.zip||"Not provided"}${requestState.estimate?"\nPlanning estimate: "+requestState.estimate:""}\n\nName: ${requestState.name}\nPhone: ${requestState.phone}\n\nPlease contact me.`;
}
requestNext.addEventListener("click",()=>{
  const step=requestState.step,error=requestStep.querySelector(".request-error");
  if(step===0&&!requestState.service){error.textContent="Choose the service that sounds closest.";return;}
  if(step===1&&!requestState.timing){error.textContent="Choose a timeframe to continue.";return;}
  if(step===2){
    if(!requestState.name.trim()){error.textContent="Please add your name.";requestStep.querySelector("#request-name").focus();return;}
    if(!/^\+?[0-9 ()-]{7,}$/.test(requestState.phone.trim())){error.textContent="Please add a reachable phone number.";requestStep.querySelector("#request-phone").focus();return;}
    const message=requestText();
    const subject=encodeURIComponent("Roofing request from "+requestState.name.trim());
    const href="mailto:hello@ironstar.demo?subject="+subject+"&body="+encodeURIComponent(message);
    requestStep.innerHTML=`<div class="request-success">${icon("check")}<h3>Your request is ready.</h3><p>Your email app should open with the details filled in. Send that email to complete your request. If it does not open, copy your details or call us at <a href="tel:+14695550187">(469) 555-0187</a>.</p><button type="button" id="copy-request">Copy request details</button></div>`;
    document.querySelector("#request-progress-fill").style.width="100%";
    document.querySelector("#request-progress").textContent="READY";
    requestNext.hidden=true;requestBack.hidden=true;
    document.querySelector("#request-helper").textContent="No request is sent until you send the email from your device.";
    requestStep.querySelector("#copy-request").addEventListener("click",async event=>{
      try{await navigator.clipboard.writeText(message);event.target.textContent="Copied to clipboard";}
      catch{event.target.textContent="Copy unavailable. Please use the email app or call.";}
    });
    window.location.href=href;
    return;
  }
  requestState.step++;renderRequest();
  requestStep.querySelector("h3")?.focus?.();
});
requestBack.addEventListener("click",()=>{requestState.step--;renderRequest();});
document.querySelector("#estimate-request").addEventListener("click",()=>{
  const {lower,upper}=estimate();
  requestState.estimate="Illustrative range "+money(lower)+"–"+money(upper)+" for "+estimateState.material+" roofing";
  requestState.service="Roof replacement";
  requestState.step=1;requestNext.hidden=false;renderRequest();
  document.querySelector("#contact").scrollIntoView({behavior:matchMedia("(prefers-reduced-motion: reduce)").matches?"instant":"smooth"});
});
renderRequest();

// Reveal only decorative content. The entire page remains readable if scripting
// or intersection observers are unavailable.
if("IntersectionObserver" in window&&!matchMedia("(prefers-reduced-motion: reduce)").matches){
  const targets=document.querySelectorAll(".intro-main,.section-top,.coverage-heading,.estimate-intro,.callout-content,.contact-copy,.credential-grid,.story-copy");
  targets.forEach(node=>node.dataset.reveal="");
  document.documentElement.classList.add("motion-ready");
  const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{
    if(entry.isIntersecting){entry.target.classList.add("is-visible");observer.unobserve(entry.target);}
  }),{threshold:.1,rootMargin:"0px 0px 40px 0px"});
  targets.forEach(node=>observer.observe(node));
}
