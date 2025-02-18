import React, { useState, useRef } from 'react';
import './App.css';
import imageMe from './assets/me.jpg';
import imageKa from './assets/ka.jpg';
import imageHa from './assets/ha.jpg';

function App() {
  const [items, setItems] = useState([
    { id: 1, name: "Asrorbek", image: imageMe, time: "00:15"},
    { id: 2, name: "Kamronbek", image: imageKa, time: "00:16"},
    { id: 3, name: "Hasanxon", image: imageHa, time: "00:17"}
  ]);
  const [newItemName, setNewItemName] = useState('');
  const [newItemImage, setNewItemImage] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  
  const nameInputRef = useRef(null);

  function getCurrentTime() {
    const timeNow = new Date();
    const hour = timeNow.getHours();
    const minute = timeNow.getMinutes();
    return `${hour}:${minute}`;
  }

  const handleDelete = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setNewItemImage(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const validateName = (name) => {
    return /^[a-zA-Z\s]+$/.test(name);
  };

  const handleAdd = () => {
    if (!validateName(newItemName)) {
      nameInputRef.current.placeholder="ERROR...";
      nameInputRef.current.focus();
      nameInputRef.current.style.border='1px solid red'
      return;
    }

    const newItem = {
      id: items.length + 1,
      name: newItemName,
      image: newItemImage,
      time: getCurrentTime()
    };
    setItems([...items, newItem]);
    setNewItemName('');
    setNewItemImage(null);
    setErrorMessage('');
  };

  

  return (
    <>
      <div className="container">
        <div className="card">
          <header className='uni'>TODO LIST. By Asrorbek</header>
          <ul>
            {items.map(item => (
              <li className='uni' key={item.id}>
                <div className="fullName">
                  <p className="hour">{item.time}</p>
                  <p className="name">{item.name}</p>
                </div>
                <div className="imgs">
                  <div className="edit">
                    <i className="fa-solid fa-trash" style={{ color: "rgb(0, 187, 255)" }} onClick={() => handleDelete(item.id)}>
                      <p className='delete'>Delete</p>
                    </i>
                  </div>
                  {item.image ? <img src={item.image} alt="" width={70} height={70} /> : <img src={image2} alt="" width={70} height={70} />}
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="editEl">
          <input ref={nameInputRef} className='inputName' type="text" value={newItemName} onChange={(e) => setNewItemName(e.target.value)} placeholder="Name*" />
          <form method="post" encType="multipart/form-data">
            <label className="input-file">
              <input type="file" name="file" onChange={handleImageChange} accept="image/*"/>
              <span className="input-file-btn">Send Img</span>
            </label>
          </form>
          {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
          <div className="plus" onClick={handleAdd}>
            +
          </div>
        </div>
      </div>
    </>
  )
}

export default App;
