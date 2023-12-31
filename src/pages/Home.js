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

// smtp details

const[host,setHost] = useState("");
const[username, setUsername] = useState("");
const[password, setPassword] = useState("");
const[port, setPort] = useState(0);
const[multiplebcc, setMultipleBcc] = useState([]);
const[textareainput, setTextAreaInput] = useState("");

function clearBcc(){
    setBcc("");

}



const Swal = require('sweetalert2')



function handleSubmit(e){
    e.preventDefault();

    const data = {
        
        "subject":subject,
        "message":content,
        "bccList":bccList,
        "host":host,
        "username":username,
        "port":port,
        "password":password
    };

    ///

    
  
  
      axios.post('https://testserver-gthi.onrender.com/api/send', data)
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


function handleTextAreaInput(e){
    e.preventDefault();

    const emails = textareainput.split(',');

    // Remove any leading/trailing whitespaces from email addresses
    const trimmedEmails = emails.map((email) => email.trim());

    // Filter out any empty email addresses
    const validEmails = trimmedEmails.filter((email) => email !== '');

    // Add new emails to the existing bccList
    setBccList((prevList) => [...prevList, ...validEmails]);

    // Clear the textarea after adding emails
    setTextAreaInput("");

}


function emptyBcc(e){
    e.preventDefault();

    setBccList([]);
    setTextAreaInput("");
}
    return (
       <div className='col-md-8 m-auto  main'>

            <div className='card bg-info text-light py-2 text-center'>
                <h4>Simple Node Mailer</h4>

            </div>


            <div className='form-div py-3'>

                <form onSubmit={handleSubmit}>

                

                <div className='smtpdiv'>

                    <h5>Set STMP Details Here</h5>

                    <div className='row'>
                            <div className='col-6 form-group'>
                                <label>SMTP Host</label>
                                
                                    <input type="text"onChange={function(e){
                                        setHost(e.target.value)
                                    }}value={host} className='form-control'required/>


                            </div>

                            <div className='col-6 form-group'>
                                <label>SMTP Username</label>
                                
                                    <input type="text"onChange={function(e){
                                        setUsername(e.target.value)
                                    }}value={username} className='form-control'required/>


                            </div>


                    </div>

                    <div className='row'>
                            <div className='col-6 form-group'>
                                <label>SMTP Password</label>
                                
                                    <input type="text"onChange={function(e){
                                        setPassword(e.target.value)
                                    }}value={password} className='form-control'required/>


                            </div>

                            <div className='col-6 form-group'>
                                <label>SMTP Port</label>
                                
                                    <input type="number"onChange={function(e){
                                        setPort(e.target.value)
                                    }}value={port} className='form-control'required/>


                            </div>


                    </div>


                </div>

                <hr/>
                        
              
                    <div className='form-group'>
                        

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
                        <label>Multiple Bcc</label>
                        <textarea value={textareainput} onChange={function(e){
                            setTextAreaInput(e.target.value);
                        }} placeholder='Enter Multiple Bcc here' className='form-control'>

                        </textarea>


                        <button onClick={handleTextAreaInput} className='btn btn-info py-2 font-weight-bold text-center text-light rounde '>Add Bcc</button> ||  <button onClick={emptyBcc} className='btn btn-danger py-2 font-weight-bold text-center text-light rounded '>Clear All BCC</button>
                        

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
                        subject && bccList && content && <button className='btn btn-info py-2 font-weight-bold text-center text-light rounde w-100'>Send Mail</button>
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