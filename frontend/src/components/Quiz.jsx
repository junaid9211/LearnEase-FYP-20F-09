

import React, { useState, useEffect } from 'react';
import { Button, Container, FloatingLabel, Form, Modal } from 'react-bootstrap';
import Navbars from './Navbar';
import data from '../data/quiz.json';

const Quiz = () => {
    const [quizData, setQuizData] = useState([]);

    useEffect(() => {
        // Shuffle options for each question
        const shuffledData = data.problem_list.map(quiz => ({
            ...quiz,
            options: shuffleArray([
                quiz.correct_answer,
                quiz.incorrect_answer1,
                quiz.incorrect_answer2,
                quiz.incorrect_answer3
            ])
        }));
        setQuizData(shuffledData);
    }, []);

    const [selectedAnswers, setSelectedAnswers] = useState(Array(data.problem_list.length).fill(null));
    const [showModal, setShowModal] = useState(false);
    const [marks, setMarks] = useState(0);

    const handleOptionChange = (questionIndex, selectedOption) => {
        const newSelectedAnswers = [...selectedAnswers];
        newSelectedAnswers[questionIndex] = selectedOption;
        setSelectedAnswers(newSelectedAnswers);

        
    };

    const calculateMarks = () => {
        let marks = 0;
        quizData.forEach((quiz, index) => {
            if (selectedAnswers[index] === quiz.correct_answer) {
                marks++;
            }
        });
        return marks;
    };

    const handleSubmit = () => {
        const unansweredQuestions = selectedAnswers.findIndex(answer => answer === null);
        if (unansweredQuestions !== -1) {
            // Show alert or message indicating unanswered questions
            alert(`Please answer question ${unansweredQuestions + 1}`);
            return;
        }

        const marks = calculateMarks();
        setMarks(marks);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    // Function to shuffle an array
    const shuffleArray = (array) => {
        const shuffledArray = [...array];
        for (let i = shuffledArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
        }
        return shuffledArray;
    };

    return (
        <div>
            <Navbars />
            <Container className='text-center pt-5 mt-5 pb-5'>
            <div className='d-flex justify-content-center gap-2 '>
                    {/* <FloatingLabel
                        controlId="floatingInput"
                        label="Topic Name"
                        className=""
                    >
                        <Form.Control type="email" placeholder="name@example.com" />
                    </FloatingLabel>{" "} */}
                    <Button className='' variant="outline-dark" size='sm'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-plus" viewBox="0 0 16 16">
                            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
                        </svg>
                        Import
                    </Button>
                </div>
                <Button className=' m-3' variant="outline-secondary">Generate Quiz</Button>

                <div className='shadow rounded p-4 mt-3 text-start' style={{ backgroundColor: "#EEEEEE" }}>
                    {quizData.map((quiz, index) => (
                        <div className='p-2 pb-3' key={index}>
                            <p><span>{index + 1}</span> . {quiz.question}</p>
                            <Form className=''>
                                {quiz.options.map((option, optionIndex) => (
                                    <Form.Check
                                        key={optionIndex}
                                        type='radio'
                                        id={`option-${optionIndex}`}
                                        name={`question-${index}`}
                                        label={option}
                                        value={option}
                                        checked={selectedAnswers[index] === option}
                                        onChange={() => handleOptionChange(index, option)}
                                    />
                                ))}
                            </Form>
                        </div>
                    ))}
                </div>
                {quizData.length > 0 && (
                    <div className='d-flex justify-content-end mt-3'>
                        <Button className='m-2' variant='success' onClick={handleSubmit}>Submit</Button>
                    </div>
                )}
            </Container>

            <Modal className='' show={showModal} onHide={handleCloseModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title className=''>Your Marks</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>You scored {marks} marks.</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};




const QuizSidebar = () => {
    return (
      <div  className='m-4 pt-5 mt-5'>
          <Container className=' shadow rounded' style={{minHeight:'100vh', backgroundColor:'#6495ED'}}>
              <h4 className='pt-3 text-white'>Generate Summary</h4>
              <Form.Floating className="mb-2 wrap">
                  <Form.Control
                  id="floatingInputCustom"
                  type="link"
                  placeholder="https://www.youtube.com"
                  />
                  <label htmlFor="floatingInputCustom">
                      Search
                      
                      </label>
                  
              </Form.Floating>
  
              <div className='p-2 pt-4'>
                  <h5 className='font-bold'>Summaries</h5>
                  <div className='mt-4' >
                      <p className='p-2 mb-1 border rounded bg-white'>Lorem ipsum dolor sit amet . </p>
                      <p className='p-2 mb-1 border rounded bg-white'>Lorem ipsum dolor sit amet . </p>
                      <p className='p-2 mb-1 border rounded bg-white'>Lorem ipsum dolor sit amet . </p>
                  </div>
              </div>
          </Container>
      </div>
    )
  }
  
  
export  {Quiz, QuizSidebar};

