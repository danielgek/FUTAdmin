import { FUTAdminPage } from './app.po';

describe('futadmin App', () => {
  let page: FUTAdminPage;

  beforeEach(() => {
    page = new FUTAdminPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
