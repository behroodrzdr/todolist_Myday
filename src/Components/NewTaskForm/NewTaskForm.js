import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Collapse, Form, Input, Button, Row } from 'antd';
import {
  createTask,
  updateTask,
  setIsOnedit,
  setCloseAddForm,
} from '../../store/slices/task/task';
import { getAllListAsync } from '../../store/slices/list/list';

const { Panel } = Collapse;
const { Item } = Form;
const { TextArea } = Input;
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const validateMessages = {
  required: '${label} is required!',
};

const NewTaskForm = () => {
  const [form] = Form.useForm();
  const collapsed = useSelector((state) => state.taskReducer.isOpenForm);
  const initialForData = useSelector(
    (state) => state.taskReducer.currentTaskData,
  );
  const isOnedit = useSelector((state) => state.taskReducer.isOnedit);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const refreshList = () => {
    dispatch(getAllListAsync());
    form.resetFields();
  };

  const onFinish = (values) => {
    setLoading(true);
    if (!isOnedit) {
      dispatch(createTask(values))
        .unwrap()
        .then(() => {
          dispatch(setCloseAddForm());
          refreshList();
          setLoading(false);
        });
    }
    if (isOnedit) {
      dispatch(
        updateTask({
          id: initialForData.id,
          title: values.title,
          description: values.description,
        }),
      )
        .unwrap()
        .then(() => {
          dispatch(setIsOnedit());
          dispatch(setCloseAddForm());
          refreshList();
          setLoading(false);
        });
    }
  };

  return (
    <Collapse ghost activeKey={collapsed ? '1' : ''} destroyInactivePanel>
      <Panel key="1" showArrow={false} >
        <Row gutters={24}>
          <Form
            initialValues={initialForData}
            form={form}
            {...layout}
            name="nest-messages"
            onFinish={onFinish}
            validateMessages={validateMessages}
          >
            <Item name={['title']} label="title" rules={[{ required: true }]}>
              <Input />
            </Item>
            <Item name={['description']} label="description">
              <TextArea />
            </Item>
            <Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
              <Button type="primary" htmlType="submit" loading={loading}>
               { isOnedit ? 'Update task' : ' Add task'}
              </Button>
            </Item>
          </Form>
        </Row>
      </Panel>
    </Collapse>
  );
};
NewTaskForm.propTypes = {
  collapsed: PropTypes.bool,
};
NewTaskForm.defaultProps = {
  collapsed: false,
};
export default NewTaskForm;
