import { useState, useEffect, useRef, useCallback } from "react";

const injectFonts = () => {
  if (document.getElementById("gml-fonts")) return;
  const link = document.createElement("link");
  link.id = "gml-fonts";
  link.rel = "stylesheet";
  link.href = "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,400&family=Syne:wght@400;600;700;800&family=Epilogue:ital,wght@0,300;0,400;0,500;1,300&family=Space+Mono:wght@400;700&display=swap";
  document.head.appendChild(link);
};

const css = `
  *{box-sizing:border-box;margin:0;padding:0}
  html,body{background:#040410;color:#E2E4F0;font-family:'Epilogue',sans-serif}
  ::-webkit-scrollbar{width:5px}
  ::-webkit-scrollbar-track{background:#040410}
  ::-webkit-scrollbar-thumb{background:#1a1a4a;border-radius:3px}
  .gml-root{min-height:100vh;background:#040410;overflow-x:hidden}
  .nav{position:fixed;top:0;left:0;right:0;z-index:100;padding:20px 60px;display:flex;align-items:center;justify-content:space-between;background:rgba(4,4,16,0.85);backdrop-filter:blur(16px);border-bottom:1px solid rgba(0,232,200,0.08)}
  .nav-logo{display:flex;align-items:center;gap:12px;cursor:pointer}
  .nav-logo-mark{width:36px;height:36px;border:1.5px solid #00E8C8;border-radius:8px;display:flex;align-items:center;justify-content:center;font-family:'Space Mono',monospace;font-size:13px;color:#00E8C8;font-weight:700;letter-spacing:-1px}
  .nav-brand{font-family:'Syne',sans-serif;font-weight:700;font-size:15px;letter-spacing:0.04em;color:#E2E4F0}
  .nav-links{display:flex;gap:8px;align-items:center}
  .nav-link{padding:8px 16px;font-family:'Epilogue',sans-serif;font-size:13px;font-weight:400;color:#7B7FA0;cursor:pointer;border-radius:6px;transition:all .2s;border:none;background:none;letter-spacing:0.02em}
  .nav-link:hover{color:#E2E4F0;background:rgba(255,255,255,0.04)}
  .nav-link.active{color:#00E8C8;background:rgba(0,232,200,0.08)}
  .nav-cta{padding:9px 20px;background:transparent;border:1px solid rgba(0,232,200,0.5);color:#00E8C8;font-family:'Syne',sans-serif;font-size:13px;font-weight:600;border-radius:7px;cursor:pointer;transition:all .2s;letter-spacing:0.04em}
  .nav-cta:hover{background:rgba(0,232,200,0.1);border-color:#00E8C8}
  .page{padding-top:80px;min-height:100vh;animation:fadeIn .4s ease}
  @keyframes fadeIn{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
  .hero{position:relative;min-height:100vh;display:flex;align-items:center;overflow:hidden}
  .hero-canvas{position:absolute;inset:0;width:100%;height:100%}
  .hero-content{position:relative;z-index:2;padding:0 60px;max-width:900px}
  .hero-eyebrow{display:inline-flex;align-items:center;gap:8px;margin-bottom:28px;padding:7px 16px;border:1px solid rgba(0,232,200,0.2);border-radius:100px;background:rgba(0,232,200,0.06)}
  .hero-eyebrow-dot{width:6px;height:6px;border-radius:50%;background:#00E8C8;animation:pulse 2s infinite}
  @keyframes pulse{0%,100%{opacity:1}50%{opacity:.4}}
  .hero-eyebrow-text{font-family:'Space Mono',monospace;font-size:11px;letter-spacing:0.12em;color:#00E8C8;text-transform:uppercase}
  .hero-title{font-family:'Playfair Display',serif;font-weight:900;font-size:clamp(52px,7vw,88px);line-height:1.03;color:#E2E4F0;margin-bottom:10px}
  .hero-title-em{color:#00E8C8;font-style:italic}
  .hero-subtitle{font-family:'Playfair Display',serif;font-size:clamp(20px,2.8vw,32px);font-weight:400;color:#5a5c80;margin-bottom:28px;letter-spacing:0.01em}
  .hero-desc{font-family:'Epilogue',sans-serif;font-size:17px;font-weight:300;color:#9496B8;line-height:1.75;max-width:580px;margin-bottom:44px}
  .hero-actions{display:flex;gap:16px;flex-wrap:wrap}
  .btn-primary{padding:14px 32px;background:#00E8C8;color:#040410;font-family:'Syne',sans-serif;font-size:14px;font-weight:700;border:none;border-radius:8px;cursor:pointer;transition:all .2s;letter-spacing:0.05em}
  .btn-primary:hover{background:#2fffdf;transform:translateY(-1px);box-shadow:0 8px 30px rgba(0,232,200,0.3)}
  .btn-secondary{padding:14px 32px;background:transparent;color:#E2E4F0;font-family:'Syne',sans-serif;font-size:14px;font-weight:600;border:1px solid rgba(255,255,255,0.15);border-radius:8px;cursor:pointer;transition:all .2s;letter-spacing:0.04em}
  .btn-secondary:hover{background:rgba(255,255,255,0.06);border-color:rgba(255,255,255,0.3)}
  .hero-stats{display:flex;gap:0;border-top:1px solid rgba(255,255,255,0.07);margin-top:72px;padding-top:44px}
  .hero-stat{flex:1;padding-right:40px}
  .hero-stat+.hero-stat{padding-left:40px;padding-right:40px;border-left:1px solid rgba(255,255,255,0.07)}
  .hero-stat-num{font-family:'Space Mono',monospace;font-size:36px;font-weight:700;color:#00E8C8;letter-spacing:-1px;line-height:1}
  .hero-stat-unit{font-size:22px;color:#00E8C8}
  .hero-stat-label{font-family:'Epilogue',sans-serif;font-size:12px;color:#5a5c80;margin-top:6px;letter-spacing:0.06em;text-transform:uppercase;font-weight:500}
  .section{padding:100px 60px}
  .section-alt{background:rgba(8,8,28,0.5)}
  .section-label{display:inline-flex;align-items:center;gap:8px;margin-bottom:16px}
  .section-label-line{width:28px;height:1px;background:#00E8C8}
  .section-label-text{font-family:'Space Mono',monospace;font-size:11px;letter-spacing:0.14em;color:#00E8C8;text-transform:uppercase}
  .section-title{font-family:'Playfair Display',serif;font-weight:700;font-size:clamp(36px,4vw,52px);color:#E2E4F0;line-height:1.12;margin-bottom:16px}
  .section-title em{color:#00E8C8;font-style:italic}
  .section-sub{font-family:'Epilogue',sans-serif;font-size:17px;font-weight:300;color:#7B7FA0;line-height:1.7;max-width:640px;margin-bottom:60px}
  .grid-2{display:grid;grid-template-columns:1fr 1fr;gap:24px}
  .grid-3{display:grid;grid-template-columns:repeat(3,1fr);gap:20px}
  .grid-4{display:grid;grid-template-columns:repeat(4,1fr);gap:20px}
  .card{background:#080820;border:1px solid rgba(0,232,200,0.08);border-radius:16px;padding:32px;transition:all .25s;cursor:default}
  .card:hover{border-color:rgba(0,232,200,0.25);background:#0d0d2a;transform:translateY(-2px);box-shadow:0 16px 50px rgba(0,0,0,0.4)}
  .card-icon{width:44px;height:44px;border-radius:10px;background:rgba(0,232,200,0.1);display:flex;align-items:center;justify-content:center;font-size:20px;margin-bottom:20px;border:1px solid rgba(0,232,200,0.15)}
  .card-num{font-family:'Space Mono',monospace;font-size:11px;color:rgba(0,232,200,0.5);letter-spacing:0.1em;margin-bottom:8px}
  .card-title{font-family:'Syne',sans-serif;font-weight:700;font-size:18px;color:#E2E4F0;margin-bottom:10px;line-height:1.3}
  .card-body{font-family:'Epilogue',sans-serif;font-size:14px;color:#6668a0;line-height:1.7;font-weight:300}
  .card-tag{display:inline-block;margin-top:16px;padding:4px 12px;background:rgba(0,232,200,0.08);border:1px solid rgba(0,232,200,0.15);border-radius:100px;font-family:'Space Mono',monospace;font-size:10px;color:#00E8C8;letter-spacing:0.08em;text-transform:uppercase}
  .feature-row{display:grid;grid-template-columns:1fr 1fr;gap:60px;align-items:center;margin-bottom:80px}
  .feature-row.reverse{direction:rtl}
  .feature-row.reverse>*{direction:ltr}
  .feature-visual{background:#080820;border:1px solid rgba(0,232,200,0.1);border-radius:20px;padding:40px;min-height:340px;display:flex;flex-direction:column;justify-content:center}
  .pill-row{display:flex;flex-wrap:wrap;gap:8px;margin-bottom:16px}
  .pill{padding:6px 14px;border-radius:100px;font-family:'Space Mono',monospace;font-size:11px;font-weight:400;letter-spacing:0.06em}
  .pill-teal{background:rgba(0,232,200,0.1);border:1px solid rgba(0,232,200,0.25);color:#00E8C8}
  .pill-amber{background:rgba(245,166,35,0.1);border:1px solid rgba(245,166,35,0.25);color:#F5A623}
  .pill-gray{background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);color:#9496B8}
  .table-wrap{border:1px solid rgba(0,232,200,0.1);border-radius:16px;overflow:hidden;margin-top:40px}
  .gml-table{width:100%;border-collapse:collapse;font-family:'Epilogue',sans-serif}
  .gml-table thead th{background:#0a0a22;padding:14px 20px;text-align:left;font-family:'Space Mono',monospace;font-size:11px;letter-spacing:0.1em;color:#4a4c70;text-transform:uppercase;border-bottom:1px solid rgba(0,232,200,0.1);font-weight:400}
  .gml-table tbody tr{border-bottom:1px solid rgba(255,255,255,0.04);transition:background .15s}
  .gml-table tbody tr:hover{background:rgba(0,232,200,0.03)}
  .gml-table tbody tr:last-child{border-bottom:none}
  .gml-table td{padding:16px 20px;font-size:14px;color:#9496B8;vertical-align:top;line-height:1.5}
  .gml-table td:first-child{color:#E2E4F0;font-weight:500}
  .badge{display:inline-block;padding:3px 10px;border-radius:100px;font-size:11px;font-family:'Space Mono',monospace;letter-spacing:0.06em}
  .badge-low{background:rgba(0,232,200,0.1);color:#00E8C8;border:1px solid rgba(0,232,200,0.2)}
  .badge-med{background:rgba(245,166,35,0.1);color:#F5A623;border:1px solid rgba(245,166,35,0.2)}
  .badge-high{background:rgba(255,61,90,0.1);color:#ff6b82;border:1px solid rgba(255,61,90,0.2)}
  .timeline{position:relative;padding-left:40px}
  .timeline::before{content:'';position:absolute;left:10px;top:0;bottom:0;width:1px;background:linear-gradient(180deg,#00E8C8,rgba(0,232,200,0.1))}
  .timeline-item{position:relative;margin-bottom:48px}
  .timeline-dot{position:absolute;left:-36px;top:4px;width:12px;height:12px;border-radius:50%;background:#040410;border:2px solid #00E8C8;box-shadow:0 0 12px rgba(0,232,200,0.4)}
  .timeline-year{font-family:'Space Mono',monospace;font-size:11px;color:#00E8C8;letter-spacing:0.12em;text-transform:uppercase;margin-bottom:6px}
  .timeline-title{font-family:'Syne',sans-serif;font-weight:700;font-size:20px;color:#E2E4F0;margin-bottom:10px}
  .timeline-body{font-family:'Epilogue',sans-serif;font-size:14px;color:#6668a0;line-height:1.7;font-weight:300}
  .two-col{display:grid;grid-template-columns:1fr 1fr;gap:80px;align-items:start}
  .stat-big{margin-bottom:32px}
  .stat-big-num{font-family:'Space Mono',monospace;font-size:52px;font-weight:700;color:#00E8C8;line-height:1}
  .stat-big-label{font-family:'Epilogue',sans-serif;font-size:14px;color:#5a5c80;margin-top:6px;letter-spacing:0.05em}
  .divider{height:1px;background:linear-gradient(90deg,rgba(0,232,200,0.2),transparent);margin:0 60px}
  .amber-accent{color:#F5A623}
  .highlight-block{background:linear-gradient(135deg,rgba(0,232,200,0.06),rgba(0,232,200,0.02));border:1px solid rgba(0,232,200,0.15);border-radius:16px;padding:36px;margin-top:40px}
  .highlight-block-title{font-family:'Syne',sans-serif;font-weight:700;font-size:22px;color:#E2E4F0;margin-bottom:12px}
  .highlight-block-body{font-family:'Epilogue',sans-serif;font-size:15px;color:#7B7FA0;line-height:1.75;font-weight:300}
  .qubit-compare-grid{display:grid;grid-template-columns:repeat(5,1fr);gap:1px;background:rgba(0,232,200,0.1);border:1px solid rgba(0,232,200,0.1);border-radius:16px;overflow:hidden;margin-top:40px}
  .qubit-cell{background:#080820;padding:20px 16px;text-align:center}
  .qubit-cell.header{background:#0a0a22;font-family:'Space Mono',monospace;font-size:10px;letter-spacing:0.1em;color:#4a4c70;text-transform:uppercase}
  .qubit-cell.ours{background:rgba(0,232,200,0.05);border-top:2px solid #00E8C8}
  .qubit-cell-val{font-family:'Epilogue',sans-serif;font-size:13px;color:#9496B8;line-height:1.4}
  .qubit-cell-val.good{color:#00E8C8;font-weight:500}
  .qubit-cell-val.name{color:#E2E4F0;font-weight:600;font-size:14px}
  .sectors-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:18px}
  .sector-card{background:#080820;border:1px solid rgba(255,255,255,0.05);border-radius:14px;padding:28px;transition:all .2s;position:relative;overflow:hidden}
  .sector-card::before{content:'';position:absolute;top:0;left:0;right:0;height:2px;background:linear-gradient(90deg,transparent,rgba(0,232,200,0.3),transparent);opacity:0;transition:opacity .2s}
  .sector-card:hover{border-color:rgba(0,232,200,0.2);background:#0b0b26;transform:translateY(-2px)}
  .sector-card:hover::before{opacity:1}
  .sector-num{font-family:'Space Mono',monospace;font-size:10px;color:rgba(0,232,200,0.4);letter-spacing:0.12em;margin-bottom:12px}
  .sector-name{font-family:'Syne',sans-serif;font-weight:700;font-size:17px;color:#E2E4F0;margin-bottom:10px;line-height:1.3}
  .sector-desc{font-family:'Epilogue',sans-serif;font-size:13px;color:#5a5c80;line-height:1.6;font-weight:300;margin-bottom:16px}
  .sector-key{display:inline-flex;align-items:center;gap:6px;padding:5px 12px;border-radius:100px;background:rgba(245,166,35,0.08);border:1px solid rgba(245,166,35,0.15)}
  .sector-key-text{font-family:'Space Mono',monospace;font-size:10px;color:#F5A623;letter-spacing:0.06em}
  .market-header{display:grid;grid-template-columns:1fr 1fr 1fr;gap:20px;margin-bottom:60px}
  .market-stat-card{background:#080820;border:1px solid rgba(0,232,200,0.08);border-radius:14px;padding:28px}
  .market-stat-label{font-family:'Space Mono',monospace;font-size:10px;letter-spacing:0.1em;color:#4a4c70;text-transform:uppercase;margin-bottom:12px}
  .market-stat-val{font-family:'Space Mono',monospace;font-size:34px;font-weight:700;color:#00E8C8;line-height:1;margin-bottom:6px}
  .market-stat-desc{font-family:'Epilogue',sans-serif;font-size:13px;color:#5a5c80;line-height:1.5}
  .founder-block{display:grid;grid-template-columns:280px 1fr;gap:60px;align-items:start}
  .founder-portrait{background:linear-gradient(135deg,rgba(0,232,200,0.1),rgba(0,232,200,0.02));border:1px solid rgba(0,232,200,0.2);border-radius:20px;padding:40px;text-align:center}
  .founder-initials{width:80px;height:80px;border-radius:50%;background:rgba(0,232,200,0.1);border:2px solid rgba(0,232,200,0.4);display:flex;align-items:center;justify-content:center;font-family:'Syne',sans-serif;font-size:26px;font-weight:800;color:#00E8C8;margin:0 auto 20px}
  .founder-name{font-family:'Syne',sans-serif;font-weight:700;font-size:18px;color:#E2E4F0;margin-bottom:4px}
  .founder-role{font-family:'Epilogue',sans-serif;font-size:13px;color:#5a5c80}
  .cta-section{padding:120px 60px;text-align:center;position:relative;overflow:hidden}
  .cta-section::before{content:'';position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:600px;height:600px;background:radial-gradient(circle,rgba(0,232,200,0.06),transparent 70%);pointer-events:none}
  .cta-title{font-family:'Playfair Display',serif;font-weight:900;font-size:clamp(40px,5vw,64px);color:#E2E4F0;line-height:1.1;margin-bottom:20px}
  .cta-body{font-family:'Epilogue',sans-serif;font-size:18px;font-weight:300;color:#6668a0;max-width:560px;margin:0 auto 44px;line-height:1.7}
  .footer{border-top:1px solid rgba(255,255,255,0.05);padding:40px 60px;display:flex;align-items:center;justify-content:space-between}
  .footer-copy{font-family:'Epilogue',sans-serif;font-size:13px;color:#3a3c60}
  .footer-conf{font-family:'Space Mono',monospace;font-size:10px;color:#2a2c50;letter-spacing:0.08em;text-transform:uppercase}
  .ncl-diagram{display:grid;grid-template-columns:1fr auto 1fr auto 1fr;gap:0;align-items:center;margin:24px 0}
  .ncl-state{text-align:center;padding:20px 12px}
  .ncl-state-label{font-family:'Space Mono',monospace;font-size:11px;letter-spacing:0.08em;text-transform:uppercase;margin-bottom:12px}
  .ncl-wires{display:flex;flex-direction:column;gap:10px}
  .ncl-wire{display:flex;align-items:center;gap:8px}
  .ncl-wire-label{font-family:'Space Mono',monospace;font-size:10px;color:#4a4c70;width:14px}
  .ncl-wire-line{height:3px;border-radius:2px;flex:1}
  .ncl-arrow{font-family:'Space Mono',monospace;font-size:18px;color:rgba(0,232,200,0.3)}
  .ncl-power{font-family:'Space Mono',monospace;font-size:22px;font-weight:700;margin-top:12px}
`;

