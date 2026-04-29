// screens.jsx — Home, Conversion, History screens
const { useState, useEffect, useRef, useMemo } = React;

// ─── Phone chrome ─────────────────────────────────────────
function StatusBar({ color = '#fff', bg = 'transparent' }) {
  return (
    <div style={{
      height: 28, background: bg, color,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '0 16px', fontSize: 12, fontWeight: 600, letterSpacing: 0.2,
      fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif',
      flexShrink: 0, position: 'relative', zIndex: 2,
    }}>
      <span>9:41</span>
      <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
        <svg width="14" height="10" viewBox="0 0 14 10" fill={color}>
          <path d="M1 8h2v1.5H1zM4.5 6h2v3.5h-2zM8 3.5h2v6H8zM11.5 1h2v8.5h-2z" opacity=".95"/>
        </svg>
        <svg width="14" height="10" viewBox="0 0 14 10" fill={color}>
          <path d="M7 2c2 0 4 .8 5.5 2.2l-1 1.1A6 6 0 007 3.5a6 6 0 00-4.5 1.8l-1-1.1A8 8 0 017 2zm0 2.5c1.4 0 2.7.5 3.7 1.4l-1 1.1A4 4 0 007 5.8a4 4 0 00-2.7 1.2l-1-1.1A5.5 5.5 0 017 4.5zm0 2.5c.8 0 1.5.3 2 .8l-1 1.1a1.5 1.5 0 00-2 0l-1-1.1A3 3 0 017 7z"/>
        </svg>
        <svg width="22" height="11" viewBox="0 0 22 11" fill="none">
          <rect x="0.5" y="0.5" width="19" height="10" rx="2" stroke={color} opacity=".7"/>
          <rect x="2" y="2" width="14" height="7" rx="1" fill={color}/>
          <rect x="20" y="3.5" width="1.5" height="4" rx=".7" fill={color} opacity=".7"/>
        </svg>
      </div>
    </div>
  );
}

// ─── Tile ──────────────────────────────────────────────────
function CategoryTile({ categoryId, onClick, radius = 20, style = 'solid' }) {
  const cat = CATEGORIES[categoryId];
  const color = CATEGORY_COLORS[categoryId];
  const [pressed, setPressed] = useState(false);
  const isSolid = style === 'solid';
  return (
    <button
      onClick={onClick}
      onPointerDown={() => setPressed(true)}
      onPointerUp={() => setPressed(false)}
      onPointerLeave={() => setPressed(false)}
      style={{
        all: 'unset', cursor: 'pointer', boxSizing: 'border-box',
        width: '100%',
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        justifyContent: 'center', gap: 5, padding: '12px 8px',
        background: isSolid ? color.bg : color.soft,
        borderRadius: radius,
        transform: pressed ? 'scale(0.94)' : 'scale(1)',
        transition: 'transform 120ms cubic-bezier(.3,1.4,.5,1), box-shadow 160ms',
        boxShadow: pressed
          ? `0 1px 2px ${color.deep}40`
          : `0 3px 0 ${color.deep}`,
      }}
      aria-label={cat.name}
    >
      <div style={{
        width: 28, height: 28,
        color: isSolid ? '#fff' : color.deep,
      }}>
        {ICONS[categoryId]}
      </div>
      <div style={{
        color: isSolid ? '#fff' : color.deep,
        fontSize: 12.5, fontWeight: 700, letterSpacing: 0.1,
      }}>
        {cat.name}
      </div>
    </button>
  );
}

