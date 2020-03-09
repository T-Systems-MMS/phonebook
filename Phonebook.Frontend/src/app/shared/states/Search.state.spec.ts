import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NgxsRouterPluginModule } from '@ngxs/router-plugin';
import { NgxsModule, Store } from '@ngxs/store';
import { ColumnDefinitions } from 'src/app/shared/config/columnDefinitions';
import {
  AddSearchFilter,
  RemoveLastSearchFilter,
  RemoveSearchFilter,
  ResetSearch,
  SearchState,
  SetSearchFiltersAndSearchTerm
} from 'src/app/shared/states/Search.state';

const ROUTER_STATE = {
  state: {
    root: {
      url: [],
      params: {},
      queryParams: {},
      data: {},
      outlet: 'primary',
      routeConfig: null,
      firstChild: {
        url: [
          { path: 'user', parameters: {} },
          { path: 'JAAB', parameters: {} }
        ],
        params: { id: 'JAAB' },
        queryParams: {},
        data: {},
        outlet: 'primary',
        routeConfig: null,
        children: [],
        paramMap: { params: { id: 'JAAB' } },
        queryParamMap: { params: {} }
      },
      children: [
        {
          url: [
            { path: 'user', parameters: {} },
            { path: 'JAAB', parameters: {} }
          ],
          params: { id: 'JAAB' },
          queryParams: {},
          data: {},
          outlet: 'primary',
          routeConfig: null,
          children: [],
          paramMap: { params: { id: 'JAAB' } },
          queryParamMap: { params: {} }
        }
      ],
      paramMap: { params: {} },
      queryParamMap: { params: {} }
    },
    url: '/user/JAAB'
  },
  navigationId: 2
};

