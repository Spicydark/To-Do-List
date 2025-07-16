        const API_BASE_URL = 'http://localhost:8080/api'; // Your Spring Boot backend URL

        // Get DOM elements
        const taskList = document.getElementById('taskList');
        const addTaskForm = document.getElementById('addTaskForm');
        const taskActionForm = document.getElementById('taskActionForm');
        const searchBtn = document.getElementById('searchBtn');
        const markDoneBtn = document.getElementById('markDoneBtn');
        const deleteBtn = document.getElementById('deleteBtn');
        const messageBox = document.getElementById('messageBox');

        /**
         * Displays a message in the message box.
         * @param {string} message - The message to display.
         * @param {string} type - 'success' or 'error'.
         */
        function showMessage(message, type) {
            messageBox.textContent = message;
            messageBox.className = `message-box ${type}`;
            messageBox.style.display = 'block';

            // Automatically hide after 3 seconds
            setTimeout(() => {
                messageBox.classList.add('fade-out');
                setTimeout(() => {
                    messageBox.style.display = 'none';
                    messageBox.classList.remove('fade-out');
                }, 500); // Wait for fade-out animation to complete
            }, 3000);
        }

        /**
         * Fetches all tasks from the backend and renders them.
         */
        async function fetchAndRenderTasks() {
            taskList.innerHTML = '<tr><td colspan="5" class="text-center py-4 text-gray-500">Loading tasks...</td></tr>';
            try {
                const response = await fetch(`${API_BASE_URL}/tasks`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const tasks = await response.json();
                renderTasks(tasks);
            } catch (error) {
                console.error('Error fetching tasks:', error);
                taskList.innerHTML = '<tr><td colspan="5" class="text-center py-4 text-red-500">Failed to load tasks. Please ensure the backend is running.</td></tr>';
                showMessage('Failed to load tasks. Check your browser\'s developer console and ensure the backend is running.', 'error');
            }
        }

        /**
         * Renders a list of tasks into the table.
         * @param {Array<Object>} tasks - An array of task objects.
         */
        function renderTasks(tasks) {
            taskList.innerHTML = ''; // Clear existing tasks
            if (tasks.length === 0) {
                taskList.innerHTML = '<tr><td colspan="5" class="text-center py-4 text-gray-500">No tasks found.</td></tr>';
                return;
            }

            tasks.forEach(task => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td class="font-mono text-gray-600">${task.id}</td>
                    <td class="font-medium text-gray-800">${task.title}</td>
                    <td class="text-gray-700">${task.description || '-'}</td>
                    <td class="${task.status === 'Done' ? 'status-done' : 'status-pending'}">${task.status}</td>
                    <td class="text-gray-600">${task.dueDate || '-'}</td>
                `;
                taskList.appendChild(row);
            });
        }

        /**
         * Handles adding a new task.
         * @param {Event} event - The form submission event.
         */
        addTaskForm.addEventListener('submit', async (event) => {
            event.preventDefault();

            const title = document.getElementById('title').value;
            const description = document.getElementById('description').value;
            const status = document.getElementById('status').value;
            const dueDate = document.getElementById('dueDate').value;

            const newTask = {
                title,
                description,
                status,
                dueDate: dueDate || null // Send null if date is empty
            };

            try {
                const response = await fetch(`${API_BASE_URL}/tasks`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(newTask),
                });

                if (!response.ok) {
                    const errorText = await response.text();
                    throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
                }

                const addedTask = await response.json();
                showMessage('Task added successfully!', 'success');
                addTaskForm.reset(); // Clear form fields
                fetchAndRenderTasks(); // Refresh task list
            } catch (error) {
                console.error('Error adding task:', error);
                showMessage(`Error adding task: ${error.message}. Check console for details.`, 'error');
            }
        });

        /**
         * Constructs a TaskSearchRequest object from the action form inputs.
         * @returns {Object} The TaskSearchRequest object.
         */
        function getTaskSearchRequest() {
            const title = document.getElementById('actionTitle').value;
            const description = document.getElementById('actionDescription').value;
            const status = document.getElementById('actionStatus').value;
            const id = document.getElementById('actionId').value;

            const request = {};
            if (title) request.title = title;
            if (description) request.description = description;
            if (status) request.status = status;
            if (id) request.id = parseInt(id, 10); // Ensure ID is a number

            return request;
        }

        /**
         * Handles searching for tasks.
         */
        searchBtn.addEventListener('click', async () => {
            const request = getTaskSearchRequest();
            if (Object.keys(request).length === 0) {
                // If no criteria, fetch all tasks
                fetchAndRenderTasks();
                return;
            }

            try {
                const response = await fetch(`${API_BASE_URL}/search`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(request),
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const tasks = await response.json();
                renderTasks(tasks);
                showMessage(`Found ${tasks.length} task(s).`, 'success');
            } catch (error) {
                console.error('Error searching tasks:', error);
                showMessage('Error searching tasks. Check console for details.', 'error');
            }
        });

        /**
         * Handles marking tasks as done.
         */
        markDoneBtn.addEventListener('click', async () => {
            const request = getTaskSearchRequest();

            if (Object.keys(request).length === 0) {
                showMessage('Please provide criteria to mark tasks as done.', 'error');
                return;
            }

            try {
                const response = await fetch(`${API_BASE_URL}/tasks/done`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(request),
                });

                if (!response.ok) {
                    const errorText = await response.text();
                    throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
                }

                const updatedTasks = await response.json();
                if (updatedTasks.length > 0) {
                    showMessage(`Marked ${updatedTasks.length} task(s) as Done.`, 'success');
                } else {
                    showMessage('No matching tasks found to mark as Done.', 'error');
                }
                fetchAndRenderTasks(); // Refresh task list
            } catch (error) {
                console.error('Error marking tasks as done:', error);
                showMessage(`Error marking tasks as done: ${error.message}. Check console for details.`, 'error');
            }
        });

        /**
         * Handles deleting tasks.
         */
        deleteBtn.addEventListener('click', async () => {
            const request = getTaskSearchRequest();

            if (Object.keys(request).length === 0) {
                showMessage('Please provide criteria to delete tasks. Be careful, leaving all fields empty will delete ALL tasks!', 'error');
                return;
            }

            // Simple confirmation for delete
            if (!confirm('Are you sure you want to delete tasks matching the criteria? This action cannot be undone.')) {
                return;
            }

            try {
                const response = await fetch(`${API_BASE_URL}/tasks/delete`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(request),
                });

                if (!response.ok) {
                    const errorText = await response.text();
                    throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
                }

                const message = await response.text(); // The backend returns a string message
                showMessage(message, 'success');
                fetchAndRenderTasks(); // Refresh task list
            } catch (error) {
                console.error('Error deleting tasks:', error);
                showMessage(`Error deleting tasks: ${error.message}. Check console for details.`, 'error');
            }
        });


        // Initial load of tasks when the page loads
        document.addEventListener('DOMContentLoaded', fetchAndRenderTasks);
