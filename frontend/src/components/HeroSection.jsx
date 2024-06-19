

import { Link } from "react-router-dom";
import robot from "../assets/images/robot-img.svg"
import  Button  from 'react-bootstrap/Button';
import { Cursor, useTypewriter } from "react-simple-typewriter";

function HeroSection() {
  const [text] = useTypewriter({
    words: ['chat with tutor bot', 'generate study plans', 'memorize better using flashcards', 'attempt quiz', 'summarize videos '],
    loop: true,
    typeSpeed: 100,
    deleteSpeed: 30,
  });
  return (
    <div className='container pt-4 mt-4'>
      <div className='row pt-4'>
        <div className='col col-lg-6 col-sm-12 p-4 ' >
            
            <h1 className='p-1 fw-bold' style={{fontSize:'80px', color:'#4074D2'}}><span className="text-dark">LEARN</span> EASE</h1>
            <h1 className='p-1 fw-bold' style={{fontSize:'44px'}}>YOUR STUDY <br/> COORDINATOR</h1>
            <h3 className='p-2 '>AI Tutor for Learners</h3>

            
            <div className='p-2 pb-4'>
                            <h5 style={{  color: "black"}}> With LearnEase, you can {" "}
                            <span className='text-success' style={{ fontWeight: "normal", fontSize: "30px"}}>
                                {text}
                            </span>
                            <span style={{color:"darkgreen"}}> <Cursor /> </span>
                            </h5>
                        </div>
           
            <Button className="m-2" as={Link} to="/signup">Get Started</Button>
        </div>
        <div className='col col-lg-6 col-sm-12' >
        <img
          height={450}
          className="d-block w-100 pt-4"
          src={robot}
          alt="hero"
        />
        </div>
      </div>

    </div>

  );
}

export default HeroSection;