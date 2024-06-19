import React from 'react'
import { Button, Card, Col, Container, Modal, Row } from 'react-bootstrap'
import chat from "../assets/images/chatImg.svg"
import flashcards from "../assets/images/flashcard.svg"
import quizImg from "../assets/images/quizImg.svg";
import ideaImg from "../assets/images/idea.svg";
import pdfImg from "../assets/images/pdfImg.svg"
import { Link } from 'react-router-dom';
import activity from "../assets/images/activity.svg"
//import { Link } from 'react-router-dom';

function Bot({showModal, handleCloseModal}) {

    const botInfo=[
        {
            image:chat,
            title:"Tutor Bot",
            link:'/tutor-bot'
        },
        {
            image:quizImg,
            title:"Quizes",
            link:'/quizes'
        },
        {
            image:flashcards,
            title:"FlashCard",
            link:'/flashcards'
        },
        {
            image:ideaImg,
            title:"Summarize",
            link:'/summary'
        },
        
        {
            image:pdfImg,
            title:"Chat Pdf",
            link:'/chatwithpdf'
        },
        {
            image:activity,
            title:"Detective",
            link:'/detective'
        }
         
    ]
   return (
    <Modal 
    show={showModal} 
    onHide={handleCloseModal} 
    backdrop="static"
    keyboard={false}
    >
        <Modal.Header closeButton>
            <Modal.Title>LearnEase BOTS</Modal.Title>
        </Modal.Header>
        <Modal.Body className="grid-example">
            <Container>
                <Row>
                    {showModal && botInfo.map((bot, index) => (
                        <Col key={index} lg={3} md={6} sm={12} className='m-2 text-center'>
                            <Link to={bot.link} className="text-decoration-none">
                                <Card className='shadow' style={{ width: '8rem',  height:"10rem" }}>
                                    <Card.Img className='pt-2' variant="top" width={80} height={80} src={bot.image} /> 
                                    <Card.Body >
                                        <Card.Title className='pb-2'>
                                            
                                            <Button variant="outline-secondary">{bot.title} </Button>
                                        </Card.Title>
                                    </Card.Body>
                                </Card>
                                </Link> 
                        </Col>
                    ))}
                </Row>
            </Container>
        </Modal.Body>
        
    </Modal>
    
  )
}

export default Bot
