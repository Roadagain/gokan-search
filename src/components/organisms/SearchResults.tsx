import Grid from '@mui/material/Grid';
import { SxProps, Theme } from '@mui/material/styles';
import React from 'react';
import InfiniteScroller from 'react-infinite-scroller';

import { FluxContext } from '../../flux/context';
import { ShipCard } from '../molecules/ShipCard';

interface Props {
  /**
   * テーマ関連のスタイル指定
   */
  sx: SxProps<Theme>;
}

export const SearchResults: React.FC<Props> = ({ sx }) => {
  const { state, dispatch } = React.useContext(FluxContext);
  const { results: ships, page } = state.search;
  const onClickTag = React.useCallback(
    (label: string) => {
      dispatch({ type: 'click-tag', label });
    },
    [dispatch]
  );
  const loadMore = React.useCallback(() => {
    // react-infinite-scrollerはpageをリセットできないためflux側で管理する
    dispatch({
      type: 'show-next-page',
    });
  }, [dispatch]);
  // 追加は12個ずつ
  // PCやタブレットだとファーストビューで12+α見えるため、初回だけ2ページ分表示する
  const shownShips = ships.slice(0, (page + 1) * 12);
  const hasMore = shownShips.length < ships.length;

  return (
    <InfiniteScroller loadMore={loadMore} hasMore={hasMore}>
      <Grid container spacing={2} sx={sx}>
        {shownShips.map(
          ({ name, category, type, speed, range, equipments, abilities }) => {
            const tags = [
              category,
              type,
              speed,
              range,
              ...equipments,
              ...abilities,
            ];
            return (
              <Grid item key={name} xs={12} sm={6} md={4}>
                <ShipCard name={name} tags={tags} onClickTag={onClickTag} />
              </Grid>
            );
          }
        )}
      </Grid>
    </InfiniteScroller>
  );
};
