import { ActivatedRouteSnapshot } from '@angular/router';
import { Navigate, RouterNavigation, RouterState } from '@ngxs/router-plugin';
import { Action, Actions, ofActionSuccessful, Selector, State, StateContext, Store } from '@ngxs/store';
import { ColumnDefinitions } from 'src/app/shared/config/columnDefinitions';
import { PhonebookSortDirection, SearchFilter, TableSort } from 'src/app/shared/models';

export class AddSearchFilter {
  public static readonly type: string = '[Search State] Add Search Filter';
  constructor(public searchFilter: SearchFilter) {}
}
export class RemoveSearchFilter {
  public static readonly type: string = '[Search State] Remove Filter';
  constructor(public searchFilter: SearchFilter) {}
}
export class RemoveLastSearchFilter {
  public static readonly type: string = '[Search State] Remove Last Filter';
}
export class UpdateUrl {
  public static readonly type: string = '[Search State] Update Url';
  constructor(public update: { searchTerm?: string; searchFilter?: SearchFilter[]; tableSort?: TableSort }) {}
}
/**
 * This is for setting both variables simultaneously
 * In that way only one router event is fired.
 */
export class SetSearchFiltersAndSearchTerm {
  public static readonly type: string = '[Search State] Set Search Term and Filter';
  constructor(public searchFilters: SearchFilter[], public searchTerm: string, public updateUrl: boolean = true) {}
}
export class ResetSearch {
  public static readonly type: string = '[Search State] Reset';
  constructor(public shouldNavigate: boolean = true) {}
}

export interface SearchStateModel {
  searchTerm: string;
  searchFilters: SearchFilter[];
}

@State<SearchStateModel>({
  name: 'searchstate',
  defaults: {
    searchTerm: '',
    searchFilters: []
  }
})
export class SearchState {
  constructor(private store: Store, private actions$: Actions) {
    this.actions$.pipe(ofActionSuccessful(RouterNavigation)).subscribe(routeInfo => {
      const routeSnapshot: ActivatedRouteSnapshot = routeInfo.routerState.root;
      // Check if on Path 'search'
      if (
        routeSnapshot.firstChild == null ||
        routeSnapshot.firstChild.url.length === 0 ||
        !(routeSnapshot.firstChild.url[0].path === 'search')
      ) {
        // Do not reset search if navigated to user
        if (
          !(
            routeSnapshot.firstChild &&
            routeSnapshot.firstChild.url.length !== 0 &&
            routeSnapshot.firstChild.url[0].path === 'user'
          )
        ) {
          this.store.dispatch(new ResetSearch(false));
        }
        return;
      }
      const pathSegment = routeSnapshot.firstChild.firstChild;
      if (pathSegment != null) {
        // Get SearchTerm
        const searchTerm = pathSegment.paramMap.get('keyword') || '';
        // Get SearchFilters
        let searchFilter: SearchFilter[] = [];
        Object.keys(pathSegment.queryParams).forEach(key => {
          // Ignore sortDirection and sortColumn
          if (isSortKey(key)) {
            return;
          }
          const col = ColumnDefinitions.getColumnById(key);
          if (col != null) {
            searchFilter.push({
              filterColumn: col.id,
              filterValue: pathSegment.queryParamMap.get(key) || ''
            });
          }
        });
        // Retrieve Search Filter from App State if navigating back from User to Search
        if (searchFilter.length === 0) {
          searchFilter = this.store.selectSnapshot(SearchState.searchFilters);
        }
        //Check for differences, because maybe just the sortDirection changed
        if (
          this.store.selectSnapshot(SearchState.searchTerm) !== searchTerm ||
          this.store.selectSnapshot(SearchState.searchFilters) !== searchFilter
        ) {
          this.store.dispatch(new SetSearchFiltersAndSearchTerm(searchFilter, searchTerm, false));
        }
      }
    });
  }
  @Selector()
  public static searchTerm(state: SearchStateModel): string {
    return state.searchTerm;
  }

  @Selector()
  public static searchFilters(state: SearchStateModel): SearchFilter[] {
    return state.searchFilters.map(filter => {
      const tmp = ColumnDefinitions.getColumnById(filter.filterColumn);
      if (tmp == null) {
        throw Error('Filter Column not found.');
      }
      filter.filterColumn = tmp.id;
      return filter;
    });
  }