function NeuralCanvas() {
  const canvasRef = useRef(null);
  const animRef = useRef(null);
  const nodesRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
    resize();
    window.addEventListener("resize", resize);

    const N = 60;
    nodesRef.current = Array.from({ length: N }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
      r: Math.random() * 2 + 1,
      pulse: Math.random() * Math.PI * 2,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const nodes = nodesRef.current;
      nodes.forEach(n => {
        n.x += n.vx; n.y += n.vy; n.pulse += 0.02;
        if (n.x < 0 || n.x > canvas.width) n.vx *= -1;
        if (n.y < 0 || n.y > canvas.height) n.vy *= -1;
      });
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x, dy = nodes[i].y - nodes[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 130) {
            const alpha = (1 - d / 130) * 0.12;
            ctx.strokeStyle = `rgba(0,232,200,${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.beginPath(); ctx.moveTo(nodes[i].x, nodes[i].y); ctx.lineTo(nodes[j].x, nodes[j].y); ctx.stroke();
          }
        }
      }
      nodes.forEach(n => {
        const glow = (Math.sin(n.pulse) + 1) / 2;
        ctx.beginPath(); ctx.arc(n.x, n.y, n.r + glow * 1.2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0,232,200,${0.15 + glow * 0.25})`; ctx.fill();
      });
      animRef.current = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(animRef.current); window.removeEventListener("resize", resize); };
  }, []);

  return <canvas ref={canvasRef} className="hero-canvas" style={{ opacity: 0.55 }} />;
}

