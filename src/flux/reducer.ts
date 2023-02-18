import { Reducer } from 'react';

import { Action } from './action';
import {
  onChangeSearchWords,
  onChangeShowAll,
  onChangeSortOrder,
  onClickTag,
  onLoadShipsData,
  onShowNextPage,
} from './dispatch';
import { State } from './state';

export const reducer: Reducer<State, Action> = (state, action) => {
  switch (action.type) {
    case 'load-ships-data':
      return onLoadShipsData(state, action.shipsData, action.newShips);
    case 'change-search-words':
      return onChangeSearchWords(
        state,
        action.target,
        action.words,
        action.newTarget
      );
    case 'change-show-all':
      return onChangeShowAll(state, action.showAll);
    case 'change-sort-order':
      return onChangeSortOrder(state, action.sortOrder);
    case 'click-tag':
      return onClickTag(state, action.label);
    case 'show-next-page':
      return onShowNextPage(state);
    default:
      throw new Error('Invalid dispatch action');
  }
};
