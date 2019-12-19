import { TelephonePipe } from './telephone.pipe';

describe('TestPipe', () => {
  it('create an instance', () => {
    const pipe = new TelephonePipe();
    expect(pipe).toBeTruthy();
  });

  it('transforms numer', () => {
    const pipe = new TelephonePipe();
    expect(pipe.transform('+49 32432 234234')).toBe('+4932432234234');
  })
});
