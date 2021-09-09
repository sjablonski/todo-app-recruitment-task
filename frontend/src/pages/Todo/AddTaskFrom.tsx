import React, { ReactElement, useState } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import {
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  Paper,
  TextField,
  Typography,
} from '@material-ui/core';
import { showSnackbar } from 'components/Toast/toastSlice';
import TodoTaskForm from 'interfaces/TodoTaskForm';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { addNewTodoTasks, selectPending } from './todoTaskSlice';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      padding: theme.spacing(2),
    },
  }),
);

const initFormData = { title: '', description: '', finished: false };

export default function AddTaskForm(): ReactElement {
  const [formData, setFormData] = useState<TodoTaskForm>(initFormData);
  const [errors, setErrors] = useState({ title: '', description: '' });
  const classes = useStyles();
  const isPending = useAppSelector(selectPending);
  const dispatch = useAppDispatch();

  const handleInputChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const target = ev.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleAddNewTask = async (ev: React.SyntheticEvent) => {
    ev.preventDefault();

    const resultAdd = await dispatch(addNewTodoTasks(formData));

    if (addNewTodoTasks.fulfilled.match(resultAdd)) {
      await dispatch(showSnackbar({ status: 'success', message: 'Added new task' }));
      setFormData(initFormData);
    } else {
      if (resultAdd.payload) {
        setErrors(resultAdd.payload.errors);
      } else {
        await dispatch(showSnackbar({ status: 'error', message: 'Error added new task' }));
      }
    }
  };

  return (
    <Paper className={classes.paper}>
      <Typography variant="h4" gutterBottom>
        New task
      </Typography>
      <form noValidate autoComplete="off" onSubmit={handleAddNewTask}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              id="standard-basic"
              name="title"
              label="Title"
              onChange={handleInputChange}
              value={formData.title}
              fullWidth
              error={!!errors.title}
              helperText={errors.title}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="standard-multiline-static"
              name="description"
              label="Description"
              multiline
              rows={4}
              onChange={handleInputChange}
              value={formData.description}
              fullWidth
              error={!!errors.description}
              helperText={errors.description}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  name="finished"
                  color="primary"
                  onChange={handleInputChange}
                  checked={formData.finished}
                />
              }
              label="Finished"
            />
          </Grid>
          <Grid container item xs={12} justifyContent="flex-end">
            <Button type="submit" variant="contained" color="primary" disabled={isPending}>
              Add new task
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
}
