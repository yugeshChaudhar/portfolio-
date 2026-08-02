  // index.js - Yugesh Chaudhary Portfolio Logic

  // --- Toast Notification ---
  function showToast(message) {
    const toast = document.getElementById('toast');
    if (!toast) return;
    toast.textContent = message;
    toast.classList.remove('hidden');
    setTimeout(() => {
      toast.classList.add('hidden');
    }, 3000);
  }

  // --- Email Clipboard Copy ---
  const EMAIL = 'guruyugesh4@gmail.com';

  function copyEmail() {
    navigator.clipboard.writeText(EMAIL).then(() => {
      showToast('Copied email to clipboard: ' + EMAIL);
    }).catch(() => {
      showToast('Failed to copy email');
    });
  }

  // Bind Copy Email Buttons
  document.getElementById('copyEmailNavBtn')?.addEventListener('click', copyEmail);
  document.getElementById('copyEmailHeroBtn')?.addEventListener('click', copyEmail);
  document.getElementById('copyEmailContactBtn')?.addEventListener('click', copyEmail);

  // --- Scroll to Top ---
  document.getElementById('scrollToTopBtn')?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // --- Task Manager App Logic ---
  let tasks = JSON.parse(localStorage.getItem('bca_portfolio_tasks') || '[]');
  if (tasks.length === 0) {
    tasks = [
      { id: '1', text: 'Learn HTML syntax & tags', completed: true },
      { id: '2', text: 'Master CSS flexbox layout', completed: true },
      { id: '3', text: 'Build interactive JS web app', completed: false }
    ];
  }
  let currentFilter = 'all';

  function saveTasks() {
    localStorage.setItem('bca_portfolio_tasks', JSON.stringify(tasks));
  }

  function renderTasks() {
    const taskList = document.getElementById('taskList');
    if (!taskList) return;
    
    taskList.innerHTML = '';
    const filtered = tasks.filter(t => {
      if (currentFilter === 'active') return !t.completed;
      if (currentFilter === 'completed') return t.completed;
      return true;
    });

    if (filtered.length === 0) {
      taskList.innerHTML = '<li class="task-item" style="color:#94a3b8; justify-content:center;">No tasks found</li>';
      return;
    }

    filtered.forEach(task => {
      const li = document.createElement('li');
      li.className = `task-item ${task.completed ? 'completed' : ''}`;
      
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.checked = task.completed;
      checkbox.addEventListener('change', () => {
        task.completed = checkbox.checked;
        saveTasks();
        renderTasks();
        showToast(task.completed ? 'Marked task as completed!' : 'Marked task as active.');
      });

      const span = document.createElement('span');
      span.textContent = task.text;

      const delBtn = document.createElement('button');
      delBtn.className = 'btn-del';
      delBtn.textContent = 'Delete';
      delBtn.addEventListener('click', () => {
        tasks = tasks.filter(t => t.id !== task.id);
        saveTasks();
        renderTasks();
        showToast('Task removed');
      });

      const leftDiv = document.createElement('div');
      leftDiv.style.display = 'flex';
      leftDiv.style.alignItems = 'center';
      leftDiv.style.gap = '8px';
      leftDiv.appendChild(checkbox);
      leftDiv.appendChild(span);

      li.appendChild(leftDiv);
      li.appendChild(delBtn);
      taskList.appendChild(li);
    });
  }

  // Task Form Submit
  document.getElementById('taskForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = document.getElementById('taskInput');
    if (!input || !input.value.trim()) return;
    
    const newTask = {
      id: Date.now().toString(),
      text: input.value.trim(),
      completed: false
    };
    tasks.push(newTask);
    saveTasks();
    renderTasks();
    showToast('New task added!');
    input.value = '';
  });

  // Filter Buttons
  document.getElementById('filterAll')?.addEventListener('click', (e) => setFilter('all', e.target));
  document.getElementById('filterActive')?.addEventListener('click', (e) => setFilter('active', e.target));
  document.getElementById('filterCompleted')?.addEventListener('click', (e) => setFilter('completed', e.target));

  function setFilter(filter, btnElement) {
    currentFilter = filter;
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btnElement.classList.add('active');
    renderTasks();
  }

  // Initial Task Render
  renderTasks();
