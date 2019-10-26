import React, { Fragment, useState, useEffect }  from 'react';
import axios from 'axios';
import { Normalize } from 'styled-normalize'
import styled, { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    font-family: sans-serif;
    width: 900px;
    margin: 0 auto;
  }
  table {
    width: 100%;
    border: 1px solid #333;
    border-collapse: collapse;
    th,
    td {
      border: 1px solid black;
      border-collapse: collapse;
    }
    th,
    td,
    tr {
      padding: 12px;
    }
    tr:nth-child(even) {
      background-color: #f2f2f2;
    }
    th {
      text-align: left;
    }
  }
`;

const Form = styled.div`
  background: #eee;
  padding: 18px;
  border-radius: 6px;
  margin-bottom: 24px;
`;

const Formgroup = styled.div`
  margin-bottom: 1rem;
  label {
    display: inline-block;
    margin-bottom: .5rem;
  }
`

const Input = styled.input`
  display: block;
  height: calc(1.5em + .75rem + 2px);
  padding: .375rem .75rem;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #495057;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #ced4da;
  border-radius: .25rem;
  min-width: 250px;
`;

const Button = styled.button`
  background-color: #007bff;
  border-color: #007bff;
  display: inline-block;
  color: #fff;
  text-align: center;
  vertical-align: middle;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  padding: .375rem .75rem;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  font-size: 1rem;
  line-height: 1.5;
  border-radius: .25rem;
  min-width: 250px;
`;


const apiUrl = 'http://localhost:3000/api/v1/users/';

function App() {
  // initialize our state
  const [data, setData] = useState([]);
  const [name, setName] = useState();
  const [cardNumber, setCardNumber] = useState();
  const [cardLimit, setCardLimit] = useState();

  useEffect(() => {
    async function fetchData() {
      const response = await axios(apiUrl);
      setData(response.data.data);
    }

    fetchData();
  }, []);


  const addCardData = () => {
      axios.post(apiUrl, {
        name,
        cardNumber,
        limit: cardLimit
      })
      .catch(function (error) {
        console.log(error.response.data.description);
      });
  }

  return (
    <Fragment>
      <Normalize />
      <GlobalStyle />
      <h1>Credit Card System</h1>
      <h3>Add Credit Details</h3>
      <Form>
        <Formgroup>
          <label>Name</label>
          <Input
            type="text"
            onChange={e => setName( e.target.value )}
            placeholder="Credit card holder name"
            style={{ width: '200px' }}
          />
        </Formgroup>
        <Formgroup>
          <label>Card Number</label>
            <Input
            type="number"
            onChange={e => setCardNumber( e.target.value )}
            placeholder="Credit card Number"
            style={{ width: '200px' }} />
        </Formgroup>
        <Formgroup>
          <label>Card Number</label>
            <Input
            type="number"
            onChange={e => setCardLimit( e.target.value )}
            placeholder="Credit card limit"
            style={{ width: '200px' }}
          />
        </Formgroup>
        <Button onClick={() => addCardData()}>
          ADD
        </Button>
      </Form>

    <h2>Exisiting Cards</h2>
    <table>
      <tbody>
        <tr>
          <th> Name </th>
          <th> Card Number </th>
          <th> Balance</th>
          <th> Limit</th> 
        </tr>
        {data && data.length <= 0
          ? <tr><td colSpan={4}>Add Credit details to show up here</td></tr>
          : data.map((card) => (
            <tr key={card._id}>
                <td> {card.name} </td>
                <td> {card.cardNumber} </td>
                <td> {card.balance} </td>
                <td> {card.limit} </td> 
            </tr>
            ))}
        </tbody>
      </table>
    </Fragment>
  );
}

export default App;