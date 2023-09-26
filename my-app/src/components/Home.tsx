import React, { useEffect, useState } from 'react';

const LocalStorageDemo = () => {
  const [data, setData] = useState('');
  const [storedData, setStoredData] = useState('');

  useEffect(() => {
    // Load data from local storage when the component mounts
    const storedData = localStorage.getItem('myData');
    if (storedData) {
      setStoredData(storedData);
    }
  }, []);

  const handleInputChange = (e) => {
    setData(e.target.value);
  };

  const saveData = () => {
    // Save data to local storage when the "Save" button is clicked
    localStorage.setItem('myData', data);
    setStoredData(data);
  };

  const clearData = () => {
    // Clear data from local storage when the "Clear" button is clicked
    localStorage.removeItem('myData');
    setStoredData('');
  };

  return (
    <div>
      <h1>Local Storage Demo</h1>
      <label>
        Enter Data:
        <input
          type="text"
          value={data}
          onChange={handleInputChange}
        />
      </label>
      <button onClick={saveData}>Save</button>
      <button onClick={clearData}>Clear</button>
      <div>
        <h2>Stored Data:</h2>
        <p>{storedData}</p>
      </div>
    </div>
  );
};

export default LocalStorageDemo;
