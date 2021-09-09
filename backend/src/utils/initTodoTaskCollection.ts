import faker from "faker";
import TodoTask from "models/TodoTask";

function createTodoTaskData() {
  return {
    title: faker.lorem.words(),
    description: faker.lorem.paragraph(),
    finished: faker.datatype.boolean(),
  };
}

async function initTodoTaskCollection() {
  try {
    for (let i = 0; i < 3000; i++) {
      const newTask = createTodoTaskData();
      await new TodoTask(newTask).save();
    }
    console.log("Collection initialization successful");
  } catch (err) {
    throw err;
  }
}

export default initTodoTaskCollection;
