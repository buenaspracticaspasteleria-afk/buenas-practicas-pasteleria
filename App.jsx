import React,{useMemo,useState}from"react";
import{ShieldCheck,Thermometer,ClipboardCheck,SprayCan,Truck,FileText,Droplets,Users,TriangleAlert,ChevronLeft,Home,CheckCircle2,Clock3,Plus,Save}from"lucide-react";

const MODULOS=[
["Preparación Sanidad","Cuestionario y control general para inspección",ShieldCheck],
["Temperaturas","Registro de cámaras, congeladores y equipos",Thermometer],
["Plan de limpieza","Plan, frecuencias y registros de limpieza",SprayCan],
["Control de recepción","Recepción de mercancías y comprobaciones",Truck],
["Registro trimestral","Revisión trimestral y seguimiento",ClipboardCheck],
["Aceite y agua","Documentos de aceite usado y suministro de agua",Droplets],
["Documentación","Fichas técnicas, seguridad y registros",FileText],
["Alérgenos","Control documental de alérgenos",ShieldCheck],
["Personal y PRL","Formación, certificados y documentación",Users],
["Incidencias","Registro y seguimiento de incidencias",TriangleAlert],
];

const key=n=>"bpp-"+n.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/\s+/g,"-");
function leer(n){try{return JSON.parse(localStorage.getItem(key(n))||"[]")}catch{return[]}}
function guardar(n,v){localStorage.setItem(key(n),JSON.stringify(v))}

function Modulo({nombre,descripcion,onBack}){
 const[items,setItems]=useState(()=>leer(nombre)); const[texto,setTexto]=useState("");
 const add=()=>{if(!texto.trim())return;const n=[...items,{id:Date.now(),texto:texto.trim(),hecho:false,fecha:new Date().toLocaleDateString("es-ES")}];setItems(n);guardar(nombre,n);setTexto("")};
 const toggle=id=>{const n=items.map(x=>x.id===id?{...x,hecho:!x.hecho}:x);setItems(n);guardar(nombre,n)};
 return <main className="page"><header className="top"><button className="back" onClick={onBack}><ChevronLeft/> Volver</button><div><small>BUENAS PRÁCTICAS PASTELERÍA</small><h1>{nombre}</h1><p>{descripcion}</p></div></header>
 <section className="panel"><h2>Nuevo registro</h2><div className="add"><input value={texto} onChange={e=>setTexto(e.target.value)} onKeyDown={e=>e.key==="Enter"&&add()} placeholder="Escribe una anotación, control o documento pendiente…"/><button onClick={add}><Plus/> Añadir</button></div></section>
 <section className="panel"><div className="sectionTitle"><h2>Registros</h2><span>{items.length}</span></div>{items.length===0?<div className="empty">Todavía no hay registros en este apartado.</div>:<div className="records">{items.map(x=><button key={x.id} className={"record "+(x.hecho?"done":"")} onClick={()=>toggle(x.id)}><span>{x.hecho?<CheckCircle2/>:<Clock3/>}</span><div><b>{x.texto}</b><small>{x.fecha}</small></div></button>)}</div>}</section></main>
}

export default function App(){
 const[actual,setActual]=useState(null);
 const resumen=useMemo(()=>MODULOS.map(([n])=>leer(n)).flat(),[actual]);
 if(actual){const m=MODULOS.find(x=>x[0]===actual);return <Modulo nombre={m[0]} descripcion={m[1]} onBack={()=>setActual(null)}/>}
 const hechos=resumen.filter(x=>x.hecho).length, pendientes=resumen.length-hechos;
 return <main className="page"><header className="hero"><div className="brand"><ShieldCheck/><div><small>CONTROL SANITARIO</small><h1>Buenas Prácticas Pastelería</h1><p>Aplicación independiente para organizar registros, documentación y preparación sanitaria.</p></div></div></header>
 <section className="stats"><article><CheckCircle2/><div><b>{hechos}</b><span>Completados</span></div></article><article><Clock3/><div><b>{pendientes}</b><span>Pendientes</span></div></article><article><FileText/><div><b>{resumen.length}</b><span>Registros</span></div></article></section>
 <section><div className="heading"><div><small>GESTIÓN</small><h2>Buenas prácticas</h2></div><span>Selecciona un apartado</span></div><div className="grid">{MODULOS.map(([n,d,I])=><button className="card" key={n} onClick={()=>setActual(n)}><span className="icon"><I/></span><div><h3>{n}</h3><p>{d}</p></div><ChevronLeft className="go"/></button>)}</div></section>
 <footer>Aplicación independiente · Los datos de esta versión se guardan en este dispositivo.</footer></main>
}