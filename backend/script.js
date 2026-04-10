 let totalCount = 0, doneCount = 0, pendingCount = 0;

  function count() {
    document.getElementById('total').innerText = totalCount;
    document.getElementById('done').innerText = doneCount;
    document.getElementById('pending').innerText = pendingCount;
    document.getElementById('emptyMsg').style.display =
      document.querySelectorAll('#taskList li').length === 0 ? 'block' : 'none';
  }

  function addTask() {
    const input = document.getElementById('inputTask');
    const task = input.value.trim();
    if (!task) { input.focus(); return; }

    totalCount++; pendingCount++; count();

    const li = document.createElement('li');

    const doneBtn = document.createElement('button');
    doneBtn.className = 'done-btn';
    doneBtn.innerHTML = '✓';
    doneBtn.title = 'Mark done';
    doneBtn.onclick = function() {
      li.classList.toggle('is-done');
      if (li.classList.contains('is-done')) { doneCount++; pendingCount--; }
      else { doneCount--; pendingCount++; }
      count();
    };

    const span = document.createElement('span');
    span.className = 'task-text';
    span.innerText = task;

    const actions = document.createElement('div');
    actions.className = 'task-actions';

    const editBtn = document.createElement('button');
    editBtn.className = 'act-btn edit';
    editBtn.innerText = 'Edit';
    editBtn.onclick = function() {
      const newTask = prompt('Task edit karo:', span.innerText);
      if (newTask !== null && newTask.trim() !== '') span.innerText = newTask.trim();
    };

    const delBtn = document.createElement('button');
    delBtn.className = 'act-btn del';
    delBtn.innerText = 'Delete';
    delBtn.onclick = function() {
      li.classList.contains('is-done') ? doneCount-- : pendingCount--;
      totalCount--;
      li.remove();
      count();
    };

    actions.appendChild(editBtn);
    actions.appendChild(delBtn);

    li.appendChild(doneBtn);
    li.appendChild(span);
    li.appendChild(actions);

    document.getElementById('taskList').appendChild(li);
    input.value = '';
    input.focus();
    count();
  }

