import React, { useState } from 'react';

import Navbars from './Navbar';
import { Button, Card } from 'react-bootstrap';
// import './styles.css';


// import { fetchTopicLinks } from './api'; // Assuming you have an API function to fetch topic-related links
import linkImg from '../assets/images/linkImg.png'

const Detective = () => {
    const [topic, setTopic] = useState('');
    const [links, setLinks] = useState([]);
  
    const handleTopicChange = (e) => {
      setTopic(e.target.value);
    };
  
    // const handleSendMessage = async () => {
    //   try {
    //     // Fetch topic-related links when sending message
    //     const data = await fetchTopicLinks(topic);
    //     setLinks(data.links); // Assuming data.links contains an array of links
    //   } catch (error) {
    //     console.error('Error fetching topic-related links:', error);
    //   }
    // };
  
    return (
      <div>
          <Navbars/>
          <div className='Chats mt-5 ' style={{ backgroundColor: "smokewhite", height: "100vh", fontFamily: 'Poppins, sans-serif', display: 'flex', alignItems:"center", justifyContent: "center" }}>
          
              <div className="main " style={{  display: "flex", flexDirection: "column", justifyContent: "center",alignItems: "center", margin: "0.5rem", marginBottom: "5px" }}>
                  <h4>Real - Time Resources</h4>
                  <div style={{  width: "100%", maxWidth: "80rem", height: "calc(100vh - 10rem)", border:"1px solid gray", marginTop:"10px" , borderRadius:"10px"}}>
                      <div className="chats" style={{ overflow: "hidden", overflowY: "scroll", scrollBehavior: 'smooth',width: "100%", maxWidth: "100rem", height: "calc(100vh - 15rem)",  }}>
                            <div className='p-2 pt-3'>
                            
                                <div className='p-1 mb-1' style={{backgroundColor:'#EDEADE'}}>
                                  <p className='p-1'>Normalization in database with example</p>
                                </div>

                              <Card className='p-1' style={{backgroundColor:'lightblue '}}>
                                <Card.Body className='p-1'>
                                  <div className='rounded shadow d-flex gap-2 align-items-center' style={{backgroundColor:'#EDEADE'}}> 
                                    <div>
                                      <img className='p-1'  src={linkImg} width={70} height={70} alt="" />
                                    </div>
                                    <div className='pt-1'>
                                        <p className='mb-1'> DBMS Normalization : 1NF, 2NF, 3NF Database</p>
                                        <p className='mb-1' style={{color:'grey'}}>www.guru99.com</p>
                                    </div>
                                  </div>
                                  <div>
                                    <Button variant="link" >https://www.guru99.com/database-normalization.html</Button>
                                  </div>
                                </Card.Body>
                              </Card>
                            </div>

                            
                      </div>

                      
                      <div className="chatFooter" style={{ marginTop: "auto", width: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                          <div className="inp shadow p-2" style={{ backgroundColor: "#EEEEEE", display: "flex", alignItems: "center", borderRadius: "0.5rem", width: "50rem", margin: "8px" }}>
                              <input
                                type="text"
                                placeholder='Enter a topic'
                                value={topic}
                                onChange={handleTopicChange}
                                style={{
                                  backgroundColor: "transparent",
                                  border: "none",
                                  width: "calc(100% - 3rem)",
                                  height: "20px",
                                  outline: "none",
                                  marginRight: "0.5rem",
                                  flexGrow: 1,
                                  overflow: "hidden"
                                }}
                              />
                              <button className="send" style={{  border: "none" }}
                                    //    onClick={handleSendMessage}
                              >
                                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-send" viewBox="0 0 16 16">
                                    <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576zm6.787-8.201L1.591 6.602l4.339 2.76z"/>
                                  </svg>
                              </button>
                          </div>
                          <p className='pb-2' style={{ fontSize: "12px" }}>LearnEase may produce incorrect information about people, places or facts.</p>
                      </div>
                  </div>
              </div> 
              
          </div>
      
      </div>
    );
  }

export default Detective




