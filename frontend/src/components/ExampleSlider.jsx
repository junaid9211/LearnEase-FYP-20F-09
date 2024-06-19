import { Carousel, Container } from 'react-bootstrap'
import React from 'react'
import ss1 from '../assets/images/ss1.png'
import ss2 from '../assets/images/ss2.png'
import ss3 from '../assets/images/ss3.png'
import ss4 from '../assets/images/ss4.png'
import ss5 from '../assets/images/ss5.png'
const ExampleSlider = () => {

    const examples=[
        {
            title:"chatbots",
            ss:ss5
        },
        {
            title:"chatbots",
            ss:ss1
        },
        {
            title:"chatbots",
            ss:ss2
        },
        {
            title:"chatbots",
            ss:ss3
        },
        {
            title:"summary",
            ss:ss4
        }
    ]
  return (
    <Container >
       <div className='p-4 mt-4 text-center'>
            <h1 className='text-center fw-bold' style={{fontSize:'48px'}}>SEE, <span className='text-success'>HOW IT WORKS</span></h1>
            <Carousel>
                {
                    examples.map((example)=>{
                        return(
                            <Carousel.Item interval={1000}>
                            <img
                            className=""
                            src={example.ss} // Use imported image
                            height={400}
                            alt="First slide"
                            />
                            <Carousel.Caption>
                            {/* <h3 className='text-black'>{example.title}</h3> */}
                            
                            </Carousel.Caption>
                        </Carousel.Item>
                        )
                    })
                }
                
               
            </Carousel>
       </div>
    </Container>
  )
}

export default ExampleSlider
