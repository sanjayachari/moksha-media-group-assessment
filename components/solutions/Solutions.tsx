'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'

/* ── identical ease + spring to your navbar/hero ── */
const EASE = [0.32, 0.72, 0, 1]



/* ── floating ambient dots — same as your Hero ── */
const DOTS = [
  { x:'6%',  y:'22%', s:2,   delay:'0s',   dur:'6s'   },
  { x:'18%', y:'60%', s:1.5, delay:'2.1s', dur:'8s'   },
  { x:'28%', y:'88%', s:2,   delay:'1.0s', dur:'7s'   },
  { x:'72%', y:'14%', s:2.5, delay:'0.7s', dur:'9s'   },
  { x:'85%', y:'38%', s:1.5, delay:'3.0s', dur:'5.5s' },
  { x:'92%', y:'70%', s:2,   delay:'1.4s', dur:'7s'   },
]

/* ── solution data ── */
const SOLUTIONS = [
  {
    id:       'power-infrastructure',
    num:      '01',
    title:    'Power Infrastructure',
    sub:      'Backbone-grade power for facilities that cannot fail.',
    body:     'Double-conversion UPS arrays, diesel & gas gen-sets, intelligent PDU management and real-time DCIM monitoring — sourced from authorized partners and sized to your exact load profile.',
    items:    ['UPS Systems', 'Generator Backup', 'PDU Management', 'Power Monitoring', 'Transfer Switches', 'Bus Duct Systems'],
    specs:    [{ l:'Availability', v:'99.999%' }, { l:'Switchover', v:'<10ms' }, { l:'Capacity', v:'2MW' }],
  },
  {
    id:       'cooling-infrastructure',
    num:      '02',
    title:    'Cooling Infrastructure',
    sub:      'Precision thermal management at every density tier.',
    body:     'CRAC/CRAH units, in-row cooling, rear-door heat exchangers and full liquid-to-chip systems. We engineer containment strategies that hit sub-1.4 PUE targets without compromise.',
    items:    ['CRAC / CRAH Units', 'In-Row Cooling', 'Liquid Cooling', 'Airflow Management', 'Free Cooling', 'Cooling Towers'],
    specs:    [{ l:'PUE Target', v:'< 1.4' }, { l:'Rack Density', v:'30kW' }, { l:'Temp Accuracy', v:'±0.5°C' }],
  },
  {
    id:       'network-infrastructure',
    num:      '03',
    title:    'Network Infrastructure',
    sub:      'Fabric-grade connectivity. Zero bottlenecks.',
    body:     'Cat6A, Cat8 and OS2 fiber cabling paired with 400G spine-leaf switching — end-to-end certified and SDN-ready. We supply and spec for latency-sensitive workloads at any scale.',
    items:    ['Structured Cabling', 'Fiber Optic Systems', 'Core Switching', 'WAN Optimization', 'Patch Management', 'Cable Management'],
    specs:    [{ l:'Throughput', v:'400G' }, { l:'Latency', v:'<1ms' }, { l:'Fiber Reach', v:'80km' }],
  },
  {
    id:       'physical-infrastructure',
    num:      '04',
    title:    'Physical Infrastructure',
    sub:      'The structural skeleton of every data center.',
    body:     'Rack enclosures, hot/cold aisle containment, physical security and seismic bracing — sourced from tier-1 manufacturers and specced for any environment from edge to hyperscale.',
    items:    ['Rack Enclosures', 'Containment Systems', 'Physical Security', 'Floor Planning', 'Cable Management', 'Seismic Bracing'],
    specs:    [{ l:'Load Rating', v:'1500kg' }, { l:'Heights', v:'20–48U' }, { l:'IP Rating', v:'IP54' }],
  },
]

