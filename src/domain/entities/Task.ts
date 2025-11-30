
export class Task {
  id: string = '';
  title: string = '';
  description: string = '';
  statusTask: number = 0;

  constructor(
     id: string,
     title: string,
     description: string,
     statusTask: number
  ) {

    this.id = id;
    this.title = title;
    this.description = description;
    this.statusTask = statusTask;
  }
}
