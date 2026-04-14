(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})(),((e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports))((()=>{var e=[{role:`Software Engineer`,company:`Cisco`,location:`San Jose, CA`,period:`Sept 2024 – Present`,points:[`Engineered distributed data pipelines using AWS EMR and Spark to process 1.2TB daily telemetry data`,`Implemented agentic AI workflows reducing false positive detection time by 15%`,`Architected serverless solutions (AWS Lambda, SQS, Fargate) cutting manual overhead by 25%`,`Led architecture and code reviews for mission-critical backend services (Java, Python) at 99.9% uptime`]},{role:`Associate Software Engineer`,company:`Humana (via TCS)`,location:`Hyderabad, India`,period:`Aug 2021 – Aug 2022`,points:[`Built microservices for healthcare data management on SAP BTP processing 15,000+ clinical records`,`Optimized SQL and distributed data layers, reducing latency to under 300ms`,`Full SDLC contributions across code reviews, builds, and cloud-native scaling`]}],t=[{title:`Distributed File Storage System`,description:`Fault-tolerant distributed key-value store with sharding and replication via consistent hashing. Handles 500+ concurrent requests.`,tags:[`Go`,`gRPC`,`Docker`,`Hashing`],link:`#`},{title:`Machine Learning Course Predictor`,description:`Recommends grad courses from student history with 82% accuracy using Scikit-learn and Pandas. Processed 10,000+ records.`,tags:[`Python`,`Scikit-learn`,`Pandas`],link:`#`},{title:`Real-Time Sentiment Analysis Engine`,description:`Live tweet streaming pipeline via Kafka and NLP classification for real-time trend tracking and dashboarding.`,tags:[`Python`,`NLP`,`Twitter API`,`Kafka`],link:`#`}],n={Languages:[`Java`,`Python`,`C++`,`C#`,`SQL`,`Go`,`JavaScript`,`TypeScript`,`Scala`],"Cloud & Infra":[`AWS`,`Spark`,`Docker`,`Terraform`,`IAM`,`Linux`],Tools:[`Git`,`Jenkins`,`CI/CD`,`Splunk`,`DynaTrace`,`Agile`],Concepts:[`Distributed Systems`,`Microservices`,`DSA`,`System Design`]},r=[{school:`University of Maryland, Baltimore County`,degree:`Master of Professional Studies in Software Engineering`,period:`Aug 2022 – Jun 2024`,coursework:`Advanced Algorithms, Distributed Systems, Cloud Security, Data Engineering`}],i=[{name:`AWS Certified Developer Associate`,icon:`shield-check`},{name:`SAP Certified Development Associate (BTP Suite)`,icon:`award`},{name:`Oracle Certified Professional (Java SE Programmer)`,icon:`code`},{name:`Google Cloud Associate Engineer`,icon:`cloud`}];document.addEventListener(`DOMContentLoaded`,()=>{a(),o(),s(),c(),l(),u(),d(),f(),p(),window.lucide&&lucide.createIcons()});function a(){let e=[`Software Engineer`,`Distributed Systems Builder`,`Security-Focused Developer`,`Cloud Architect`],t=0,n=0,r=!1,i=document.getElementById(`typewriter`);function a(){let o=e[t];r?(i.textContent=o.substring(0,n-1),n--):(i.textContent=o.substring(0,n+1),n++);let s=r?50:100;!r&&n===o.length?(s=2e3,r=!0):r&&n===0&&(r=!1,t=(t+1)%e.length,s=500),setTimeout(a,s)}a()}function o(){let e=document.getElementById(`particle-canvas`),t=e.getContext(`2d`),n=[];function r(){e.width=window.innerWidth,e.height=window.innerHeight}window.addEventListener(`resize`,r),r();class i{constructor(){this.init()}init(){this.x=Math.random()*e.width,this.y=Math.random()*e.height,this.vx=(Math.random()-.5)*.5,this.vy=(Math.random()-.5)*.5,this.radius=Math.random()*2}update(){this.x+=this.vx,this.y+=this.vy,(this.x<0||this.x>e.width)&&(this.vx*=-1),(this.y<0||this.y>e.height)&&(this.vy*=-1)}draw(){t.beginPath(),t.arc(this.x,this.y,this.radius,0,Math.PI*2),t.fillStyle=`rgba(0, 243, 255, 0.5)`,t.fill()}}for(let e=0;e<100;e++)n.push(new i);function a(){t.clearRect(0,0,e.width,e.height),n.forEach(e=>{e.update(),e.draw()});for(let e=0;e<n.length;e++)for(let r=e+1;r<n.length;r++){let i=n[e].x-n[r].x,a=n[e].y-n[r].y,o=Math.sqrt(i*i+a*a);o<150&&(t.beginPath(),t.moveTo(n[e].x,n[e].y),t.lineTo(n[r].x,n[r].y),t.strokeStyle=`rgba(188, 19, 254, ${1-o/150})`,t.lineWidth=.5,t.stroke())}requestAnimationFrame(a)}a()}function s(){let t=document.getElementById(`experience-timeline`);t.innerHTML=e.map(e=>`
    <div class="timeline-item reveal">
      <div class="timeline-dot"></div>
      <div class="glass-card exp-card">
        <h3>${e.role}</h3>
        <p class="company">${e.company} | ${e.location} | ${e.period}</p>
        <ul>
          ${e.points.map(e=>`<li>${e}</li>`).join(``)}
        </ul>
      </div>
    </div>
  `).join(``)}function c(){let e=document.getElementById(`featured-projects`);e.innerHTML=t.map(e=>`
    <div class="glass-card project-card reveal">
      <h3>${e.title}</h3>
      <p>${e.description}</p>
      <div class="tags">
        ${e.tags.map(e=>`<span class="tag">${e}</span>`).join(``)}
      </div>
      <a href="${e.link}" class="btn-link">View Details &rarr;</a>
    </div>
  `).join(``)}async function l(){let e=document.getElementById(`github-projects`);try{e.innerHTML=(await(await fetch(`https://api.github.com/users/vinay0304/repos?sort=updated&per_page=6`)).json()).map(e=>`
      <div class="glass-card project-card reveal">
        <div class="repo-header">
           <h3>${e.name}</h3>
           <span class="stars"><i data-lucide="star"></i> ${e.stargazers_count}</span>
        </div>
        <p>${e.description||`No description available.`}</p>
        <div class="tags">
          <span class="tag language">${e.language||`Code`}</span>
        </div>
        <a href="${e.html_url}" target="_blank" class="btn-link">GitHub <i data-lucide="external-link"></i></a>
      </div>
    `).join(``),window.lucide&&lucide.createIcons()}catch{e.innerHTML=`<p class="error">Failed to load repositories. Please check back later.</p>`}}function u(){let e=document.getElementById(`skills-container`);e.innerHTML=Object.entries(n).map(([e,t])=>`
    <div class="skill-category reveal">
      <h3>${e}</h3>
      <div class="skill-pills">
        ${t.map(e=>`<span class="skill-pill">${e}</span>`).join(``)}
      </div>
    </div>
  `).join(``)}function d(){let e=document.getElementById(`education-container`);e.innerHTML=r.map(e=>`
    <div class="glass-card education-card reveal">
      <h3>${e.school}</h3>
      <p class="degree">${e.degree}</p>
      <p class="period">${e.period}</p>
      <p class="coursework"><strong>Key Coursework:</strong> ${e.coursework}</p>
    </div>
  `).join(``)}function f(){let e=document.getElementById(`certs-container`);e.innerHTML=i.map(e=>`
    <div class="glass-card cert-card reveal">
      <i data-lucide="${e.icon}" class="cert-icon"></i>
      <h3>${e.name}</h3>
    </div>
  `).join(``)}function p(){let e=new IntersectionObserver(e=>{e.forEach(e=>{e.isIntersecting&&(e.target.classList.add(`active`),m(e.target.id))})},{threshold:.1});document.querySelectorAll(`section, .reveal`).forEach(t=>e.observe(t));let t=document.getElementById(`back-to-top`);window.addEventListener(`scroll`,()=>{window.scrollY>500?t.classList.add(`show`):t.classList.remove(`show`)}),t.addEventListener(`click`,()=>{window.scrollTo({top:0,behavior:`smooth`})})}function m(e){document.querySelectorAll(`.nav-links a`).forEach(t=>{t.classList.remove(`active`),t.getAttribute(`href`)===`#${e}`&&t.classList.add(`active`)})}}))();