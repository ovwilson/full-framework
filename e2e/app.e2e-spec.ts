import { FullFrameworkPage } from './app.po';

describe('full-framework App', () => {
  let page: FullFrameworkPage;

  beforeEach(() => {
    page = new FullFrameworkPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
