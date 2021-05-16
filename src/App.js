import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Amplify, { Storage } from 'aws-amplify';
import { AmplifyAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {FormComponent} from './form-component';
import './App.css'

import awsconfig from './aws-exports';

Amplify.configure(awsconfig);

const App = () => (
  <AmplifyAuthenticator>
    <div className="page mt-5">
       <Container className="h-100 flex-column">
              <Row className="flex-fill">
        <Col>
          <FormComponent />
        </Col>
      </Row>
      <Row>
        <Col className="mx-auto" sm={2}><AmplifySignOut /></Col>
      </Row>
    </Container>
    </div>
   
  </AmplifyAuthenticator>
);

export default App;