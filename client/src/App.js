import React, { useState, useEffect }  from 'react';
import axios from 'axios';
import CreditForm from './components/creditForm';
// Using Ant design for UI 
import 'antd/dist/antd.css';
import { Layout, Table, Typography, Divider } from 'antd';
const { Header, Content, Footer } = Layout;
const { Title } = Typography;
// This should go to constants with dynamic port
const apiUrl = 'http://localhost:3000/api/v1/cards/';


function App() {
  // initialize our state
  const [data, setData] = useState([]);


  useEffect(() => {
    async function fetchData() {
      const response = await axios(apiUrl);
      setData(response.data.data);
    }
    fetchData();
  }, []);

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Credit Number',
      dataIndex: 'cardNumber',
      key: 'credit_number',
    },
    {
      title: 'Balance',
      dataIndex: 'balance',
      key: 'balance',
    },
    {
      title: 'Limit',
      dataIndex: 'cardLimit',
      key: 'limit',
    },
  ];

  return (
    <Layout>
      <Header>
        <Title level={2} style={{ lineHeight: '64px', color: 'white' }}>Credit Card System</Title>
      </Header>
    <Content style={{ padding: '24px 48px' }}>
    <CreditForm state={{ data: [data, setData] }}/>
    <Divider />
    <Title level={4}>Exisiting Cards</Title>
    <Table dataSource={data} columns={columns} style={{background: 'white'}} rowKey={data._id} />
    </Content>
    <Footer style={{textAlign: 'center' }}>
      All right reserved 2019
    </Footer>
    </Layout>
  );
}

export default App;