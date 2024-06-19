// import React from 'react'


// import { Link } from 'react-router-dom';
// import { useState } from 'react';
// import { Button, Form, Row, Col, Alert, Container } from 'react-bootstrap';
// import Axios from 'axios';
// //import parrot from '../assets/images/parrot.png';
// import { css } from '@emotion/react';
// import { RingLoader } from 'react-spinners';
// const override = css`
//   display: block;
//   margin: 0 auto;
//   border-color: red;
// `;

// const Summarize = () => {
    
// const [youtubeUrl, setYoutubeUrl] = useState('');
// const [response, setResponse] = useState(null);
// const [error, setError] = useState('');
// const [loading, setLoading] = useState(false);

// const handleProcessVideo = () => {
//   setLoading(true); // Show loader
//   setResponse(null); // Clear previous response
//   setError(''); // Clear previous error

//   // Simulating API call delay
//   setTimeout(() => {
//     Axios.post('http://localhost:5000/generate-summary', { youtube_link: youtubeUrl })
//       .then((res) => {
//         setResponse(JSON.stringify(res.data));
//         setError('');
//       })
//       .catch((err) => {
//         setError(err.response ? err.response.data.error : 'An error occurred');
//       })
//       .finally(() => {
//         setLoading(false); // Hide loader
//       });
//   }, 2000); // Simulated delay of 2 seconds
//   };
//   return (
//     <div>
//         {!loading ? ( 
//         <Container className='pt-5 mt-5'>
//             <div className='text-center'>
               
//                <Form.Floating className="mb-3 wrap">
//                     <Form.Control
//                     id="floatingInputCustom"
//                     type="link"
//                     placeholder="https://www.youtube.com"
//                     value={youtubeUrl}
//                     onChange={(e)=>setYoutubeUrl(e.target.value)}
//                     />
//                     <label htmlFor="floatingInputCustom">Add Link</label>
//                 </Form.Floating>
//                 <Button  variant="primary" size="lg" onClick={handleProcessVideo}>
//                     Summarize
//                 </Button>
//                 </div> 
//                 </Container>
//             ) : ( // Show loader when loading
//           <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
//             <RingLoader color={'#36D7B7'} loading={loading} css={override} size={150} />
//             <p>Loading...</p>
//           </div>
//         )}
//         {response && <Alert variant="success" className="mt-3">{response}</Alert>}
//         {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
        
//             </div>
//   )
// }



// const SummaryResult=()=>{
//     return(
//         <div>
//             <div className=' p-4 mt-3 pb-5 mb-4'>
//                 <div className='m-4'>
//                     <h2 className='mb-4'>Deobfuscating and Analyzing JavaScript Malware</h2>
//                     <div className='d-flex'>
//                         <p>Video:</p>
//                         <Link> www.google.com</Link>
//                     </div>    
//                 </div>   
//                 <div className='m-4'>
//                     <h4 className='mb-4'>Summary : </h4>
                    
//                     <p className='mb-4'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed et doloremque tempora, dolore laudantium excepturi perspiciatis quos libero neque amet, repellendus rem consequatur quae accusantium at provident non, dolores pariatur.</p>
//                  </div>  
//                  <div className='m-4'>
//                     <h4 className='mb-4'>Main Points : </h4>
                    
//                     <p className='mb-4'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed et doloremque tempora, dolore laudantium excepturi perspiciatis quos libero neque amet, repellendus rem consequatur quae accusantium at provident non, dolores pariatur.</p>
//                  </div>   
//             </div>
//         </div>
//     );
// }


// const SummaryLoading=()=>{
    
//     return(
//         // <Container className="d-flex align-items-center justify-content-center vh-100">
//         // <div className="p-5 text-center">
//         //   <div className="spinner-border text-primary" role="status">
//         //     <span className="visually-hidden">Loading...</span>
//         //   </div>
//         //   <p className="mt-2">Loading...</p>
//         // </div>
//         // </Container>
//         <div></div>
//     )
// }
// export  {Summarize, SummaryResult, SummaryLoading};




import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Form, Alert, Container } from 'react-bootstrap';
import Axios from 'axios';
import { css } from '@emotion/react';
import { RingLoader } from 'react-spinners';
import result from '../data/summary.json'
const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

const Summarize = () => {
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [response, setResponse] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showSummary, setShowSummary] = useState(true); // New state variable to control the visibility of summary

  const handleProcessVideo = () => {
    setLoading(true);
    setResponse(null);
    setError('');

    setTimeout(() => {
      Axios.post('http://localhost:5000/generate-summary', { youtube_link: youtubeUrl })
        .then((response) => {
          setResponse(JSON.stringify(response.data));
          setShowSummary(true); // Show summary after loading
          setError('');
        })
        .catch((err) => {
          setError(err.response ? err.response.data.error : 'An error occurred');
        })
        .finally(() => {
          setLoading(false);
        });
    }, 2000);
  };

  return (
    <div>
      {!loading ? (
        <Container className='pt-5 mt-5'>
          <div className='text-center'>
            <Form.Floating className='mb-3 wrap'>
              <Form.Control
                id='floatingInputCustom'
                type='link'
                placeholder='https://www.youtube.com'
                value={youtubeUrl}
                onChange={(e) => setYoutubeUrl(e.target.value)}
              />
              <label htmlFor='floatingInputCustom'>Add Link</label>
            </Form.Floating>
            <Button variant='primary' size='lg' onClick={handleProcessVideo}>
              Summarize
            </Button>
          </div>
        </Container>
      ) : (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
          <RingLoader color={'#36D7B7'} loading={loading} css={override} size={150} />
          <p>Loading...</p>
        </div>
      )}
      {/* {showSummary && response && <SummaryResult response={response} />} */}
      {showSummary && <SummaryResult  />}
      {error && <Alert variant='danger' className='mt-3'>{error}</Alert>}
    </div>
  );
};

const SummaryResult = () => {
  // Parse response if needed
  //const summaryData = JSON.parse(response);
  //console.log(summaryData)
  return (
    <div>
      <div className=' p-4 mt-3 pb-5 mb-4 shadow rounded'>
        <div className='m-4'>
          <h2 className='mb-4'>{result.title}</h2>
          <div className='d-flex'>
            <p>Video:</p>
            <Link to={result.videoLink}> {result.videoLink}</Link>
          </div>
        </div>
        <div className='m-4'>
          <h4 className='mb-4'>Summary : </h4>
          <p className='mb-4'>{result.summary}</p>
        </div>
        <div className='m-4'>
          <h4 className='mb-4'>Main Points : </h4>
          {result.mainPoints.map((point, index) => (
            <ul>
              <li><p key={index} className='mb-2'>{point}</p></li>
            </ul>
          ))}
        </div>
      </div>
    </div>
  );
};

export { Summarize };
