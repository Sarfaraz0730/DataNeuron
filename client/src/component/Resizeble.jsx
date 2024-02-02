import React, { useState, useEffect } from 'react';
import { Rnd } from 'react-rnd';
import axios from 'axios';
import './ResizeableWindows.css';

const ResizeableWindows = () => {
  const [description, setDescription] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [savedTaskId, setSavedTaskId] = useState(null);

  const addTaskUrl = 'http://localhost:8000/add';
  const editUrl = 'http://localhost:8000/edit';

  const addTask = async () => {
    try {
      const sendData = await axios.post(addTaskUrl, { description, count: 0 });
      const { _id, count } = sendData.data;
      setTasks((prevTasks) => [...prevTasks, { _id, description, count }]);
      setDescription('');
    } catch (err) {
      console.log(err.message);
    }
  };

  const editTask = async (_id) => {
    setEditingTaskId(_id);
  };

  const saveTask = async (_id) => {
    try {
      const sendData = await axios.patch(`${editUrl}/${_id}`, {
        description: editDescription,
      });

      const updatedTask = sendData.data;

      setTasks((prevTasks) =>
        prevTasks.map((task) => (task._id === _id ? updatedTask : task))
      );

      setEditDescription('');
      setEditingTaskId(null);
      setSavedTaskId(_id); // Set the savedTaskId to trigger UI changes
    } catch (error) {
      console.error('Error editing task:', error);
    }
  };

  const handleEditDescriptionChange = (e) => {
    setEditDescription(e.target.value);
  };

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(editUrl);
        setTasks(response.data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();
  }, []);

  return (
    <div className="resizeable-windows-container">
      {/* Window 1 */}
      <Rnd
        default={{
          x: 0,
          y: 0,
          width: 300,
          height: 200,
        }}
        className="resizeable-window"
      >
        <div className="window-content">Window 1</div>
      </Rnd>

      {/* Window 2 */}
      <Rnd
        default={{
          x: 0,
          y: 0,
          width: 300,
          height: 200,
        }}
        className="resizeable-window"
      >
        <div className="window-content">
          <div>
            <input
              placeholder="Enter Task"
              id="input"
              onChange={(e) => setDescription(e.target.value)}
              value={description}
            />
            <button onClick={addTask}>Add</button>
          </div>

          <table className="task-table">
            <thead>
              <tr>
                <th>Description</th>
                <th>Count</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task) => (
                <tr key={task._id} className="task-row">
                  <td>
                    {editingTaskId === task._id ? (
                      <input
                        type="text"
                        value={editDescription}
                        onChange={handleEditDescriptionChange}
                      />
                    ) : (
                      task.description
                    )}
                  </td>
                  <td>{task.count}</td>
                  <td>
                    {editingTaskId === task._id ? (
                      savedTaskId === task._id ? (
                        'Saved'
                      ) : (
                        <button onClick={() => saveTask(task._id)}>Save</button>
                      )
                    ) : (
                      <button onClick={() => editTask(task._id)}>Edit</button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Rnd>

      {/* Window 3 */}
      <Rnd
        default={{
          x: 0,
          y: 0,
          width: 600,
          height: 300,
        }}
        className="resizeable-window"
      >
        <div className="window-content">Window 3</div>
      </Rnd>
    </div>
  );
};

export default ResizeableWindows;