const SECTORS = [
  { num: "01", name: "Medical Implants & Bioelectronics", desc: "Pacemakers, ICDs, cochlear implants, neural links — powered indefinitely by body heat. Eliminating $15,000–$25,000 replacement surgeries.", key: "4M+ devices / year" },
  { num: "02", name: "Smart Logistics & Cold-Chain", desc: "Kinetic tags that sleep when still and harvest vibration when moving. Critical for vaccine cold-chain where one excursion invalidates a shipment.", key: "Zero battery swaps" },
  { num: "03", name: "Aerospace & Satellite Systems", desc: "Structural health monitoring across 15–30 year mission lifetimes. ESA and NASA have active programmes seeking exactly this.", key: "30yr mission life" },
  { num: "04", name: "Deep-Sea & Ocean Science", desc: "Seabed seismic arrays and tsunami warning nodes powered by wave motion or hydrothermal vent gradients. Operate indefinitely, inaccessibly.", key: "Zero ship expeditions" },
  { num: "05", name: "Precision Agriculture & Ecology", desc: "Soil sensors distributed across thousands of acres. Forest fire detection, flood warning, air quality grids — all battery-free.", key: "Full growing seasons" },
  { num: "06", name: "Smart Infrastructure", desc: "Sensors embedded in bridges and dams during pour. Detecting micro-cracks for 50–100 year lifetimes. The Genoa bridge collapse was preventable.", key: "50yr structural life" },
  { num: "07", name: "Industrial IoT & Predictive Maintenance", desc: "CNN-based anomaly detection on rotating machinery. One sensor per machine, zero wiring. A single prevented refinery failure pays for entire deployment.", key: "CNN on-chip inference" },
  { num: "08", name: "Consumer Electronics & Wearables", desc: "An Aura-M1 co-processor handles always-on sensing using harvested body heat, freeing the main SoC to sleep deeper. 3–5× battery life extension.", key: "3–5× battery life" },
  { num: "09", name: "Defence & Perimeter Security", desc: "Fully autonomous sensors — no supply chain dependency. ITAR-compliant variants unlock US DoD SBIR/STTR funding. UK MOD and NATO apply in parallel.", key: "Zero logistical resupply" },
  { num: "10", name: "Energy Grid & Utilities", desc: "Power line sensors powered by the EM field of the cable they monitor. Literally powered by the electricity they are watching.", key: "Self-powered monitoring" },
  { num: "11", name: "Smart Packaging & Anti-Counterfeiting", desc: "Tags embedded at sub-cent cost per unit. Temperature history, tamper detection, freshness indicators — powered by a reader RF sweep. No battery ever.", key: "Sub-cent per unit" },
  { num: "12", name: "Environmental & Climate Monitoring", desc: "100-metre resolution atmospheric sensing. The dense permanently-operating network the IPCC has called for but could never fund. Now fundable.", key: "100m resolution" },
  { num: "13", name: "Automotive & EVs", desc: "Tyre pressure, chassis, and park sensors that draw zero quiescent current from the main battery when parked. Direct OEM spec advantage.", key: "Zero quiescent draw" },
  { num: "14", name: "6G Ambient IoT — The Terminal Market", desc: "The 3GPP Release 19 standard for devices powered by 6G base station RF. If Aura becomes the reference design, every zero-energy device pays a royalty.", key: "Hundreds of billions" },
];

