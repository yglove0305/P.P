// --- To-Do List ---
const tasks = [];
document.getElementById('addTaskBtn').onclick = addTask;
function addTask() {
  const t = document.getElementById('newTask');
  if (!t.value.trim()) return;
  tasks.push({ text: t.value, done: false });
  t.value = '';
  renderTasks();
}
function toggleTask(i) {
  tasks[i].done = !tasks[i].done;
  renderTasks();
}
function renderTasks() {
  const ul = document.getElementById('taskList');
  ul.innerHTML = '';
  tasks.forEach((t, i) => {
    const li = document.createElement('li');
    li.textContent = t.text;
    li.style.textDecoration = t.done ? 'line-through' : '';
    li.onclick = () => toggleTask(i);
    ul.append(li);
  });
}

// --- Data Table ---
let data = [
  { name:'김철수', age:28, city:'서울' },
  { name:'이영희', age:34, city:'부산' },
  { name:'박민수', age:22, city:'대구' },
  { name:'최지우', age:41, city:'광주' }
];
let sortKey, sortAsc=true;
document.getElementById('sortName').onclick = () => sortTable('name');
document.getElementById('sortAge').onclick = () => sortTable('age');
document.getElementById('sortCity').onclick = () => sortTable('city');
document.getElementById('filterInput').oninput = renderTable;
function sortTable(key) {
  if (sortKey===key) sortAsc=!sortAsc;
  else { sortKey=key; sortAsc=true; }
  data.sort((a,b) => {
    if (typeof a[key]==='string')
      return sortAsc ? a[key].localeCompare(b[key]) : b[key].localeCompare(a[key]);
    return sortAsc ? a[key]-b[key] : b[key]-a[key];
  });
  renderTable();
}
function renderTable() {
  const f = document.getElementById('filterInput').value.toLowerCase();
  const tb = document.getElementById('tableBody');
  tb.innerHTML = '';
  data.filter(r =>
    Object.values(r).some(v => String(v).toLowerCase().includes(f))
  ).forEach(r => {
    const tr = document.createElement('tr');
    ['name','age','city'].forEach(k => {
      const td = document.createElement('td');
      td.textContent = r[k];
      tr.append(td);
    });
    tb.append(tr);
  });
}
renderTable();

// --- Calculator ---
document.getElementById('calcBtn').onclick = calc;
function calc() {
  try {
    document.getElementById('result').textContent =
      eval(document.getElementById('expr').value);
  } catch {
    document.getElementById('result').textContent = '오류';
  }
}

// --- Notepad ---
document.getElementById('saveNoteBtn').onclick = saveNote;
function saveNote() {
  const text = document.getElementById('noteArea').value;
  localStorage.setItem('pp_note', text);
  document.getElementById('noteStatus').textContent = '저장됨';
}
document.getElementById('noteArea').value = localStorage.getItem('pp_note')||'';

// --- Chart ---
const ctx = document.getElementById('chart').getContext('2d');
new Chart(ctx,{ type:'bar',
  data:{ labels:['서울','부산','대구','광주'],
    datasets:[{
      label:'방문객 수',
      data:[120,90,60,30],
      backgroundColor:['#3e95cd','#8e5ea2','#3cba9f','#e8c3b9']
    }]
  },
  options:{ responsive:true }
});
