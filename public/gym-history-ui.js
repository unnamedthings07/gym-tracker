/* UI helper for the 3-month gym calendar. index.html can load this module after gymPlan/DOM initialization. */

function renderGymHistoryCalendar({containerId, gymData, gymPlan, selectedDateKey, onSelect, monthDate = new Date()}) {
  const el = document.getElementById(containerId);
  if (!el) return;

  const year = monthDate.getFullYear();
  const month = monthDate.getMonth();
  const first = new Date(year,month,1);
  const last = new Date(year,month+1,0);
  const start = (first.getDay()+6)%7;
  const monthName = first.toLocaleString(undefined,{month:'long',year:'numeric'});
  const dayNames = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
  let cells = dayNames.map(x=>`<div class="gym-history-weekday">${x}</div>`).join('');

  for(let i=0;i<start;i++) cells += `<div class="gym-history-cell empty"></div>`;
  for(let day=1;day<=last.getDate();day++){
    const key = `${year}-${String(month+1).padStart(2,'0')}-${String(day).padStart(2,'0')}`;
    const date = new Date(year,month,day);
    const weekday = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'][date.getDay()];
    const plan = gymPlan[weekday];
    const rec = gymData.history?.[key];
    const status = GymHistory.gymHistoryStatus(rec,plan);
    const today = GymHistory.gymDateKey()===key;
    const active = selectedDateKey===key;
    const label = plan ? plan.title.split(' · ')[0] : 'Recovery';
    cells += `<button class="gym-history-cell ${active?'active':''} ${today?'today':''}" onclick="window.__selectGymHistoryDate('${key}')">
      <span class="gym-history-daynum">${day}</span>
      <span class="gym-history-workout">${label}</span>
      <span class="gym-history-status ${status.type}">${status.label}</span>
    </button>`;
  }

  el.innerHTML = `<div class="gym-history-head">
      <button class="ghost" onclick="window.__gymHistoryShiftMonth(-1)">‹</button>
      <strong>${monthName}</strong>
      <button class="ghost" onclick="window.__gymHistoryShiftMonth(1)">›</button>
    </div>
    <div class="gym-history-grid">${cells}</div>`;

  window.__selectGymHistoryDate = onSelect;
}

function mountGymHistoryStyles() {
  if (document.getElementById('gym-history-style')) return;
  const style = document.createElement('style');
  style.id = 'gym-history-style';
  style.textContent = `
    .gym-history-head{display:flex;align-items:center;justify-content:space-between;margin-bottom:12px;gap:10px}
    .gym-history-head strong{font-size:16px}
    .gym-history-grid{display:grid;grid-template-columns:repeat(7,minmax(0,1fr));gap:6px}
    .gym-history-weekday{padding:7px 5px;text-align:center;color:var(--muted);font-size:10px;font-weight:800}
    .gym-history-cell{min-height:78px;padding:8px;text-align:left;border:1px solid var(--line);background:#0c0f15;color:var(--text);border-radius:10px;display:flex;flex-direction:column;gap:4px}
    .gym-history-cell:hover{border-color:#5b6576}
    .gym-history-cell.active{border-color:var(--a);background:#7c5cff18}
    .gym-history-cell.today{box-shadow:inset 0 0 0 1px #a68cff44}
    .gym-history-cell.empty{visibility:hidden}
    .gym-history-daynum{font-size:12px;font-weight:900}
    .gym-history-workout{font-size:10px;color:#b8c0cc;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
    .gym-history-status{font-size:10px;font-weight:800;margin-top:auto}
    .gym-history-status.present{color:var(--g)}
    .gym-history-status.partial{color:var(--y)}
    .gym-history-status.absent{color:var(--r)}
    .gym-history-status.empty{color:var(--muted)}
    @media(max-width:600px){.gym-history-grid{gap:4px}.gym-history-cell{min-height:64px;padding:6px}.gym-history-workout{font-size:9px}}
  `;
  document.head.appendChild(style);
}

window.GymHistoryUI = {renderGymHistoryCalendar,mountGymHistoryStyles};
