const taskInput = document.querySelector('.task-input');
const taskList = document.getElementById('taskList');

const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
if (storedTasks.length > 0) {
    storedTasks.forEach(task => {
        const [date, name] = task.split(': ');

        // إنشاء عناصر القائمة
        const li = document.createElement('li');
        li.classList.add('task');

        // إضافة خط فاصل للعرض
        const hr = document.createElement('b');
        hr.textContent = date; // عرض التاريخ في الخط الفاصل

        // إضافة اسم المهمة
        li.textContent = name;

        const deleteBtn = document.createElement('button');
        deleteBtn.classList.add('delete-btn');
        deleteBtn.textContent = 'Delete';
        deleteBtn.onclick = () => {
            li.remove();
            removeTaskFromStorage(task);
        };
        li.appendChild(deleteBtn);

        taskList.appendChild(hr);

        taskList.appendChild(li);
    });
} else {
    const noTasksMessage = document.createElement('li');
    noTasksMessage.textContent = 'No old tasks found.';
    taskList.appendChild(noTasksMessage);
}
function addTask() {
    const taskText = taskInput.value;
    if (taskText === '') return;

    // الحصول على التاريخ والوقت الحالي
    const now = new Date();
    const options = { month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
    const formattedDate = now.toLocaleString( options); // 'ar-EG' لتحديد اللغة العربية المصرية

    const li = document.createElement('li');
    li.classList.add('task');
    li.innerHTML = `
    <div class="task_div">
    <p class="task-date">${formattedDate}</p>
    <p class="task-text">${taskText}</p>
    </div>
    `;

    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('delete-btn');
    deleteBtn.textContent = 'Delete';
    deleteBtn.onclick = () => {
        li.remove();
        removeTaskFromStorage(taskText);
    };
    li.appendChild(deleteBtn);
    taskList.appendChild(li);

    // حفظ المهام في الـ Local Storage
    storedTasks.push(`${formattedDate}: ${taskText}`);
    localStorage.setItem('tasks', JSON.stringify(storedTasks));

    taskInput.value = '';
}

function removeTaskFromStorage(taskText) {
    const index = storedTasks.indexOf(taskText);
    if (index !== -1) {
        storedTasks.splice(index, 1);
        localStorage.setItem('tasks', JSON.stringify(storedTasks));
    }
}