'use server';
import { connectToDB } from '@/lib/mongodb';
import Task from '@/models/Task';

// ✅ Create a new task
export async function createTask (formData) {
  const { title, description, dueDate } = Object.fromEntries(formData);

  await connectToDB();
  const newTask = await Task.create({ title, description, dueDate });

  return newTask.toObject(); // Convert Mongoose Document to plain object
}

// ✅ Fetch all tasks
export async function getTasks () {
  await connectToDB();
  const tasks = await Task.find({}).lean(); // `.lean()` already returns plain objects

  return tasks.map(task => ({
    ...task,
    _id: task._id.toString() // Convert _id to string
  }));
}

// ✅ Update a task's completion status
export async function updateTask (id, formData) {
  const { completed } = Object.fromEntries(formData);

  await connectToDB();
  const updatedTask = await Task.findByIdAndUpdate(id, { completed }, { new: true });

  return updatedTask.toObject(); // Return the updated task as a plain object
}

// ✅ Delete a task
export async function deleteTask (id) {
  await connectToDB();
  await Task.findByIdAndDelete(id); // Delete task from the database
}