// ─── Recents chip strip ───────────────────────────────────
function RecentsStrip({ history, onOpen }) {
  if (!history.length) return null;
  const recents = history.slice(0, 2);
  return (
    <div style={{ marginBottom: 4 }}>
      <div style={{
        display:'flex', alignItems:'center', justifyContent:'space-between',
        padding: '0 20px 10px',
      }}>
        <div style={{
          fontSize: 11, fontWeight: 800, letterSpacing: 1.2,
          textTransform: 'uppercase', color: '#9B9BA3',
        }}>Recent</div>
      </div>
      <div style={{
        padding: '0 20px 6px',
        display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
        columnGap: 12,
      }}>
        {recents.map(h => {
          const cat = CATEGORIES[h.category];
          const color = CATEGORY_COLORS[h.category];
          const fromU = cat.units.find(u => u.id === h.from);
          const toU = cat.units.find(u => u.id === h.to);
          return (
            <button key={h.id} onClick={() => onOpen(h.category)} style={{
              all:'unset', cursor:'pointer',
              boxSizing: 'border-box', width: '100%', minWidth: 0,
              display:'flex', alignItems:'center', gap: 10,
              background: '#fff', padding: '10px 12px 10px 10px',
              borderRadius: 14,
              boxShadow: '0 1px 2px rgba(0,0,0,0.04), 0 2px 8px rgba(0,0,0,0.05)',
            }}>
              <div style={{
                width: 30, height: 30, borderRadius: 9,
                background: color.bg, color: '#fff',
                display:'flex', alignItems:'center', justifyContent:'center',
                flexShrink: 0,
              }}>
                <div style={{ width: 16, height: 16 }}>{ICONS[h.category]}</div>
              </div>
              <div style={{ display:'flex', flexDirection:'column', minWidth: 0, flex: 1 }}>
                <div style={{ fontSize: 9, fontWeight: 800, color: color.deep, letterSpacing: 0.5, textTransform:'uppercase' }}>
                  {cat.name}
                </div>
                <div style={{ fontSize: 10.5, fontWeight: 700, color: '#2A2A33', whiteSpace:'nowrap', marginTop: 1, overflow:'hidden', textOverflow:'ellipsis' }}>
                  {formatValue(h.fromValue, h.from, h.category)} {fromU.short}
                  <span style={{ color:'#C0C0C8', margin: '0 3px' }}>→</span>
                  {formatValue(h.toValue, h.to, h.category)} {toU.short}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ─── Did-you-know factoid ─────────────────────────────────
const FACTOIDS = [
  { icon: 'weight',      text: '1 stone equals 14 pounds — still used in the UK for body weight.' },
  { icon: 'cooking',     text: 'Gas Mark 4 is roughly 180°C — a classic moderate oven.' },
  { icon: 'distance',    text: '1 nautical mile is exactly 1,852 metres, one minute of latitude.' },
  { icon: 'temperature', text: 'Celsius and Fahrenheit meet at exactly −40°.' },
  { icon: 'speed',       text: 'Mach 1 at sea level is about 343 m/s — the speed of sound in air.' },
  { icon: 'data',        text: 'A terabyte holds roughly 250,000 photos from an average phone.' },
  { icon: 'volume',      text: 'A US cup is 240 mL; a UK cup is 250 mL — watch your recipes.' },
  { icon: 'fuel',        text: '30 mpg (US) is about 12.75 km/L — or 7.8 L/100 km.' },
];

function Factoid() {
  const idx = useMemo(() => Math.floor(Date.now() / 86400000) % FACTOIDS.length, []);
  const f = FACTOIDS[idx];
  const color = CATEGORY_COLORS[f.icon];
  return (
    <div style={{
      margin: '2px 18px 16px',
      display:'flex', alignItems:'center', gap: 12,
      padding: 14, borderRadius: 16,
      background: '#fff',
      boxShadow: '0 1px 2px rgba(0,0,0,0.04), 0 2px 10px rgba(0,0,0,0.05)',
    }}>
      <div style={{
        width: 42, height: 42, borderRadius: 12,
        background: color.soft, color: color.deep,
        display:'flex', alignItems:'center', justifyContent:'center',
        flexShrink: 0,
      }}>
        <div style={{ width: 22, height: 22 }}>{ICONS[f.icon]}</div>
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{
          fontSize: 10, fontWeight: 800, letterSpacing: 1.2,
          textTransform: 'uppercase', color: '#9B9BA3',
        }}>Did you know</div>
        <div style={{
          fontSize: 13, fontWeight: 600, color: '#2A2A33',
          lineHeight: 1.35, marginTop: 2, textWrap: 'pretty',
        }}>{f.text}</div>
      </div>
    </div>
  );
}

// ─── Bottom nav ──────────────────────────────────────────
function BottomNav({ active, onChange, accent }) {
  const items = [
    { id: 'home',     label: 'Home',     icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 11l9-8 9 8"/><path d="M5 10v10h14V10"/>
      </svg>
    )},
    { id: 'favorites', label: 'Favorites', icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 17.3l-6.2 3.7 1.7-7.1L2 9.2l7.2-.6L12 2l2.8 6.6 7.2.6-5.5 4.7 1.7 7.1z"/>
      </svg>
    )},
    { id: 'history', label: 'History', icon: ICONS.history },
    { id: 'settings', label: 'Settings', icon: ICONS.settings },
  ];
  return (
    <div style={{
      background: '#fff',
      borderTop: '1px solid #EEEFF3',
      padding: '6px 6px 4px',
      display:'flex', justifyContent:'space-around',
      flexShrink: 0,
    }}>
      {items.map(it => {
        const isActive = active === it.id;
        return (
          <button key={it.id} onClick={() => onChange(it.id)} style={{
            all:'unset', cursor:'pointer', flex: 1,
            display:'flex', flexDirection:'column', alignItems:'center',
            gap: 2, padding: '8px 4px',
          }}>
            <div style={{
              width: 50, height: 26, borderRadius: 14,
              display:'flex', alignItems:'center', justifyContent:'center',
              background: isActive ? accent.soft : 'transparent',
              color: isActive ? accent.deep : '#7B7B85',
              transition: 'background 180ms',
            }}>
              <div style={{ width: 22, height: 22 }}>{it.icon}</div>
            </div>
            <div style={{
              fontSize: 10.5, fontWeight: isActive ? 800 : 600,
              color: isActive ? accent.deep : '#7B7B85',
              letterSpacing: 0.2,
            }}>{it.label}</div>
          </button>
        );
      })}
    </div>
  );
}

// ─── Home screen ───────────────────────────────────────────
function HomeScreen({ onOpen, onHistory, radius, tileStyle, accent, history }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: '#FAFAFB' }}>
      <StatusBar color="#fff" bg={accent.deep} />
      {/* Header */}
      <div style={{
        background: `linear-gradient(160deg, ${accent.bg} 0%, ${accent.deep} 100%)`,
        padding: '16px 20px 20px', color: '#fff',
        position: 'relative', overflow: 'hidden',
        display: 'flex', flexDirection: 'column', justifyContent: 'center',
        minHeight: 120,
      }}>
        {/* decorative blobs */}
        <div style={{ position:'absolute', right:-40, top:-20, width:160, height:160, borderRadius:'50%', background:'rgba(255,255,255,0.08)' }}/>
        <div style={{ position:'absolute', right:60, bottom:-70, width:120, height:120, borderRadius:'50%', background:'rgba(255,255,255,0.06)' }}/>
        <div style={{ fontSize: 28, fontWeight: 800, letterSpacing: -0.5, lineHeight: 1.1 }}>Convertable</div>
        <div style={{ marginTop: 6, fontSize: 13, fontWeight: 500, opacity: 0.9 }}>
          Pick a category to start converting →
        </div>
      </div>

      {/* Grid */}
      <div style={{
        padding: '12px 20px',
        display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
        columnGap: 12, rowGap: 12, alignContent: 'start',
      }}>
        {HOME_ORDER.map(id => (
          <CategoryTile key={id} categoryId={id} onClick={() => onOpen(id)} radius={radius} style={tileStyle}/>
        ))}
      </div>

      {/* Recents strip */}
      <RecentsStrip history={history} onOpen={onOpen} />

      {/* Did-you-know factoid */}
      <Factoid />
    </div>
  );
}

