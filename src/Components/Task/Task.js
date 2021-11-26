import React from 'react';
import { Card, Col } from 'antd';
import PropTypes from 'prop-types';
import {
  EditOutlined,
  EllipsisOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import {
  deleteTask,
  setCurrentTaskData,
  setOpenAddForm,
  setIsOnedit,
} from '../../store/slices/task/task';
import { getAllListAsync } from '../../store/slices/list/list';
import './task.css';

const { Meta } = Card;

const Task = (props) => {
  const { data } = props;
  const dispatch = useDispatch();

  const onDelete = () => {
    const { id } = data;
    dispatch(deleteTask({ id })).then(() => {
      dispatch(getAllListAsync());
    });
  };

  const onEdit = async () => {
    await dispatch(setCurrentTaskData(data));
    await dispatch(setIsOnedit());
    dispatch(setOpenAddForm());
  };
 
  return (
    <Col>
      <Card
        className="card"
        actions={[
          <DeleteOutlined key="delete" onClick={onDelete} />,
          <EditOutlined key="edit" onClick={onEdit} />,
          <EllipsisOutlined key="ellipsis" />,
        ]}
      >
        <Meta title={data.title} description={data?.description} />
      </Card>
    </Col>
  );
};
Task.propTypes = {
  data: PropTypes.object.isRequired,
};
export default Task;
