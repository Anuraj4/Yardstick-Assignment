'use client';
import { useState, useEffect } from 'react';
import { getTasks } from '@/app/actions/taskActions';
import TaskForm from '@/components/TaskForm';
import TaskList from '@/components/TaskList';

export default function Home () {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState(null);

  // Fetch tasks when the page loads
  useEffect(() => {
    async function fetchTasks () {
      setLoading(true);
      const fetchedTasks = await getTasks(); // Call server action to fetch tasks
      setTasks(fetchedTasks);
      setLoading(false);
    }

    fetchTasks();
  }, []); // This will run only once when the page is mounted

  // Function to refresh the tasks after a task is added, deleted, or updated
  const refreshTasks = async () => {
    setLoading(true);
    const fetchedTasks = await getTasks(); // Call server action to get tasks
    setTasks(fetchedTasks);
    setLoading(false);
  };

  // Show notification
  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => {
      setNotification(null); // Hide notification after 3 seconds
    }, 3000);
  };

  return (
    <main className="max-w-2xl mx-auto p-6">
      <h1 className="text-xl font-bold mb-4">Task Manager</h1>

      {/* Show Notification */}
      {notification && (
        <div className="bg-green-500 text-white p-2 rounded mb-4">
          {notification}
        </div>
      )}

      <TaskForm refreshTasks={refreshTasks} showNotification={showNotification} />
      <TaskList tasks={tasks} refreshTasks={refreshTasks} showNotification={showNotification} />
    </main>
  );
}
