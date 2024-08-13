import React, { useEffect, useState } from 'react';
import { Steps, Form, Input, Radio, Button, Select } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { CloseOutlined } from '@ant-design/icons';
import litteralogo from '../../assets/litteralogo.png'
import axios from '../../../AxiosInstance/axios.jsx'
import { v4 as uuidv4 } from 'uuid'
import { UseEmploye } from '../../EmpContext.jsx';


const { Step } = Steps;

const Activity = ({ activities, onAddActivity, onDeleteActivity, onNext }) => {
const [inputValue, setInputValue] = useState("");
const { uuid , setuuid } = UseEmploye()

  const GetActivity = async()=>{
    try {
      const headers = {
        Accept:'application/json , text/plain',
        APIKey: import.meta.env.VITE_LITTERA_APIKEY,
        'Content-Type':'application/json'
      }
      const { data } = await axios.get(`/Get_Frac_Emp_Activity` , { 
        headers:headers , 
        params:{
          employeeid:uuid,
          branchid:import.meta.env.VITE_BRANCH_ID
        }
      })
      console.log( "Get_Frac_Emp_Activity" , data)
    } 
    catch (error) {
      console.log(error)
    }
  }

  const handleAddActivity = () => {
    if (inputValue.trim()) {
      onAddActivity(inputValue);
      setInputValue("");
    }
  };

  const handleSaveAndNext = async () => {
    try {
      console.log("activities" , activities)
      await EmployeActivityHandler({ activities });
      onNext(); 
    } catch (error) {
      console.error("Error saving activities:", error);
    }
  };

  const EmployeActivityHandler = async (values) => {
    try {
      const headers = {
        Accept: 'application/json, text/plain',
        APIKey: import.meta.env.VITE_LITTERA_APIKEY,
        'Content-Type': 'application/json',
      };
  
      const activities = values?.map((value, index) => ({
        activityid: index,
        activity: value,
      }));
  
      const { data } = await axios.get(`/Save_Fracking_EMP_Activity`, {
        headers: headers,
        params: {
          tcfea_id: null,
          tcfea_tcfem_id: uuid,
          activities: activities,
          tcfea_branchid: import.meta.env.VITE_BRANCH_ID,
        },
      });
  
      await GetActivity()
      console.log("Save_activity", data);
    } catch (error) {
      console.log(error);
    }
  };
  
  return (
    <div className="max-mid:px-2 h-full px-8">
      <h2 className="text-2xl gap-2 items-center max-sm:flex-col flex  py-2 my-3">Activity <span className='text-sm'>( कृपया बताएं कि आप अपनी संस्था में क्या काम करते हैं ? )</span></h2>
      <div className="flex space-x-4 mb-4">
        <Input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Enter activity"
        />
        <Button type="primary" className="bg-[#43A1CC]" onClick={handleAddActivity}>
          Add
        </Button>
      </div>
      <div>
        {activities.map((activity, index) => (
          <div key={index} className="flex items-center justify-between mb-2 p-2 border rounded-lg shadow-sm bg-gray-100">
            <span>{index + 1}. {activity}</span>
            <Button
              type="text"
              icon={<CloseOutlined />}
              className="text-red-500 hover:text-red-700"
              onClick={() => onDeleteActivity(index)}
            />
          </div>
        ))}
      </div>
      {activities.length > 0 && (
        <Button type="primary" className="mt-4 bg-[#43A1CC]" onClick={handleSaveAndNext}>
          Save & Next
        </Button>
      )}
    </div>
  );
};


