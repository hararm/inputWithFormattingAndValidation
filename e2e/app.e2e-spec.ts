import { InputWithFormattingPage } from './app.po';

describe('input-with-formatting App', () => {
  let page: InputWithFormattingPage;

  beforeEach(() => {
    page = new InputWithFormattingPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
