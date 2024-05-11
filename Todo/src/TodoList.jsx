import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faFacebook, faLinkedin } from '@fortawesome/free-brands-svg-icons';

const TodoList = () => {
  const [groups, setGroups] = useState([{ name: 'Group 1', todos: [] }]);
  const [selectedGroup, setSelectedGroup] = useState(0);
  const [inputValue, setInputValue] = useState('');
  const [editableIndex, setEditableIndex] = useState(null);
  const [editedValue, setEditedValue] = useState('');

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleAddTodo = () => {
    if (inputValue.trim() !== '') {
      const newGroups = [...groups];
      newGroups[selectedGroup].todos.push(inputValue);
      setGroups(newGroups);
      setInputValue('');
    }
  };

  const handleDeleteTodo = (index) => {
    const newGroups = [...groups];
    newGroups[selectedGroup].todos.splice(index, 1);
    setGroups(newGroups);
  };

  const handleEditTodo = (index) => {
    setEditableIndex(index);
    setEditedValue(groups[selectedGroup].todos[index]);
  };

  const handleSaveEdit = () => {
    const newGroups = [...groups];
    newGroups[selectedGroup].todos[editableIndex] = editedValue;
    setGroups(newGroups);
    setEditableIndex(null);
    setEditedValue('');
  };

  const handleAddGroup = () => {
    const newGroupName = `Group ${groups.length + 1}`;
    setGroups([...groups, { name: newGroupName, todos: [] }]);
    setSelectedGroup(groups.length);
  };

  const handleGroupChange = (index) => {
    setSelectedGroup(index);
  };

  return (
    
    <div className="lg: absolute text-center container mx-auto -mt-20 ">
      <h1 className="text-3xl font-bold mb-4">Todo List</h1>
      <div className="relative flex mb-4 justify-center">
        <input
          type="text"
          className="text-center px-4 py-2 border rounded mr-2 w-3/4 focus:outline-none"
          placeholder="Enter a new todo"
          value={inputValue}
          onChange={handleInputChange}
        />
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none"
          onClick={handleAddTodo}
        >
          Add Todo
        </button>
      </div>
      <div className="flex mb-4 justify-center">
        {groups.map((group, index) => (
          <button
            key={index}
            className={`px-4 py-2 ${
              selectedGroup === index
                ? 'bg-blue-500 text-white'
                : 'bg-gray-300 text-gray-800'
            } rounded mr-2 hover:bg-blue-600 focus:outline-none`}
            onClick={() => handleGroupChange(index)}
          >
            {group.name}
          </button>
        ))}
        <button
          className=" px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 focus:outline-none"
          onClick={handleAddGroup}
        >
          Add Group
        </button>
      </div>
      <ul>
        {groups[selectedGroup].todos.map((todo, index) => (
          <li
            key={index}
            className="flex items-center justify-between py-2 border-b last:border-b-0 "
          >
            {editableIndex === index ? (
              <>
                <input
                  type="text"
                  className="px-2 py-1 border rounded focus:outline-none"
                  value={editedValue}
                  onChange={(e) => setEditedValue(e.target.value)}
                />
                <div>
                  <button
                    className="px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600 mr-2 focus:outline-none"
                    onClick={handleSaveEdit}
                  >
                    Save
                  </button>
                  <button
                    className="px-2 py-1 bg-gray-500 text-white rounded hover:bg-gray-600 focus:outline-none"
                    onClick={() => setEditableIndex(null)}
                  >
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              <>
                <span>{todo}</span>
                <div>
                  <button
                    className="px-2 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 mr-2 focus:outline-none"
                    onClick={() => handleEditTodo(index)}
                  >
                    Edit
                  </button>
                  <button
                    className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none"
                    onClick={() => handleDeleteTodo(index)}
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
      <div className="flex justify-center mt-4">
       <a href="https://www.instagram.com/" target='blank'>
         <FontAwesomeIcon icon={faInstagram} size="2x" className="mx-2" />
        </a>
        <a href="https://www.facebook.com/" target='blank'>
        <FontAwesomeIcon icon={faFacebook} size="2x" className="mx-2" />
        </a>
        <a href="https://www.linkedin.com/" target='blank'>
        <FontAwesomeIcon icon={faLinkedin} size="2x" className="mx-2" />
        </a>
      </div>
    </div>
   
  );

}

export default TodoList;