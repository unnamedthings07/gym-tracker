/* Gym history module: 3-month date-based journal using the same workout/set UI model. */

const GYM_HISTORY_MONTHS = 3;
const GYM_HISTORY_DAYS = 92;

function gymDateKey(date = new Date()) {
  const d = new Date(date);
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
}

function gymDateFromKey(key) {
  const [y,m,d] = key.split('-').map(Number);
  return new Date(y,m-1,d);
}

function gymDaysBetween(a,b){
  return Math.floor((gymDateFromKey(b)-gymDateFromKey(a))/86400000);
}

function pruneGymHistory(daysByDate = {}) {
  const today = gymDateKey();
  return Object.fromEntries(Object.entries(daysByDate).filter(([key]) => {
    const age = gymDaysBetween(key,today);
    return age >= 0 && age < GYM_HISTORY_DAYS;
  }));
}

function gymHistoryWorkoutForDate(gymPlan, dateKey) {
  const d = gymDateFromKey(dateKey);
  const dayName = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'][d.getDay()];
  return { dayName, plan: gymPlan[dayName] || null };
}

function gymHistoryEnsureDate(gymData, dateKey, gymPlan) {
  if (!gymData.history) gymData.history = {};
  if (!gymData.history[dateKey]) {
    const meta = gymHistoryWorkoutForDate(gymPlan,dateKey);
    gymData.history[dateKey] = {
      date: dateKey,
      dayName: meta.dayName,
      workoutTitle: meta.plan?.title || 'Rest Day',
      exercises: {},
      notes: {},
      attendance: null,
      createdAt: Date.now()
    };
  }
  return gymData.history[dateKey];
}

function gymHistoryStatus(record, plan) {
  if (!record) return {type:'empty',label:'Not logged',pct:0};
  if (record.attendance === 'absent') return {type:'absent',label:'Missed',pct:0};
  const total = (plan?.e || []).reduce((n,x)=>n+x[1],0);
  const done = Object.values(record.exercises || {}).filter(v => v === 'done').length;
  const partial = Object.values(record.exercises || {}).filter(v => v === 'partial').length;
  const pct = total ? Math.round((done/total)*100) : 0;
  if (done === total && total) return {type:'present',label:`${pct}%`,pct};
  if (done || partial || record.attendance === 'partial' || record.attendance === 'present') return {type:'partial',label:`${done}/${total}`,pct};
  return {type:'empty',label:'Not logged',pct:0};
}

window.GymHistory = {
  GYM_HISTORY_MONTHS,
  GYM_HISTORY_DAYS,
  gymDateKey,
  gymHistoryWorkoutForDate,
  gymHistoryEnsureDate,
  gymHistoryStatus,
  pruneGymHistory
};
