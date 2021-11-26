import React, { useState, useEffect } from 'react';
import { Row, Button, Empty, Spin } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import Task from '../../Components/Task/Task';
import { setOpenAddForm } from '../../store/slices/task/task';
import { getAllListAsync } from '../../store/slices/list/list';
import NewTaskForm from '../../Components/NewTaskForm/NewTaskForm';

const Lists = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.listReducer);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getList() {
      setLoading(true);
      await dispatch(getAllListAsync());
      setLoading(false);
    }
    getList();
  }, []);

  const toggleNewTask = () => {
    dispatch(setOpenAddForm());
  };

  return (
    <>
      <Row gutters={24} justify="end" style={{ marginBottom: 24 }}>
        <Button type="primary" onClick={toggleNewTask}>
          Add a task
        </Button>
      </Row>
      <Row gutters={24} justify="start">
        <NewTaskForm />
      </Row>
      <Spin spinning={loading} tip="Loading tasks...">
        {tasks?.length ? (
          <Row gutter={24}>
            {tasks?.map((item) => (
              <Task data={item} key={item.id + Math.random()} />
            ))}
          </Row>
        ) : (
          <Row justify="center">
            <Empty description="You have not any task" />
          </Row>
        )}
      </Spin>
    </>
  );
};

Lists.propTypes = {
  getAllListAsync: PropTypes.func.isRequired,
};

export default Lists;
