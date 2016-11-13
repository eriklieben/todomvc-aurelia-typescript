export default class BaseEvent {

  public occuredOn: Date;
  
  constructor(public id) {
    this.occuredOn = new Date();
  }
}
