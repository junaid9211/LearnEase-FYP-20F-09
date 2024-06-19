import React, { useState } from 'react';
import { Container, FloatingLabel, Form, Button, Modal, Carousel } from 'react-bootstrap';
import parrot from '../assets/images/parrot.png';
import Navbars from './Navbar';
import AddCards from './AddCards';
import card from '../data/cards.json'

const FlashCards = () => {
    const [showModal, setShowModal] = useState(false);

    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    const [cardItems, setCardItems] = useState([
        {
            image: parrot,
            title: 'Biology',
            description: 'Card Description'
        },
        {
            image: parrot,
            title: 'Card Title',
            description: 'Card Description'
        }
    ]);

    const handleCreateCard = (newCard) => {
        setCardItems([...cardItems, newCard]);
        handleCloseModal(); // Close the modal after creating the card
    };


    return (
        <div>
            <Navbars/>
            <Container className='pt-5 mt-5'>
                <div className='p-2'>
                    <h1 className='fw-bold'>Flash Cards</h1>
                    <p style={{ color: 'darkgrey' }}>Memorize things faster with AI-powered card sets</p>
                </div>
                <div className='d-flex justify-content-between p-2'>
                    <FloatingLabel
                        controlId="floatingInput"
                        label="Search Flashcards"
                        className="mb-2"
                    >
                        <Form.Control type="text" placeholder="Search Flashcards" />
                    </FloatingLabel>
                    <div>
                        <Button className='' size={"lg"} variant="primary" onClick={handleShowModal}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-plus" viewBox="0 0 16 16">
                                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"/>
                            </svg>
                            New Set
                        </Button>

                        <Modal 
                        show={showModal} 
                        onHide={handleCloseModal} 
                        backdrop="static"
                        keyboard={false} 
                        centered
                        >
                            
                            <Modal.Body>
                                <AddCards onCreateCard={handleCreateCard}  handleClose={handleCloseModal}/>
                            </Modal.Body>
                        </Modal>
                    </div>
                </div>
                <div className='p-2 pt-4'>
                    {
                        cardItems.map((card, index) => (
                            <div key={index} className='shadow rounded d-flex justify-content-between border align-items-center m-3 mb-4'>
                                <div className='d-flex gap-2 pt-2'>
                                    <div className=''>
                                        <img src={card.image} width={40} height={40} alt="" />
                                    </div>
                                    <div>
                                        <h4>{card.title}</h4>
                                        <p>{card.description}</p>
                                    </div>
                                </div>

                                <div>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-three-dots-vertical" viewBox="0 0 16 16">
                                        <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0"/>
                                    </svg>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </Container>
            <Cards/>
        </div>
    );
}

const Cards=()=>{
    const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

    return(
        
        <Container className='text-center'>
        <h1>Biology</h1>
        <Carousel className='mb-4 shadow rounded mt-4' activeIndex={index} onSelect={handleSelect} data-bs-theme="dark">
        
            {card.map((card, index) => (
                <Carousel.Item className='' style={{height:"70vh"}}>
                    <div className='d-flex align-items-center justify-content-center mt-5' >
                        <div  className='mt-5'>
                            
                    <h1 className='mt-5'>{card.heading}</h1>
                    <p>
                        {card.content}
                    </p>
                    
                        </div>
                    </div>
                </Carousel.Item>
                
            ))}
            </Carousel>
        </Container>

       
    )
}

export  {FlashCards};


