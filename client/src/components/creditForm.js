
import React, {  useState }  from 'react';
import axios from 'axios';
import { Form, Input, Button, Typography } from 'antd';
const { Title } = Typography;

function CreditForm (props) {
  //const [data, setData] = useState([]);
  const [fields, setFields] = useState();
  const [fieldsError, setFieldsError] = useState({ name: "", cardNumber: "", cardLimit: "" });
  const [fieldsErrorMsg, setFieldsErrorMsg] = useState({ name: "", cardNumber: "", cardLimit: "" });
  const [submitDisabled, setSubmitDisabled ] = useState(true);
  const [formError, setFormError] = useState(false);
  
  const { data: [data, setData] } = { data: useState(0), ...(props.state || {}) };

  console.log("TCL: CreditForm -> props.state", props.state)
  console.log("TCL: CreditForm -> data", data)

  const formItemLayout = { labelCol: { span: 4 }, wrapperCol: { span: 14 }, labelAlign: 'left'}
  const buttonItemLayout = {  wrapperCol: { span: 14, offset: 4 }}


  const addCardData = async() => {
    const cardItem = {
      ...fields,
      balance: 0
   }
    try {
      await axios.post('http://localhost:3000/api/v1/cards/', fields);
      setData([...data, cardItem]);
    } catch(err){
        setFormError(err.response.data.description);
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFieldsError({...fieldsError, [name]: "" });
    setFieldsErrorMsg({...fieldsError, [name]: "" })
    setFormError("");
    setFields({...fields, [name]: value});
  }

  const validateField = (e) => {
    const { name, value } = e.target;
    if(name === 'name'){
      if(value.length < 1){
        setFieldsError({...fieldsError, [name]: "error" });
        setFieldsErrorMsg({...fieldsError, [name]: "Name Field is required" });
      } else if(value.length < 4){
        setFieldsError({...fieldsError, [name]: "error" });
        setFieldsErrorMsg({...fieldsError, [name]: "Name Field is too short" });
      } 
    }
    if(name === 'cardNumber'){
      if(value.length < 1){
        setFieldsError({...fieldsError, [name]: "error" });
        setFieldsErrorMsg({...fieldsError, [name]: "Card Number is required" })
      } else if(value.length < 14){
        setFieldsError({...fieldsError, [name]: "error" });
        setFieldsErrorMsg({...fieldsError, [name]: "Card Number is too short!" })
      } else if(value.length > 19){
        setFieldsError({...fieldsError, [name]: "error" });
        setFieldsErrorMsg({...fieldsError, [name]: "Card Number is too long!" })
      } else if(!LuhanCheck(value)){
        setFieldsError({...fieldsError, [name]: "error" });
        setFieldsErrorMsg({...fieldsError, [name]: "Card Number is Wrong!" })
      } 
    }
    if(name === 'cardLimit'){
      if(value.length === 0 ){
        setFieldsError({...fieldsError, [name]: "error" });
        setFieldsErrorMsg({...fieldsError, [name]: "Card Limit is required" })
      } 
    }
    setSubmitDisabled(false);
  }


const LuhanCheck = num => {
  let Arr = (num + '').split('').reverse().map(n => parseInt(n));
  let lastChar = Arr.splice(0, 1)[0];
  let total = Arr.reduce((acc, val, i) => (i % 2 !== 0 ? acc + val : acc + ((val * 2) % 9) || 9), 0);
  total += lastChar;
  return total % 10 === 0;
}

  return (
    <Form layout={'horizontal'} >
      <Title level={4}>Add Credit Details</Title>
      <Form.Item required label="Name" {...formItemLayout} validateStatus={fieldsError.name}  help={fieldsErrorMsg.name}>
        <Input name="name"  onBlur={validateField} onChange={handleInputChange}/>
      </Form.Item>
      <Form.Item required label="Card Number" {...formItemLayout} validateStatus={fieldsError.cardNumber}  help={fieldsErrorMsg.cardNumber}>
        <Input name="cardNumber"  onBlur={validateField} onChange={handleInputChange}type="number"/>
      </Form.Item>
      <Form.Item required label="Card Limit" {...formItemLayout} validateStatus={fieldsError.cardLimit}  help={fieldsErrorMsg.cardLimit}>
        <Input name="cardLimit"  onBlur={validateField} onChange={handleInputChange}type="number"/>
      </Form.Item>
      <Form.Item {...buttonItemLayout}>
        <Button  disabled={submitDisabled} onClick={addCardData} type="primary">Add</Button>
      </Form.Item>
      <span style={{color: 'red'}}>{formError}</span>
    </Form>
  )
}

export default CreditForm;