import React from 'react';
//import { Link } from 'react-router-dom';
import '../assets/style/style.css';
import parrot from '../assets/images/parrot.png';
import { Button } from 'react-bootstrap';

const Chats = () => {
  return (
    <div className='Chats' style={{ backgroundColor: "whitesmoke ", color: "black", height: "100vh", fontFamily: 'Poppins, sans-serif', display: 'flex', overflow: 'hidden'}}>
          <div className="sideBar" style={{ flex: "3", borderRight: "1px solid white", display: 'flex', flexDirection: 'column'  , padding: "10px"}}>
            <div className="upperSide">
            <div className="upperSideTop" style={{ paddingLeft: "10px", paddingTop: "10px" }}>
        <div style={{ display: "flex",  flexDirection: "column", alignItems: "center"}}>
            <img src={parrot} alt="" className="logo" width="50" height="50" />
            <span className="brand" style={{ fontSize: "25px", fontWeight: "normal", paddingLeft: "5px" }}>Learn Ease</span>
        </div>
                <div className="border rounded searchBar d-flex justify-content-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
                    </svg>{"  "}
                    <input type="text"  placeholder="Search..."  style={{ width: "80%" }}/>
                    
                </div>

                <div className="my-2 d-flex align-items-center justify-content-center p-2">
                    <Button variant="success">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-plus" viewBox="0 0 16 16">
                            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"/>
                        </svg>
                        New Chat
                    </Button>
               </div>
                <div id= "favChats" className="favChats">
                  {/* fav chats render */}
                  <button id="fav">Explain Polymorphism</button>
                  <button id="fav">Syntax Tree in Compiler Construction</button>
                  <button id="fav">Serverless Architecture is Software Design</button>
                  
                </div>
              </div>
            </div>
            <div className="line" style={{ borderTop: '1px solid white', flexGrow: 1 }}></div>
            
                  <div className="lowerSide">
                      <div className="chats" style={{ display: "flex", alignItems: "center", flexDirection: "column", overflow: "hidden", overflowY: "scroll", scrollBehavior: 'smooth', width: "100%", maxWidth: "90rem", height: "calc(100vh - 20rem)" }}>
                        <div className="chat bot border rounded shadow" style={{ width: "90%", textAlign: "justify", margin: "0.5rem", padding: "0.5rem 1rem", fontSize: "0.85rem", display: "flex", alignItems: "flex-start" }}>
                          <p className="txt">Python closure basics</p>
                        </div>
                        <div className="chat bot border rounded shadow" style={{ width: "90%", textAlign: "justify", margin: "0.5rem", padding: "0.5rem 1rem", fontSize: "0.85rem", display: "flex", alignItems: "flex-start" }}>
                          <p className="txt">Thresholding methods in CV</p>
                      </div>
                      <div className="chat bot border rounded shadow" style={{ width: "90%", textAlign: "justify", margin: "0.5rem", padding: "0.5rem 1rem", fontSize: "0.85rem", display: "flex", alignItems: "flex-start" }}>
                          <p className="txt">Axios basics for requests</p>
                      </div>
                      <div className="chat bot border rounded shadow" style={{ width: "90%", textAlign: "justify", margin: "0.5rem", padding: "0.5rem 1rem", fontSize: "0.85rem", display: "flex", alignItems: "flex-start" }}>
                          <p className="txt">Regex basics in javascript</p>
                      </div>
                  </div>

            </div>
           
          </div>
          <div className="main" style={{minHeight:"calc(100vh-15rem)",display:"flex",flexDirection:"column",alignItems:"center",margin:"1rem", flex: "9", marginBottom:"5px" }} >
                <h2>Tutor Bot</h2>
                <div className="botTone">
                    <Button className='m-2' variant="outline-secondary">Creative</Button>{' '}
                    <Button className='m-2' variant="outline-secondary">Balanced</Button>{' '}
                    <Button className='m-2' variant="outline-secondary">Precise</Button>{' '}
                      
                </div>
            <div className="chats" style={{ overflow: "hidden", overflowY: "scroll", scrollBehavior: 'smooth', width: "100%", maxWidth: "70rem", height: "calc(100vh - 7rem)" }}>
            <div className="chat " style={{ textAlign: "justify", margin: "0.5",  fontSize: "0.85rem", display: "flex", alignItems: "flex-start" }}>
              <svg className='m-2' xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 16">
                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
                <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"/>
              </svg>
            <p className=" p-2">what is polymorphism in programming</p>
            </div>


            <div className="chat bot border rounded" style={{ textAlign: "justify", margin: "0.5rem", padding: "1rem 2rem", fontSize: "0.85rem", display: "flex", alignItems: "flex-start" }}>
                <div className='border rounded-circle p-1 '>
                    <img  src={parrot} width={25} height={25} alt="p" />
                </div>
                <p className="txt p-2">
                Polymorphism in programming refers to the ability of an object to take on many forms or types. It allows objects of different classes to be treated as objects of a common superclass. This means that a single interface can be used to represent multiple types of objects.

Polymorphism enables flexibility and extensibility in programming. It allows different objects to respond to the same method calls in different ways, based on their individual implementation. This allows for code reuse and simplifies the design and implementation of complex systems.

There are two main types of polymorphism:

Compile-time polymorphism (also known as method overloading): This occurs when there are multiple methods with the same name but different parameters in a single class. The appropriate method to be executed is determined by the compiler based on the arguments passed at compile-time.

Runtime polymorphism (also known as method overriding): This occurs when a method in a subclass has the same name and parameters as a method in its superclass. The appropriate method to be executed is determined at runtime based on the type of object being referred to by the superclass reference.

Polymorphism is a key concept in object-oriented programming and allows for code that is more flexible, modular, and scalable. It promotes code reusability and makes it easier to manage large and complex codebases.

                </p>
            </div>



    </div>
            
            <div className="inp p-3 shadow border rounded" style={{ backgroundColor: "white", display: "flex", alignItems: "center", borderRadius: "0.5rem",  width: "95%", maxWidth: "65rem", margin:"5px", marginRight:"3px"}}>
                <input 
                className=''
                type="text" 
                placeholder='Send a message' 
                style={{ 
                  backgroundColor: "transparent", 
                  border: "none", 
                  height:"20px",
                  outline: "none",
                  flexGrow: 1, // Ensure the input field takes up all available space
                  overflow: "hidden" // Ensure the input field does not overflow its container
                }} 
                /> 
                <button className="send" style={{ backgroundColor: "transparent", border: "none" }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-send" viewBox="0 0 16 16">
                          <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576zm6.787-8.201L1.591 6.602l4.339 2.76z"/>
                        </svg>
                  </button>
              </div>
              <p className='p-2' style={{ fontSize:"12px"}}>LearnEase may produce incorrect information about people, places or facts.</p>
            </div>
          
    </div>
    
  );
}

export default Chats;
