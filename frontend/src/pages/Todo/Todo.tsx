import React, { ReactElement } from 'react';
import { Grid } from '@material-ui/core';
import AddTaskForm from 'pages/Todo/AddTaskFrom';
import TodoTaskList from 'pages/Todo/TodoTaskList';

export default function Todo(): ReactElement {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <AddTaskForm />
      </Grid>
      <Grid item xs={12}>
        <TodoTaskList />
      </Grid>
    </Grid>
  );
}
