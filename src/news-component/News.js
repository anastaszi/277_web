import React, {useState, useEffect, useRef} from 'react';


import { Storage, API, Auth } from 'aws-amplify';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form'

import './News.css';
import { Spinner } from 'react-bootstrap';
import { ListComponent } from '../list-news';
import { FormComponent } from '../form-component';

const NewsComponent = props => { 
    const [news,setNews] = useState([])       

    useEffect(() => {
        update()
      }, []);

    const update = () => {
        const apiName = 'fashionapi';
        const path = '/news';
    
        API.get(apiName, path).then((res) => {console.log(res) 
            setNews(res.data.Items.sort((a,b)=> a.dateCreated < b.dateCreated ? 1 : -1))});
    }
    return (
        <>
            <FormComponent update={update}/>
            <ListComponent news={news}/>
        </>
    );
}

export default NewsComponent;