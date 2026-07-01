import { useState, useEffect, useRef } from "react";

// ─── Cover component ───────────────────────────────────────────────
function Cover({ color, mono, monoSize = "20px", style = {} }) {
  return (
    <div style={{
      width: "100%", height: "100%", position: "relative",
      borderRadius: 14, overflow: "hidden",
      display: "flex", alignItems: "center", justifyContent: "center",
      background: color, ...style
    }}>
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(140deg,rgba(255,255,255,.22),rgba(0,0,0,.34))" }} />
      <div style={{ position: "absolute", right: "-18%", bottom: "-22%", width: "62%", height: "62%", borderRadius: "50%", background: "rgba(255,255,255,.10)" }} />
      <span style={{ position: "relative", fontFamily: "'Roboto',system-ui,sans-serif", fontWeight: 600, fontSize: monoSize, color: "rgba(255,255,255,.94)", letterSpacing: ".5px" }}>{mono}</span>
    </div>
  );
}

// ─── Data ──────────────────────────────────────────────────────────
const PODCASTS = [
  { id: "p1", title: "Hoy en la Historia", author: "Marina Ruiz", category: "Historia", color: "#4D6B7C", mono: "HH", desc: "Cada episodio reabre un capítulo del pasado con rigor y narración cuidada. Historias que explican el presente." },
  { id: "p2", title: "Mentes Curiosas", author: "Dr. Iván Soto", category: "Ciencia", color: "#3F7C6B", mono: "MC", desc: "Ciencia cotidiana explicada sin tecnicismos. Preguntas grandes, respuestas claras y mucho asombro." },
  { id: "p3", title: "Café con Negocios", author: "Lucía Méndez", category: "Negocios", color: "#7C5C4D", mono: "CN", desc: "Conversaciones honestas sobre emprender, fracasar y volver a empezar. Sin humo, con café." },
  { id: "p4", title: "Cine en Bucle", author: "Pablo Arias", category: "Cine", color: "#6B4D7C", mono: "CB", desc: "Análisis, debates y rarezas del cine clásico y moderno. Para quienes se quedan hasta los créditos." },
  { id: "p5", title: "Bienestar Diario", author: "Sara Núñez", category: "Bienestar", color: "#4D7C6B", mono: "BD", desc: "Pequeños hábitos, grandes cambios. Sueño, hábitos y calma respaldados por la evidencia." },
  { id: "p6", title: "Tech al Día", author: "Equipo Vértice", category: "Tecnología", color: "#4D5B7C", mono: "TD", desc: "Lo que importa en tecnología, sin ruido. Resúmenes claros y opiniones afiladas cada semana." },
  { id: "p7", title: "Voces del Mundo", author: "Redacción Atlas", category: "Actualidad", color: "#7C4D5B", mono: "VM", desc: "Reportajes y crónicas desde donde ocurren las cosas. Periodismo en formato audio." },
  { id: "p8", title: "Misterios Sin Resolver", author: "Elena Vidal", category: "True Crime", color: "#5A4D7C", mono: "MR", desc: "Casos reales sin respuesta, contados con cuidado y respeto. Que no te dejarán dormir." },
];

const PLACEHOLDER_AUDIO = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3";
const mkEp = (id, pid, title, min, date, desc, url = PLACEHOLDER_AUDIO) => ({ id, pid, title, durationSec: min * 60, dateLabel: date, desc, url });
const EPISODES = [
  mkEp("e1", "p1", "El imperio que cayó en un solo día", 48, "Hace 2 días", "Una jornada de decisiones precipitadas que cambió el mapa de un continente para siempre."),
  mkEp("e2", "p1", "Cartas desde la trinchera", 39, "Hace 6 días", "Las palabras íntimas de quienes vivieron la guerra desde dentro, leídas un siglo después."),
  mkEp("e3", "p1", "Reinas olvidadas de la Edad Media", 52, "12 jun", "Gobernaron, conspiraron y resistieron, pero los libros apenas las nombran. Hoy las recuperamos."),
  mkEp("e4", "p2", "¿Por qué soñamos?", 41, "Hace 1 día", "Qué hace tu cerebro mientras duermes y por qué la ciencia aún no se pone de acuerdo."),
  mkEp("e5", "p2", "El universo en una cucharadita", 36, "9 jun", "Densidad, estrellas de neutrones y cifras imposibles de imaginar, explicadas con calma."),
  mkEp("e6", "p3", "De garaje a millones", 44, "Hace 3 días", "La historia real detrás de una empresa que empezó con cero y casi quiebra tres veces."),
  mkEp("e7", "p3", "Negociar sin perder la calma", 29, "7 jun", "Tácticas sencillas para llegar a acuerdos sin que la conversación se convierta en batalla."),
  mkEp("e8", "p4", "Las secuelas que superaron al original", 57, "Hace 4 días", "Pocas lo logran, pero cuando ocurre es memorable. Repasamos las mejores continuaciones del cine."),
  mkEp("e9", "p4", "Directores que rompieron las reglas", 50, "5 jun", "Cuando saltarse el manual define una época entera del cine. Cinco nombres imprescindibles."),
  mkEp("e10", "p5", "Dormir mejor en 7 pasos", 33, "Hace 5 días", "Una rutina realista para descansar de verdad, sin recetas mágicas ni promesas vacías."),
  mkEp("e11", "p5", "La ciencia de los hábitos", 38, "2 jun", "Por qué cuesta tanto cambiar y qué dice la investigación sobre cómo lograrlo de verdad."),
  mkEp("e12", "p6", "IA en tu bolsillo", 46, "Hace 1 día", "Qué pueden hacer hoy los modelos en tu móvil y qué es todavía pura promesa de marketing."),
  mkEp("e13", "p6", "El fin de las contraseñas", 31, "4 jun", "Llaves de acceso, biometría y el adiós lento pero firme a recordar claves imposibles."),
  mkEp("e14", "p7", "Crónicas de una frontera", 49, "Hace 2 días", "Voces de quienes cruzan, esperan y resisten en uno de los límites más transitados del mundo."),
  mkEp("e15", "p8", "El caso del faro silencioso", 61, "Hace 3 días", "Tres fareros desaparecieron sin dejar rastro. Un siglo después, las preguntas siguen abiertas."),
  mkEp("e16", "p8", "Desapariciones en el bosque", 55, "6 jun", "Patrones inquietantes, testigos que no coinciden y un mapa lleno de puntos sin explicación."),
];