  @Action(AddSearchFilter)
  public addSearchFilter(ctx: StateContext<SearchStateModel>, action: AddSearchFilter) {
    const state = ctx.getState();
    const index = state.searchFilters.findIndex(f => f.filterColumn === action.searchFilter.filterColumn);
    if (index >= 0) {
      state.searchFilters[index] = action.searchFilter;
    } else {
      state.searchFilters.push(action.searchFilter);
    }
    ctx.setState({ ...state });
    return ctx.dispatch(new UpdateUrl({ searchFilter: state.searchFilters }));
  }

  @Action(RemoveSearchFilter)
  public removeSearchFilter(ctx: StateContext<SearchStateModel>, action: RemoveSearchFilter) {
    const state = ctx.getState();
    const index = state.searchFilters.indexOf(action.searchFilter);
    if (index === -1) {
      return;
    }
    state.searchFilters.splice(index, 1);
    ctx.setState({ ...state });
    return ctx.dispatch(new UpdateUrl({ searchFilter: state.searchFilters }));
  }

  @Action(RemoveLastSearchFilter)
  public removeLastSearchFilter(ctx: StateContext<SearchStateModel>) {
    const state = ctx.getState();
    state.searchFilters.pop();
    ctx.setState({ ...state });
    return ctx.dispatch(new UpdateUrl({ searchFilter: state.searchFilters }));
  }

  @Action(ResetSearch)
  public resetSearch(ctx: StateContext<SearchStateModel>, action: ResetSearch) {
    ctx.patchState({
      searchTerm: '',
      searchFilters: []
    });
    if (action.shouldNavigate) {
      return ctx.dispatch(new UpdateUrl({ searchFilter: [], searchTerm: '' }));
    }
  }
  @Action(SetSearchFiltersAndSearchTerm)
  public setSearchFilterAndSearchTerm(ctx: StateContext<SearchStateModel>, action: SetSearchFiltersAndSearchTerm) {
    const state = ctx.getState();
    state.searchFilters = action.searchFilters;
    state.searchTerm = action.searchTerm != null ? action.searchTerm : '';
    ctx.setState({ ...state });
    if (action.updateUrl) {
      return ctx.dispatch(new UpdateUrl({ searchFilter: state.searchFilters, searchTerm: state.searchTerm }));
    }
  }

  @Action(UpdateUrl)
  private updateURL(ctx: StateContext<SearchStateModel>, action: UpdateUrl) {
    const update = action.update;
    const params: { [key: string]: string | null } = {};
    const routeState = this.store.selectSnapshot(RouterState.state);
    // For Unit Testing
    // Maybe this is a solution to not modify production code: https://github.com/ngxs/store/blob/master/packages/router-plugin/tests/router.plugin.spec.ts
    if (routeState == undefined) {
      return;
    }
    const routeSnapshot: ActivatedRouteSnapshot = routeState.root;
    if (update.searchFilter != null) {
      update.searchFilter.forEach(filter => {
        params[filter.filterColumn] = filter.filterValue;
      });
      // Remove Query Params that are not used anymore by setting them 'null' explicitly
      if (routeSnapshot.firstChild != null && routeSnapshot.firstChild.firstChild != null) {
        const queryParams = routeSnapshot.firstChild.firstChild.queryParams;
        Object.keys(queryParams).forEach(queryParamKey => {
          if (params[queryParamKey] == null) {
            if (!isSortKey(queryParamKey)) {
              params[queryParamKey] = null;
            }
          }
        });
      }
    }
    if (update.tableSort != null) {
      if (update.tableSort.direction !== PhonebookSortDirection.none) {
        params.sortColumn = update.tableSort.column ? update.tableSort.column : null;
        params.sortDirection = update.tableSort.direction;
      } else {
        params.sortColumn = null;
        params.sortDirection = null;
      }
    }
    if (update.searchTerm == null && routeSnapshot.firstChild != null && routeSnapshot.firstChild.firstChild != null) {
      update.searchTerm = routeSnapshot.firstChild.firstChild.params.keyword;
    }

    return this.store.dispatch(
      new Navigate(['search', update.searchTerm || ''], params, {
        queryParamsHandling: 'merge'
      })
    );
  }
}

/**
 * Determines if the Key given is a reserved Key for the sorting parameters of the Table Component
 * @param key queryParameterKey
 */
function isSortKey(key: string): boolean {
  if (key === 'sortDirection' || key === 'sortColumn') {
    return true;
  } else {
    return false;
  }
}