const MARKET_DATA = [
  { segment: "IoT Semiconductor Market", y2024: "$7.4B", y2030: "$25.1B", cagr: "22.5%" },
  { segment: "Energy Harvesting Market", y2024: "$650M", y2030: "$1.8B", cagr: "18.4%" },
  { segment: "Medical Implant Electronics", y2024: "$4.2B", y2030: "$7.9B", cagr: "11.1%" },
  { segment: "Edge AI Chip Market", y2024: "$3.1B", y2030: "$14.2B", cagr: "29.3%" },
  { segment: "Low-Power MCU Market", y2024: "$2.8B", y2030: "$5.1B", cagr: "10.5%" },
  { segment: "Quantum Computing Market", y2024: "$1.3B", y2030: "$12.6B", cagr: "45.2%" },
];

const COMP_DATA = [
  { name: "ARM Holdings", model: "Semiconductor IP licensing — identical model", mc: "~$130B", threat: "FUTURE" },
  { name: "Wiliot", model: "Batteryless BLE tags — closest product comp.", mc: "~$500M est.", threat: "HIGH" },
  { name: "Ambiq Micro", model: "Sub-threshold MCU (Apple Watch, Fitbit)", mc: "Private", threat: "MED" },
  { name: "Everactive", model: "Batteryless industrial IoT — closed system", mc: "Private", threat: "MED" },
  { name: "EnOcean", model: "Energy harvesting building sensors", mc: "Private", threat: "LOW" },
  { name: "Texas Instruments", model: "MSP430 ultra-low-power MCU", mc: "~$180B", threat: "LOW" },
];

const ROADMAP = [
  { year: "2025–2027", title: "Aura-M1 Prototype & Pilot", body: "FPGA simulation complete. First silicon via Efabless Open MPW (SkyWater 130nm). Logistics pilot client live. Provisional patent filed. NITDA Startup Label obtained. First consulting revenue." },
  { year: "2028–2030", title: "Aura-M1 Global Scale + 6G Standard", body: "Aura SDK reaches 5,000+ developers. Medical implant licensing revenue flowing. Aura architecture submitted to IEEE 802.15 6G ambient IoT working group. Project Proton skunkworks operational." },
  { year: "2030–2032", title: "Project Proton — Proof of Qubit", body: "First room-temperature proton qubit demonstrated on CMOS chip. World-first result published. Quantum Series A ($2M–$10M) raised. IBM Research and Google Quantum AI request collaboration." },
  { year: "2033–2035", title: "10-Qubit Integrated System", body: "10-qubit proton processor + Aura-M1 classical controller operating as a unified system. First quantum drug simulation results. US DARPA and UK DSTL contracts signed. Valuation crosses $500M." },
  { year: "2038–2040", title: "100 Logical Qubit Commercial Processor", body: "Cloud API access for drug discovery and financial optimisation clients. 3 top-10 pharma companies. 2 top-5 global investment banks. Quantum division $200M+/yr. Total ARR $300M+." },
  { year: "2042–2045", title: "The GreyMatter IPO or Acquisition", body: "At $300M+ ARR: Nasdaq IPO at $3B–$8B, or strategic acquisition by IBM, Qualcomm, or Google. GreyMatter Labs' name sits alongside ARM, TSMC, and IBM in semiconductor history." },
];

