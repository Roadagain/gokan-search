import Button from '@mui/material/Button';
import { SxProps, Theme } from '@mui/material/styles';
import React from 'react';

import { TagCategory } from '../../lib/tag-category';

type Props = {
  /**
   * タグの種類
   */
  category: TagCategory;
  /**
   * タグ
   */
  tag: string;
  /**
   * クリック時の挙動
   * @param category - クリックされたタグの種類
   * @param tag - クリックされたタグ
   */
  onClick: (category: TagCategory, tag: string) => void;
  /**
   * テーマ関係のスタイル指定
   */
  sx?: SxProps<Theme>;
};

export const TagBadge: React.FC<Props> = ({ category, tag, onClick, sx }) => {
  const onClickButton = React.useCallback(
    (e: React.MouseEvent) => {
      // organisms/ShipCard のアコーディオンが反応しないよう伝播を止める
      e.stopPropagation();
      onClick(category, tag);
    },
    [onClick, category, tag]
  );
  return (
    <Button
      size="small"
      variant="outlined"
      onClick={onClickButton}
      sx={{ textTransform: 'none', ...sx }}
    >
      {tag}
    </Button>
  );
};
