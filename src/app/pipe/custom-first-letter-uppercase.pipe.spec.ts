import { CustomFirstLetterUppercasePipe } from './custom-first-letter-uppercase.pipe';

describe('CustomFirstLetterUppercasePipe', () => {
  it('create an instance', () => {
    const pipe = new CustomFirstLetterUppercasePipe();
    expect(pipe).toBeTruthy();
  });
});
