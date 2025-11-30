
export interface ITaskRepository {
  createTask(task: {
    id: string;
    title: string;
    description: string;
    statusTask: number;
  }): Promise<void>;

  getTaskById(id: string): Promise<{
    id: string;
    title: string;
    description: string;
    statusTask: number;
  } | null>;

}