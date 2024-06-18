document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('task-input');
    const dueDateInput = document.getElementById('due-date');
    const priorityInput = document.getElementById('priority');
    const addTaskButton = document.getElementById('add-task');
    const taskList = document.getElementById('task-list');

    // Initialize flatpickr for date input
    flatpickr(dueDateInput, {
        dateFormat: 'd-m-Y',
        minDate: 'today', // Allow only future dates
    });

    addTaskButton.addEventListener('click', addTask);

    function addTask() {
        const taskText = taskInput.value.trim();
        const dueDate = dueDateInput.value;
        const priority = priorityInput.value;

        if (taskText === '') {
            alert('Please enter a task.');
            return;
        }

        // Validate date format DD-MM-YYYY
        if (!isValidDateFormat(dueDate)) {
            alert('Please enter a valid date in the format DD-MM-YYYY.');
            return;
        }

        const li = document.createElement('li');
        li.className = 'task-item';

        const taskSpan = document.createElement('span');
        taskSpan.textContent = `${taskText} (Due: ${dueDate}) [Priority: ${priority}]`;
        li.appendChild(taskSpan);

        const completeButton = document.createElement('button');
        completeButton.className = 'complete';
        completeButton.textContent = '✓';
        completeButton.addEventListener('click', () => {
            li.classList.toggle('completed');
        });
        li.appendChild(completeButton);

        const deleteButton = document.createElement('button');
        deleteButton.className = 'delete';
        deleteButton.textContent = '✗';
        deleteButton.addEventListener('click', () => {
            taskList.removeChild(li);
        });
        li.appendChild(deleteButton);

        taskList.appendChild(li);

        taskInput.value = '';
        dueDateInput._flatpickr.clear(); // Clear the flatpickr date input
        priorityInput.value = 'low';
    }

    // Function to validate date format DD-MM-YYYY
    function isValidDateFormat(dateString) {
        const regex = /^\d{1,2}-\d{1,2}-\d{4}$/;
        return regex.test(dateString);
    }
});
