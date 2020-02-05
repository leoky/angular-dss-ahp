import { Injectable } from '@angular/core';
// model
import { Alternative } from '../models/alternative';
// service
import { CriteriaService } from './criteria.service';

@Injectable()
export class AlternativeService {

  alternatives: Alternative[];

  constructor() { }


}
