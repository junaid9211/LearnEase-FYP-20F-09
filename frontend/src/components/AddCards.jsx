import React from 'react'
import { FloatingLabel } from 'react-bootstrap/esm'
import { Button,  Container, Form } from 'react-bootstrap'
import { useState } from 'react';

const AddCards = ({onCreateCard,handleClose}) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleCreate = () => {
        // Create a new flashcard set object
        const newFlashcardSet = {
            title: title,
            description: description,
            // Add other properties if needed
        };

        // Call the onCreate function passed from the parent component
        onCreateCard(newFlashcardSet);

        // Reset the input fields
        setTitle('');
        setDescription('');
    };


  return (
    <div className='item-center'>
        
      <Container className=" mt-5 mb-4">
        <h3 className='pb-3'>New Flashcard Set</h3>
        <FloatingLabel
            controlId="floatingInput"
            label="Title"
            className="mb-3"
            
        >
            <Form.Control type="text" placeholder="title" onChange={(e) => setTitle(e.target.value)}  />
        </FloatingLabel>
        <FloatingLabel
            controlId="floatingInput"
            label="Description"
            className="mb-3"
            
        >
            <Form.Control type="text" placeholder="description" onChange={(e) => setDescription(e.target.value)}/>
        </FloatingLabel>

        <div className='p-2 border rounded d-flex gap-4 align-items-center mb-3'>
            <p>Cover Image</p>
            <Button variant='link'>
                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-paperclip" viewBox="0 0 16 16">
                     <path d="M4.5 3a2.5 2.5 0 0 1 5 0v9a1.5 1.5 0 0 1-3 0V5a.5.5 0 0 1 1 0v7a.5.5 0 0 0 1 0V3a1.5 1.5 0 1 0-3 0v9a2.5 2.5 0 0 0 5 0V5a.5.5 0 0 1 1 0v7a3.5 3.5 0 1 1-7 0z"/>
                </svg>
            </Button>
        </div>
        <div className='d-flex justify-content-between'>
            <Button variant="secondary" onClick={handleClose}>Cancel</Button>
            <Button variant="primary" onClick={handleCreate}>Create</Button>{' '}
        </div>
      </Container>
    </div> 
  )
}

export default AddCards