function HomePage({ setPage }) {
  return (
    <div>
      <div className="hero">
        <NeuralCanvas />
        <div className="hero-content">
          <div className="hero-eyebrow">
            <span className="hero-eyebrow-dot" />
            <span className="hero-eyebrow-text">Pre-Seed · Lagos, Nigeria · Est. 2025</span>
          </div>
          <h1 className="hero-title">
            Where<br /><em className="hero-title-em">intelligence</em><br />begins.
          </h1>
          <p className="hero-subtitle">GreyMatter Labs Ltd.</p>
          <p className="hero-desc">
            We are building the world's first true zero-idle-power microcontroller — a chip that consumes absolutely nothing until the moment it is needed. Then it computes. Then it returns to silence.
          </p>
          <div className="hero-actions">
            <button className="btn-primary" onClick={() => setPage("Technology")}>Explore the Aura-M1</button>
            <button className="btn-secondary" onClick={() => setPage("Investors")}>Investor Brief</button>
          </div>
          <div className="hero-stats">
            <div className="hero-stat">
              <div className="hero-stat-num">0.00<span className="hero-stat-unit">W</span></div>
              <div className="hero-stat-label">Idle power draw</div>
            </div>
            <div className="hero-stat">
              <div className="hero-stat-num">14</div>
              <div className="hero-stat-label">Target sectors</div>
            </div>
            <div className="hero-stat">
              <div className="hero-stat-num">$67<span className="hero-stat-unit">B</span></div>
              <div className="hero-stat-label">TAM by 2030</div>
            </div>
            <div className="hero-stat">
              <div className="hero-stat-num">50<span className="hero-stat-unit">B+</span></div>
              <div className="hero-stat-label">Connected devices by 2030</div>
            </div>
          </div>
        </div>
      </div>

      <div className="section">
        <div className="section-label"><span className="section-label-line" /><span className="section-label-text">Our thesis</span></div>
        <h2 className="section-title">A trillion sensors.<br /><em>All dying on batteries.</em></h2>
        <p className="section-sub">Every connected device requires power. Power means batteries. Batteries corrode, die, and in hard-to-reach environments — inside human chests, satellite hulls, 4km below the ocean — replacement ranges from expensive to life-threatening.</p>
        <div className="grid-3">
          {[
            { icon: "⚡", title: "The Old World", body: "ARM, TI, and Nordic chips draw microamps in deep sleep — every second, every year, across a trillion devices. The cumulative waste is catastrophic.", tag: "Always-on drain" },
            { icon: "◈", title: "The GreyMatter Way", body: "The Aura-M1 is physically inert — 0.00 Watts — until a specific signal arrives. That signal IS the computation energy. No battery at rest. Not ever.", tag: "True zero idle" },
            { icon: "∞", title: "The Business Model", body: "Like ARM Holdings, we don't manufacture chips — we license the architecture. Every manufacturer who builds a zero-power device pays a royalty.", tag: "ARM-style licensing" },
          ].map(c => (
            <div className="card" key={c.title}>
              <div className="card-icon">{c.icon}</div>
              <div className="card-title">{c.title}</div>
              <div className="card-body">{c.body}</div>
              <span className="card-tag">{c.tag}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="divider" />

      <div className="section section-alt">
        <div className="section-label"><span className="section-label-line" /><span className="section-label-text">The vision</span></div>
        <h2 className="section-title">Two technologies.<br /><em>One architecture.</em></h2>
        <p className="section-sub">At its deepest level, GreyMatter Labs is solving the same problem at two different scales of physics: how do we compute with the minimum possible energy and maximum possible intelligence?</p>
        <div className="grid-2">
          <div className="card" style={{ background: "linear-gradient(135deg, rgba(0,232,200,0.06), rgba(0,232,200,0.01))", borderColor: "rgba(0,232,200,0.2)" }}>
            <div className="pill-row">
              <span className="pill pill-teal">Phase 1 — Active</span>
              <span className="pill pill-gray">2025–2030</span>
            </div>
            <div className="card-title">Aura-M1 · Classical Scale</div>
            <div className="card-body">Sub-threshold kinetic micro-controller. Zero idle power. Multi-source ambient energy harvesting. On-chip CNN inference. The architecture that will power a trillion edge devices.</div>
            <button className="btn-primary" style={{ marginTop: 24, padding: "10px 24px", fontSize: 13 }} onClick={() => setPage("Technology")}>Explore Aura-M1 →</button>
          </div>
          <div className="card" style={{ borderColor: "rgba(245,166,35,0.15)" }}>
            <div className="pill-row">
              <span className="pill pill-amber">Phase 2 — Horizon 2030+</span>
              <span className="pill pill-gray">Project Proton</span>
            </div>
            <div className="card-title">Project Proton · Quantum Scale</div>
            <div className="card-body">Room-temperature proton spin qubits on CMOS-compatible silicon. Long coherence without dilution refrigerators. The Aura-M1 as the classical control layer. The most ambitious quantum architecture ever attempted.</div>
            <button className="btn-secondary" style={{ marginTop: 24, padding: "10px 24px", fontSize: 13 }} onClick={() => setPage("Quantum")}>Explore Project Proton →</button>
          </div>
        </div>
      </div>

      <div className="cta-section">
        <h2 className="cta-title">The science<br /><em style={{ color: "#00E8C8", fontStyle: "italic" }}>always comes first.</em></h2>
        <p className="cta-body">We are researchers before we are a business. Every claim in our brief maps to peer-reviewed, commercially-demonstrated science. The gap is not physics — it is integration.</p>
        <div style={{ display: "flex", gap: 16, justifyContent: "center" }}>
          <button className="btn-primary" onClick={() => setPage("Company")}>Our Story</button>
          <button className="btn-secondary" onClick={() => setPage("Applications")}>See All 14 Sectors</button>
        </div>
      </div>
    </div>
  );
}

function TechnologyPage() {
  return (
    <div>
      <div className="section">
        <div className="section-label"><span className="section-label-line" /><span className="section-label-text">Aura-M1</span></div>
        <h2 className="section-title">Sub-threshold kinetic<br /><em>micro-controller.</em></h2>
        <p className="section-sub">Three independently-proven technologies, never before integrated into one licensable architecture. That gap is GreyMatter Labs.</p>

        <div className="grid-3">
          {[
            { icon: "≈", num: "Pillar 01", title: "Sub-Threshold CMOS", body: "Transistors biased below their threshold voltage. Demonstrated by Ambiq Micro's Apollo MCU at 6nA idle — the chip inside Apple Watch. Risk: LOW.", tag: "6nA idle demonstrated" },
            { icon: "〰", num: "Pillar 02", title: "Asynchronous NCL Logic", body: "Gates fired by data arrival, not a clock signal. Published in working silicon by MIT and Delft since 1994. No clock means no clock-cycle power drain, ever.", tag: "Working silicon 1994" },
            { icon: "⊕", num: "Pillar 03", title: "RF Energy Harvesting", body: "Rectenna converts ambient EM to DC. Wiliot raised $200M+ shipping this to Amazon and Walmart. The technology is proven. The integration is not.", tag: "$200M Wiliot raised" },
          ].map(c => (
            <div className="card" key={c.title}>
              <div className="card-num">{c.num}</div>
              <div className="card-title">{c.title}</div>
              <div className="card-body">{c.body}</div>
              <span className="card-tag">{c.tag}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="divider" />

      <div className="section section-alt">
        <div className="section-label"><span className="section-label-line" /><span className="section-label-text">How it works</span></div>
        <h2 className="section-title">Null Convention Logic.<br /><em>Gates fired by data, not clocks.</em></h2>
        <p className="section-sub">Each gate uses dual-rail encoding. When both wires are silent — NULL state — the gate draws exactly zero power. When data arrives, the gate fires. When computation completes, silence returns.</p>

        <div className="feature-visual" style={{ maxWidth: 680 }}>
          <div style={{ marginBottom: 24 }}>
            <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, letterSpacing: "0.1em", color: "#4a4c70", textTransform: "uppercase", marginBottom: 20 }}>Dual-Rail Encoding States</div>
            <div className="ncl-diagram">
              {[
                { label: "NULL", wire1: "#1a1a3a", wire2: "#1a1a3a", color: "#3a3c60", power: "0.00W", powerColor: "#3a3c60" },
                null,
                { label: "DATA-1", wire1: "#00E8C8", wire2: "#1a1a3a", color: "#00E8C8", power: "Pulse", powerColor: "#00E8C8" },
                null,
                { label: "DATA-0", wire1: "#1a1a3a", wire2: "#00E8C8", color: "#00E8C8", power: "Pulse", powerColor: "#F5A623" },
              ].map((s, i) =>
                s === null ? <div key={i} className="ncl-arrow">→</div> : (
                  <div className="ncl-state" key={i} style={{ background: "rgba(255,255,255,0.02)", borderRadius: 10, border: `1px solid ${s === null ? "none" : i === 0 ? "rgba(255,255,255,0.05)" : "rgba(0,232,200,0.15)"}` }}>
                    <div className="ncl-state-label" style={{ color: s.color }}>{s.label}</div>
                    <div className="ncl-wires">
                      <div className="ncl-wire"><span className="ncl-wire-label">A</span><div className="ncl-wire-line" style={{ background: s.wire1 }} /></div>
                      <div className="ncl-wire"><span className="ncl-wire-label">B</span><div className="ncl-wire-line" style={{ background: s.wire2 }} /></div>
                    </div>
                    <div className="ncl-power" style={{ color: s.powerColor, fontSize: 18 }}>{s.power}</div>
                  </div>
                )
              )}
            </div>
          </div>
          <div className="highlight-block-body" style={{ borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: 24, marginTop: 8 }}>
            The TH22 gate fires only when both inputs carry data — creating a computation wave through the chip powered entirely by the arriving signal. Between events: not a single electron moves.
          </div>
        </div>
      </div>

      <div className="section">
        <div className="section-label"><span className="section-label-line" /><span className="section-label-text">Energy harvesting</span></div>
        <h2 className="section-title">Ambient energy<br /><em>is everywhere.</em></h2>
        <p className="section-sub">The Aura-M1 doesn't eliminate energy — it eliminates the need for stored energy. Because it runs for microseconds per event, ambient sources that could never sustain a conventional chip are perfectly adequate.</p>

        <div className="table-wrap">
          <table className="gml-table">
            <thead><tr>
              <th>Source</th><th>Mechanism</th><th>Typical Yield</th><th>Ideal Application</th>
            </tr></thead>
            <tbody>
              {[
                ["RF / Radio", "Rectenna converts EM to DC", "1–100 µW", "Smart tags, supply chain"],
                ["Vibration", "Piezoelectric under mechanical stress", "10–500 µW", "Industrial sensors, ships, vehicles"],
                ["Body Heat", "Thermoelectric on temp differential", "5–40 µW", "Pacemakers, neural implants"],
                ["Ambient Light", "Micro-photovoltaic cell", "10–200 µW", "Buildings, smart packaging"],
                ["Pressure / Flow", "Fluid flow micro-turbine", "50–1000 µW", "Pipelines, water systems"],
              ].map(r => (
                <tr key={r[0]}><td>{r[0]}</td><td>{r[1]}</td><td style={{ color: "#00E8C8", fontFamily: "'Space Mono', monospace", fontSize: 12 }}>{r[2]}</td><td>{r[3]}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="section section-alt">
        <div className="section-label"><span className="section-label-line" /><span className="section-label-text">Feasibility</span></div>
        <h2 className="section-title">Every pillar is<br /><em>already demonstrated.</em></h2>
        <p className="section-sub">The gap is not physics — it is integration. Nobody has packaged all three into one licensable architecture. That gap is GreyMatter Labs.</p>
        <div className="table-wrap">
          <table className="gml-table">
            <thead><tr><th>Technology</th><th>Demonstrated By</th><th>Evidence</th><th>Risk</th></tr></thead>
            <tbody>
              {[
                ["Asynchronous NCL Logic", "MIT, Delft, CalTech", "Working silicon since 1994; peer-reviewed IEEE publications", "LOW"],
                ["RF Energy Harvesting", "Powercast, Wiliot, Energous", "Commercial products shipping; Wiliot raised $200M+", "LOW"],
                ["Sub-Threshold CMOS", "Ambiq Micro", "Apollo MCU ships at 6nA idle; Apple Watch uses Ambiq silicon", "LOW"],
                ["Body-Heat Power", "Matrix Industries, EnOcean", "Matrix PowerWatch; EnOcean harvesting modules globally", "LOW"],
                ["CNN Inference <10µW", "Harvard, MIT, Stanford", "Published 2022–2024; BNNs at 8µW in lab conditions", "MED"],
                ["Full Integration", "Nobody yet", "This is GreyMatter Labs' entire market opportunity", "HIGH"],
              ].map(r => (
                <tr key={r[0]}>
                  <td>{r[0]}</td><td>{r[1]}</td><td>{r[2]}</td>
                  <td><span className={`badge badge-${r[3].toLowerCase()}`}>{r[3]}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function ApplicationsPage() {
  const [filter, setFilter] = useState("all");
  const earlyIdx = [0, 1, 2, 6, 7];
  const filtered = filter === "all" ? SECTORS : filter === "early" ? SECTORS.filter((_, i) => earlyIdx.includes(i)) : SECTORS.filter((_, i) => !earlyIdx.includes(i));

  return (
    <div>
      <div className="section">
        <div className="section-label"><span className="section-label-line" /><span className="section-label-text">Applications</span></div>
        <h2 className="section-title">14 sectors.<br /><em>One architecture.</em></h2>
        <p className="section-sub">The Aura-M1 is a horizontal enabling technology. Any environment where sensors must operate for years without intervention is a candidate market.</p>

        <div className="pill-row" style={{ marginBottom: 32 }}>
          {["all", "early", "long"].map(f => (
            <span key={f} className={`pill ${filter === f ? "pill-teal" : "pill-gray"}`} style={{ cursor: "pointer" }} onClick={() => setFilter(f)}>
              {f === "all" ? "All 14 Sectors" : f === "early" ? "Early Commercial" : "Long Horizon"}
            </span>
          ))}
        </div>

        <div className="sectors-grid">
          {filtered.map(s => (
            <div className="sector-card" key={s.num}>
              <div className="sector-num">SECTOR {s.num}</div>
              <div className="sector-name">{s.name}</div>
              <div className="sector-desc">{s.desc}</div>
              <div className="sector-key"><span className="sector-key-text">{s.key}</span></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function QuantumPage() {
  return (
    <div>
      <div className="section">
        <div className="section-label"><span className="section-label-line" /><span className="section-label-text">Project Proton</span></div>
        <h2 className="section-title">The next computing<br /><em>revolution.</em></h2>
        <p className="section-sub" style={{ color: "#F5A623", opacity: 0.8 }}>Horizon: 2030–2045 · Quantum Division · Visionary Classification</p>
        <p className="section-sub" style={{ marginTop: -20 }}>Most quantum computers today use superconducting qubits requiring dilution refrigerators at −273°C. Project Proton explores a third path: the proton spin qubit — long coherence at room temperature on CMOS-compatible silicon.</p>

        <div className="highlight-block" style={{ borderColor: "rgba(245,166,35,0.2)", background: "linear-gradient(135deg, rgba(245,166,35,0.06), transparent)" }}>
          <div className="highlight-block-title">The Proton Advantage in One Sentence</div>
          <div className="highlight-block-body" style={{ fontSize: 17 }}>Long coherence at room temperature — the property no other qubit technology has. Superconducting qubits achieve microseconds at extreme cost. Trapped ions achieve minutes but resist miniaturisation. Proton spin qubits achieve <span style={{ color: "#F5A623" }}>seconds to minutes at room temperature, with CMOS-compatible lithographic fabrication.</span></div>
        </div>
      </div>

      <div className="section section-alt">
        <div className="section-label"><span className="section-label-line" /><span className="section-label-text">Qubit comparison</span></div>
        <h2 className="section-title">Every competing approach<br /><em>has a fundamental limitation.</em></h2>

        <div className="qubit-compare-grid">
          {["Technology", "Temp. Required", "Coherence Time", "Scalability", "Key Player"].map(h => (
            <div key={h} className="qubit-cell header">{h}</div>
          ))}
          {[
            ["Superconducting", "15 milli-kelvin", "~100 µs", "Dilution fridge required per processor", "IBM, Google, Rigetti"],
            ["Trapped Ion", "Room (laser cooled)", "~1–10 min", "Individual laser per ion — complex at scale", "IonQ, Quantinuum"],
            ["Photonic", "Room temp", "Long (lossless)", "Photon-photon interactions weak", "PsiQuantum, Xanadu"],
            ["Neutral Atom", "Near zero (laser)", "~1–10 sec", "Optical tweezers limited in density", "QuEra, Atom"],
          ].map(row => row.map((cell, ci) => (
            <div key={`${row[0]}-${ci}`} className="qubit-cell"><div className="qubit-cell-val">{cell}</div></div>
          )))}
          {["Proton Spin (Project Proton)", "Room temp — NO refrigerant", "Seconds to minutes", "CMOS-compatible, lithographically scalable", "GreyMatter Labs (2030+)"].map((cell, ci) => (
            <div key={`proton-${ci}`} className="qubit-cell ours"><div className={`qubit-cell-val ${ci === 0 ? "name" : "good"}`}>{cell}</div></div>
          ))}
        </div>
      </div>

      <div className="section">
        <div className="section-label"><span className="section-label-line" /><span className="section-label-text">Architecture</span></div>
        <h2 className="section-title">Four integrated layers.<br /><em>One chip.</em></h2>
        <p className="section-sub">The entire stack is designed for fabrication using semiconductor lithography at 28nm or below.</p>

        <div style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 700 }}>
          {[
            { n: "01", title: "Qubit Substrate — Proton Spin Array", body: "Proton-rich organic molecules on silicon via MOCVD. Each site provides one addressable nuclear spin qubit. At 28nm resolution: 10⁶ qubits per mm². Target first prototype: 100 logical qubits.", color: "rgba(245,166,35,0.15)", border: "rgba(245,166,35,0.25)" },
            { n: "02", title: "RF Control Grid — Micro-NMR Coil Array", body: "Sub-100µm planar spiral inductors in the chip metal layers. RF pulses rotate individual proton spins. Gate fidelity target: >99.5% single-qubit, >98% CNOT.", color: "rgba(0,232,200,0.08)", border: "rgba(0,232,200,0.2)" },
            { n: "03", title: "Quantum Error Correction — Surface Code", body: "1,000 physical qubits per logical qubit. With proton density of 10⁶/mm², 1,000 physical qubits occupies just 0.001mm². A 1cm² chip houses 100 fault-tolerant logical qubits.", color: "rgba(0,232,200,0.08)", border: "rgba(0,232,200,0.2)" },
            { n: "04", title: "Classical Readout — Aura-M1 Integration", body: "The Aura-M1 acts as the classical controller: generating RF pulse sequences, interpreting readout signals, running error correction, interfacing with external systems. Zero thermal noise. Zero clock interference.", color: "rgba(0,232,200,0.12)", border: "rgba(0,232,200,0.3)" },
          ].map(l => (
            <div key={l.n} style={{ display: "flex", gap: 20, background: l.color, border: `1px solid ${l.border}`, borderRadius: 14, padding: "24px 28px", alignItems: "flex-start" }}>
              <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 24, fontWeight: 700, color: "#00E8C8", opacity: 0.4, minWidth: 32 }}>{l.n}</div>
              <div>
                <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 17, color: "#E2E4F0", marginBottom: 8 }}>{l.title}</div>
                <div style={{ fontFamily: "'Epilogue', sans-serif", fontSize: 14, color: "#7B7FA0", lineHeight: 1.65, fontWeight: 300 }}>{l.body}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="section section-alt">
        <div className="section-label"><span className="section-label-line" /><span className="section-label-text">Applications</span></div>
        <h2 className="section-title">Problems impossible<br /><em>for classical computers.</em></h2>
        <div className="grid-2">
          {[
            { title: "Drug Discovery", body: "A 100-logical-qubit proton processor simulates drug-target interactions for cancer, Alzheimer's, and antibiotic resistance in hours. Pfizer, Roche, and AstraZeneca already pay IBM millions per year for quantum chemistry access.", time: "Year 10+" },
            { title: "Materials Science", body: "Determine whether a proposed lithium-oxygen battery chemistry is stable before a gram is synthesised. Compress a decade of materials research into weeks.", time: "Year 10+" },
            { title: "Cryptography", body: "Shor's algorithm on a fault-tolerant quantum computer can factor the large primes that underpin RSA encryption. Intelligence agencies are harvesting encrypted data now.", time: "Year 12+" },
            { title: "Financial Optimisation", body: "Portfolio optimisation, risk analysis, and options pricing are combinatorial problems. Quantum computers find exact optima. Goldman Sachs and JPMorgan have active quantum research programmes.", time: "Year 10+" },
            { title: "Climate & Weather Modelling", body: "Quantum algorithms for differential equations provide exponential speedup for fluid simulation. A proton processor + Aura-M1 sensor network creates a vertically integrated climate intelligence system.", time: "Year 12+" },
            { title: "National Security", body: "Room-temperature proton processors are deployable in field operations, submarines, and aircraft where dilution refrigerators are physically impossible. DARPA and DSTL have active programmes.", time: "Year 12+" },
          ].map(a => (
            <div className="card" key={a.title}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                <div className="card-title" style={{ marginBottom: 0 }}>{a.title}</div>
                <span className="pill pill-amber" style={{ fontSize: 10, padding: "4px 10px", whiteSpace: "nowrap" }}>{a.time}</span>
              </div>
              <div className="card-body">{a.body}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function InvestorsPage() {
  return (
    <div>
      <div className="section">
        <div className="section-label"><span className="section-label-line" /><span className="section-label-text">Investment thesis</span></div>
        <h2 className="section-title">The ARM of zero-power<br /><em>computing.</em></h2>
        <p className="section-sub">ARM IPO'd at $60B on $2.6B revenue — a 23x multiple. That is what the market pays for semiconductor IP licensing businesses with network effects. GreyMatter Labs is building toward the same position in a market ARM is not watching.</p>

        <div className="market-header">
          <div className="market-stat-card">
            <div className="market-stat-label">Combined TAM by 2030</div>
            <div className="market-stat-val">$67B</div>
            <div className="market-stat-desc">6 converging mega-markets at 22% average CAGR</div>
          </div>
          <div className="market-stat-card">
            <div className="market-stat-label">Seed Requirement (24 months)</div>
            <div className="market-stat-val">$106K</div>
            <div className="market-stat-desc">Maximum. Phase 1 achievable for $23K</div>
          </div>
          <div className="market-stat-card">
            <div className="market-stat-label">ARM Revenue Multiple</div>
            <div className="market-stat-val">23×</div>
            <div className="market-stat-desc">What the market pays for semiconductor IP licensing</div>
          </div>
        </div>

        <div className="table-wrap">
          <table className="gml-table">
            <thead><tr><th>Market Segment</th><th>2024 Size</th><th>2030 Projection</th><th>CAGR</th></tr></thead>
            <tbody>
              {MARKET_DATA.map(r => (
                <tr key={r.segment}>
                  <td>{r.segment}</td>
                  <td style={{ fontFamily: "'Space Mono', monospace", fontSize: 13 }}>{r.y2024}</td>
                  <td style={{ fontFamily: "'Space Mono', monospace", fontSize: 13, color: "#00E8C8" }}>{r.y2030}</td>
                  <td><span className="badge badge-low">{r.cagr}</span></td>
                </tr>
              ))}
              <tr style={{ borderTop: "1px solid rgba(0,232,200,0.2)" }}>
                <td style={{ color: "#00E8C8", fontWeight: 700 }}>Combined Addressable</td>
                <td style={{ fontFamily: "'Space Mono', monospace", color: "#E2E4F0" }}>~$19B</td>
                <td style={{ fontFamily: "'Space Mono', monospace", color: "#00E8C8", fontWeight: 700 }}>~$67B</td>
                <td><span className="badge badge-low">~22%</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="divider" />

      <div className="section section-alt">
        <div className="section-label"><span className="section-label-line" /><span className="section-label-text">Competitive landscape</span></div>
        <h2 className="section-title">Wiliot sells a product.<br /><em>We license an architecture.</em></h2>
        <p className="section-sub">The more manufacturers adopt Aura, the more royalties flow — without GreyMatter Labs making a single additional chip. This is the ARM model, not the Nokia model.</p>

        <div className="table-wrap">
          <table className="gml-table">
            <thead><tr><th>Company</th><th>Business Model</th><th>Market Cap / Valuation</th><th>Threat Level</th></tr></thead>
            <tbody>
              {COMP_DATA.map(r => (
                <tr key={r.name}>
                  <td>{r.name}</td>
                  <td>{r.model}</td>
                  <td style={{ fontFamily: "'Space Mono', monospace", fontSize: 12 }}>{r.mc}</td>
                  <td><span className={`badge badge-${r.threat.toLowerCase()}`}>{r.threat}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="section">
        <div className="section-label"><span className="section-label-line" /><span className="section-label-text">Business model</span></div>
        <h2 className="section-title">Consulting → Hardware<br /><em>→ Architecture royalties.</em></h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 680 }}>
          {[
            { years: "Years 1–2", phase: "Bootstrap", stream: "Design consulting + IP licensing to research labs", target: "Universities, aerospace startups, defence R&D", proj: "$100k–$500k" },
            { years: "Years 3–4", phase: "Early Market", stream: "Aura-M1 hardware + Aura SDK developer licences", target: "Medical OEMs, logistics firms, industrial IoT integrators", proj: "$2M–$10M" },
            { years: "Year 5+", phase: "Scale", stream: "Global Aura architecture royalties + 6G standard adoption", target: "Every manufacturer building zero-energy devices globally", proj: "$50M+" },
            { years: "Year 10+", phase: "Quantum", stream: "Project Proton IP licensing + quantum cloud access fees", target: "Quantum computing OEMs, national labs, pharma, finance", proj: "$200M+" },
          ].map((row, i) => (
            <div key={i} style={{ display: "grid", gridTemplateColumns: "140px 1fr 1fr 120px", gap: 20, background: "#080820", border: "1px solid rgba(0,232,200,0.08)", borderRadius: 12, padding: "22px 24px", alignItems: "center" }}>
              <div>
                <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, color: "#00E8C8", letterSpacing: "0.08em", marginBottom: 4 }}>{row.years}</div>
                <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 15, color: "#E2E4F0" }}>{row.phase}</div>
              </div>
              <div style={{ fontFamily: "'Epilogue', sans-serif", fontSize: 13, color: "#9496B8", lineHeight: 1.5 }}>{row.stream}</div>
              <div style={{ fontFamily: "'Epilogue', sans-serif", fontSize: 13, color: "#6668a0", lineHeight: 1.5 }}>{row.target}</div>
              <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 13, color: "#F5A623", fontWeight: 700, textAlign: "right" }}>{row.proj}</div>
            </div>
          ))}
        </div>

        <div className="highlight-block" style={{ marginTop: 48 }}>
          <div className="highlight-block-title">Funding Sources — Non-Dilutive First</div>
          <div className="highlight-block-body">Nigeria Startup Act (NITDA) · Tony Elumelu Foundation ($5,000, zero equity) · TETFUND Research Grant ($10k–$50k) · Google for Startups Africa ($20k cloud credits) · Entrepreneur First Lagos · Y Combinator ($500k for 7%) — apply after battery-less logger demo complete.</div>
        </div>
      </div>
    </div>
  );
}

function CompanyPage() {
  return (
    <div>
      <div className="section">
        <div className="section-label"><span className="section-label-line" /><span className="section-label-text">Company profile</span></div>
        <h2 className="section-title">We are researchers<br /><em>before we are a business.</em></h2>
        <p className="section-sub">The science always comes first. Every claim in our brief maps to demonstrated, commercially-tested science. What we are building is not a moonshot — it is an integration challenge that the market has been waiting for.</p>

        <div className="founder-block">
          <div className="founder-portrait">
            <div className="founder-initials">HFU</div>
            <div className="founder-name">Harvey Frederick Udoudom</div>
            <div className="founder-role" style={{ marginBottom: 24 }}>Founder & CEO</div>
            <div style={{ borderTop: "1px solid rgba(0,232,200,0.1)", paddingTop: 20, display: "flex", flexDirection: "column", gap: 12 }}>
              {[
                ["HQ", "Lagos, Nigeria"],
                ["Stage", "Pre-Seed / Concept"],
                ["IP Strategy", "USPTO → PCT → National Phase"],
                ["Exit Target", "Nasdaq IPO or Strategic M&A"],
              ].map(([k, v]) => (
                <div key={k} style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, color: "#4a4c70", letterSpacing: "0.08em", textTransform: "uppercase" }}>{k}</span>
                  <span style={{ fontFamily: "'Epilogue', sans-serif", fontSize: 12, color: "#9496B8", textAlign: "right" }}>{v}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <div style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", fontSize: 22, color: "#E2E4F0", lineHeight: 1.5, marginBottom: 28 }}>
              "Harvey Frederick Udoudom is not building a startup. He is building the company that will define how a trillion devices think."
            </div>
            <div className="card-body" style={{ fontSize: 15, marginBottom: 28 }}>
              GreyMatter Labs Ltd. is registered in Nigeria under the Companies and Allied Matters Act (CAC) with a planned Delaware/UK holding structure for international investment rounds. We are actively pursuing the Nigeria Startup Act Label (NITDA), which provides tax exemptions, regulatory sandboxes, and priority access to government procurement.
            </div>
            <div className="pill-row">
              <span className="pill pill-teal">CAC Registered</span>
              <span className="pill pill-gray">NITDA Label — Pending</span>
              <span className="pill pill-gray">Patent Pending</span>
              <span className="pill pill-amber">Raising Pre-Seed</span>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginTop: 28 }}>
              {[
                { k: "Legal Name", v: "GreyMatter Labs Ltd." },
                { k: "Flagship Product", v: "Aura-M1 Kinetic MCU" },
                { k: "Quantum Division", v: "Project Proton (2030+)" },
                { k: "Sector", v: "Semiconductor IP / Deep Tech" },
              ].map(({ k, v }) => (
                <div key={k} style={{ background: "#080820", border: "1px solid rgba(255,255,255,0.05)", borderRadius: 10, padding: "16px 20px" }}>
                  <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, color: "#4a4c70", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 6 }}>{k}</div>
                  <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 600, fontSize: 14, color: "#E2E4F0" }}>{v}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="divider" />

      <div className="section section-alt">
        <div className="section-label"><span className="section-label-line" /><span className="section-label-text">The name</span></div>
        <h2 className="section-title">Meaning is<br /><em>intentional.</em></h2>
        <div className="grid-2" style={{ gap: 16, maxWidth: 700 }}>
          {[
            { word: "Grey", def: "The colour between certainty and ignorance — where hard problems live and breakthroughs are born." },
            { word: "Matter", def: "Physics. The fundamental substance of the universe. What everything — including qubits and logic gates — is made of." },
            { word: "Grey Matter", def: "The brain's processing tissue. The most powerful computer ever built. This is what GreyMatter Labs is building toward." },
            { word: "Labs", def: "We are researchers before we are a business. The science always comes first." },
          ].map(({ word, def }) => (
            <div key={word} style={{ background: "#080820", border: "1px solid rgba(0,232,200,0.08)", borderRadius: 14, padding: "28px" }}>
              <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 18, fontWeight: 700, color: "#00E8C8", marginBottom: 10 }}>{word}</div>
              <div style={{ fontFamily: "'Epilogue', sans-serif", fontSize: 14, color: "#7B7FA0", lineHeight: 1.65, fontWeight: 300 }}>{def}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="section">
        <div className="section-label"><span className="section-label-line" /><span className="section-label-text">Roadmap</span></div>
        <h2 className="section-title">25 years.<br /><em>One convergence.</em></h2>
        <p className="section-sub">Physics first. Finance follows. Standards last.</p>
        <div className="two-col">
          <div className="timeline">
            {ROADMAP.slice(0, 3).map(r => (
              <div className="timeline-item" key={r.year}>
                <div className="timeline-dot" />
                <div className="timeline-year">{r.year}</div>
                <div className="timeline-title">{r.title}</div>
                <div className="timeline-body">{r.body}</div>
              </div>
            ))}
          </div>
          <div className="timeline">
            {ROADMAP.slice(3).map(r => (
              <div className="timeline-item" key={r.year}>
                <div className="timeline-dot" />
                <div className="timeline-year">{r.year}</div>
                <div className="timeline-title">{r.title}</div>
                <div className="timeline-body">{r.body}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [activePage, setActivePage] = useState("Home");

  useEffect(() => {
    injectFonts();
    const styleEl = document.createElement("style");
    styleEl.id = "gml-styles";
    styleEl.textContent = css;
    document.head.appendChild(styleEl);
    return () => { document.getElementById("gml-styles")?.remove(); };
  }, []);

  const pages = { Home: HomePage, Technology: TechnologyPage, Applications: ApplicationsPage, Quantum: QuantumPage, Investors: InvestorsPage, Company: CompanyPage };
  const PageComp = pages[activePage];

  const setPage = useCallback((p) => {
    setActivePage(p);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="gml-root">
      <nav className="nav">
        <div className="nav-logo" onClick={() => setPage("Home")}>
          <div className="nav-logo-mark">GM</div>
          <span className="nav-brand">GreyMatter Labs</span>
        </div>
        <div className="nav-links">
          {["Home", "Technology", "Applications", "Quantum", "Investors", "Company"].map(p => (
            <button key={p} className={`nav-link ${activePage === p ? "active" : ""}`} onClick={() => setPage(p)}>{p}</button>
          ))}
        </div>
        <button className="nav-cta" onClick={() => setPage("Investors")}>Investor Brief</button>
      </nav>

      <div className="page" key={activePage}>
        <PageComp setPage={setPage} />
      </div>

      <footer className="footer">
        <div className="footer-copy">© 2025 GreyMatter Labs Ltd. · Lagos, Nigeria</div>
        <div className="footer-conf">Confidential · Not for public distribution · Pre-Seed</div>
      </footer>
    </div>
  );
}
