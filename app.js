const products = [
 {id:1,name:"Latte de la casa",category:"Cafés",price:8500,desc:"Espresso suave con leche cremosa.",img:"https://images.unsplash.com/photo-146 mi".replace("146 mi","1461023058943-07fcbe16d735")},
 {id:2,name:"Capuccino",category:"Cafés",price:8000,desc:"Café intenso con espuma de leche.",img:"https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?auto=format&fit=crop&w=700&q=80"},
 {id:3,name:"Cold brew",category:"Bebidas",price:9000,desc:"Café frío, refrescante y aromático.",img:"https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=700&q=80"},
 {id:4,name:"Chocolate cremoso",category:"Bebidas",price:7500,desc:"Una bebida cálida y reconfortante.",img:"https://images.unsplash.com/photo-1542990253-0b8be4f5b5a5?auto=format&fit=crop&w=700&q=80"},
 {id:5,name:"Cheesecake",category:"Postres",price:9500,desc:"Porción dulce y suave para disfrutar.",img:"https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=700&q=80"},
 {id:6,name:"Brownie",category:"Postres",price:7000,desc:"Chocolate intenso en cada bocado.",img:"https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=700&q=80"},
 {id:7,name:"Galletas de la casa",category:"Snacks",price:5000,desc:"Crujientes, ideales para acompañar.",img:"https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=700&q=80"},
 {id:8,name:"Sándwich especial",category:"Snacks",price:11000,desc:"Una opción salada para compartir.",img:"https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=700&q=80"}
];
const money = n => new Intl.NumberFormat("es-CO",{style:"currency",currency:"COP",maximumFractionDigits:0}).format(n);
let cart = JSON.parse(localStorage.getItem("ct_cart") || "[]");
let category = "Todos";
const grid = document.getElementById("productGrid");
const toast = document.getElementById("toast");
function notify(message){toast.textContent=message;toast.classList.add("show");setTimeout(()=>toast.classList.remove("show"),2300)}
function renderProducts(){
 const q=document.getElementById("searchInput").value.trim().toLowerCase();
 const shown=products.filter(p=>(category==="Todos"||p.category===category)&&(p.name.toLowerCase().includes(q)||p.desc.toLowerCase().includes(q)));
 grid.innerHTML=shown.length?shown.map(p=>`<article class="product-card"><div class="product-image"><img src="${p.img}" alt="${p.name}" loading="lazy" onerror="this.style.display='none'"></div><div class="product-info"><span class="product-category">${p.category}</span><h3>${p.name}</h3><p>${p.desc}</p><div class="product-bottom"><span class="price">${money(p.price)}</span><button class="add-button" data-add="${p.id}" aria-label="Agregar ${p.name}">+</button></div></div></article>`).join(""):'<p class="no-results">No encontramos productos. Prueba con otra búsqueda.</p>';
}
function saveCart(){localStorage.setItem("ct_cart",JSON.stringify(cart));renderCart()}
function addToCart(id){const item=cart.find(x=>x.id===id);if(item)item.qty++;else cart.push({id,qty:1});saveCart();notify("¡Agregado a tu pedido!")}
function renderCart(){
 document.getElementById("cartCount").textContent=cart.reduce((s,x)=>s+x.qty,0);
 const el=document.getElementById("cartItems");
 if(!cart.length){el.innerHTML='<div class="empty-cart">Tu pedido está esperando algo delicioso ☕</div>'}
 else el.innerHTML=cart.map(x=>{const p=products.find(y=>y.id===x.id);return `<div class="cart-item"><div><h4>${p.name}</h4><small>${money(p.price)} · ${money(p.price*x.qty)}</small></div><div class="quantity"><button data-change="-1" data-id="${p.id}" aria-label="Quitar uno">−</button><b>${x.qty}</b><button data-change="1" data-id="${p.id}" aria-label="Agregar uno">+</button></div></div>`}).join("");
 document.getElementById("cartTotal").textContent=money(cart.reduce((s,x)=>s+products.find(p=>p.id===x.id).price*x.qty,0));
 document.getElementById("checkoutButton").disabled=!cart.length;
}
function updatePoints(){const pts=Number(localStorage.getItem("ct_points")||0);document.getElementById("pointsDisplay").textContent=pts;document.getElementById("pointsBar").style.width=(pts%50/50*100)+"%";document.getElementById("pointsMessage").textContent=pts>=50?`¡Ya tienes ${pts} puntos! Recompensa de demostración desbloqueada.`:`Te faltan ${50-pts%50} puntos para tu recompensa.`}
grid.addEventListener("click",e=>{const b=e.target.closest("[data-add]");if(b)addToCart(Number(b.dataset.add))});
document.getElementById("filters").addEventListener("click",e=>{const b=e.target.closest("[data-category]");if(!b)return;category=b.dataset.category;document.querySelectorAll(".filter").forEach(x=>x.classList.toggle("active",x===b));renderProducts()});
document.getElementById("searchInput").addEventListener("input",renderProducts);
const overlay=document.getElementById("cartOverlay");
function openCart(){overlay.hidden=false;document.body.style.overflow="hidden"}
function closeCart(){overlay.hidden=true;document.body.style.overflow=""}
document.getElementById("openCart").addEventListener("click",openCart);
document.getElementById("closeCart").addEventListener("click",closeCart);
overlay.addEventListener("click",e=>{if(e.target===overlay)closeCart()});
document.getElementById("cartItems").addEventListener("click",e=>{const b=e.target.closest("[data-change]");if(!b)return;const item=cart.find(x=>x.id===Number(b.dataset.id));item.qty+=Number(b.dataset.change);if(item.qty<=0)cart=cart.filter(x=>x.id!==item.id);saveCart()});
document.getElementById("checkoutButton").addEventListener("click",()=>{if(!cart.length)return;const total=cart.reduce((s,x)=>s+products.find(p=>p.id===x.id).price*x.qty,0);const pts=Number(localStorage.getItem("ct_points")||0)+Math.max(1,Math.floor(total/1000));localStorage.setItem("ct_points",pts);cart=[];saveCart();updatePoints();document.getElementById("checkoutFeedback").textContent="¡Pedido de demostración confirmado! No se realizó ningún pago.";notify("Pedido confirmado · ¡Gracias!");});
document.getElementById("showPoints").addEventListener("click",()=>{updatePoints();document.getElementById("pointsDisplay").scrollIntoView({behavior:"smooth",block:"center"});notify("Tus puntos están actualizados")});
document.getElementById("contactForm").addEventListener("submit",e=>{e.preventDefault();const data=new FormData(e.target);const messages=JSON.parse(localStorage.getItem("ct_messages")||"[]");messages.push({name:data.get("name"),email:data.get("email"),message:data.get("message"),date:new Date().toISOString()});localStorage.setItem("ct_messages",JSON.stringify(messages));document.getElementById("contactFeedback").textContent="¡Mensaje guardado en este dispositivo! (Demostración)";e.target.reset()});
const menuToggle=document.getElementById("menuToggle"),nav=document.getElementById("mainNav");
menuToggle.addEventListener("click",()=>{const opened=nav.classList.toggle("open");menuToggle.setAttribute("aria-expanded",opened)});
nav.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>nav.classList.remove("open")));
document.getElementById("year").textContent=new Date().getFullYear();
renderProducts();renderCart();updatePoints();
if("serviceWorker" in navigator && location.protocol!=="file:"){window.addEventListener("load",()=>navigator.serviceWorker.register("./service-worker.js").catch(()=>{}))}
