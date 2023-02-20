import React, { useState, useEffect } from "react";
import "./style.css";

// get the localStorage data back
const getLocalData = () => {
  const lists = localStorage.getItem("mytodolist");
  // inside it should be the value of key value 
  if (lists) {
    return JSON.parse(lists);
     // we will get the data in the form of array 
  } else {
    return [];
  }
};

const Todo = () => {
  const [inputdata, setInputData] = useState("");
  // const [items, setItems] = useState([]);
  const [items, setItems] = useState(getLocalData());
  const [isEditItem, setIsEditItem] = useState("");
  const [toggleButton, setToggleButton] = useState(false);

  // add the items fucnction
  const addItem = () => {
    if (!inputdata) {
      alert("plz fill the data");
    } else if (inputdata && toggleButton) {
      setItems(
        items.map((curElem) => {
          if (curElem.id === isEditItem) {
            return { ...curElem, name: inputdata };
          }
          return curElem;
        })
      );

      setInputData("");
      setIsEditItem(null);
      setToggleButton(false);
    } else {
         // It is created to delete the inputdata 
      const myNewInputData = {
        id: new Date().getTime().toString(),
        name: inputdata,
      };
      setItems([...items, myNewInputData]);
      // setItems([...items,inputData]);
      // '...' is used to keep the data along with the previous data and inputData is the new data 
      setInputData("");
      // To reflect the data 
    }
  };

  //edit the items
  const editItem = (index) => {
    const item_todo_edited = items.find((curElem) => {
      return curElem.id === index;
    });
    setInputData(item_todo_edited.name);
    setIsEditItem(index);
    setToggleButton(true);
  };

  // how to delete items section
  const deleteItem = (index) => {
    const updatedItems = items.filter((curElem) => {
      return curElem.id !== index;
    });
    setItems(updatedItems);
  };

  // remove all the elements
  const removeAll = () => {
    setItems([]);
  };

  // adding localStorage
  useEffect(() => {
    localStorage.setItem("mytodolist", JSON.stringify(items));
    // items is an array and we have to convert it into string 
  }, [items]);
  // The useEffect will only work if we change the value of items and add it to the local storage 
// localStorage only work in the form of key value pair and only string is passed 

  return (
    <>
      <div className="main-div">
        <div className="child-div">
          <figure>
            <img src="./images/todo.svg" alt="todologo" />
            <figcaption>Add Your List Here ✌</figcaption>
          </figure>
          <div className="addItems">
            <input
              type="text"
              placeholder="✍ Add Item"
              className="form-control"
              value={inputdata}
              onChange={(event) => setInputData(event.target.value)}
               //  IMP:- Always put this inside the input tag otherwise useState will not take the current data 
            />
            {toggleButton ? (
              <i className="far fa-edit add-btn" onClick={addItem}></i>
            ) : (
              <i className="fa fa-plus add-btn" onClick={addItem}></i>
            )}
             {/* <i className="fa fa-plus add-btn" onClick = {addItem} ></i> */}
           

            {/* The target property returns the element where the event occured. The target property is read-only. The target property returns the element on which the event occurred, opposed to the currentTarget property, which returns the element whose event listener triggered the event. */}

            {/* font awesome website -> where icons and other things are available version 5.15.0 and cdnjs
            CDNJS is a free distributed JS library delivery service that you can use to host your JS dependencies/libraries outside of your server. Using its robust cloud network delivery and storage service, CDNJS will deliver all JS libraries you use on your websites or web applications to your users */}
          </div>
          {/* show our items  */}
          <div className="showItems">
            {items.map((curElem) => {
              return (
                <div className="eachItem" key={curElem.id}>
                    {/* <div className='eachItems' key={index}> */}
                  <h3>{curElem.name}</h3>
                  <div className="todo-btn">
                    <i
                      className="far fa-edit add-btn"
                      onClick={() => editItem(curElem.id)}></i>
                    <i
                      className="far fa-trash-alt add-btn"
                      onClick={() => deleteItem(curElem.id)}></i>
                  </div>
                </div>
              );
            })}
          </div>

          {/* rmeove all button  */}
          <div className="showItems">
            <button
              className="btn effect04"
              data-sm-link-text="Remove All"
              onClick={removeAll}>
              <span> CHECK LIST</span>
            </button>
              {/* <button className='btn effect04' data-sm-link-text='Remove All'>CHECK LIST</button> 
          if not put in span tag then after hovering on it will show checklist along with remove all */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Todo;