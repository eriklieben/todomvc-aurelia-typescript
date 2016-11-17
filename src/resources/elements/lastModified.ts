import { inject } from 'aurelia-framework';
import { BindingSignaler } from 'aurelia-templating-resources';
import ChangeLog from './../../models/ChangeLog';

@inject(ChangeLog, BindingSignaler)
export class LastModified {

  constructor(public changeLog: ChangeLog, signaler: BindingSignaler) {
    window.setInterval(() => {
      signaler.signal('refreshTimeAgo');
    }, 5000);
  }
}

