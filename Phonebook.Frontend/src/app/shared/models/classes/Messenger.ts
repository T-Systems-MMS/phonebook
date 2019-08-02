/* tslint:disable:variable-name */
export class Messenger {
  public Text?: any;
  public State: number;

  constructor(text: any = null, state: number) {
    this.Text = text;
    this.State = state;
  }
}
