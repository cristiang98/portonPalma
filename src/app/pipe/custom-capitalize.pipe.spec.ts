import { CustomCapitalizePipe } from './custom-capitalize.pipe';

describe('CustomCapitalizePipe', () => {
  it('create an instance', () => {
    const pipe = new CustomCapitalizePipe();
    expect(pipe).toBeTruthy();
  });
});
