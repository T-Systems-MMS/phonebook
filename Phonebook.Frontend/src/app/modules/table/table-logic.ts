import { ColumnDefinitions } from 'src/app/shared/config/columnDefinitions';
import { Column } from 'src/app/shared/models';
import { Person } from 'src/app/shared/models/classes/Person';
import { PhonebookSortDirection } from 'src/app/shared/models/enumerables/PhonebookSortDirection';
import { TableSort } from 'src/app/shared/models/interfaces/TableSort';

/**
 * This Class Contains the Filter and Sort Logic of the User List.
 */
export class TableLogic {
  /**
   * Normal Filter Function
   * @param persons
   * @param filterString
   * @param columns
   */
  public static filter(persons: Person[], filterString: string, searchColumns: Column[]): Person[] {
    if (filterString === '') {
      return persons;
    }
    const searchString = TableLogic.prepareSearchString(filterString);

    return persons.filter(person => {
      for (let i = 0; i < searchColumns.length; i++) {
        if (searchColumns[i].filterFunction(searchString, person)) {
          return true;
        }
      }
      return false;
    });
  }

  public static sort(list: Person[], sort: TableSort): Person[] {
    const sortedArray = list.slice();
    const col = sort.column;
    if (col != null) {
      return sortedArray.sort((a, b) => {
        return col.sortFunction(a, b, sort.direction);
      });
    }
    return sortedArray;
  }

  /**
   * Ranked Sort Function
   * @param filterString The keyword you are ranking after.
   * @param columns Column enum with set Flags for each Column you want to search in.
   */
  public static rankedSort(list: Person[], rankString: string, columns: Column[]): Person[] {
    const rankedList: RankedListItem<Person>[] = list.map(person => {
      return new RankedListItem<Person>(person);
    });

    const searchString = TableLogic.prepareSearchString(rankString);

    // Generate the Search Rank
    for (let i = 0; i < rankedList.length; i++) {
      const x = rankedList[i];

      // Calculate the rank for all items.
      columns.forEach(col => {
        if (col.filterFunction(searchString, x.item)) {
          x.rank += col.rank;
        }
      });
    }

    return rankedList
      .sort((a, b) => {
        // Compare Rank
        const x = b.rank - a.rank;
        if (x === 0) {
          return ColumnDefinitions.fullname.sortFunction(a.item, b.item, PhonebookSortDirection.asc);
        } else {
          return x;
        }
      })
      .map(item => {
        return item.item;
      });
  }

  /**
   * Helper Functions
   */

  // From here: https://github.com/sindresorhus/escape-string-regexp
  public static escapeRegExp(str: string): RegExp {
    return new RegExp(str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&'), 'i');
  }

  /**
   * Prepares the Search String by
   * 1. Removing Commas
   * 2. Trimming whitespace
   * 3. Escaping RegEx Characters
   * @param str String to prepare
   */
  public static prepareSearchString(str: string): RegExp {
    return TableLogic.escapeRegExp(str.replace(/,/g, '').trim());
  }
}

class RankedListItem<T> {
  public rank: number;
  public item: T;

  constructor(item: T, rank: number = 0) {
    this.item = item;
    this.rank = rank;
  }
}
