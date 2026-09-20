import React,{useEffect,useState}from"react";
import{ShieldCheck,Thermometer,ClipboardCheck,SprayCan,Truck,FileText,Droplets,Users,TriangleAlert,ChevronLeft,CheckCircle2,Clock3,Plus,Trash2,LoaderCircle}from"lucide-react";
import{supabase}from"./lib/supabase.js";
const MODULOS=[
["Preparación Sanidad","preparacion_sanidad","Cuestionario y control general para inspección",ShieldCheck],
["Temperaturas","temperaturas","Registro de cámaras, congeladores y equipos",Thermometer],
["Plan de limpieza","limpieza","Plan, frecuencias y registros de limpieza",SprayCan],
["Control de recepción","recepcion","Recepción de mercancías y comprobaciones",Truck],
["Registro trimestral","registro_trimestral","Revisión trimestral y seguimiento",ClipboardCheck],
["Aceite y agua","aceite_agua","Documentos de aceite usado y suministro de agua",Droplets],
["Documentación","documentacion","Fichas técnicas, seguridad y registros",FileText],
["Alérgenos","alergenos","Control documental de alérgenos",ShieldCheck],
["Personal y PRL","personal_prl","Formación, certificados y documentación",Users],
["Incidencias","incidencias","Registro y seguimiento de incidencias",TriangleAlert]];
function Modulo({m,onBack,onChanged}){
 const[nombre,codigo,descripcion]=m,[items,setItems]=useState([]),[texto,setTexto]=useState(""),[loading,setLoading]=useState(true),[error,setError]=useState("");
 async function cargar(){setLoading(true);const{data,error}=await supabase.from("bp_registros").select("*").eq("modulo",codigo).order("fecha",{ascending:false}).order("creado_en",{ascending:false});setLoading(false);if(error)setError(error.message);else{setError("");setItems(data||[])}}
 useEffect(()=>{cargar()},[codigo]);
 async function add(){if(!texto.trim())return;const{error}=await supabase.from("bp_registros").insert({modulo:codigo,titulo:texto.trim(),estado:"pendiente"});if(error)return setError(error.message);setTexto("");await cargar();onChanged()}
 async function toggle(x){const estado=x.estado==="correcto"?"pendiente":"correcto";const{error}=await supabase.from("bp_registros").update({estado}).eq("id",x.id);if(error)return setError(error.message);await cargar();onChanged()}
 async function borrar(e,id){e.stopPropagation();if(!confirm("¿Eliminar este registro?"))return;const{error}=await supabase.from("bp_registros").delete().eq("id",id);if(error)return setError(error.message);await cargar();onChanged()}
 return <main className="page"><header className="top"><button className="back" onClick={onBack}><ChevronLeft/> Volver</button><div><small>BUENAS PRÁCTICAS PASTELERÍA</small><h1>{nombre}</h1><p>{descripcion}</p></div></header>
 <section className="panel"><h2>Nuevo registro</h2><div className="add"><input value={texto} onChange={e=>setTexto(e.target.value)} onKeyDown={e=>e.key==="Enter"&&add()} placeholder="Escribe una anotación, control o documento pendiente…"/><button onClick={add}><Plus/> Añadir</button></div>{error&&<p className="error">{error}</p>}</section>
 <section className="panel"><div className="sectionTitle"><h2>Registros guardados en Supabase</h2><span>{items.length}</span></div>{loading?<div className="empty"><LoaderCircle className="spin"/> Cargando…</div>:items.length===0?<div className="empty">Todavía no hay registros en este apartado.</div>:<div className="records">{items.map(x=><button key={x.id} className={"record "+(x.estado==="correcto"?"done":"")} onClick={()=>toggle(x)}><span>{x.estado==="correcto"?<CheckCircle2/>:<Clock3/>}</span><div><b>{x.titulo}</b><small>{new Date(x.fecha+"T00:00:00").toLocaleDateString("es-ES")} · {x.estado}</small></div><Trash2 className="trash" onClick={e=>borrar(e,x.id)}/></button>)}</div>}</section></main>}
export default function App(){
 const[actual,setActual]=useState(null),[stats,setStats]=useState({total:0,ok:0,pend:0}),[estado,setEstado]=useState("Conectando con Supabase…");
 async function resumen(){const{data,error}=await supabase.from("bp_registros").select("estado");if(error){setEstado("Error de conexión: "+error.message);return}const a=data||[],ok=a.filter(x=>x.estado==="correcto").length;setStats({total:a.length,ok,pend:a.length-ok});setEstado("Supabase conectado")}
 useEffect(()=>{resumen()},[]);
 if(actual){const m=MODULOS.find(x=>x[1]===actual);return <Modulo m={m} onBack={()=>{setActual(null);resumen()}} onChanged={resumen}/>}
 return <main className="page"><header className="hero"><div className="brand"><ShieldCheck/><div><small>CONTROL SANITARIO</small><h1>Buenas Prácticas Pastelería</h1><p>Aplicación independiente conectada a su propia base de datos.</p><span className="connection">{estado}</span></div></div></header>
 <section className="stats"><article><CheckCircle2/><div><b>{stats.ok}</b><span>Completados</span></div></article><article><Clock3/><div><b>{stats.pend}</b><span>Pendientes</span></div></article><article><FileText/><div><b>{stats.total}</b><span>Registros</span></div></article></section>
 <section><div className="heading"><div><small>GESTIÓN</small><h2>Buenas prácticas</h2></div><span>Selecciona un apartado</span></div><div className="grid">{MODULOS.map(([n,c,d,I])=><button className="card" key={c} onClick={()=>setActual(c)}><span className="icon"><I/></span><div><h3>{n}</h3><p>{d}</p></div><ChevronLeft className="go"/></button>)}</div></section><footer>Aplicación independiente · Base de datos propia Supabase</footer></main>}
