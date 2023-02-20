import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Stack from '@mui/material/Stack';
import { SxProps, Theme } from '@mui/material/styles';
import React from 'react';

import { Ship } from '../../lib/ship';
import { TagBadge } from '../atoms/TagBadge';

interface Props {
  /**
   * 艦船データ
   */
  ship: Ship;
  /**
   * タグクリック時のハンドラ
   * @param tagLabel - タグ
   */
  onClickTag: (tagLabel: string) => void;
  /**
   * テーマ関係のスタイル指定
   */
  sx?: SxProps<Theme>;
}

export const ShipCard: React.FC<Props> = ({ ship, onClickTag, sx }) => {
  const { category, type, speed, range, equipments, abilities } = ship;
  const tags = [category, type, speed, range, ...equipments, ...abilities];
  const uniqueTags = Array.from(new Set(tags));
  return (
    <Card elevation={2} sx={sx}>
      <CardHeader title={ship.name} />
      <CardContent>
        {/* スクロールバーがタグと被らないように下部余白を確保する */}
        <Box pb={1} sx={{ overflowX: 'scroll' }}>
          <Stack
            direction="row"
            spacing={1}
            sx={{ display: 'inline-block', whiteSpace: 'nowrap' }}
          >
            {uniqueTags.map((tag) => (
              <TagBadge key={tag} onClick={onClickTag}>
                {tag}
              </TagBadge>
            ))}
          </Stack>
        </Box>
      </CardContent>
    </Card>
  );
};
