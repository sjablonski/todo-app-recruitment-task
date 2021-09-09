import React, { ReactElement } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import {
  Checkbox,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  Typography,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import TodoTask from 'interfaces/TodoTask';

interface TodoTaskItemProps {
  item: TodoTask;
  index: number;
  handleCheckboxToggle(index: number): void;
  handleDelete(id: string): void;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    listItem: {
      padding: theme.spacing(2),
    },
    listItemText: {
      maxWidth: '90%',
    },
  }),
);

export default function TodoTaskItem({
  item,
  index,
  handleCheckboxToggle,
  handleDelete,
}: TodoTaskItemProps): ReactElement {
  const classes = useStyles();
  const labelId = `checkbox-list-label-${item._id}`;

  return (
    <ListItem
      key={item._id}
      className={classes.listItem}
      role={undefined}
      dense
      button
      onClick={() => handleCheckboxToggle(index)}
    >
      <ListItemIcon>
        <Checkbox
          color="primary"
          edge="start"
          checked={item.finished}
          tabIndex={-1}
          disableRipple
          inputProps={{ 'aria-labelledby': labelId }}
        />
      </ListItemIcon>
      <ListItemText
        id={labelId}
        className={classes.listItemText}
        primary={
          <Typography variant="h6" component="h3">
            {item.title}
          </Typography>
        }
        secondary={<Typography component="p">{item.description}</Typography>}
      />
      <ListItemSecondaryAction>
        <IconButton
          color="secondary"
          edge="end"
          aria-label="delete"
          onClick={() => handleDelete(item._id)}
        >
          <DeleteIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
}
