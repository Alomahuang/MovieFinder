import { expect } from 'chai';
import { mutations } from '@/store';

const { UPDATELOCATION, UPDATEPAGE, CHANGEURL } = mutations;

describe('mutations', () => {
  it('Should UPDATELOCATION', () => {
    const state = { currentLocation: '' };
    UPDATELOCATION(state, 'popmovie');
    expect(state.currentLocation).to.equal('popmovie');
  });
  it('should UPDATEPAGE', () => {
    const state = { page: null };
    UPDATEPAGE(state, 2);
    expect(state.page).to.equal(2);
  });
  it('should CHANGEURL depends on type', () => {
    const state = { search_url: '', detail_url: '' };
    CHANGEURL(state, { queryUrl: 'https://developers.themoviedb.org/3/discover/something', type: 1 });
    expect(state.search_url).to.equal('https://developers.themoviedb.org/3/discover/something');
    expect(state.detail_url).to.not.equal('https://developers.themoviedb.org/3/discover/something');
    CHANGEURL(state, { queryUrl: 'https://developers.themoviedb.org/3/detail/something', type: 2 });
    expect(state.detail_url).to.equal('https://developers.themoviedb.org/3/detail/something');
    expect(state.search_url).to.not.equal('https://developers.themoviedb.org/3/detail/something');
  });
});