Object.assign(window, { BottomNav });

// ─── Conversion screen ─────────────────────────────────────
function ConversionScreen({ categoryId, onBack, onRecord, accent }) {
  const cat = CATEGORIES[categoryId];
  const color = CATEGORY_COLORS[categoryId];
  const [fromUnit, setFromUnit] = useState(cat.defaults[0]);
  const [toUnit, setToUnit] = useState(cat.defaults[1]);
  const [value, setValue] = useState(categoryId === 'temperature' ? '100' : categoryId === 'cooking' ? '180' : '1');
  const [swapRot, setSwapRot] = useState(0);
  const [recorded, setRecorded] = useState(null);

  // Parse the raw value, special-casing stones-and-pounds: "11.5" => 11st 5lb,
  // "11.13" => 11st 13lb. We encode as ST.LL where LL is integer pounds.
  const parsedValue = useMemo(() => {
    if (value === '' || value === '-') return 0;
    if (categoryId === 'weight' && fromUnit === 'st_lb') {
      const m = String(value).match(/^(-?)(\d*)(?:\.(\d{0,2}))?$/);
      if (!m) return Number(value) || 0;
      const sign = m[1] === '-' ? -1 : 1;
      const stones = m[2] === '' ? 0 : parseInt(m[2], 10);
      const lbsStr = m[3] || '';
      let lbs = lbsStr === '' ? 0 : parseInt(lbsStr, 10);
      if (lbs > 13) lbs = 13;
      const pad = lbs < 10 ? `0${lbs}` : `${lbs}`;
      return sign * Number(`${stones}.${pad}`);
    }
    return Number(value);
  }, [value, fromUnit, categoryId]);

  const result = useMemo(() => convert(categoryId, parsedValue, fromUnit, toUnit), [parsedValue, fromUnit, toUnit, categoryId]);
  const fromU = cat.units.find(u => u.id === fromUnit);
  const toU = cat.units.find(u => u.id === toUnit);

  // Record history (debounced-ish)
  useEffect(() => {
    if (value === '' || isNaN(Number(value))) return;
    const t = setTimeout(() => {
      const entry = {
        id: Date.now(),
        category: categoryId,
        from: fromUnit, to: toUnit,
        fromValue: parsedValue,
        toValue: result,
        ts: Date.now(),
      };
      if (recorded !== `${value}-${fromUnit}-${toUnit}`) {
        onRecord(entry);
        setRecorded(`${value}-${fromUnit}-${toUnit}`);
      }
    }, 500);
    return () => clearTimeout(t);
  }, [value, fromUnit, toUnit, result, categoryId]);

  const handleSetFromUnit = (newU) => {
    if (categoryId === 'weight') {
      // Switching INTO st_lb from numeric: reset to a clean integer (avoid "1.5" being read as 1st 5lb).
      if (newU === 'st_lb' && fromUnit !== 'st_lb') setValue('11');
      // Switching OUT of st_lb back to numeric: clear to avoid weird residual values.
      if (newU !== 'st_lb' && fromUnit === 'st_lb') setValue('1');
    }
    setFromUnit(newU);
  };

  const swap = () => {
    setSwapRot(r => r + 180);
    setFromUnit(toUnit); setToUnit(fromUnit);
    // For stones-and-pounds, re-pack ST.LL as a typed string the user could enter ("11.5" for 11st 5lb).
    if (categoryId === 'weight' && toUnit === 'st_lb') {
      const abs = Math.abs(result);
      const stones = Math.trunc(abs);
      const lbs = Math.round((abs - stones) * 100);
      setValue(`${result < 0 ? '-' : ''}${stones}${lbs ? `.${lbs}` : ''}`);
    } else {
      setValue(formatValue(result, toUnit, categoryId).replace(/[^\d.\-]/g, '') || '0');
    }
  };

  const clear = () => setValue('');

  return (
    <div style={{ display:'flex', flexDirection:'column', height:'100%', background:'#FAFAFB' }}>
      <StatusBar color="#fff" bg={color.deep} />
      {/* App bar */}
      <div style={{
        background: `linear-gradient(160deg, ${color.bg} 0%, ${color.deep} 100%)`,
        padding: '10px 14px 22px', color: '#fff',
        borderBottomLeftRadius: 28, borderBottomRightRadius: 28,
      }}>
        <div style={{ display:'flex', alignItems:'center', gap: 4 }}>
          <button onClick={onBack} style={{
            all:'unset', cursor:'pointer', width:40, height:40,
            display:'flex', alignItems:'center', justifyContent:'center',
            borderRadius: 12,
          }}>
            <div style={{ width: 22, height: 22, color:'#fff' }}>{ICONS.back}</div>
          </button>
          <div style={{ flex:1, display:'flex', alignItems:'center', gap: 10 }}>
            <div style={{ width: 26, height: 26, color:'#fff' }}>{ICONS[categoryId]}</div>
            <div style={{ fontSize: 20, fontWeight: 800, letterSpacing: -0.3 }}>{cat.name}</div>
          </div>
          <button onClick={clear} style={{
            all:'unset', cursor:'pointer', width:40, height:40,
            display:'flex', alignItems:'center', justifyContent:'center',
            borderRadius: 12,
          }}>
            <div style={{ width: 22, height: 22, color:'#fff' }}>{ICONS.trash}</div>
          </button>
        </div>

        {/* Input + Result card */}
        <div style={{
          marginTop: 14, background: 'rgba(255,255,255,0.14)',
          borderRadius: 20, padding: 16, backdropFilter: 'blur(6px)',
          border: '1px solid rgba(255,255,255,0.2)',
        }}>
          <div style={{ display:'flex', alignItems:'baseline', justifyContent:'space-between', gap: 10 }}>
            <div style={{ fontSize: 11, fontWeight: 700, opacity: 0.85, letterSpacing: 1.2, textTransform:'uppercase' }}>
              From · {fromU.short}
            </div>
            {fromUnit === 'st_lb' && (
              <div style={{ fontSize: 10, fontWeight: 600, opacity: 0.75, fontStyle:'italic' }}>
                Type as st.lb · e.g. 11.5 = 11 st 5 lb
              </div>
            )}
          </div>
          <input
            value={value}
            onChange={e => {
              const v = e.target.value;
              if (v === '' || v === '-' || /^-?\d*\.?\d*$/.test(v)) setValue(v);
            }}
            inputMode="decimal"
            style={{
              width: '100%', boxSizing: 'border-box',
              background: 'transparent', border: 'none', outline: 'none',
              color: '#fff', fontSize: 38, fontWeight: 800, letterSpacing: -1,
              fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif',
              marginTop: 4, padding: 0,
              caretColor: '#fff',
            }}
          />
          {fromUnit === 'st_lb' && value !== '' && value !== '-' && (
            <div style={{ fontSize: 12, fontWeight: 600, opacity: 0.85, marginTop: -2 }}>
              {formatValue(parsedValue, 'st_lb', 'weight')}
            </div>
          )}
          <div style={{ height: 1, background: 'rgba(255,255,255,0.25)', margin: '6px 0 14px' }}/>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end', gap: 10 }}>
            <div style={{ flex:1, minWidth: 0 }}>
              <div style={{ fontSize: 11, fontWeight: 700, opacity: 0.85, letterSpacing: 1.2, textTransform:'uppercase' }}>
                To · {toU.short}
              </div>
              <div style={{
                fontSize: 30, fontWeight: 800, marginTop: 4, letterSpacing: -0.8,
                overflowWrap:'anywhere', lineHeight: 1.1,
              }}>
                {formatValue(result, toUnit, categoryId) || '—'}
              </div>
            </div>
            <button onClick={swap} style={{
              all:'unset', cursor:'pointer', flexShrink: 0,
              width: 52, height: 52, borderRadius: 18,
              background: '#fff', color: color.deep,
              display:'flex', alignItems:'center', justifyContent:'center',
              transform: `rotate(${swapRot}deg)`,
              transition: 'transform 420ms cubic-bezier(.5,1.6,.4,1)',
              boxShadow: '0 6px 14px rgba(0,0,0,0.18)',
            }}>
              <div style={{ width: 24, height: 24 }}>{ICONS.swap}</div>
            </button>
          </div>
        </div>
      </div>

      {/* Two-column unit pickers */}
      <div style={{
        flex: 1, overflow: 'auto',
        display: 'grid', gridTemplateColumns: '1fr 1fr',
        gap: 0, padding: '18px 0 20px',
      }}>
        <UnitColumn
          title="From"
          units={cat.units}
          selected={fromUnit}
          onSelect={handleSetFromUnit}
          color={color}
        />
        <UnitColumn
          title="To"
          units={cat.units}
          selected={toUnit}
          onSelect={setToUnit}
          color={color}
        />
      </div>

      {categoryId === 'currency' && (
        <div style={{
          padding: '0 20px 14px', fontSize: 11,
          color: '#94949E', fontWeight: 500, textAlign:'center',
        }}>
          Indicative rates · updated today
        </div>
      )}
    </div>
  );
}

