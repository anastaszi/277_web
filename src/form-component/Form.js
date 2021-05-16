import React, {useState, useEffect, useRef} from 'react';
import bsCustomFileInput from 'bs-custom-file-input';


import { Storage, API, Auth } from 'aws-amplify';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form'

import './Form.css';


const FormComponent = props => {
    const [title, setTitle] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);
    const [text, setText] = useState("")
    const formRef = useRef(null);
    const [option, setOption] = useState(null);
    const [options, setOptions] = useState(["Choose Category", "Blockchain", "ML", "AR", "BigData", "ComputerVision"]);


    useEffect(() => {
        bsCustomFileInput.init();
      }, []);

      const updateOption = (e) => {
        setOption(e.target.value)
      }

    const onSubmit = (event) => {
        let name = uuidv4();
        submitFile(name).then(res => {
            postData(process.env.REACT_APP_CLOUDFRONT + name).then((res)=> console.log(res)).catch(e => console.log(e));
            console.log(process.env.REACT_APP_RESTAPI + name)
        }).
        catch(e => console.log(e));
        console.log(title);
        console.log(text);
        event.preventDefault();
        formRef.current.reset();
    }

    const createItem = (img) => {
        let item = {
            title: title,
            author: "Anastasia",
            category: option, 
            imgurl: img, 
            text: text
        }
        return axios.put(process.env.REACT_APP_RESTAPI+'/news', item);
    } 

    async function postData(img) { 
        let data =  {
            title: title,
            author: "Anastasia",
            category: option, 
            imgurl: img, 
            text: text
        }
        const apiName = 'fashionapi';
        const path = '/populate';
        const myInit = { 
          headers: { 
            Authorization: `Bearer ${(await Auth.currentSession()).getIdToken().getJwtToken()}`,
          },
          body: data
        };
    
        return await API.put(apiName, path, myInit);
    }


    const submitFile = (name) => {
        return Storage.put(name, selectedFile, { contentType: 'image/png'});
    }
    //const result = await Storage.put('test.txt', 'Hello');
    return (
        <>
            <h2>Enter info:</h2>
            <Form ref={formRef}>
                <Form.Group controlId="title">
                    <Form.Label>Title</Form.Label>
                    <Form.Control placeholder="Enter title" 
                    onChange={(e) => setTitle(e.target.value)}
                    />
                </Form.Group>

                <Form.Group controlId="categories">
                    <Form.Label>Category</Form.Label>
                    <Form.Control as="select" onChange={updateOption} className="mb-2">
                        {options.map(elem => <option>{elem}</option>)}
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId="details">
                    <Form.Label>Text</Form.Label>
                    <Form.Control placeholder="Enter Text" as="textarea" row={4}
                    onChange={(e) => setText(e.target.value)}/>
                </Form.Group>



                <Form.Group controlId="formBasicPassword">
                    <Form.File 
                        id="custom-file"
                        label="Custom file input"
                        custom
                        accept="png"
                        onChange={(e) => setSelectedFile(e.target.files[0])}
                    />
                </Form.Group>
                <Row>
                    <Col sm={"auto"} className="ml-auto">
                    <Button variant="info" size="lg" onClick={onSubmit}>
                        Submit
                    </Button>
                    </Col>

            </Row>
            </Form>
        </>
    );
}

export default FormComponent;