describe('[States] Search', () => {
  let store: Store;
  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [SimpleComponent],
      imports: [
        RouterTestingModule.withRoutes([
          {
            path: '**',
            component: SimpleComponent
          }
        ]),
        NgxsModule.forRoot([SearchState]),
        NgxsRouterPluginModule.forRoot()
      ]
    }).compileComponents();
    store = TestBed.get(Store);
    store.reset({
      searchstate: {
        searchTerm: '',
        searchFilters: []
      },
      router: ROUTER_STATE
    });
  });

  // Selectors
  it('it should return search term', () => {
    expect(
      SearchState.searchTerm({
        searchTerm: '',
        searchFilters: []
      })
    ).toEqual('');
    expect(
      SearchState.searchTerm({
        searchTerm: 'testString',
        searchFilters: []
      })
    ).toEqual('testString');
  });

  it('it should return search Filters', () => {
    expect(
      SearchState.searchFilters({
        searchTerm: '',
        searchFilters: []
      })
    ).toEqual([]);
    expect(
      SearchState.searchFilters({
        searchTerm: '',
        searchFilters: [
          { filterColumn: ColumnDefinitions.city, filterValue: 'testValueCity' },
          { filterColumn: ColumnDefinitions.email, filterValue: 'testValueEmail' }
        ]
      })
    ).toEqual([
      { filterColumn: ColumnDefinitions.city, filterValue: 'testValueCity' },
      { filterColumn: ColumnDefinitions.email, filterValue: 'testValueEmail' }
    ]);
  });

  it('it adds Search Filter', () => {
    const filter1 = { filterColumn: ColumnDefinitions.city, filterValue: 'testValueCity' };
    const filter2 = { filterColumn: ColumnDefinitions.email, filterValue: 'testValueEmail' };
    expect(store.selectSnapshot(storeSnapshot => storeSnapshot.searchstate.searchFilters)).toEqual([]);
    store.dispatch(new AddSearchFilter(filter1));
    expect(store.selectSnapshot(storeSnapshot => storeSnapshot.searchstate.searchFilters)).toEqual([filter1]);
    store.dispatch(new AddSearchFilter(filter1));
    expect(store.selectSnapshot(storeSnapshot => storeSnapshot.searchstate.searchFilters)).toEqual([filter1]);
    store.dispatch(new AddSearchFilter(filter2));
    expect(store.selectSnapshot(storeSnapshot => storeSnapshot.searchstate.searchFilters)).toEqual([filter1, filter2]);
  });

  it('it adds Search Filter - update if different', () => {
    const filter1 = { filterColumn: ColumnDefinitions.city, filterValue: 'testValueCity' };
    const filter1derivate = { filterColumn: ColumnDefinitions.city, filterValue: 'testValueCityDerivate' };
    store.dispatch(new AddSearchFilter(filter1));
    expect(store.selectSnapshot(storeSnapshot => storeSnapshot.searchstate.searchFilters)).toEqual([filter1]);
    store.dispatch(new AddSearchFilter(filter1derivate));
    expect(store.selectSnapshot(storeSnapshot => storeSnapshot.searchstate.searchFilters)).toEqual([filter1derivate]);
  });

  it('it removes Search Filter', () => {
    const filter1 = { filterColumn: ColumnDefinitions.city, filterValue: 'testValueCity' };
    store.reset({
      searchstate: {
        searchTerm: '',
        searchFilters: [filter1]
      },
      router: ROUTER_STATE
    });
    store.dispatch(new RemoveSearchFilter(filter1));
    expect(store.selectSnapshot(storeSnapshot => storeSnapshot.searchstate.searchFilters)).toEqual([]);
  });

  it('it removes Search Filter - independently', () => {
    const filter1 = { filterColumn: ColumnDefinitions.city, filterValue: 'testValueCity' };
    const filter2 = { filterColumn: ColumnDefinitions.email, filterValue: 'testValueEmail' };
    const filter3 = { filterColumn: ColumnDefinitions.costcenter, filterValue: 'testValueCostcenter' };
    store.reset({
      searchstate: {
        searchTerm: '',
        searchFilters: [filter1, filter2, filter3]
      },
      router: ROUTER_STATE
    });
    store.dispatch(new RemoveSearchFilter(filter2));
    expect(store.selectSnapshot(storeSnapshot => storeSnapshot.searchstate.searchFilters)).toEqual([filter1, filter3]);
  });

  it('it removes Search Filter - no Filter existing', () => {
    const filter1 = { filterColumn: ColumnDefinitions.city, filterValue: 'testValueCity' };
    store.reset({
      searchstate: {
        searchTerm: '',
        searchFilters: []
      },
      router: ROUTER_STATE
    });
    store.dispatch(new RemoveSearchFilter(filter1));
    expect(store.selectSnapshot(storeSnapshot => storeSnapshot.searchstate.searchFilters)).toEqual([]);
  });

  it('it removes Search Filter - Filter not existing', () => {
    const filter1 = { filterColumn: ColumnDefinitions.city, filterValue: 'testValueCity' };
    const filter2 = { filterColumn: ColumnDefinitions.email, filterValue: 'testValueEmail' };
    const filter3 = { filterColumn: ColumnDefinitions.costcenter, filterValue: 'testValueCostcenter' };
    store.reset({
      searchstate: {
        searchTerm: '',
        searchFilters: [filter1, filter3]
      },
      router: ROUTER_STATE
    });
    store.dispatch(new RemoveSearchFilter(filter2));
    expect(store.selectSnapshot(storeSnapshot => storeSnapshot.searchstate.searchFilters)).toEqual([filter1, filter3]);
  });

  it('it remove last Search Filter', () => {
    const filter1 = { filterColumn: ColumnDefinitions.city, filterValue: 'testValueCity' };
    const filter2 = { filterColumn: ColumnDefinitions.email, filterValue: 'testValueEmail' };
    const filter3 = { filterColumn: ColumnDefinitions.costcenter, filterValue: 'testValueCostcenter' };
    store.reset({
      searchstate: {
        searchTerm: '',
        searchFilters: [filter1, filter2, filter3]
      },
      router: ROUTER_STATE
    });
    store.dispatch(new RemoveLastSearchFilter());
    expect(store.selectSnapshot(storeSnapshot => storeSnapshot.searchstate.searchFilters)).toEqual([filter1, filter2]);
  });

  it('it resets Search', () => {
    const filter1 = { filterColumn: ColumnDefinitions.city, filterValue: 'testValueCity' };
    store.reset({
      searchstate: {
        searchTerm: 'helloTest',
        searchFilters: [filter1]
      },
      router: ROUTER_STATE
    });
    store.dispatch(new ResetSearch());
    expect(store.selectSnapshot(storeSnapshot => storeSnapshot.searchstate)).toEqual({
      searchTerm: '',
      searchFilters: []
    });
  });

  it('it sets SearchFilters and SearchTerm', () => {
    const filter1 = { filterColumn: ColumnDefinitions.city, filterValue: 'testValueCity' };
    store.dispatch(new SetSearchFiltersAndSearchTerm([filter1], 'helloTest'));
    expect(store.selectSnapshot(storeSnapshot => storeSnapshot.searchstate)).toEqual({
      searchTerm: 'helloTest',
      searchFilters: [filter1]
    });
    store.dispatch(new SetSearchFiltersAndSearchTerm([], ''));
    expect(store.selectSnapshot(storeSnapshot => storeSnapshot.searchstate)).toEqual({
      searchTerm: '',
      searchFilters: []
    });
  });
});

@Component({
  selector: 'cmp',
  template: ''
})
class SimpleComponent {}
