import React, { useEffect, useState } from 'react';
import { Item } from '../interfaces';
import { getAllItems, addItem, deleteItem, updateItem } from '../dataService';

const Home = () => {
  // State for items and a new item
  const [editingItems, setEditingItems] = useState<number[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [items, setItems] = useState<Item[]>([]);
  const [newItem, setNewItem] = useState<Item>({
    id: 0,
    name: '',
    last_name: '',
    phone: '',
    Email: '',
    address: '',
  });
  const handleEditItem = (item: Item) => {
    setNewItem(item);
    setIsEditing(true);
  };

  // Function to save changes made during editing
  const handleSaveItem = () => {
    if (isEditing) {
      handleUpdateItem(newItem.id, newItem);
      setIsEditing(false);
    }
  };
  // Fetch initial data on component mount
  useEffect(() => {
    const fetchData = async () => {
      const data = getAllItems();
      setItems(data);
    };
    fetchData();
  }, []);

  // Function to update an item
  const handleUpdateItem = (itemId: number, updatedItem: Item) => {
    updateItem(itemId, updatedItem);
    const updatedItems = items.map((item) =>
      item.id === itemId ? updatedItem : item
    );
    setItems(updatedItems);
  };

  // Function to add a new item
  const handleAddItem = () => {
    const currentItems = getAllItems();
    const maxId = currentItems.reduce((max, item) =>
      item.id > max ? item.id : max
    , 0);
    
    const newItemToAdd = {
      id: maxId + 1,
      name: newItem.name,
      last_name: newItem.last_name,
      phone: newItem.phone,
      Email: newItem.Email,
      address: newItem.address,
    };
    
    addItem(newItemToAdd);
    setItems([...currentItems, newItemToAdd]);
    
    // Reset the newItem state
    setNewItem({
      id: 0,
      name: '',
      last_name: '',
      phone: '',
      Email: '',
      address: '',
    });
  };

  // Function to delete an item
  const handleDeleteItem = (itemId: number) => {
    deleteItem(itemId);
    setItems(getAllItems());
  };

  return (
    
    <div className="container">
    <div className="mt-4"style={{ textAlign: 'center' }}>
      <div className="input-group">
        <div className="input-group-append">
        <input
            className="form-control"
            type="text"
            placeholder="Name"
            value={newItem.name}
            onChange={(e) =>
              setNewItem({ ...newItem, name: e.target.value })
            }
          />
            <input
            className="form-control"
            type="text"
            placeholder="Last Name"
            value={newItem.last_name}
            onChange={(e) =>
              setNewItem({ ...newItem, last_name: e.target.value })
            }
          />
          <input
            className="form-control"
            type="text"
            placeholder="E-mail"
            value={newItem.Email}
            onChange={(e) =>
              setNewItem({ ...newItem, Email: e.target.value })
            }
          />
           <input
            className="form-control"
            type="text"
            placeholder="Phone"
            value={newItem.phone}
            onChange={(e) =>
              setNewItem({ ...newItem, phone: e.target.value })
            }
          />
           <input
            className="form-control"
            type="text"
            placeholder="Address"
            value={newItem.address}
            onChange={(e) =>
              setNewItem({ ...newItem, address: e.target.value })
            }
          />
          <button
            className="btn btn-primary"
            style={{
              color: 'white',
              backgroundColor: 'green',
              borderRadius: '8px',
              padding: '10px 20px',
              fontSize: '16px',
              border: '2px solid green',
              transition: 'background-color 0.3s ease',
            }}
            onClick={handleAddItem}
          >
            Add
          </button>
        </div>
        <h1 className="mt-4" style={{ textAlign: 'center' }}><strong>Items</strong></h1>

        <ul className="list-group">
          {/* List of items */}
          {items.map((item) => (
            <li
              className="list-group-item d-flex justify-content-between align-items-center"
              key={item.id}
            >
              {isEditing ? (
                <div>
                  <button
                    className="btn btn-success"
                    style={{
                      color: 'white',
                      backgroundColor: 'blue',
                      borderRadius: '8px',
                      padding: '10px 20px',
                      fontSize: '16px',
                      border: '2px solid blue',
                      transition: 'background-color 0.3s ease',
                    }}
                    onClick={handleSaveItem}
                  >
                    Save
                  </button>
                </div>
              ) : (
                <div style={{ textAlign: 'center', background: '#f5f5f5', padding: '20px', borderRadius: '8px' }}>
                <div style={{ textAlign: 'center', background: 'white', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)', padding: '10px', borderRadius: '4px' }}>
                  <p style={{ fontSize: '18px', color: '#333', margin: '0' }}>
                  Name: {item.name} {item.last_name}
                  </p>
                  <p style={{ fontSize: '14px', color: '#777', margin: '0' }}>
                    Phone: {item.phone}
                  </p>
                  <p style={{ fontSize: '14px', color: '#777', margin: '0' }}>
                    Email: {item.Email}
                  </p>  
                  <p style={{ fontSize: '14px', color: '#777', margin: '0' }}>
                  Address: {item.address}
                  </p>
                </div>
                   
                   
                   {!isEditing && (
                  


                  <button
                    className="btn btn-primary"
                    style={{
                      color: 'white',
                      backgroundColor: 'blue',
                      borderRadius: '8px',
                      padding: '10px 20px',
                      fontSize: '16px',
                      border: '2px solid blue',
                      transition: 'background-color 0.3s ease',
                    }}
                    onClick={() => handleEditItem(item)}
                  >
                    Edit
                  </button>
                )}
                  <button
                  className="btn btn-danger"
                  style={{
                    color: 'white',
                    backgroundColor: 'red',
                    borderRadius: '8px',
                    padding: '10px 20px',
                    fontSize: '16px',
                    border: '2px solid #ff3333',
                    transition: 'background-color 0.3s ease',
                  }}
                  onClick={() => handleDeleteItem(item.id)}
                >
                  Delete
                </button>
                </div>
              )}
              <div>
              
              
               
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </div>
  );
};

export default Home;