const EP_MAP = Object.fromEntries(EPISODES.map(e => [e.id, e]));
const P_MAP = Object.fromEntries(PODCASTS.map(p => [p.id, p]));

// ─── Helpers ───────────────────────────────────────────────────────
const fmt = (sec) => { sec = Math.max(0, Math.round(sec)); const h = Math.floor(sec / 3600), m = Math.floor((sec % 3600) / 60), s = sec % 60; const p = n => String(n).padStart(2, "0"); return h > 0 ? `${h}:${p(m)}:${p(s)}` : `${m}:${p(s)}`; };
const durLabel = (sec) => { const m = Math.round(sec / 60); return m >= 60 ? `${Math.floor(m / 60)} h ${m % 60} min` : `${m} min`; };
const has = (arr, id) => arr.includes(id);
const toggle = (arr, id) => has(arr, id) ? arr.filter(x => x !== id) : [...arr, id];

const loadState = () => { try { const r = localStorage.getItem("pod_app_v2"); return r ? JSON.parse(r) : {}; } catch { return {}; } };
const saveState = (s) => { try { localStorage.setItem("pod_app_v2", JSON.stringify({ favorites: s.favorites, listened: s.listened, downloads: s.downloads, queue: s.queue, nowPlaying: s.nowPlaying, progress: s.progress, speed: s.speed })); } catch {} };

const chaptersFor = (ep) => {
  const titles = ["Introducción", "El contexto", "El nudo de la historia", "Lo que nadie esperaba", "Preguntas abiertas", "Cierre y conclusiones"];
  const n = Math.min(6, Math.max(3, Math.round(ep.durationSec / 720)));
  return Array.from({ length: n }, (_, i) => ({ title: titles[i] || `Parte ${i + 1}`, at: Math.round(ep.durationSec * i / n) }));
};

// ─── Icons ─────────────────────────────────────────────────────────
const IcHeart = ({ filled }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill={filled ? "#E0533D" : "none"}>
    <path d="M12 21s-7.5-4.6-10-9.3C.6 8.9 2 5.5 5.2 5.5c2 0 3.2 1.2 3.8 2.2.6-1 1.8-2.2 3.8-2.2 3.2 0 4.6 3.4 3.2 6.2C19.5 16.4 12 21 12 21z" stroke={filled ? "#E0533D" : "#C9C4CF"} strokeWidth="1.7" />
  </svg>
);
const IcQueueAdd = ({ inq }) => inq ? (
  <svg width="22" height="22" viewBox="0 0 24 24"><path d="M4 7h11M4 12h11M4 17h7" stroke="#5BBF8A" strokeWidth="2" strokeLinecap="round" /><path d="M14.5 18.5l2 2 4-4" stroke="#5BBF8A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" /></svg>
) : (
  <svg width="22" height="22" viewBox="0 0 24 24"><path d="M4 7h13M4 12h13M4 17h7" stroke="#C9C4CF" strokeWidth="2" strokeLinecap="round" /><path d="M18 14v7M14.5 17.5h7" stroke="#C9C4CF" strokeWidth="2" strokeLinecap="round" /></svg>
);
const IcDownload = ({ dl }) => dl ? (
  <svg width="22" height="22" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" fill="#5BBF8A" /><path d="M8 12l3 3 5-6" stroke="#10241b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" /></svg>
) : (
  <svg width="22" height="22" viewBox="0 0 24 24"><path d="M12 4v10m0 0l-4-4m4 4l4-4M5 19h14" stroke="#C9C4CF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" /></svg>
);
const IcListened = ({ on }) => on ? (
  <svg width="24" height="24" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="#5BBF8A" /><path d="M7 12.5l3.2 3.2L17 9" stroke="#10241b" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none" /></svg>
) : (
  <svg width="24" height="24" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9.2" stroke="#C9C4CF" strokeWidth="1.8" fill="none" /><path d="M8 12.5l2.8 2.8L16 9.5" stroke="#C9C4CF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" /></svg>
);
const IcPlay = ({ color = "#1a0d09", size = 18 }) => <svg width={size} height={size} viewBox="0 0 24 24"><path d="M8 5v14l11-7z" fill={color} /></svg>;
const IcPause = ({ color = "#1a0d09", size = 18 }) => <svg width={size} height={size} viewBox="0 0 24 24"><rect x="6" y="5" width="4" height="14" rx="1" fill={color} /><rect x="14" y="5" width="4" height="14" rx="1" fill={color} /></svg>;

