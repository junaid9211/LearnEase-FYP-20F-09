// import React from 'react'
// import { Container } from 'react-bootstrap'
// import libImage from '../assets/images/libraryImg.svg'
// import { Link } from 'react-router-dom'
// const Library = () => {
//   return (
//     <Container className='mt-5 pt-5 '>
        
//         <h1 className=' pb-4'>Library</h1>
//         <div className='d-flex align-items-center'>
//             <Link to='/library-page' >
//                 <img src={libImage} width={150} height={150} alt="Library" />
//               </Link>
//               <button
//               className='d-inline-flex align-items-center border rounded p-3 justify-content-end ml-5 shadow' 
//               style={{ backgroundColor: 'lightgreen' }}
            
//               >
            
//                   <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" className="bi bi-plus-lg" viewBox="0 0 16 16">
//                       <path fill-rule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2"/>
//                   </svg>
            
//               </button>
            
//         </div>
        
//     </Container>
//   )
// }

// export default Library


import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import libImage from '../assets/images/libraryImg.svg';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import pdf from "../assets/images/pdfImg.svg";

const Library = () => {
    const [files, setFiles] = useState([]);

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        setFiles([...files, selectedFile]);
    };

    const openPDF = (file) => {
        const fileURL = URL.createObjectURL(file);
        window.open(fileURL, '_blank');
    };

    return (
        <div>
            <h1 className='pb-4 text-center'>Library</h1>
            <div className='d-flex align-items-center justify-content-center'>
                <Link to='/library-page'>
                    <img src={libImage} width={100} height={100} alt="Library" />
                </Link>
                <label htmlFor="file-upload" className='d-inline-flex align-items-center border rounded p-2 justify-content-end ml-3 shadow' style={{ backgroundColor: "cornflowerblue", cursor: "pointer" }}>
                    <input id="file-upload" type="file" style={{ display: "none" }} onChange={handleFileChange} />
                    <span> <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-plus-lg" viewBox="0 0 16 16">
                       <path fill-rule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2"/>
                   </svg></span>
                </label>
            </div>
            <div className="mt-3 d-flex flex-wrap justify-content-center">
                {files.map((file, index) => (
                    <Card key={index} style={{ width: '18rem', margin: "1rem" }}>
                        <Card.Img variant="top" src={pdf} style={{ height: '250px' }} />
                        <Card.Body>
                            <Card.Title>{file.name}</Card.Title>
                            <div className="d-flex justify-content-center">
                                <Button variant="primary" style={{ marginRight: "0.5rem" }} onClick={() => openPDF(file)}>Open</Button>
                                <Button variant="primary">Chat with PDF</Button>
                            </div>
                        </Card.Body>
                    </Card>
                ))}
            </div>
        </div>
    );
}

export default Library;