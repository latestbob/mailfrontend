import React from 'react';
import { useState, useRef, useMemo } from 'react';
import JoditEditor from 'jodit-react';
import HTMLReactParser from 'html-react-parser';
import axios from 'axios';
import Swal from 'sweetalert2';





function Home(){
    const editor = useRef(null);
const [content, setContent] = useState('');
const[recipient_email,setRecipientEmail] = useState("");
const[subject,setSubject] = useState("");
const[bcc, setBcc] = useState("");

const[bccList, setBccList] = useState([]);

function clearBcc(){
    setBcc("");

}



const Swal = require('sweetalert2')



function handleSubmit(e){
    e.preventDefault();

    const data = {
        "email":recipient_email,
        "subject":subject,
        "message":content,
        "bccList":bccList,
    };


    
  
  
      axios.post('https://mymailer.onrender.com/api/send', data)
        .then((response) => {
          console.log('Email sent successfully:', response.data);
          if(response.status == 200){
            Swal.fire(
                'Email Sent!',
                `${response.data.message}`,
                'success'
              )

              setContent("");
              setRecipientEmail("");
              setSubject("");
          }
        })
        .catch((error) => {
          console.error('Error sending email:', error);
        });

    
}
    return (
       <div className='col-md-8 m-auto  main'>

            <div className='card bg-info text-light py-2 text-center'>
                <h4>Simple Node Mailer</h4>

            </div>


            <div className='form-div py-3'>

                <form onSubmit={handleSubmit}>

                <div className='form-group'>
                        <label>Recipient Email</label>
                        
                            <input type="text"onChange={function(e){
                                        setRecipientEmail(e.target.value)
                                    }} value={recipient_email} className='form-control'placeholder='Enter Recipient Email'required/>


                    </div>

                    <div className='form-group'>
                        <label>BCC Emails</label>
                        <div className='row'>
                            <div className='col-md-10'>
                            <input type="text"onChange={function(e){
                                        setBcc(e.target.value)
                                    }} value={bcc} className='form-control'placeholder='Enter Recipient Email'/>

                            </div>

                            <div className='col-md-2'>
                            <button onClick={function(e){
                                 e.preventDefault();
                                 if(bcc != ''){
                                setBccList([...bccList , bcc]);
                                 setBcc('');
                                 clearBcc()
                                 }
                            }} className='btn btn-info py-2 font-weight-bold text-center text-light rounde '>Add</button>
                            </div>

                        </div>

                        {bccList.map((list, index) => (
                        <p className='badge badge-info mx-1'key={index}>{list} <a  onClick={function(e){
                            e.preventDefault();
                            const updatedBcc = [...bccList];
                            updatedBcc.splice(index, 1);
                            setBccList(updatedBcc);
                            setBcc('');
                            clearBcc()
                        }}  className='symptomscancel text-light px-2 font-weight-bold'>x</a></p>
                    ))}

                    </div>


                    

                    
                    

                    <div className='form-group'>
                        <label>Subject</label>
                        <input type="text"onChange={function(e){
                            setSubject(e.target.value);
                        }}value={subject} className='form-control'placeholder='Enter Mail Subject'required/>

                    </div>

                    <div className='form-group'>
                    <label>Message</label>
                    <JoditEditor
                        ref={editor}
                        value={content}
                        // config={config}
                        tabIndex={1} // tabIndex of textarea
                        onBlur={newContent => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
                        onChange={newContent => {}}
                    />

                    </div>

                    <br/>

                    {
                        subject && recipient_email && content && <button className='btn btn-info py-2 font-weight-bold text-center text-light rounde w-100'>Send Mail</button>
                    }

                    

                </form>

            </div>

            <div className='output div py-2 px-3'>

                    {HTMLReactParser(content)}

            </div>




       </div>
    );
}

export default Home;