/* ══════════════════════════════════════════════
   HERO STRIP — matches your site's hero language
══════════════════════════════════════════════ */
function PageHero({ active, setActive }) {
  return (
    <section className="relative flex flex-col items-center justify-center overflow-hidden"
      style={{ minHeight:'56vh', paddingTop:140, paddingBottom:64, background:'#070707' }}>

      {/* same background layers as your Hero.jsx */}
      <div className="absolute inset-0" style={{ background:'#070707', zIndex:0 }}/>
      <div className="absolute inset-0" style={{ zIndex:1,
        background:`linear-gradient(122deg,transparent 0%,transparent 12%,rgba(255,255,255,0) 16%,rgba(255,255,255,0.035) 21%,rgba(255,255,255,0.075) 24%,rgba(255,255,255,0.035) 27%,rgba(255,255,255,0) 32%,transparent 56%)`
      }}/>
      <div className="absolute inset-0" style={{ zIndex:2,
        background:`radial-gradient(ellipse 120% 50% at 18% 18%,rgba(255,255,255,0.06) 0%,transparent 55%),
                    radial-gradient(ellipse 80% 40% at 78% 12%,rgba(255,255,255,0.04) 0%,transparent 50%)`
      }}/>
      <div className="absolute inset-0" style={{ zIndex:3,
        background:`radial-gradient(ellipse 85% 72% at 50% 38%,transparent 15%,rgba(0,0,0,0.5) 65%,rgba(0,0,0,0.9) 100%)`
      }}/>
      <div className="absolute inset-0" style={{ zIndex:3,
        background:`linear-gradient(180deg,rgba(0,0,0,0.65) 0%,rgba(0,0,0,0.15) 18%,transparent 35%)`
      }}/>

      {/* grid */}
      <div className="absolute inset-0 opacity-[0.025]" style={{ zIndex:4,
        backgroundImage:`linear-gradient(rgba(255,255,255,0.5) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.5) 1px,transparent 1px)`,
        backgroundSize:'60px 60px',
      }}/>

      {/* ambient dots */}
      <div className="absolute inset-0 pointer-events-none" style={{zIndex:5}}>
        {DOTS.map((d,i)=>(
          <div key={i} style={{
            position:'absolute',left:d.x,top:d.y,
            width:d.s,height:d.s,borderRadius:'50%',
            background:'rgba(52,211,153,0.75)',
            boxShadow:`0 0 ${d.s*3}px ${d.s}px rgba(52,211,153,0.25)`,
            animation:`waterDot ${d.dur} ${d.delay} infinite ease-in-out`,
          }}/>
        ))}
      </div>

      {/* content */}
      <div className="relative text-center px-6 max-w-4xl mx-auto" style={{zIndex:10}}>
        <div className="opacity-0 animate-fade-up-custom flex items-center justify-center gap-3 mb-8" style={{animationDelay:'0.05s'}}>
          <span className="h-px w-8 bg-white/20"/>
          <span className="text-xs tracking-[0.2em] text-white/40 uppercase" style={{fontFamily:'DM Sans,sans-serif'}}>
            Infrastructure Solutions
          </span>
          <span className="h-px w-8 bg-white/20"/>
        </div>

        <h1 className="opacity-0 animate-fade-up-custom text-5xl md:text-[4.5rem] font-bold mb-5 leading-[1.04]"
          style={{fontFamily:'Syne,sans-serif',letterSpacing:'-0.04em',animationDelay:'0.12s'}}>
          <span style={{
            display:'block',
            background:'linear-gradient(135deg,#ffffff 0%,rgba(255,255,255,0.82) 50%,#ffffff 100%)',
            WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text',
          }}>
            Built for Enterprises
          </span>
          <span style={{
            display:'block',fontWeight:500,letterSpacing:'-0.03em',
            background:'linear-gradient(135deg,rgba(255,255,255,0.32) 0%,rgba(255,255,255,0.16) 60%,rgba(255,255,255,0.32) 100%)',
            WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text',
          }}>
            That Cannot Afford Downtime.
          </span>
        </h1>

        <p className="opacity-0 animate-fade-up-custom text-base text-white/38 max-w-lg mx-auto mb-12 leading-relaxed"
          style={{fontFamily:'DM Sans,sans-serif',animationDelay:'0.22s'}}>
          Four infrastructure pillars — power, cooling, network, physical — precision-sourced and partner-authorized for developers and contractors across three continents.
        </p>

        {/* solution nav — same pill style as your navbar QuoteButton */}
        <div className="opacity-0 animate-fade-up-custom flex flex-wrap items-center justify-center gap-2" style={{animationDelay:'0.3s'}}>
          {SOLUTIONS.map(s=>(
            <a
              key={s.id} href={`#${s.id}`}
              onClick={e=>{e.preventDefault();document.getElementById(s.id)?.scrollIntoView({behavior:'smooth',block:'start'})}}
              style={{
                display:'inline-flex',alignItems:'center',gap:6,
                padding:'7px 16px',borderRadius:9999,
                background: active===s.id
                  ? 'linear-gradient(180deg,rgba(52,211,153,0.18) 0%,rgba(52,211,153,0.08) 100%)'
                  : 'linear-gradient(180deg,rgba(255,255,255,0.06) 0%,rgba(255,255,255,0.02) 100%)',
                border: active===s.id ? '1px solid rgba(52,211,153,0.3)' : '1px solid rgba(255,255,255,0.08)',
                color: active===s.id ? 'rgba(52,211,153,0.9)' : 'rgba(255,255,255,0.5)',
                fontSize:13,fontWeight:500,fontFamily:'DM Sans,sans-serif',
                textDecoration:'none',cursor:'pointer',
                transition:'all 0.2s ease',
              }}
            >
              <span style={{fontFamily:'DM Mono,monospace',fontSize:10,opacity:0.6}}>{s.num}</span>
              {s.title.split(' ')[0]}
            </a>
          ))}
        </div>

        <div className="origin-left opacity-0 animate-scale-in-x mt-16 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent"/>
      </div>
    </section>
  )
}