function UnitColumn({ title, units, selected, onSelect, color }) {
  return (
    <div style={{ padding: '0 10px' }}>
      <div style={{
        fontSize: 11, fontWeight: 800, letterSpacing: 1.5,
        color: '#9B9BA3', textTransform: 'uppercase',
        padding: '4px 12px 10px',
      }}>{title}</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        {units.map(u => {
          const active = u.id === selected;
          return (
            <button
              key={u.id}
              onClick={() => onSelect(u.id)}
              style={{
                all: 'unset', cursor: 'pointer', boxSizing: 'border-box',
                display: 'flex', alignItems: 'center', gap: 10,
                padding: '10px 12px', borderRadius: 12,
                background: active ? color.soft : 'transparent',
                transition: 'background 140ms',
              }}
            >
              <div style={{
                width: 18, height: 18, borderRadius: '50%', flexShrink: 0,
                border: `2px solid ${active ? color.bg : '#D0D0D8'}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: active ? color.bg : 'transparent',
                transition: 'all 140ms',
              }}>
                {active && <div style={{ width: 6, height: 6, borderRadius:'50%', background:'#fff' }}/>}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{
                  fontSize: 13, fontWeight: active ? 700 : 600,
                  color: active ? color.deep : '#2A2A33',
                  lineHeight: 1.2,
                  whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                }}>{u.label}</div>
                <div style={{
                  fontSize: 11, color: '#9B9BA3', fontWeight: 500, marginTop: 1,
                }}>{u.short}</div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ─── History screen ────────────────────────────────────────
function HistoryScreen({ history, onBack, onClear, onOpen, accent }) {
  return (
    <div style={{ display:'flex', flexDirection:'column', height:'100%', background:'#FAFAFB' }}>
      <StatusBar color="#fff" bg={accent.deep} />
      <div style={{
        background: `linear-gradient(160deg, ${accent.bg} 0%, ${accent.deep} 100%)`,
        padding: '10px 14px 26px', color: '#fff',
        borderBottomLeftRadius: 28, borderBottomRightRadius: 28,
      }}>
        <div style={{ display:'flex', alignItems:'center', gap: 4 }}>
          <button onClick={onBack} style={{
            all:'unset', cursor:'pointer', width:40, height:40,
            display:'flex', alignItems:'center', justifyContent:'center',
          }}>
            <div style={{ width: 22, height: 22, color:'#fff' }}>{ICONS.back}</div>
          </button>
          <div style={{ flex:1, fontSize: 20, fontWeight: 800, letterSpacing: -0.3 }}>Recent conversions</div>
          {history.length > 0 && (
            <button onClick={onClear} style={{
              all:'unset', cursor:'pointer', padding: '8px 12px',
              fontSize: 12, fontWeight: 700, color:'#fff',
              background:'rgba(255,255,255,0.18)', borderRadius: 10,
            }}>Clear</button>
          )}
        </div>
      </div>

      <div style={{ flex: 1, overflow: 'auto', padding: '14px 16px 24px' }}>
        {history.length === 0 ? (
          <div style={{
            padding: '60px 20px', textAlign: 'center',
            color: '#9B9BA3',
          }}>
            <div style={{
              width: 72, height: 72, margin: '0 auto 18px',
              borderRadius: 24, background: '#EEEFF3',
              display:'flex', alignItems:'center', justifyContent:'center',
              color: '#B8B8C0',
            }}>
              <div style={{ width: 36, height: 36 }}>{ICONS.history}</div>
            </div>
            <div style={{ fontSize: 15, fontWeight: 700, color:'#3B3B45' }}>No recents yet</div>
            <div style={{ fontSize: 13, marginTop: 6 }}>Your conversions will appear here.</div>
          </div>
        ) : (
          <div style={{ display:'flex', flexDirection:'column', gap: 10 }}>
            {history.map(h => {
              const cat = CATEGORIES[h.category];
              const color = CATEGORY_COLORS[h.category];
              const fromU = cat.units.find(u => u.id === h.from);
              const toU = cat.units.find(u => u.id === h.to);
              return (
                <button key={h.id} onClick={() => onOpen(h.category)} style={{
                  all:'unset', cursor:'pointer', display:'flex', gap: 12, alignItems:'center',
                  padding: 12, background: '#fff',
                  borderRadius: 16, boxShadow: '0 1px 2px rgba(0,0,0,0.04), 0 2px 8px rgba(0,0,0,0.04)',
                }}>
                  <div style={{
                    width: 44, height: 44, borderRadius: 14,
                    background: color.bg, color:'#fff',
                    display:'flex', alignItems:'center', justifyContent:'center', flexShrink: 0,
                  }}>
                    <div style={{ width: 22, height: 22 }}>{ICONS[h.category]}</div>
                  </div>
                  <div style={{ flex:1, minWidth: 0 }}>
                    <div style={{ fontSize: 11, color: color.deep, fontWeight: 800, letterSpacing: 0.8, textTransform:'uppercase' }}>
                      {cat.name}
                    </div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: '#2A2A33', marginTop: 2, whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>
                      {formatValue(h.fromValue, h.from, h.category)} {fromU.short}
                      <span style={{ color:'#B8B8C0', margin: '0 6px' }}>→</span>
                      {formatValue(h.toValue, h.to, h.category)} {toU.short}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

Object.assign(window, { HomeScreen, ConversionScreen, HistoryScreen, StatusBar });
