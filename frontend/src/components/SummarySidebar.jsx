import React from 'react'
import { Form } from 'react-bootstrap'
import { Container } from 'react-bootstrap'

const SummarySidebar = () => {
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




export default SummarySidebar

