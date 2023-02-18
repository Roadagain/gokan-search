import { generateNewAutocompleteOptions } from '../lib/autocomplete';
import { filterNewShips, filterShips } from '../lib/filter-ships';
import { SearchType } from '../lib/search-target';
import { NewShip, Ship } from '../lib/ship';
import { ShipsData } from '../lib/ships-data';
import { SortOrder, sortShips } from '../lib/sort-ships';
import {
  onChangeSearchWords,
  onChangeShowAll,
  onChangeSortOrder,
  onClickTag,
  onLoadShipsData,
  onShowNextPage,
} from './dispatch';
import { State } from './state';

jest.mock('../lib/filter-ships');
jest.mock('../lib/sort-ships');
jest.mock('../lib/autocomplete');

const baseState: Readonly<State> = {
  isReady: false,
  ships: [],
  newShips: [],
  search: {
    info: {
      autocompleteOptions: {},
      targets: [],
      newAutocompleteOptions: {
        names: [],
        categories: [],
        types: [],
        speeds: [],
        ranges: [],
        equipments: [],
        abilities: [],
      },
    },
    words: {},
    newWords: {
      names: [],
      categories: [],
      types: [],
      speeds: [],
      ranges: [],
      equipments: [],
      abilities: [],
    },
    showAll: false,
    sortOrder: SortOrder.ID,
    results: [],
    newResults: [],
    page: 1,
  },
};

describe('onLoadShips', () => {
  const currentState: State = {
    ...baseState,
    isReady: false,
    ships: [],
  };
  let nextState: State;
  const shipShowDefault: Ship = {
    id: 1,
    name: 'name',
    kana: 'name',
    tags: [
      {
        category: 'category',
        label: 'label',
      },
    ],
    showDefault: true,
  };
  const shipHiddenDefault: Ship = {
    id: 2,
    name: 'name-hidden',
    kana: 'name-hidden',
    tags: [
      {
        category: 'category',
        label: 'label',
      },
      {
        category: 'category2',
        label: 'hidden',
      },
    ],
    showDefault: false,
  };
  const ships: Ship[] = [shipShowDefault, shipHiddenDefault];
  const shipsData: ShipsData = {
    ships,
  };
  const newShips: NewShip[] = [{} as NewShip];

  beforeEach(() => {
    nextState = onLoadShipsData(currentState, shipsData, newShips);
  });

  it('準備完了フラグが変更されている', () => {
    expect(nextState.isReady).toBeTruthy();
  });

  it('艦船が変更されている', () => {
    expect(nextState.ships).toEqual(ships);
    expect(nextState.newShips).toEqual(newShips);
  });

  it('補完候補生成関数が呼び出されている', () => {
    expect(generateNewAutocompleteOptions).toBeCalled();
  });

  it('フィルタ関数が呼び出されている', () => {
    expect(filterShips).toBeCalled();
    expect(filterNewShips).toBeCalled();
  });
});

describe('onChangeSearchWords', () => {
  const currentState: State = {
    ...baseState,
    search: {
      ...baseState.search,
      words: {
        name: ['sample'],
        test: ['test'],
      },
      newWords: {
        names: ['sample'],
        categories: ['test'],
        types: [],
        speeds: [],
        ranges: [],
        equipments: [],
        abilities: [],
      },
      page: 4,
    },
  };
  let nextState: State;

  describe('名前が対象のとき', () => {
    const words = ['word', 'sample'];
    beforeEach(() => {
      nextState = onChangeSearchWords(
        currentState,
        { type: SearchType.NAME },
        words,
        'names'
      );
    });

    it('名前の検索ワードが変更されている', () => {
      expect(nextState.search.words.name).toEqual(words);
      expect(nextState.search.newWords.names).toEqual(words);
    });

    it('ページがリセットされている', () => {
      expect(nextState.search.page).toBe(1);
    });

    it('フィルタ関数が呼び出されている', () => {
      expect(filterShips).toBeCalled();
      expect(filterNewShips).toBeCalled();
    });
  });

  describe('タグカテゴリが対象のとき', () => {
    const words = ['word', 'sample'];
    beforeEach(() => {
      nextState = onChangeSearchWords(
        currentState,
        { type: SearchType.TAG, category: 'test' },
        words,
        'categories'
      );
    });

    it('指定したタグカテゴリの検索ワードが変更されている', () => {
      expect(nextState.search.words.test).toEqual(words);
      expect(nextState.search.newWords.categories).toEqual(words);
    });

    it('ページがリセットされている', () => {
      expect(nextState.search.page).toBe(1);
    });

    it('フィルタ関数が呼び出されている', () => {
      expect(filterShips).toBeCalled();
      expect(filterNewShips).toBeCalled();
    });
  });
});

