// Mobile menu
const burger=document.getElementById('burger'),links=document.getElementById('links');
burger.onclick=()=>links.classList.toggle('open');
links.querySelectorAll('a').forEach(a=>a.onclick=()=>links.classList.remove('open'));

// EDIT: Typing animation titles
const titles=["Aspiring IT Professional","Junior Web & Systems Developer"];
let t=0,c=0,del=false;const el=document.getElementById('typed');
(function type(){
 const w=titles[t];
 el.textContent=w.substring(0,c);
 if(!del&&c<w.length){c++;setTimeout(type,80)}
 else if(!del){del=true;setTimeout(type,1500)}
 else if(c>0){c--;setTimeout(type,40)}
 else{del=false;t=(t+1)%titles.length;setTimeout(type,300)}
})();

// Scroll reveal
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)e.target.classList.add('show')}),{threshold:.1});
document.querySelectorAll('.reveal').forEach(r=>io.observe(r));

// Active nav link
const secs=document.querySelectorAll('section[id]'),navA=document.querySelectorAll('.links a');
addEventListener('scroll',()=>{
 let cur='';
 secs.forEach(s=>{if(scrollY>=s.offsetTop-120)cur=s.id});
 navA.forEach(a=>a.classList.toggle('active',a.getAttribute('href')==='#'+cur));
});

// Contact form -> sends message to your email via Web3Forms
document.getElementById('form').onsubmit=async e=>{
 e.preventDefault();
 const btn=document.getElementById('sendbtn'),st=document.getElementById('status');
 btn.disabled=true;btn.textContent='Sending...';st.textContent='';
 try{
  const res=await fetch('https://api.web3forms.com/submit',{
   method:'POST',
   headers:{'Content-Type':'application/json','Accept':'application/json'},
   body:JSON.stringify({
    access_key:document.getElementById('akey').value,
    subject:'New portfolio message from '+fname.value,
    name:fname.value,
    email:femail.value,
    message:fmsg.value
   })
  });
  const data=await res.json();
  if(data.success){st.textContent='Message sent! Thank you.';st.style.color='#4ade80';e.target.reset();}
  else{throw new Error(data.message);}
  }catch(err){
  st.textContent='Error: '+err.message+' (or email me at jayvannep@gmail.com)';
  st.style.color='#f87171';
 }
 btn.disabled=false;btn.textContent='Send Message';
};

// Footer year
document.getElementById('year').textContent=new Date().getFullYear();
