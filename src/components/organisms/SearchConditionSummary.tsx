import Stack from '@mui/material/Stack';
import { SxProps, Theme, useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import React from 'react';

import { FluxContext } from '../../flux/context';
import { SearchTypeAndWords } from '../molecules/SearchTypeAndWords';
import { ShowAllCharactersSwitch } from '../molecules/ShowAllCharactersSwitch';

interface Props {
  /**
   * テーマ関係のスタイル指定
   */
  sx?: SxProps<Theme>;
}

export const SearchConditionSummary: React.FC<Props> = ({ sx }) => {
  const { state, dispatch } = React.useContext(FluxContext);
  const { words, showAll } = state.search;
  const { character } = state.metadata;
  const onChangeSwitch = React.useCallback(
    (showAll: boolean) => {
      dispatch({ type: 'change-show-all', showAll });
    },
    [dispatch]
  );
  const nameWords = words.name;
  const tagWords = Array.from(
    new Set(
      Object.entries(words)
        .filter(([key]) => key !== 'name')
        .flatMap(([, words]) => words)
    )
  );
  const theme = useTheme();
  const isTabletOrDesktop = useMediaQuery(theme.breakpoints.up('sm'));

  return (
    <Stack
      direction={isTabletOrDesktop ? 'row' : 'column'}
      alignItems={isTabletOrDesktop ? 'center' : 'stretch'}
      justifyContent={isTabletOrDesktop ? 'space-between' : 'flex-start'}
      sx={sx}
    >
      <SearchTypeAndWords nameWords={nameWords} tagWords={tagWords} />
      <ShowAllCharactersSwitch
        checked={showAll}
        character={character}
        onChange={onChangeSwitch}
      />
    </Stack>
  );
};