describe('onChangeShowAll', () => {
  let nextState: State;

  describe.each`
    currentShowAll | newShowAll
    ${true}        | ${true}
    ${true}        | ${false}
    ${false}       | ${true}
    ${false}       | ${false}
  `(
    '現在の全キャラ表示フラグが $currentShowAll で変更後のフラグが $newShowAll の場合',
    ({ currentShowAll, newShowAll }) => {
      const currentState: State = {
        ...baseState,
        search: {
          ...baseState.search,
          showAll: currentShowAll,
          page: 3,
        },
      };

      beforeEach(() => {
        nextState = onChangeShowAll(currentState, newShowAll);
      });

      it('全キャラ表示フラグが変更後の値になっている', () => {
        expect(nextState.search.showAll).toBe(newShowAll);
      });

      it('ページがリセットされている', () => {
        expect(nextState.search.page).toBe(1);
      });

      it('フィルタ関数が呼び出されている', () => {
        expect(filterShips).toBeCalled();
        expect(filterNewShips).toBeCalled();
      });

      it('補完候補生成関数が呼び出されている', () => {
        expect(generateNewAutocompleteOptions).toBeCalled();
      });
    }
  );
});

describe('onChangeSortOrder', () => {
  let nextState: State;

  const currentState: State = {
    ...baseState,
    search: {
      ...baseState.search,
      sortOrder: SortOrder.ID,
    },
  };

  beforeEach(() => {
    nextState = onChangeSortOrder(currentState, SortOrder.KANA);
  });

  it('stateのソート順が変わっている', () => {
    expect(nextState.search.sortOrder).toBe(SortOrder.KANA);
  });

  it('艦船をソートする関数が呼ばれている', () => {
    expect(sortShips).nthCalledWith(1, currentState.ships, SortOrder.KANA);
    expect(sortShips).nthCalledWith(2, currentState.newShips, SortOrder.KANA);
  });

  it('検索結果をソートする関数が呼ばれている', () => {
    expect(sortShips).nthCalledWith(
      3,
      currentState.search.results,
      SortOrder.KANA
    );
    expect(sortShips).nthCalledWith(
      4,
      currentState.search.newResults,
      SortOrder.KANA
    );
  });
});

describe('onClickTag', () => {
  let nextState: State;
  const label = 'label';

  const currentState: State = {
    ...baseState,
    search: {
      ...baseState.search,
      info: {
        ...baseState.search.info,
        autocompleteOptions: {
          test: [label],
        },
      },
      words: {
        name: ['sample'],
        test: [],
      },
      page: 2,
    },
  };

  beforeEach(() => {
    nextState = onClickTag(currentState, label);
  });

  it('既存の検索ワードにクリックしたタグが追加されている', () => {
    expect(nextState.search.words).toEqual({
      ...currentState.search.words,
      test: [label],
    });
  });

  it('ページがリセットされている', () => {
    expect(nextState.search.page).toBe(1);
  });

  it('フィルタ関数が呼び出されている', () => {
    expect(filterShips).toBeCalled();
  });
});

describe('onShowNextPage', () => {
  let nextState: State;
  const currentState = {
    ...baseState,
    search: {
      ...baseState.search,
      page: 1,
    },
  };

  beforeEach(() => {
    nextState = onShowNextPage(currentState);
  });

  it('pageが1つ増えている', () => {
    expect(nextState.search.page).toBe(2);
  });
});
