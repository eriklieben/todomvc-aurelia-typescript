import * as moment from 'moment';

export class TimeAgoValueConverter {  
  toView(value: Date) {
    if (!value) {
      return 'never';
    }
    
    return moment(value).fromNow();
  }
}
