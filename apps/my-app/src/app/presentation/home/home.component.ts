import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';

import { environment } from '@my-app/env';
import NativeCapHttp, { HttpSuccessResponse } from '@core/data/plugin/NativeHttp';
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

    const response = await NativeCapHttp.get<Model[]>({
      endpoint: 'http://localhost:3001/todos',
    }) as HttpSuccessResponse<Model[]>;

    this.subjectModel.next(response.data);
  }
}
