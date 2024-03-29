import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { SxProps, Theme } from '@mui/material/styles';
import React from 'react';
import InfiniteScroller from 'react-infinite-scroller';

import { FluxContext } from '../../flux/context';
import { TagCategory } from '../../lib/tag-category';
import { ShipCard } from '../molecules/ShipCard';

type Props = {
  /**
   * テーマ関連のスタイル指定
   */
  sx: SxProps<Theme>;
};

export const SearchResults: React.FC<Props> = ({ sx }) => {
  const { state, dispatch } = React.useContext(FluxContext);
  const { results: ships, page } = state.search;
  const onClickTag = React.useCallback(
    (category: TagCategory, tag: string) => {
      dispatch({ type: 'click-tag', category, tag });
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
    <Box sx={sx}>
      <Typography variant="h6" fontWeight="normal" mb={2}>
        検索結果: {ships.length}隻
      </Typography>
      <InfiniteScroller loadMore={loadMore} hasMore={hasMore}>
        {shownShips.length > 0 ? (
          <Grid container spacing={2}>
            {shownShips.map((ship) => (
              <Grid item key={ship.name} xs={12} sm={6} md={4}>
                <ShipCard ship={ship} onClickTag={onClickTag} />
              </Grid>
            ))}
          </Grid>
        ) : (
          <Typography
            variant="h6"
            component="p"
            color="GrayText"
            sx={{ textAlign: 'center' }}
          >
            検索結果がありません
          </Typography>
        )}
      </InfiniteScroller>
    </Box>
  );
};
