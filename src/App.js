import React, { Component } from 'react';
import logo from './logo.png';
import './App.css';
import {Navbar, NavLink, Card, Button, Form, Row, Col} from 'react-bootstrap';
import { render } from 'react-dom';

class App extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();

    let myHeaders = new Headers({
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'X-IBM-Client-Id': '12815b97b3478cb8f20464d9e3e3caa8'
    });

    let form = new FormData(document.getElementById('submit-form'));
    let body = {
      customer_details: {
        service_header: {
            brand: form.get('brand')
        },
        personal_details: {
          name_details: {
              first_name: form.get('firstName'),
              last_name: form.get('lastName')
          },
          contact_details: {
              phone: form.get('phone'),
              address: form.get('address')
          }
        }
      }
    }

    try {
      if(!body.customer_details.service_header.brand || !body.customer_details.personal_details.name_details.last_name || 
        !body.customer_details.personal_details.name_details.first_name || !body.customer_details.personal_details.contact_details.address || 
        !body.customer_details.personal_details.contact_details.phone)
        throw new Error('Please fill all the required fields!')

      let req = { method: 'POST',
                headers: myHeaders,
                body: JSON.stringify(body)
                };
      const url = 'https://test-gw-gateway-apic.itzroks-663002i36y-0nu5iv-6ccd7f378ae819553d37d5f2ee142bd6-0000.eu-de.containers.appdomain.cloud/sflocco/sandbox/customerdetails/customerDetails';

      var myRequest = new Request(url, req);

      fetch(myRequest).then((response) => {
        return response.json(); 
        }).then((json) => {
          if(json.status === 'success')
            alert("Customer's ID: " + json.customer_id);
          else alert("Server response: failure in retrieving customer's ID.");
        }).catch(error => {
          alert(error.message);
        });
      } catch(error) {
        alert(error.message);
      }
  }

  render() {
    return (
      <div className="App">
        <Navbar className="customNav" variant="light">
          <NavLink className="margin">
            <img
              alt=""
              src={logo}
              width="30"
              height="30"
              className="d-inline-block align-top"
            />
          </NavLink>
          <Navbar.Brand>
            Customer Origination App
          </Navbar.Brand>
        </Navbar>
        <Card className="cardStyle mx-auto" bg="light" border="dark">
          <Card.Body>
            <Card.Title>Customer information</Card.Title>
            <Card.Text>
              Fill all the input fields and send request
            </Card.Text>
            <Form id="submit-form">
              <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="3">
                  First Name
                </Form.Label>
                <Col sm="9">
                  <Form.Control type="text" placeholder="Enter customer's first name" id="firstName" name="firstName" required/>
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="3">
                  Last Name
                </Form.Label>
                <Col sm="9">
                  <Form.Control type="text" placeholder="Enter customer's last name" id="lastName" name="lastName" required/>
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="3">
                  Address
                </Form.Label>
                <Col sm="9">
                  <Form.Control type="text" placeholder="Enter customer's address" id="address" name="address" required/>
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="3">
                  Phone Number
                </Form.Label>
                <Col sm="9">
                  <Form.Control type="text" placeholder="Enter customer's phone number" id="phone" name="phone" required/>
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="3">
                  Brand
                </Form.Label>
                <Col sm="9">
                  <Form.Control type="text" placeholder="Enter brand to be inserted in the service header" id="brand" name="brand" required/>
                </Col>
              </Form.Group>
            </Form>
            <Button className="mt-2" variant="dark" onClick={this.handleSubmit}>Get customer's ID</Button>
          </Card.Body>
        </Card>
      </div>
    );
  }
}

export default App;