const KnowledgeAndResource = ({ activities, onFinish }) => {
    const [textareaValues, setTextareaValues] = useState(Array(activities.length).fill(''));
    const { uuid , setuuid } = UseEmploye()

    useEffect(()=>{
      const fetchActivity = async()=>{
        await GetActivity()
      }
      fetchActivity()
    },[])
    
    const handleChange = (index, value) => {
      const newValues = [...textareaValues];
      newValues[index] = value;
      setTextareaValues(newValues);
    };
    
    const EmployeResourceHandler = async (values) => {
      try {
        const headers = {
          Accept: 'application/json, text/plain',
          APIKey: import.meta.env.VITE_LITTERA_APIKEY,
          'Content-Type': 'application/json',
        };
    
        const activities = values?.map((value, index) => ({
          activityid: index,
          resources: value,
          resourceid: string,
        }));
    
        const { data } = await axios.get(`/Save_Fracking_EMP_Activity`, {
          headers: headers,
          params: {
            tcfea_id: null,
            tcfea_tcfem_id: uuid,
            activities: activities,
            tcfekr_branchid: import.meta.env.VITE_BRANCH_ID,
          },
        });
    
        console.log("Save_activity", data);
      } 
      catch (error) {
        console.log(error);
      }
    };

    const GetActivity = async()=>{
      try {
        const headers = {
          Accept:'application/json , text/plain',
          APIKey: import.meta.env.VITE_LITTERA_APIKEY,
          'Content-Type':'application/json'
        }
        const { data } = await axios.get(`/Get_Frac_Emp_Activity` , { 
          headers:headers , 
          params:{
            employeeid:uuid,
            branchid:import.meta.env.VITE_BRANCH_ID
          }
        })
        console.log( "Get_Frac_Emp_Activity" , data)
      } 
      catch (error) {
        console.log(error)
      }
    }
  
    const allTextareasFilled = textareaValues.every(value => value.trim() !== '');
  
    return (
      <div className="max-sm:px-4 px-8">
        <h2 className="text-2xl gap-2 items-center max-sm:flex-col flex  py-2 my-3">Knowledge & Resource <span className='text-sm max-sm:text-xs text-center'>( कृपया बताएं कि आपके काम करने के लिए आपको किस प्रकार के ज्ञान की आवश्यकता होती है ? )</span></h2>
        {activities.map((activity, index) => (
          <div key={index} className="mb-4 flex gap-2 flex-col">
            <h3 className="capitalize text-sm font-light">{index + 1}. Resources for : {activity}</h3>
            <Input.TextArea
              required
              rows={4}
              placeholder="Enter knowledge and resources"
              value={textareaValues[index]}
              onChange={(e) => handleChange(index, e.target.value)}
            />
          </div>
        ))}
        <Button
          type="primary"
          className="bg-[#43A1CC]"
          onClick={onFinish}
          disabled={!allTextareasFilled} 
        >
          Finish
        </Button>
      </div>
    );
};


const MyForm = ({ onNext }) => {
  const [form] = Form.useForm();
  const { uuid , setuuid } = UseEmploye()

  const onFinish = async(values) => {
    console.log('Form values:', values);
    await EmployeInfoHandler(values)
    form.resetFields();
    onNext();
  };

  const GetCaste = async()=>{
    try {
      const headers = {
        Accept:'application/json , text/plain',
        APIKey: import.meta.env.VITE_LITTERA_APIKEY,
        'Content-Type':'application/json'
      }
      const { data } = await axios.get(`/Get_cast_category` , { 
        headers:headers
      })
      console.log( "Get_cast_category" , data)
    } 
    catch (error) {
      console.log(error)
    }

  }

  const EmployeInfoHandler = async(values)=>{
    try {
      const headers = {
        Accept:'application/json , text/plain',
        APIKey: import.meta.env.VITE_LITTERA_APIKEY,
        'Content-Type':'application/json'
      }
      const newUserid = uuidv4()
      setuuid(setuuid)

      const { data } = await axios.get(`/Save_Fracking_EMP` , { 
        headers:headers,
        params:{
          tcfem_id: newUserid,
          tcfem_f_name: values.firstName,
          tcfem_m_name: values.middleName || null ,
          tcfem_l_name: values.lastName || null ,
          tcfem_gender: 0,
          tcfem_cast_category: 0,
          tcfem_mobileno: values.mobileNo ,
          tcfem_email: values.email,
          tcfem_post: values.designation,
          tcfem_branchid: import.meta.env.VITE_BRANCH_ID,  
        } 
      })
      console.log( "Get_cast_category" , data)
    } 
    catch (error) {
      console.log(error)
    }

  }

  useEffect(() => {
    const fetchdata = async()=>{
      await GetCaste()
    }
    fetchdata()
  }, [])
  
  const [value, setValue] = useState('male');

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <div className='flex h-full flex-col gap-2'>
        <h2 className="text-2xl max-mid:px-4 max-mid:py-2  px-8 py-4">Employee Info</h2>
        <Form
          form={form}
          name="basic"
          onFinish={onFinish}
          layout="vertical"
          className="w-full h-fit max-mid:px-4 overflow-auto px-8"
        >

        <Form.Item label="Name" style={{ marginBottom: 16 }}>
            <div className="flex space-x-4">
            <Form.Item
                name="firstName"
                noStyle
                rules={[{ required: true, message: 'Please input your first name!' }]}
            >
                <Input placeholder="First Name" />
            </Form.Item>

            <Form.Item name="middleName" noStyle>
                <Input placeholder="Middle Name" />
            </Form.Item>
            
            <Form.Item
                name="lastName"
                noStyle
            >
                <Input placeholder="Last Name" />
            </Form.Item>

            </div>
        </Form.Item>

        <Form.Item
            label="Gender"
            name="gender"
            rules={[{ required: true, message: 'Please select your gender!' }]}
        >
            <Radio.Group>
                <Radio value="0">Male</Radio>
                <Radio value="1">Female</Radio>
                <Radio value="2">Other</Radio>
            </Radio.Group>
        </Form.Item>

        <Form.Item label="Caste" name="caste">
            <Select placeholder="Select your caste">
            <Select.Option value="0">SC</Select.Option>
            <Select.Option value="1">ST</Select.Option>
            <Select.Option value="2">OBC</Select.Option>
            <Select.Option value="3">General</Select.Option>
            </Select>
        </Form.Item>

        <Form.Item
            label="Mobile No"
            name="mobileNo"
            rules={[
            { required: true, message: 'Please input your mobile number!' },
            { pattern: /^[0-9]{10}$/, message: 'Mobile number must be 10 digits!' },
            ]}
        >
            <Input />
        </Form.Item>

        <Form.Item
            label="Email"
            name="email"
            rules={[
            { required: true, message: 'Please input your email!' },
            { type: 'email', message: 'The input is not valid E-mail!' },
            ]}
        >
            <Input />
        </Form.Item>

        <Form.Item
            label="Designation/Post"
            name="designation"
            rules={[{ required: true, message: 'Please input your designation/post!' }]}
        >
            <Input />
        </Form.Item>

        <Form.Item>
            <Button type="primary" className="bg-[#43A1CC]" htmlType="submit">
            Save & Next
            </Button>
        </Form.Item>
        </Form>
    </div>
  );
};