function SolutionSection({ sol, idx }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  const even = idx % 2 === 0

  useEffect(()=>{
    const obs = new IntersectionObserver(([e])=>{ if(e.isIntersecting) setVisible(true) },{threshold:0.15})
    if(ref.current) obs.observe(ref.current)
    return ()=>obs.disconnect()
  },[])

  const fadeItem = (i) => ({
    opacity: visible ? 1 : 0,
    transform: visible ? 'translateY(0)' : 'translateY(16px)',
    transition: `opacity 0.55s ${0.08+i*0.07}s ease, transform 0.55s ${0.08+i*0.07}s cubic-bezier(0.21,0.47,0.32,0.98)`,
  })

  return (
    <section
      id={sol.id}
      ref={ref}
      style={{
        position:'relative',overflow:'hidden',
        borderTop:'1px solid rgba(255,255,255,0.04)',
        background:'#070707',
      }}
    >
      {/* subtle ambient per section */}
      <div style={{
        position:'absolute',
        top:even?'-20%':'auto', bottom:even?'auto':'-20%',
        [even?'right':'left']:'-10%',
        width:600,height:600,
        borderRadius:'50%',
        background:'radial-gradient(circle,rgba(52,211,153,0.04) 0%,transparent 60%)',
        filter:'blur(80px)',
        pointerEvents:'none',zIndex:0,
      }}/>

      {/* grid — same as site */}
      <div className="absolute inset-0 opacity-[0.018]" style={{
        backgroundImage:`linear-gradient(rgba(255,255,255,0.5) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.5) 1px,transparent 1px)`,
        backgroundSize:'60px 60px',zIndex:1,
      }}/>

      <div className="relative max-w-7xl mx-auto px-6 py-24 md:py-32" style={{zIndex:10}}>
        <div className={`flex flex-col ${even?'md:flex-row':'md:flex-row-reverse'} gap-16 md:gap-24 items-start`}>

          {/* ── LEFT (or RIGHT when odd) : TEXT ── */}
          <div className="flex-1 min-w-0">

            {/* index + category label */}
            <div style={{display:'flex',alignItems:'center',gap:12,marginBottom:28,...fadeItem(0)}}>
              <span style={{fontFamily:'DM Mono,monospace',fontSize:11,color:'rgba(52,211,153,0.6)',letterSpacing:'0.12em'}}>{sol.num}</span>
              <span style={{height:1,width:32,background:'rgba(52,211,153,0.25)',display:'block'}}/>
              <span style={{fontSize:11,color:'rgba(255,255,255,0.2)',letterSpacing:'0.18em',textTransform:'uppercase',fontFamily:'DM Mono,monospace'}}>
                {sol.title.split(' ')[0]} Solutions
              </span>
            </div>

            {/* title */}
            <h2 style={{
              fontFamily:'Syne,sans-serif',
              fontSize:'clamp(32px,3.8vw,52px)',
              fontWeight:700,letterSpacing:'-0.035em',lineHeight:1.05,
              marginBottom:14,
              background:'linear-gradient(135deg,#fff 0%,rgba(255,255,255,0.8) 100%)',
              WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text',
              ...fadeItem(1)
            }}>
              {sol.title}
            </h2>

            {/* subtitle */}
            <p style={{
              fontSize:15,color:'rgba(255,255,255,0.38)',fontStyle:'italic',fontWeight:300,
              fontFamily:'DM Sans,sans-serif',marginBottom:18,
              ...fadeItem(2)
            }}>
              {sol.sub}
            </p>

            {/* body */}
            <p style={{
              fontSize:14,color:'rgba(255,255,255,0.42)',lineHeight:1.8,
              maxWidth:440,marginBottom:36,fontFamily:'DM Sans,sans-serif',
              ...fadeItem(3)
            }}>
              {sol.body}
            </p>

            {/* specs row — same card style as Solutions.jsx */}
            <div style={{
              display:'flex',gap:0,marginBottom:36,
              border:'1px solid rgba(255,255,255,0.06)',
              borderRadius:14,overflow:'hidden',
              ...fadeItem(4)
            }}>
              {sol.specs.map((sp,i)=>(
                <div key={sp.l} style={{
                  flex:1,padding:'16px 18px',
                  borderRight:i<sol.specs.length-1?'1px solid rgba(255,255,255,0.06)':'none',
                }}>
                  <div style={{
                    fontFamily:'DM Mono,monospace',fontSize:20,fontWeight:500,
                    letterSpacing:'-0.02em',marginBottom:4,
                    background:'linear-gradient(135deg,rgba(52,211,153,1) 0%,#fff 55%,rgba(52,211,153,0.8) 100%)',
                    WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text',
                  }}>{sp.v}</div>
                  <div style={{fontSize:10,color:'rgba(255,255,255,0.25)',letterSpacing:'0.1em',textTransform:'uppercase',fontFamily:'DM Mono,monospace'}}>
                    {sp.l}
                  </div>
                </div>
              ))}
            </div>

            {/* CTA — same style as hero buttons */}
            <div style={{display:'flex',gap:10,flexWrap:'wrap',...fadeItem(5)}}>
              <button style={{
                position:'relative',display:'inline-flex',alignItems:'center',padding:'3px',
                borderRadius:9999,cursor:'pointer',outline:'none',border:'none',
                background:'linear-gradient(135deg,rgba(52,211,153,0.35) 0%,rgba(16,185,129,0.15) 50%,rgba(52,211,153,0.08) 100%)',
                boxShadow:'0 0 0 1px rgba(52,211,153,0.25)',
              }}>
                <span style={{
                  display:'flex',alignItems:'center',padding:'10px 26px',borderRadius:9999,
                  background:'linear-gradient(135deg,rgba(52,211,153,0.22) 0%,rgba(16,185,129,0.08) 100%)',
                  boxShadow:'inset 0 1px 0 rgba(52,211,153,0.3),inset 0 -1px 0 rgba(0,0,0,0.3)',
                  color:'rgba(255,255,255,0.95)',fontSize:13,fontWeight:600,
                  letterSpacing:'0.02em',fontFamily:'DM Sans,sans-serif',
                }}>
                  Request Quote
                </span>
              </button>
              <button style={{
                padding:'10px 22px',borderRadius:9999,cursor:'pointer',outline:'none',
                border:'1px solid rgba(255,255,255,0.09)',background:'rgba(255,255,255,0.03)',
                color:'rgba(255,255,255,0.35)',fontSize:13,fontFamily:'DM Sans,sans-serif',
              }}>
                View Datasheet
              </button>
            </div>
          </div>

          {/* ── RIGHT (or LEFT when odd) : CAPABILITY CARD ── */}
          <div style={{width:'100%',maxWidth:440,flexShrink:0,...fadeItem(2)}}>

            {/* card — matches your Solutions.jsx spec card */}
            <div style={{
              position:'relative',borderRadius:20,overflow:'hidden',
              background:'linear-gradient(145deg,rgba(255,255,255,0.045) 0%,rgba(255,255,255,0.01) 100%)',
              border:'1px solid rgba(52,211,153,0.12)',
              animation:'borderPulse 4s ease-in-out infinite',
            }}>
              {/* shimmer sweep */}
              <div style={{position:'absolute',inset:0,overflow:'hidden',borderRadius:20,pointerEvents:'none'}}>
                <div style={{
                  position:'absolute',inset:0,
                  background:'linear-gradient(105deg,transparent 35%,rgba(52,211,153,0.06) 50%,transparent 65%)',
                  animation:'shimmerSlide 5s ease-in-out infinite',
                  animationDelay:`${idx*0.6}s`,
                }}/>
              </div>
              {/* top highlight line */}
              <div style={{position:'absolute',top:0,left:'10%',right:'10%',height:1,background:'linear-gradient(90deg,transparent,rgba(52,211,153,0.4),transparent)'}}/>
              {/* corner glow */}
              <div style={{position:'absolute',top:0,right:0,width:160,height:120,background:'radial-gradient(ellipse at top right,rgba(52,211,153,0.08) 0%,transparent 65%)',pointerEvents:'none'}}/>

              <div style={{padding:'24px 24px 8px'}}>
                <p style={{fontSize:10,fontFamily:'DM Mono,monospace',color:'rgba(255,255,255,0.2)',textTransform:'uppercase',letterSpacing:'0.14em',marginBottom:20}}>
                  What We Supply
                </p>

                {sol.items.map((item,i)=>(
                  <ItemRow key={item} label={item} i={i} visible={visible}/>
                ))}
              </div>

              {/* footer badges */}
              <div style={{
                display:'flex',borderTop:'1px solid rgba(255,255,255,0.05)',
              }}>
                {['Authorized Partner','Warranty Backed','Global Supply'].map((b,i)=>(
                  <div key={b} style={{
                    flex:1,padding:'11px 8px',textAlign:'center',
                    borderRight:i<2?'1px solid rgba(255,255,255,0.05)':'none',
                    fontSize:9,color:'rgba(255,255,255,0.2)',
                    fontFamily:'DM Mono,monospace',letterSpacing:'0.04em',
                  }}>{b}</div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

/* item row inside capability card */
function ItemRow({ label, i, visible }) {
  const [hov, setHov] = useState(false)
  return (
    <div
      onMouseEnter={()=>setHov(true)}
      onMouseLeave={()=>setHov(false)}
      style={{
        display:'flex',alignItems:'center',justifyContent:'space-between',
        padding:'11px 0',
        borderBottom:'1px solid rgba(255,255,255,0.04)',
        cursor:'default',
        paddingLeft: hov ? 6 : 0,
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateX(0)' : 'translateX(8px)',
        transition: `opacity 0.4s ${0.15+i*0.06}s ease, transform 0.4s ${0.15+i*0.06}s ease, padding-left 0.18s ease`,
      }}
    >
      <div style={{display:'flex',alignItems:'center',gap:10}}>
        <span style={{
          fontFamily:'DM Mono,monospace',fontSize:9,
          color: hov ? 'rgba(52,211,153,0.7)' : 'rgba(255,255,255,0.15)',
          transition:'color 0.15s',
        }}>{String(i+1).padStart(2,'0')}</span>
        <span style={{
          fontSize:13,fontWeight:500,fontFamily:'DM Sans,sans-serif',
          color: hov ? '#fff' : 'rgba(255,255,255,0.7)',
          transition:'color 0.15s',
        }}>{label}</span>
      </div>
      <span style={{
        fontSize:12,
        color: hov ? 'rgba(52,211,153,0.55)' : 'rgba(255,255,255,0.1)',
        transition:'color 0.15s',
      }}>→</span>
    </div>
  )
}

/* ── sticky dot nav ── */
function DotNav({ active }) {
  const [show, setShow] = useState(false)
  useEffect(()=>{ const t=setTimeout(()=>setShow(true),600); return()=>clearTimeout(t) },[])
  if(!show) return null
  return (
    <div style={{
      position:'fixed',right:24,top:'50%',transform:'translateY(-50%)',
      display:'flex',flexDirection:'column',gap:16,zIndex:50,
    }}>
      {SOLUTIONS.map(s=>(
        <button
          key={s.id}
          onClick={()=>document.getElementById(s.id)?.scrollIntoView({behavior:'smooth',block:'start'})}
          title={s.title}
          style={{
            display:'flex',alignItems:'center',gap:8,
            background:'none',border:'none',cursor:'pointer',padding:0,
          }}
        >
          <span style={{
            fontSize:9,fontFamily:'DM Mono,monospace',letterSpacing:'0.08em',
            color: active===s.id ? 'rgba(52,211,153,0.7)' : 'rgba(255,255,255,0.2)',
            transition:'color 0.2s',
          }}>{s.num}</span>
          <div style={{
            height:1,
            width: active===s.id ? 20 : 5,
            background: active===s.id ? 'rgba(52,211,153,0.6)' : 'rgba(255,255,255,0.15)',
            borderRadius:1,
            transition:'all 0.25s ease',
          }}/>
        </button>
      ))}
    </div>
  )
}

/* ── CTA ── */
function CtaBanner() {
  const ref = useRef(null)
  const [vis, setVis] = useState(false)
  useEffect(()=>{
    const obs = new IntersectionObserver(([e])=>{ if(e.isIntersecting) setVis(true) },{threshold:0.3})
    if(ref.current) obs.observe(ref.current)
    return ()=>obs.disconnect()
  },[])
  return (
    <section ref={ref} style={{
      position:'relative',overflow:'hidden',
      borderTop:'1px solid rgba(255,255,255,0.04)',
      background:'#070707',padding:'80px 24px',
    }}>
      <div style={{
        position:'absolute',top:'50%',left:'50%',transform:'translate(-50%,-50%)',
        width:500,height:200,
        background:'radial-gradient(ellipse,rgba(52,211,153,0.05) 0%,transparent 65%)',
        filter:'blur(60px)',pointerEvents:'none',
      }}/>
      <div style={{
        position:'absolute',inset:0,opacity:0.018,
        backgroundImage:`linear-gradient(rgba(255,255,255,0.5) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.5) 1px,transparent 1px)`,
        backgroundSize:'60px 60px',
      }}/>
      <div style={{maxWidth:680,margin:'0 auto',textAlign:'center',position:'relative',zIndex:2}}>
        <h3 style={{
          fontFamily:'Syne,sans-serif',fontSize:'clamp(26px,3.5vw,42px)',
          fontWeight:700,letterSpacing:'-0.03em',marginBottom:12,
          opacity: vis?1:0, transform: vis?'translateY(0)':'translateY(16px)',
          transition:'opacity 0.55s ease, transform 0.55s ease',
          background:'linear-gradient(135deg,#fff 0%,rgba(255,255,255,0.8) 100%)',
          WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text',
        }}>
          Ready to spec your infrastructure?
        </h3>
        <p style={{
          fontSize:15,color:'rgba(255,255,255,0.35)',lineHeight:1.7,marginBottom:32,
          fontFamily:'DM Sans,sans-serif',
          opacity: vis?1:0,transform: vis?'translateY(0)':'translateY(12px)',
          transition:'opacity 0.5s 0.1s ease,transform 0.5s 0.1s ease',
        }}>
          Our infrastructure specialists work with developers and contractors across North America, Morocco and West Africa.
        </p>
        <div style={{
          display:'flex',gap:12,justifyContent:'center',flexWrap:'wrap',
          opacity: vis?1:0,transform: vis?'translateY(0)':'translateY(10px)',
          transition:'opacity 0.5s 0.2s ease,transform 0.5s 0.2s ease',
        }}>
          <button style={{
            position:'relative',display:'inline-flex',alignItems:'center',padding:'3px',
            borderRadius:9999,cursor:'pointer',outline:'none',border:'none',
            background:'linear-gradient(135deg,rgba(52,211,153,0.35) 0%,rgba(16,185,129,0.15) 50%,rgba(52,211,153,0.08) 100%)',
            boxShadow:'0 0 0 1px rgba(52,211,153,0.25)',
          }}>
            <span style={{
              display:'flex',alignItems:'center',padding:'11px 32px',borderRadius:9999,
              background:'linear-gradient(135deg,rgba(52,211,153,0.22) 0%,rgba(16,185,129,0.08) 100%)',
              boxShadow:'inset 0 1px 0 rgba(52,211,153,0.3),inset 0 -1px 0 rgba(0,0,0,0.3)',
              color:'rgba(255,255,255,0.95)',fontSize:14,fontWeight:600,
              fontFamily:'DM Sans,sans-serif',
            }}>
              Request a Quote
            </span>
          </button>
          <button style={{
            padding:'11px 32px',borderRadius:9999,cursor:'pointer',outline:'none',
            border:'1px solid rgba(255,255,255,0.09)',background:'rgba(255,255,255,0.03)',
            color:'rgba(255,255,255,0.4)',fontSize:14,fontFamily:'DM Sans,sans-serif',
          }}>
            Talk to a Specialist
          </button>
        </div>
      </div>
    </section>
  )
}

export default function SolutionsPage() {
  const [activeSection, setActiveSection] = useState(null)

  /* intersection observer → active dot nav */
  useEffect(()=>{
    const observers = []
    SOLUTIONS.forEach(s=>{
      const el = document.getElementById(s.id)
      if(!el) return
      const obs = new IntersectionObserver(
        ([entry])=>{ if(entry.isIntersecting) setActiveSection(s.id) },
        { threshold:0.3 }
      )
      obs.observe(el)
      observers.push(obs)
    })
    return ()=>observers.forEach(o=>o.disconnect())
  },[])

  /* handle ?value= from navbar child links */
  useEffect(()=>{
    const val = new URLSearchParams(window.location.search).get('value')
    if(val) setTimeout(()=>{
      document.getElementById(val)?.scrollIntoView({behavior:'smooth',block:'start'})
    },350)
  },[])

  return (
    <>

      <div style={{background:'#070707',minHeight:'100vh'}}>
        <DotNav active={activeSection}/>
        <PageHero active={activeSection} setActive={setActiveSection}/>
        {SOLUTIONS.map((sol,i)=>(
          <SolutionSection key={sol.id} sol={sol} idx={i}/>
        ))}
        <CtaBanner/>
      </div>
    </>
  )
}