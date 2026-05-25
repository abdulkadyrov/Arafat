
function increment(btn){
let value = parseInt(btn.innerText);
value++;
btn.innerText = value;
saveData();
updateProgress();
}

document.querySelectorAll('input[type="checkbox"]').forEach(cb=>{
cb.addEventListener('change', ()=>{
saveData();
updateProgress();
});
});

function updateProgress(){

const checkboxes = document.querySelectorAll('input[type="checkbox"]');
const buttons = document.querySelectorAll('.counter button');

let total = checkboxes.length + buttons.length;
let completed = 0;

checkboxes.forEach(cb=>{
if(cb.checked) completed++;
});

buttons.forEach(btn=>{
if(parseInt(btn.innerText) > 0){
completed++;
}
});

const percent = Math.round((completed / total) * 100);

const offset = 471 - (471 * percent / 100);

document.getElementById('progressCircle').style.strokeDashoffset = offset;

document.getElementById('percent').innerText = percent + '%';
}

function saveData(){

const state = {
checkboxes: [],
counters: []
};

document.querySelectorAll('input[type="checkbox"]').forEach(cb=>{
state.checkboxes.push(cb.checked);
});

document.querySelectorAll('.counter button').forEach(btn=>{
state.counters.push(btn.innerText);
});

localStorage.setItem('arafah_state', JSON.stringify(state));
}

function loadData(){

const data = localStorage.getItem('arafah_state');

if(!data) return;

const state = JSON.parse(data);

document.querySelectorAll('input[type="checkbox"]').forEach((cb,index)=>{
cb.checked = state.checkboxes[index];
});

document.querySelectorAll('.counter button').forEach((btn,index)=>{
btn.innerText = state.counters[index];
});

updateProgress();
}

loadData();

if('serviceWorker' in navigator){
navigator.serviceWorker.register('sw.js');
}
