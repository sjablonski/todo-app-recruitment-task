import React, { useEffect, useState, ReactElement } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Divider, List, Paper, Typography } from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';
import SplitButton from 'components/SplitButton';
import { showSnackbar } from 'components/Toast/toastSlice';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import {
  fetchTodoTasks,
  updateTodoTask,
  deleteTodoTask,
  selectTodoTasks,
  selectNumberOfPages,
} from './todoTaskSlice';
import TodoTaskItem from './TodoTaskItem';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      padding: theme.spacing(2),
    },
    buttons: {
      display: 'flex',
      justifyContent: 'flex-end',
    },
    pagination: {
      display: 'flex',
      justifyContent: 'center',
    },
    box: {
      textAlign: 'center',
      margin: theme.spacing(3),
    },
  }),
);

const options = [
  { label: 'Date oldest', sort: '_id', order: 'asc' },
  { label: 'Date newest', sort: '_id', order: 'desc' },
  { label: 'Unfinished', sort: 'finished', order: 'asc' },
  { label: 'Finished', sort: 'finished', order: 'desc' },
];

export default function TodoTaskList(): ReactElement {
  const [queryParams, setQueryParams] = useState({ page: 1, sort: '_id', order: 'asc' });
  const classes = useStyles();
  const tasks = useAppSelector(selectTodoTasks);
  const dispatch = useAppDispatch();

  const numberOfPages = useAppSelector(selectNumberOfPages);

  useEffect(() => {
    dispatch(fetchTodoTasks(queryParams));
  }, [queryParams, dispatch]);

  const handleSortByClick = (selectedIndex: number) => {
    setQueryParams((prevState) => ({
      ...prevState,
      sort: options[selectedIndex].sort,
      order: options[selectedIndex].order,
    }));
  };

  const handleCheckboxToggle = async (index: number) => {
    const task = tasks[index];
    const finished = !task.finished;
    const updatedTask = {
      ...task,
      finished,
    };

    const resultUpdate = await dispatch(updateTodoTask(updatedTask));

    if (!updateTodoTask.fulfilled.match(resultUpdate)) {
      await dispatch(showSnackbar({ status: 'error', message: 'Error updating task' }));
    }
  };

  const handleDelete = async (id: string) => {
    const resultDelete = await dispatch(deleteTodoTask(id));

    if (!deleteTodoTask.fulfilled.match(resultDelete)) {
      await dispatch(showSnackbar({ status: 'error', message: 'Error deleting task' }));
    }
  };

  const handlePaginationChange = (_ev: React.ChangeEvent<unknown>, value: number) => {
    setQueryParams((prevState) => ({ ...prevState, page: value }));
  };

  return (
    <Paper className={classes.paper}>
      {tasks.length > 0 ? (
        <section>
          <div className={classes.buttons}>
            <SplitButton content="Sort by:" options={options} handleClick={handleSortByClick} />
          </div>
          <List>
            {tasks.map((item, index) => (
              <React.Fragment key={item._id}>
                <TodoTaskItem
                  item={item}
                  index={index}
                  handleCheckboxToggle={handleCheckboxToggle}
                  handleDelete={handleDelete}
                />
                {index !== tasks.length - 1 && <Divider variant="inset" component="li" />}
              </React.Fragment>
            ))}
          </List>
          <Pagination
            className={classes.pagination}
            count={numberOfPages}
            onChange={handlePaginationChange}
          />
        </section>
      ) : (
        <section className={classes.box}>
          <Typography variant="h4" gutterBottom>
            Empty in tasks
          </Typography>
          <Typography variant="subtitle2" gutterBottom>
            Create a task and it will show up here.
          </Typography>
        </section>
      )}
    </Paper>
  );
}