const ActivityContainer = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [activities, setActivities] = useState([]);
  const history = useNavigate();

  const handleNext = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const handleAddActivity = (activity) => {
    setActivities((prevActivities) => [...prevActivities, activity]);
  };

  const handleDeleteActivity = (index) => {
    setActivities((prevActivities) => prevActivities.filter((_, i) => i !== index));
  };

  const handleFinish = () => {
    history('/');
  };

  return (
    <div className="flex flex-col h-[100vh] ">
      <div className="w-full max-sm:py-0 px-6 p-4">
        <Link
          className='flex px-3 cursor-none' to="">
          <img 
            className='max-sm:hidden h-[5vh] object-cover max-mid:pb-0 py-1' 
            src={litteralogo} 
            alt="" 
          />
        </Link>
      </div>


    <div className='max-mid:px-4 max-sm:px-2 max-sm:py-2  max-lg:px-10  px-32'>
      <div className="flex max-sm:py-0 max-mid:h-[87vh] max-sm:h-[98vh] max-mid:flex-col w-full rounded-lg overflow-hidden bg-white mt-6 max-mid:mt-0 h-[80vh]">
        
        <div className="flex  max-mid:gap-2 max-mid:w-full pt-4 gap-6 flex-col items-center justify-center w-1/4  bg-gray-100">
          <div className="w-full max-mid:px-4 max-mid:py-0 flex px-8 py-4">
            <img
              className="bg-[#43A1CC] rounded-md py-1.5 px-2 h-[5vh] object-cover"
              src="https://dev.littera.in//Content/GlobalSetting/Dev/logo_Dashboard.png?1.1"
              alt=""
            />
          </div>

            <Steps 
                className="screensize  px-8 h-full" 
                direction="vertical" 
                current={currentStep}>
                <Step title="Employee Info" description="Enter your employee details." />
                <Step title="Activity" description="Specify activities and tasks." />
                <Step title="Knowledge & Resource" description="Provide knowledge and resources information." />
            </Steps>            

            <Steps 
              size="small"
              className="phonesize hidden  p-4  h-full" 
              direction="horizontal" 
              current={currentStep}>
              <Step title="Employee Info"  />
              <Step title="Activity"  />
              <Step title="Knowledge & Resource" />
            </Steps>

        </div>

        <div className="w-3/4  max-mid:overflow-y-auto h-full  max-mid:w-full py-4 bg-white shadow-lg ">
          {currentStep === 0 && <MyForm onNext={handleNext} />}
          {currentStep === 1 && (
            <Activity
              activities={activities}
              onAddActivity={handleAddActivity}
              onDeleteActivity={handleDeleteActivity}
              onNext={handleNext}
            />
          )}
          {currentStep === 2 && (
            <KnowledgeAndResource
              activities={activities}
              onFinish={handleFinish}
            />
          )}
        </div>
      </div>
    </div>
    </div>
  );
};

export default ActivityContainer;
