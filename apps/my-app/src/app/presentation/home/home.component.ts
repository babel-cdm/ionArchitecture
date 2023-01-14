import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

import { environment } from '@my-app/env';
import NativeCapHttp from '@core/data/plugin/NativeHttp';
import sleep from '@core/utils/sleep';

interface Model {
  id: number
  title: string
  completed: boolean
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit{
  environmentName = environment.name


  private subjectModel = new Subject<Model[]>();

  models$: Observable<Model[]> = this.subjectModel.asObservable();

  async ngOnInit() {
    const headers = {
      'Authorization': 'Basic eyJ1c2VyIjp7ImlkIjoyMTUxNjQsImVtYWlsIjoic3VwcG9ydEBzd2lwZXRhcHNlbGwuY29tIn0sImNvbnRleHQiOiJzdG9yZXMvOWoydHd0Z2QiLCJzdG9yZV9oYXNoIjoiOWoydHd0Z2QiLCJ0aW1lc3RhbXAiOjE0MzI5MDQ1MzAuMDg0NTQ3OH0=.YmI1MjI0M2Q1YWY4MGI5MTg2NDZkOTYwYzBkNTkxZjAzMzc2YTYxYjI2NTc5N2E1NjFlODhlMDE1ZjhjYzlkZA=='
    }

    // const response = await NativeCapHttp.get({
    //   endpoint: 'https://private-anon-49753ed7b0-fcctodoapp.apiary-mock.com/todos',
    //   headers
    // });


    const response = {
      "status": 200,
      "statusText": "OK",
      "data": [
          {
              "id": 1,
              "title": "Finish the Free Code Camp curriculum!",
              "completed": false
          },
          {
              "id": 2,
              "title": "Sleep more.",
              "completed": false
          }
      ]
    }


    await sleep(1000);

    this.subjectModel.next(response.data);
  }
}
