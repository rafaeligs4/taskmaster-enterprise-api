
export class Task {
  id: string = '';
  title: string = '';
  description: string = '';
  statusTask: string = '0';
  userId: string = '';
  constructor(
    id: string,
    title: string,
    description: string,
    statusTask: string = '0',
    userId: string
  ) {

    this.id = id;
    this.title = title;
    this.description = description;
    this.statusTask = statusTask;
    this.userId = userId;
  }
}
