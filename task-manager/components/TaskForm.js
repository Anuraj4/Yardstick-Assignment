'use client';
import { createTask } from '@/app/actions/taskActions'; // Correct import
import { useState } from 'react';

export default function TaskForm ({ refreshTasks, showNotification }) {
  const [loading, setLoading] = useState(false);

  async function handleSubmit (event) {
    event.preventDefault();
    setLoading(true);

    const formData = new FormData(event.target);
    await createTask(formData); // Create the new task

    setLoading(false);
    event.target.reset();

    // Manually refresh the task list after adding a new task
    refreshTasks(); // Call the function passed as a prop to refresh tasks
    showNotification('Task added successfully!'); // Show success notification
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded">
      <input name="title" placeholder="Task Title" required className="border text-black p-2 w-full" />
      <textarea name="description" placeholder="Task Description" required className="border text-black p-2 w-full" />
      <input type="date" name="dueDate" required className="border p-2 text-black w-full" />
      <button type="submit" disabled={loading} className="bg-blue-500 text-white p-2 rounded w-full">
        {loading ? 'Adding...' : 'Add Task'}
      </button>
    </form>
  );
}
