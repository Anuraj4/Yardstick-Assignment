'use client';
import { updateTask, deleteTask } from '@/app/actions/taskActions'; // Import functions
import { useState } from 'react';

export default function TaskList ({ tasks, refreshTasks, showNotification }) {
  const [loading, setLoading] = useState(false);

  // Handle task completion (mark as done or not)
  async function handleToggleCompletion (task) {
    setLoading(true);
    const formData = new FormData();
    formData.append('completed', !task.completed); // Toggle completion

    await updateTask(task._id, formData); // Update task completion status
    setLoading(false);
    refreshTasks(); // Refresh the task list after updating
    showNotification(`Task "${task.title}" marked as ${task.completed ? 'complete' : 'incomplete'}`); // Show completion notification
  }

  // Handle task deletion
  async function handleDelete (taskId) {
    setLoading(true);
    await deleteTask(taskId); // Delete the task
    setLoading(false);
    refreshTasks(); // Refresh the task list after deleting
    showNotification('Task deleted successfully!'); // Show deletion notification
  }

  return (
    <div className="space-y-4 p-4">
      {tasks.map((task) => (
        <div key={task._id} className="border p-4 rounded">
          <h3 className={`font-bold ${task.completed ? 'line-through text-gray-500' : ''}`}>
            {task.title}
          </h3>
          <p>{task.description}</p>
          <p className="text-sm text-gray-500">Due: {new Date(task.dueDate).toLocaleDateString()}</p>

          {/* Mark as Complete/Incomplete */}
          <button
            onClick={() => handleToggleCompletion(task)}
            disabled={loading}
            className="bg-green-500 text-white p-1 rounded m-1"
          >
            {task.completed ? 'Mark Incomplete' : 'Mark Complete'}
          </button>

          {/* Delete Task */}
          <button
            onClick={() => handleDelete(task._id)}
            disabled={loading}
            className="bg-red-500 text-white p-1 rounded m-1"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}
