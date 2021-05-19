import React, {useState, useEffect, useRef} from 'react';


import { API } from 'aws-amplify';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form'

import './List.css';
import { Spinner } from 'react-bootstrap';


const ListComponent = props => {

    useEffect(() => {
      }, []);

    const getSingleNews = (elem, index) => {
        return (
            <>
                <Col sm={2}>{elem.title}</Col>
                <Col sm={2}>{elem.category}</Col>
                <Col sm={2}>{elem.author}</Col>
                <Col sm={6} className="text-truncate">{elem.text}</Col>
            </>
            
        )
    }
    //const result = await Storage.put('test.txt', 'Hello');
    return (
        <div className="mb-5">
            <h3>News in the DB</h3>
            <Row className="text-muted border-bottom">
                <Col sm={2}>Title</Col>
                <Col sm={2}>Category</Col>
                <Col sm={2}>Author</Col>
                <Col sm={6}>Title</Col>
            </Row>
            {props.news.map((elem, index) => <Row className="mt-2" key={"el" + index}>{getSingleNews(elem, index)}</Row>)}
        </div>
    );
}

export default ListComponent;