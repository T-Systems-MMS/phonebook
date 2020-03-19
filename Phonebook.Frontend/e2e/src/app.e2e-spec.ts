import { AppPage } from './app.po';

describe('Phonebook App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display Phonebook', () => {
    page.navigateTo();
    expect(page.getTitle()).toEqual('Phonebook');
  });
});
