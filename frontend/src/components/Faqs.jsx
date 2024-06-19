import React from 'react'
import { Accordion, Col, Container, Row } from 'react-bootstrap'
import faqimg from "../assets/images/faqs-img.svg"
import NavLanding from "./NavLanding";

const Faqs = () => {
  return (
      <>
          <NavLanding />
          <Row className='p-4'> </Row>
          <Row className='p-4'> </Row>
          <Row className='p-4'> </Row>
          <Row className='p-4'> </Row>
    <Container >
        <Row className='p-4'>
        <Col lg={6} md={6} sm={12}>
            <h1 className='p-2 mb-4'>FAQs</h1>
            <Accordion>
                <Accordion.Item eventKey="0">
                    <Accordion.Header className='' style={{fontSize:'30px'}}><strong>How does LearnEase work?</strong></Accordion.Header>
                    <Accordion.Body>
                        LearnEase uses large language model (LangChain) integrated with chat gpt api to generate personalized results.
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                <Accordion.Header><strong>How is LearnEase different from ChatGPT?</strong></Accordion.Header>
                <Accordion.Body>
                    Our tutor bot,Learnease, gives tailored responses to enhance learner's productivity. It is different from ChatGPT in a number of ways.
                     For instance, it generates summary by taking video link as input, helps user in memorizing by offering a feature called Flashcards, and help them keep a track of their scedule by providing a study paln as per their requirements.
                </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="2">
                    <Accordion.Header><strong>Who can use LearnEase?</strong></Accordion.Header>
                    <Accordion.Body>
                    The LearnEase app caters to students from various educational levels and lifelong learners, providing comprehensive support with homework, assignments, and specialized subjects. It offers real-time explanations and interactive assistance, making it invaluable for anyone seeking to enhance their learning experience and deepen their understanding beyond traditional resources.
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="3">
                    <Accordion.Header><strong>Is LearnEase free?</strong></Accordion.Header>
                    <Accordion.Body>
                        No, as it uses GPT-4 api so it is not free for now.
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </Col>

            <Col lg={6} md={6} sm={12}>
                <img
                    height={350}
                    className="d-block w-100"
                    src={faqimg}
                    alt="hero"
                />
            </Col>
        </Row>
    </Container>
      </>

  )
}

export default Faqs;