// ─── Main App ──────────────────────────────────────────────────────
export default function App() {
  const saved = loadState();
  const [screen, setScreen] = useState("home");
  const [detailPid, setDetailPid] = useState(null);
  const [playerOpen, setPlayerOpen] = useState(false);
  const [chaptersOpen, setChaptersOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(saved.speed || 1);
  const [favorites, setFavorites] = useState(saved.favorites || ["p2", "p4", "p8"]);
  const [listened, setListened] = useState(saved.listened || ["e2", "e10"]);
  const [downloads, setDownloads] = useState(saved.downloads || ["e1", "e10", "e8"]);
  const [queue, setQueue] = useState(saved.queue || ["e1", "e4", "e8", "e12", "e15"]);
  const [nowPlaying, setNowPlaying] = useState(saved.nowPlaying || "e1");
  const [progress, setProgress] = useState(saved.progress || { e1: 18 * 60, e6: 11 * 60, e14: 5 * 60, e2: 39 * 60, e10: 33 * 60 });
  const [dragFrom, setDragFrom] = useState(null);
  const [dragOver, setDragOver] = useState(null);
  const audioRef = useRef(typeof Audio !== 'undefined' ? new Audio() : null);
  const stateRef = useRef({});

  const state = { screen, detailPid, playerOpen, chaptersOpen, searchQuery, isPlaying, speed, favorites, listened, downloads, queue, nowPlaying, progress };
  stateRef.current = { nowPlaying, queue, progress, isPlaying, speed };

  useEffect(() => { saveState(state); }, [favorites, listened, downloads, queue, nowPlaying, progress, speed]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const ep = EP_MAP[nowPlaying];
    if (!ep?.url) { audio.src = ''; return; }
    const { progress, speed, isPlaying } = stateRef.current;
    audio.src = ep.url;
    audio.currentTime = progress[nowPlaying] || 0;
    audio.playbackRate = speed;
    if (isPlaying) audio.play().catch(() => setIsPlaying(false));
  }, [nowPlaying]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) { audio.play().catch(() => setIsPlaying(false)); } else { audio.pause(); }
  }, [isPlaying]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.playbackRate = speed;
  }, [speed]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const onTimeUpdate = () => {
      const { nowPlaying } = stateRef.current;
      setProgress(prev => ({ ...prev, [nowPlaying]: audio.currentTime }));
    };
    const onEnded = () => {
      const { queue, nowPlaying } = stateRef.current;
      const i = queue.indexOf(nowPlaying);
      const nid = queue[i + 1];
      if (!nid) { setIsPlaying(false); return; }
      setProgress(p => { const ep = EP_MAP[nid]; const cur = p[nid] || 0; return cur >= ep.durationSec ? { ...p, [nid]: 0 } : p; });
      setNowPlaying(nid); setIsPlaying(true);
    };
    audio.addEventListener('timeupdate', onTimeUpdate);
    audio.addEventListener('ended', onEnded);
    return () => {
      audio.removeEventListener('timeupdate', onTimeUpdate);
      audio.removeEventListener('ended', onEnded);
    };
  }, []);

  // mutations
  const playEp = (id) => {
    const audio = audioRef.current;
    const ep = EP_MAP[id];
    const cur = progress[id] || 0;
    const startTime = cur >= ep.durationSec ? 0 : cur;
    setQueue(q => has(q, id) ? q : [...q, id]);
    if (startTime === 0) setProgress(p => ({ ...p, [id]: 0 }));
    if (id === nowPlaying && audio) audio.currentTime = startTime;
    setNowPlaying(id); setIsPlaying(true);
  };
  const nextEp = () => {
    const i = queue.indexOf(nowPlaying); const nid = queue[i + 1];
    if (!nid) { setIsPlaying(false); return; }
    setProgress(p => { const ep = EP_MAP[nid]; const cur = p[nid] || 0; return cur >= ep.durationSec ? { ...p, [nid]: 0 } : p; });
    setNowPlaying(nid); setIsPlaying(true);
  };
  const skip = (d) => {
    const audio = audioRef.current;
    const ep = EP_MAP[nowPlaying];
    if (!ep) return;
    const v = Math.max(0, Math.min(ep.durationSec, (progress[nowPlaying] || 0) + d));
    if (audio) audio.currentTime = v;
    setProgress(p => ({ ...p, [nowPlaying]: v }));
  };
  const seekFraction = (f) => {
    const audio = audioRef.current;
    const ep = EP_MAP[nowPlaying];
    if (!ep) return;
    const v = Math.max(0, Math.min(1, f)) * ep.durationSec;
    if (audio) audio.currentTime = v;
    setProgress(p => ({ ...p, [nowPlaying]: v }));
  };
  const reorder = (from, to) => { if (from == null || to == null || from === to) return; const q = [...queue]; const [m] = q.splice(from, 1); q.splice(to, 0, m); setQueue(q); };

  const nowEp = nowPlaying ? EP_MAP[nowPlaying] : null;
  const nowP = nowEp ? P_MAP[nowEp.pid] : null;
  const nowProg = nowPlaying ? (progress[nowPlaying] || 0) : 0;
  const nowPct = nowEp ? Math.max(0, Math.min(100, nowProg / nowEp.durationSec * 100)).toFixed(1) + "%" : "0%";
  const chapters = nowEp ? chaptersFor(nowEp) : [];
  let curChapter = 0; chapters.forEach((c, i) => { if (nowProg >= c.at) curChapter = i; });

  const h = new Date().getHours();
  const greeting = h < 6 ? "Buenas noches" : h < 13 ? "Buenos días" : h < 20 ? "Buenas tardes" : "Buenas noches";
  const speedOpts = [1, 1.25, 1.5, 2, 0.75];
  const speedNames = { 0.75: "0.75x", 1: "1.0x", 1.25: "1.25x", 1.5: "1.5x", 2: "2.0x" };

  const continueEps = EPISODES.filter(e => { const pr = progress[e.id] || 0; return pr > 0 && pr < e.durationSec && !has(listened, e.id); }).slice(0, 5);
  const favPodcasts = PODCASTS.filter(p => has(favorites, p.id));
  const q = searchQuery.trim().toLowerCase();
  const searchResults = q ? PODCASTS.filter(p => p.title.toLowerCase().includes(q) || p.author.toLowerCase().includes(q) || p.category.toLowerCase().includes(q)) : [];
  const categories = [
    { name: "Historia", bg: "#4D6B7C" }, { name: "Ciencia", bg: "#3F7C6B" },
    { name: "Negocios", bg: "#7C5C4D" }, { name: "Cine", bg: "#6B4D7C" },
    { name: "Bienestar", bg: "#4D7C6B" }, { name: "True Crime", bg: "#5A4D7C" },
  ];
  const detailP = detailPid ? P_MAP[detailPid] : null;
  const detailEps = detailP ? EPISODES.filter(e => e.pid === detailP.id) : [];

  // ── Styles ──
  const S = {
    app: { height: "100vh", width: "100vw", display: "flex", flexDirection: "column", background: "#141218", color: "#E6E1E9", position: "relative", overflow: "hidden", fontFamily: "'Roboto',system-ui,sans-serif", WebkitFontSmoothing: "antialiased" },
    scroll: { overflowY: "auto", scrollbarWidth: "none" },
    scrollX: { overflowX: "auto", scrollbarWidth: "none" },
  };

  // ── Nav ──
  const navItems = [
    { key: "home", label: "Inicio" },
    { key: "search", label: "Buscar" },
    { key: "queue", label: "Cola" },
    { key: "library", label: "Biblioteca" },
  ];
  const NavIcon = ({ k, active }) => {
    const c = active ? "#E0533D" : "#9B96A3";
    if (k === "home") return <svg width="24" height="24" viewBox="0 0 24 24" fill={active ? "#E0533D" : "none"}><path d="M4 11.5L12 4l8 7.5V20a1 1 0 01-1 1h-4v-6h-6v6H5a1 1 0 01-1-1z" stroke={active ? "none" : "#9B96A3"} strokeWidth="1.8" strokeLinejoin="round" /></svg>;
    if (k === "search") return <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><circle cx="11" cy="11" r="7" stroke={c} strokeWidth="1.9" /><path d="M20 20l-3.6-3.6" stroke={c} strokeWidth="1.9" strokeLinecap="round" /></svg>;
    if (k === "queue") return <svg width="24" height="24" viewBox="0 0 24 24"><path d="M4 7h11M4 12h11M4 17h7" stroke={c} strokeWidth="1.9" strokeLinecap="round" /><path d="M17 10l4 3.5-4 3.5z" fill={c} /></svg>;
    if (k === "library") return <svg width="24" height="24" viewBox="0 0 24 24"><path d="M5 4v16M9 4v16" stroke={c} strokeWidth="1.9" strokeLinecap="round" /><rect x="12.5" y="4.5" width="6.5" height="15.5" rx="1" transform="rotate(-9 15 12)" stroke={c} strokeWidth="1.7" fill="none" /></svg>;
    return null;
  };

  return (
    <div style={S.app}>
      {/* ── HOME ── */}
      {screen === "home" && (
        <div style={{ flex: 1, ...S.scroll }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 20px 10px" }}>
            <div>
              <div style={{ fontSize: 13, color: "#A39FAA" }}>{greeting}</div>
              <div style={{ fontFamily: "'Roboto Serif',serif", fontSize: 25, fontWeight: 600, color: "#F3EFF7", marginTop: 2 }}>Tu audio</div>
            </div>
            <div style={{ width: 38, height: 38, borderRadius: "50%", background: "linear-gradient(135deg,#E0533D,#b53620)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 600, fontSize: 15, color: "#fff" }}>A</div>
          </div>

          {continueEps.length > 0 && (
            <>
              <div style={{ padding: "6px 20px 4px", fontSize: 15, fontWeight: 600, color: "#E6E1E9" }}>Continuar escuchando</div>
              <div style={{ display: "flex", gap: 12, ...S.scrollX, padding: "8px 20px 14px" }}>
                {continueEps.map(ep => {
                  const p = P_MAP[ep.pid]; const pr = progress[ep.id] || 0; const pct = Math.max(0, Math.min(100, pr / ep.durationSec * 100)).toFixed(1) + "%";
                  return (
                    <div key={ep.id} onClick={() => playEp(ep.id)} style={{ flex: "0 0 230px", background: "#211F26", borderRadius: 16, padding: 12, cursor: "pointer", display: "flex", flexDirection: "column", gap: 10 }}>
                      <div style={{ display: "flex", gap: 11, alignItems: "center" }}>
                        <div style={{ width: 52, height: 52, flexShrink: 0 }}><Cover color={p.color} mono={p.mono} monoSize="19px" /></div>
                        <div style={{ minWidth: 0 }}>
                          <div style={{ fontSize: 14, fontWeight: 500, color: "#F3EFF7", lineHeight: 1.25, overflow: "hidden", textOverflow: "ellipsis", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" }}>{ep.title}</div>
                          <div style={{ fontSize: 12, color: "#A39FAA", marginTop: 3 }}>{p.title}</div>
                        </div>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
                        <div style={{ flex: 1, height: 4, borderRadius: 2, background: "#3A3741", overflow: "hidden" }}><div style={{ height: "100%", borderRadius: 2, background: "#E0533D", width: pct }} /></div>
                        <div style={{ width: 30, height: 30, borderRadius: "50%", background: "#E0533D", display: "flex", alignItems: "center", justifyContent: "center" }}><IcPlay /></div>
                      </div>
                      <div style={{ fontSize: 11, color: "#8E8A95" }}>Quedan {durLabel(ep.durationSec - pr)}</div>
                    </div>
                  );
                })}
              </div>
            </>
          )}

          <div style={{ padding: "6px 20px 2px", fontSize: 15, fontWeight: 600, color: "#E6E1E9" }}>Tus favoritos</div>
          <div style={{ display: "flex", gap: 14, ...S.scrollX, padding: "12px 20px 16px" }}>
            {favPodcasts.map(p => (
              <div key={p.id} onClick={() => setDetailPid(p.id)} style={{ flex: "0 0 110px", cursor: "pointer" }}>
                <div style={{ width: 110, height: 110 }}><Cover color={p.color} mono={p.mono} monoSize="34px" /></div>
                <div style={{ fontSize: 13, fontWeight: 500, color: "#E6E1E9", marginTop: 8, lineHeight: 1.2, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{p.title}</div>
                <div style={{ fontSize: 11.5, color: "#8E8A95", marginTop: 1 }}>{p.author}</div>
              </div>
            ))}
          </div>

          <div style={{ fontSize: 15, fontWeight: 600, color: "#E6E1E9", padding: "6px 20px 2px" }}>Descubrir podcasts</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 13, padding: "12px 20px 8px" }}>
            {PODCASTS.map(p => (
              <div key={p.id} onClick={() => setDetailPid(p.id)} style={{ cursor: "pointer", background: "#1B191F", borderRadius: 16, padding: 12, display: "flex", flexDirection: "column", gap: 9 }}>
                <div style={{ width: "100%", aspectRatio: "1" }}><Cover color={p.color} mono={p.mono} monoSize="40px" /></div>
                <div>
                  <div style={{ fontSize: 13.5, fontWeight: 500, color: "#F3EFF7", lineHeight: 1.2, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{p.title}</div>
                  <div style={{ fontSize: 11.5, color: "#8E8A95", marginTop: 2 }}>{p.category}</div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ height: 12 }} />
        </div>
      )}

      {/* ── SEARCH ── */}
      {screen === "search" && (
        <div style={{ flex: 1, ...S.scroll, padding: "8px 0 12px" }}>
          <div style={{ padding: "16px 20px 6px", fontFamily: "'Roboto Serif',serif", fontSize: 24, fontWeight: 600, color: "#F3EFF7" }}>Buscar</div>
          <div style={{ padding: "8px 20px 6px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 11, background: "#2A2730", borderRadius: 28, padding: "0 16px", height: 52 }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><circle cx="11" cy="11" r="7" stroke="#C9C4CF" strokeWidth="2" /><path d="M20 20l-3.5-3.5" stroke="#C9C4CF" strokeWidth="2" strokeLinecap="round" /></svg>
              <input value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder="Buscar podcast por título" style={{ flex: 1, background: "transparent", border: "none", outline: "none", color: "#F3EFF7", fontSize: 16, fontFamily: "'Roboto',sans-serif" }} />
              {searchQuery && <div onClick={() => setSearchQuery("")} style={{ cursor: "pointer" }}><svg width="20" height="20" viewBox="0 0 24 24"><path d="M6 6l12 12M18 6L6 18" stroke="#C9C4CF" strokeWidth="2" strokeLinecap="round" /></svg></div>}
            </div>
          </div>
          {searchQuery ? (
            <>
              <div style={{ padding: "8px 20px 4px", fontSize: 13, color: "#8E8A95" }}>{searchResults.length} {searchResults.length === 1 ? "resultado" : "resultados"}</div>
              {searchResults.map(p => (
                <div key={p.id} onClick={() => setDetailPid(p.id)} style={{ display: "flex", alignItems: "center", gap: 14, padding: "9px 20px", cursor: "pointer" }}>
                  <div style={{ width: 56, height: 56, flexShrink: 0 }}><Cover color={p.color} mono={p.mono} monoSize="20px" /></div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 15, fontWeight: 500, color: "#F3EFF7", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{p.title}</div>
                    <div style={{ fontSize: 13, color: "#A39FAA", marginTop: 2 }}>Podcast · {p.author}</div>
                  </div>
                  <div onClick={e => { e.stopPropagation(); setFavorites(fav => toggle(fav, p.id)); }}><IcHeart filled={has(favorites, p.id)} /></div>
                </div>
              ))}
              {searchResults.length === 0 && <div style={{ textAlign: "center", color: "#8E8A95", fontSize: 14, padding: "48px 30px" }}>Sin resultados para "{searchQuery}"</div>}
            </>
          ) : (
            <>
              <div style={{ padding: "14px 20px 6px", fontSize: 15, fontWeight: 600, color: "#E6E1E9" }}>Explorar categorías</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, padding: "12px 20px" }}>
                {categories.map(cat => (
                  <div key={cat.name} onClick={() => setSearchQuery(cat.name)} style={{ cursor: "pointer", height: 78, borderRadius: 14, padding: 13, background: cat.bg, display: "flex", alignItems: "flex-start" }}>
                    <span style={{ fontSize: 15, fontWeight: 600, color: "#fff", lineHeight: 1.2 }}>{cat.name}</span>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      )}

      {/* ── QUEUE ── */}
      {screen === "queue" && (
        <div style={{ flex: 1, ...S.scroll, padding: "8px 0 12px" }}>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", padding: "16px 20px 8px" }}>
            <div style={{ fontFamily: "'Roboto Serif',serif", fontSize: 24, fontWeight: 600, color: "#F3EFF7" }}>Cola</div>
            <div onClick={() => setQueue(nowPlaying ? [nowPlaying] : [])} style={{ fontSize: 13, color: "#E0533D", cursor: "pointer", padding: "6px 4px" }}>Vaciar</div>
          </div>
          {nowEp && (
            <>
              <div style={{ padding: "4px 20px 6px", fontSize: 12.5, fontWeight: 600, letterSpacing: ".4px", textTransform: "uppercase", color: "#E0533D" }}>Reproduciendo ahora</div>
              <div onClick={() => setPlayerOpen(true)} style={{ margin: "6px 16px 14px", padding: 12, background: "linear-gradient(135deg,#2a1c18,#211F26)", borderRadius: 16, display: "flex", alignItems: "center", gap: 13, cursor: "pointer", border: "1px solid rgba(224,83,61,.25)" }}>
                <div style={{ width: 56, height: 56, flexShrink: 0 }}><Cover color={nowP.color} mono={nowP.mono} monoSize="20px" /></div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 14.5, fontWeight: 500, color: "#F3EFF7", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{nowEp.title}</div>
                  <div style={{ fontSize: 12.5, color: "#A39FAA", marginTop: 2 }}>{nowP.title}</div>
                </div>
                <div onClick={e => { e.stopPropagation(); setIsPlaying(v => !v); }} style={{ width: 42, height: 42, borderRadius: "50%", background: "#E0533D", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  {isPlaying ? <IcPause /> : <IcPlay />}
                </div>
              </div>
            </>
          )}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "2px 20px 4px" }}>
            <div style={{ fontSize: 12.5, fontWeight: 600, letterSpacing: ".4px", textTransform: "uppercase", color: "#A39FAA" }}>A continuación</div>
            <div style={{ fontSize: 11.5, color: "#8E8A95" }}>Mantén y arrastra para reordenar</div>
          </div>
          {queue.map((id, idx) => {
            const ep = EP_MAP[id]; const p = P_MAP[ep.pid];
            return (
              <div key={id} draggable onDragStart={() => setDragFrom(idx)} onDragOver={e => { e.preventDefault(); setDragOver(idx); }} onDrop={e => { e.preventDefault(); reorder(dragFrom, idx); setDragFrom(null); setDragOver(null); }} onDragEnd={() => { setDragFrom(null); setDragOver(null); }}
                style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 18px 10px 8px", background: dragOver === idx ? "rgba(224,83,61,.14)" : "transparent", opacity: dragFrom === idx ? 0.4 : 1, borderTop: `1px solid ${dragOver === idx ? "rgba(224,83,61,.6)" : "rgba(255,255,255,.06)"}`, cursor: "grab" }}>
                <div style={{ width: 30, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="20" height="20" viewBox="0 0 24 24"><circle cx="9" cy="6" r="1.6" fill="#7D7986" /><circle cx="15" cy="6" r="1.6" fill="#7D7986" /><circle cx="9" cy="12" r="1.6" fill="#7D7986" /><circle cx="15" cy="12" r="1.6" fill="#7D7986" /><circle cx="9" cy="18" r="1.6" fill="#7D7986" /><circle cx="15" cy="18" r="1.6" fill="#7D7986" /></svg>
                </div>
                <div style={{ width: 48, height: 48, flexShrink: 0 }}><Cover color={p.color} mono={p.mono} monoSize="17px" /></div>
                <div onClick={() => playEp(id)} style={{ flex: 1, minWidth: 0, cursor: "pointer" }}>
                  <div style={{ fontSize: 14, fontWeight: 500, color: "#F3EFF7", lineHeight: 1.25, overflow: "hidden", textOverflow: "ellipsis", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" }}>{ep.title}</div>
                  <div style={{ fontSize: 12, color: "#A39FAA", marginTop: 3 }}>{p.title} · {durLabel(ep.durationSec)}</div>
                </div>
                <div onClick={() => setQueue(q => q.filter(x => x !== id))} style={{ width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                  <svg width="19" height="19" viewBox="0 0 24 24"><path d="M6 6l12 12M18 6L6 18" stroke="#8E8A95" strokeWidth="2" strokeLinecap="round" /></svg>
                </div>
              </div>
            );
          })}
          {queue.length === 0 && <div style={{ textAlign: "center", color: "#8E8A95", fontSize: 14, padding: "40px 30px" }}>Tu cola está vacía.<br />Añade episodios desde cualquier podcast.</div>}
        </div>
      )}

      {/* ── LIBRARY ── */}
      {screen === "library" && (
        <div style={{ flex: 1, ...S.scroll, padding: "8px 0 12px" }}>
          <div style={{ padding: "16px 20px 8px", fontFamily: "'Roboto Serif',serif", fontSize: 24, fontWeight: 600, color: "#F3EFF7" }}>Biblioteca</div>
          <div style={{ fontSize: 15, fontWeight: 600, color: "#E6E1E9", padding: "8px 20px 2px" }}>Podcasts favoritos</div>
          {favPodcasts.length > 0 ? (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, padding: "12px 20px 10px" }}>
              {favPodcasts.map(p => (
                <div key={p.id} onClick={() => setDetailPid(p.id)} style={{ cursor: "pointer" }}>
                  <div style={{ width: "100%", aspectRatio: "1" }}><Cover color={p.color} mono={p.mono} monoSize="24px" /></div>
                  <div style={{ fontSize: 12, fontWeight: 500, color: "#E6E1E9", marginTop: 6, lineHeight: 1.2, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{p.title}</div>
                </div>
              ))}
            </div>
          ) : <div style={{ color: "#8E8A95", fontSize: 13.5, padding: "10px 20px 14px" }}>Marca un podcast con ♥ para guardarlo aquí.</div>}

          <div style={{ fontSize: 15, fontWeight: 600, color: "#E6E1E9", padding: "12px 20px 2px" }}>Descargas offline</div>
          {EPISODES.filter(e => has(downloads, e.id)).map(ep => {
            const p = P_MAP[ep.pid];
            return (
              <div key={ep.id} onClick={() => playEp(ep.id)} style={{ display: "flex", alignItems: "center", gap: 13, padding: "9px 20px", cursor: "pointer" }}>
                <div style={{ width: 48, height: 48, flexShrink: 0 }}><Cover color={p.color} mono={p.mono} monoSize="17px" /></div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 14, fontWeight: 500, color: "#F3EFF7", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{ep.title}</div>
                  <div style={{ fontSize: 12, color: "#A39FAA", marginTop: 2, display: "flex", alignItems: "center", gap: 5 }}>
                    <svg width="13" height="13" viewBox="0 0 24 24"><path d="M12 3v12m0 0l-4-4m4 4l4-4M5 21h14" stroke="#5BBF8A" strokeWidth="2" strokeLinecap="round" fill="none" /></svg>
                    Descargado · {durLabel(ep.durationSec)}
                  </div>
                </div>
              </div>
            );
          })}

          <div style={{ fontSize: 15, fontWeight: 600, color: "#E6E1E9", padding: "14px 20px 2px" }}>Escuchados recientemente</div>
          {EPISODES.filter(e => has(listened, e.id)).map(ep => {
            const p = P_MAP[ep.pid];
            return (
              <div key={ep.id} onClick={() => playEp(ep.id)} style={{ display: "flex", alignItems: "center", gap: 13, padding: "9px 20px", cursor: "pointer", opacity: 0.72 }}>
                <div style={{ width: 48, height: 48, flexShrink: 0 }}><Cover color={p.color} mono={p.mono} monoSize="17px" /></div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 14, fontWeight: 500, color: "#E6E1E9", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{ep.title}</div>
                  <div style={{ fontSize: 12, color: "#A39FAA", marginTop: 2, display: "flex", alignItems: "center", gap: 5 }}>
                    <svg width="13" height="13" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7" stroke="#5BBF8A" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none" /></svg>
                    Escuchado
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ── MINI PLAYER ── */}
      {nowEp && !playerOpen && (
        <div style={{ margin: "0 8px", borderRadius: 12, overflow: "hidden", background: "#2A1E1B", boxShadow: "0 6px 22px rgba(0,0,0,.4)" }}>
          <div onClick={() => setPlayerOpen(true)} style={{ display: "flex", alignItems: "center", gap: 11, padding: "8px 10px", cursor: "pointer" }}>
            <div style={{ width: 42, height: 42, flexShrink: 0 }}><Cover color={nowP.color} mono={nowP.mono} monoSize="15px" /></div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 13.5, fontWeight: 500, color: "#F3EFF7", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{nowEp.title}</div>
              <div style={{ fontSize: 11.5, color: "#C9A89F", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{nowP.title}</div>
            </div>
            <div onClick={e => { e.stopPropagation(); setIsPlaying(v => !v); }} style={{ width: 40, height: 40, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
              {isPlaying ? <IcPause color="#F3EFF7" size={22} /> : <IcPlay color="#F3EFF7" size={22} />}
            </div>
            <div onClick={e => { e.stopPropagation(); nextEp(); }} style={{ width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
              <svg width="20" height="20" viewBox="0 0 24 24"><path d="M6 5l9 7-9 7V5z" fill="#C9A89F" /><rect x="16.5" y="5" width="2.4" height="14" rx="1" fill="#C9A89F" /></svg>
            </div>
          </div>
          <div style={{ height: 3, background: "rgba(255,255,255,.12)" }}><div style={{ height: "100%", background: "#E0533D", width: nowPct }} /></div>
        </div>
      )}

      {/* ── BOTTOM NAV ── */}
      <div style={{ display: "flex", background: "#1B191F", padding: "8px 6px 10px", borderTop: "1px solid rgba(255,255,255,.05)" }}>
        {navItems.map(nav => {
          const active = screen === nav.key;
          return (
            <div key={nav.key} onClick={() => setScreen(nav.key)} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4, cursor: "pointer", padding: "2px 0" }}>
              <div style={{ width: 58, height: 30, borderRadius: 16, display: "flex", alignItems: "center", justifyContent: "center", background: active ? "rgba(224,83,61,.16)" : "transparent" }}>
                <NavIcon k={nav.key} active={active} />
              </div>
              <span style={{ fontSize: 11, fontWeight: 500, color: active ? "#E0533D" : "#9B96A3" }}>{nav.label}</span>
            </div>
          );
        })}
      </div>

      {/* ── DETAIL OVERLAY ── */}
      {detailP && (
        <div style={{ position: "absolute", inset: 0, background: "#141218", zIndex: 30, display: "flex", flexDirection: "column", animation: "fadeIn .18s ease" }}>
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 160, background: `linear-gradient(180deg,${detailP.color}55,#141218)`, zIndex: 0 }} />
          <div style={{ flex: 1, ...S.scroll, position: "relative", zIndex: 1 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 12px 6px" }}>
              <div onClick={() => setDetailPid(null)} style={{ width: 42, height: 42, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                <svg width="24" height="24" viewBox="0 0 24 24"><path d="M15 5l-7 7 7 7" stroke="#F3EFF7" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none" /></svg>
              </div>
            </div>
            <div style={{ display: "flex", gap: 16, padding: "6px 20px 14px", alignItems: "flex-end" }}>
              <div style={{ width: 120, height: 120, flexShrink: 0, boxShadow: "0 12px 30px rgba(0,0,0,.45)", borderRadius: 14 }}><Cover color={detailP.color} mono={detailP.mono} monoSize="42px" /></div>
              <div style={{ flex: 1, minWidth: 0, paddingBottom: 4 }}>
                <div style={{ fontFamily: "'Roboto Serif',serif", fontSize: 22, fontWeight: 600, color: "#F3EFF7", lineHeight: 1.15 }}>{detailP.title}</div>
                <div style={{ fontSize: 13.5, color: "#C9C4CF", marginTop: 6 }}>{detailP.author}</div>
                <div style={{ fontSize: 12, color: "#8E8A95", marginTop: 4 }}>{detailP.category} · {detailEps.length} episodios</div>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "4px 20px 14px" }}>
              <div onClick={() => setFavorites(f => toggle(f, detailP.id))} style={{ display: "flex", alignItems: "center", gap: 7, padding: "9px 18px", borderRadius: 22, background: has(favorites, detailP.id) ? "#E0533D" : "transparent", border: `1.5px solid ${has(favorites, detailP.id) ? "#E0533D" : "#48454E"}`, cursor: "pointer" }}>
                <IcHeart filled={has(favorites, detailP.id)} />
                <span style={{ fontSize: 13.5, fontWeight: 600, color: has(favorites, detailP.id) ? "#1a0d09" : "#E6E1E9" }}>{has(favorites, detailP.id) ? "Siguiendo" : "Seguir"}</span>
              </div>
              <div onClick={() => detailEps[0] && playEp(detailEps[0].id)} style={{ marginLeft: "auto", width: 54, height: 54, borderRadius: "50%", background: "#E0533D", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", boxShadow: "0 8px 20px rgba(224,83,61,.4)" }}>
                <IcPlay size={26} />
              </div>
            </div>
            <div style={{ fontSize: 13.5, lineHeight: 1.55, color: "#B5B0BC", padding: "0 20px 16px" }}>{detailP.desc}</div>
            <div style={{ fontSize: 15, fontWeight: 600, color: "#E6E1E9", padding: "2px 20px 4px" }}>Episodios</div>
            {detailEps.map(ep => {
              const isListened = has(listened, ep.id); const inq = has(queue, ep.id); const dl = has(downloads, ep.id);
              return (
                <div key={ep.id} style={{ padding: "12px 20px", borderTop: "1px solid rgba(255,255,255,.06)", opacity: isListened ? 0.6 : 1 }}>
                  <div style={{ fontSize: 11.5, color: "#8E8A95", marginBottom: 4 }}>{ep.dateLabel}</div>
                  <div onClick={() => playEp(ep.id)} style={{ fontSize: 15, fontWeight: 500, color: "#F3EFF7", lineHeight: 1.3, cursor: "pointer" }}>{ep.title}</div>
                  <div style={{ fontSize: 13, lineHeight: 1.5, color: "#9B96A3", marginTop: 4, overflow: "hidden", textOverflow: "ellipsis", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" }}>{ep.desc}</div>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 11 }}>
                    <div onClick={() => playEp(ep.id)} style={{ display: "flex", alignItems: "center", gap: 7, padding: "7px 15px", borderRadius: 20, background: "#2A2730", cursor: "pointer" }}>
                      <IcPlay color="#E0533D" size={16} />
                      <span style={{ fontSize: 12.5, fontWeight: 600, color: "#E6E1E9" }}>{durLabel(ep.durationSec)}</span>
                    </div>
                    <div onClick={() => setQueue(q => has(q, ep.id) ? q : [...q, ep.id])} style={{ width: 40, height: 40, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}><IcQueueAdd inq={inq} /></div>
                    <div onClick={() => setDownloads(d => toggle(d, ep.id))} style={{ width: 40, height: 40, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}><IcDownload dl={dl} /></div>
                    <div onClick={() => setListened(l => toggle(l, ep.id))} style={{ marginLeft: "auto", width: 40, height: 40, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}><IcListened on={isListened} /></div>
                  </div>
                </div>
              );
            })}
            <div style={{ height: 20 }} />
          </div>
        </div>
      )}

      {/* ── FULL PLAYER OVERLAY ── */}
      {playerOpen && nowEp && (
        <div style={{ position: "absolute", inset: 0, zIndex: 40, display: "flex", flexDirection: "column", background: `linear-gradient(180deg,${nowP.color} -10%,#1a1118 42%,#120f15 100%)`, animation: "sheetUp .26s cubic-bezier(.3,.7,.3,1)" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 14px 4px" }}>
            <div onClick={() => setPlayerOpen(false)} style={{ width: 42, height: 42, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
              <svg width="26" height="26" viewBox="0 0 24 24"><path d="M7 10l5 5 5-5" stroke="#F3EFF7" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none" /></svg>
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 11, letterSpacing: ".5px", textTransform: "uppercase", color: "#C9C4CF" }}>Reproduciendo desde</div>
              <div style={{ fontSize: 13, fontWeight: 600, color: "#F3EFF7", marginTop: 1 }}>Cola</div>
            </div>
            <div style={{ width: 42 }} />
          </div>
          <div style={{ flex: 1, ...S.scroll, display: "flex", flexDirection: "column", padding: "0 26px" }}>
            <div style={{ width: "100%", aspectRatio: "1", margin: "14px 0 22px", boxShadow: "0 24px 60px rgba(0,0,0,.5)", borderRadius: 18 }}><Cover color={nowP.color} mono={nowP.mono} monoSize="92px" /></div>
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 14 }}>
              <div style={{ minWidth: 0 }}>
                <div style={{ fontFamily: "'Roboto Serif',serif", fontSize: 22, fontWeight: 600, color: "#F8F5FB", lineHeight: 1.2 }}>{nowEp.title}</div>
                <div style={{ fontSize: 14, color: "#C9C4CF", marginTop: 5 }}>{nowP.title}</div>
              </div>
              <div onClick={() => setListened(l => toggle(l, nowPlaying))} style={{ width: 44, height: 44, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}><IcListened on={has(listened, nowPlaying)} /></div>
            </div>
            <div style={{ marginTop: 22 }}>
              <div onClick={e => { const r = e.currentTarget.getBoundingClientRect(); seekFraction((e.clientX - r.left) / r.width); }} style={{ height: 16, display: "flex", alignItems: "center", cursor: "pointer" }}>
                <div style={{ width: "100%", height: 5, borderRadius: 3, background: "rgba(255,255,255,.18)", position: "relative" }}>
                  <div style={{ height: "100%", borderRadius: 3, background: "#fff", width: nowPct }} />
                  <div style={{ position: "absolute", top: "50%", left: nowPct, transform: "translate(-50%,-50%)", width: 13, height: 13, borderRadius: "50%", background: "#fff" }} />
                </div>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: 7, fontSize: 11.5, color: "#B5B0BC" }}>
                <span>{fmt(nowProg)}</span><span>{durLabel(nowEp.durationSec)}</span>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 14 }}>
              <div onClick={() => setSpeed(s => { const i = speedOpts.indexOf(s); return speedOpts[(i + 1) % speedOpts.length]; })} style={{ minWidth: 46, fontSize: 14, fontWeight: 700, color: "#E6E1E9", cursor: "pointer", textAlign: "center" }}>{speedNames[speed] || "1.0x"}</div>
              <div onClick={() => skip(-15)} style={{ display: "flex", flexDirection: "column", alignItems: "center", cursor: "pointer" }}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none"><path d="M11 7V3L6 8l5 5V9a5 5 0 11-5 5" stroke="#F3EFF7" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
                <span style={{ fontSize: 9, marginTop: -3, color: "#B5B0BC" }}>15</span>
              </div>
              <div onClick={() => setIsPlaying(v => !v)} style={{ width: 72, height: 72, borderRadius: "50%", background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", boxShadow: "0 10px 26px rgba(0,0,0,.4)" }}>
                {isPlaying ? <IcPause color="#1a1118" size={30} /> : <IcPlay color="#1a1118" size={32} />}
              </div>
              <div onClick={() => skip(30)} style={{ display: "flex", flexDirection: "column", alignItems: "center", cursor: "pointer" }}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none"><path d="M13 7V3l5 5-5 5V9a5 5 0 105 5" stroke="#F3EFF7" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
                <span style={{ fontSize: 9, marginTop: -3, color: "#B5B0BC" }}>30</span>
              </div>
              <div onClick={nextEp} style={{ width: 46, display: "flex", justifyContent: "center", cursor: "pointer" }}>
                <svg width="26" height="26" viewBox="0 0 24 24"><path d="M6 5l9 7-9 7V5z" fill="#F3EFF7" /><rect x="16.5" y="5" width="2.6" height="14" rx="1.2" fill="#F3EFF7" /></svg>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-around", marginTop: 24, paddingTop: 16, borderTop: "1px solid rgba(255,255,255,.1)" }}>
              <div onClick={() => setDownloads(d => toggle(d, nowPlaying))} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 5, cursor: "pointer" }}>
                <IcDownload dl={has(downloads, nowPlaying)} />
                <span style={{ fontSize: 10.5, color: "#B5B0BC" }}>{has(downloads, nowPlaying) ? "Descargado" : "Descargar"}</span>
              </div>
              <div onClick={() => { setPlayerOpen(false); setScreen("queue"); }} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 5, cursor: "pointer" }}>
                <svg width="23" height="23" viewBox="0 0 24 24"><path d="M3 6h13M3 12h13M3 18h9M17 14v7m0 0l3-3m-3 3l-3-3" stroke="#C9C4CF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" /></svg>
                <span style={{ fontSize: 10.5, color: "#B5B0BC" }}>Cola</span>
              </div>
              <div onClick={() => setChaptersOpen(v => !v)} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 5, cursor: "pointer" }}>
                <svg width="23" height="23" viewBox="0 0 24 24"><rect x="3" y="4" width="7" height="7" rx="1.4" stroke="#C9C4CF" strokeWidth="1.8" fill="none" /><rect x="3" y="14" width="7" height="6" rx="1.4" stroke="#C9C4CF" strokeWidth="1.8" fill="none" /><path d="M13 6h8M13 9h5M13 16h8M13 19h5" stroke="#C9C4CF" strokeWidth="1.8" strokeLinecap="round" /></svg>
                <span style={{ fontSize: 10.5, color: chaptersOpen ? "#E0533D" : "#B5B0BC" }}>Capítulos</span>
              </div>
            </div>
            {chaptersOpen && (
              <div style={{ marginTop: 18, borderRadius: 16, background: "rgba(0,0,0,.28)", overflow: "hidden" }}>
                <div style={{ padding: "13px 16px 6px", fontSize: 13, fontWeight: 600, color: "#E6E1E9" }}>Capítulos</div>
                {chapters.map((ch, i) => (
                  <div key={i} onClick={() => seekFraction(ch.at / nowEp.durationSec)} style={{ display: "flex", alignItems: "center", gap: 12, padding: "11px 16px", cursor: "pointer", background: i === curChapter ? "rgba(224,83,61,.12)" : "transparent" }}>
                    <span style={{ fontSize: 12, color: i === curChapter ? "#E0533D" : "#8E8A95", fontVariantNumeric: "tabular-nums", minWidth: 42 }}>{fmt(ch.at)}</span>
                    <span style={{ flex: 1, fontSize: 13.5, color: i === curChapter ? "#F3EFF7" : "#C9C4CF", fontWeight: i === curChapter ? 600 : 400 }}>{ch.title}</span>
                    {i === curChapter && <IcPlay color="#E0533D" size={16} />}
                  </div>
                ))}
              </div>
            )}
            <div style={{ height: 24 }} />
          </div>
        </div>
      )}

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&family=Roboto+Serif:wght@500;600&display=swap');
        * { box-sizing: border-box; }
        html, body, #root { margin: 0; padding: 0; width: 100%; height: 100%; overflow: hidden; background: #141218; }
        ::-webkit-scrollbar { display: none; }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes sheetUp { from { transform: translateY(100%); } to { transform: translateY(0); } }
      `}</style>
    </div>
  );
}
