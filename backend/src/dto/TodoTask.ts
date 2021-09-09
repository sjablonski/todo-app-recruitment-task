import { Trim } from "class-sanitizer";
import { IsNotEmpty, IsString, IsBoolean } from "class-validator";

class TodoTask {
  @IsNotEmpty()
  @IsString()
  @Trim()
  title: string;

  @IsNotEmpty()
  @IsString()
  @Trim()
  description: string;

  @IsNotEmpty()
  @IsBoolean()
  finished: boolean;

  constructor(title: string, description: string, finished: boolean) {
    this.title = title;
    this.description = description;
    this.finished = finished;
  }
}

export default TodoTask;
