import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import { CharactersSearcher } from '../../components/organisms/CharactersSearcher';
import { TaggedCharacter } from '../../lib/tagged-character';

export interface Props {
  characters: TaggedCharacter[];
}

export const SearchTemplate: React.FC<Props> = ({ characters }) => (
  <Container sx={{ py: 2 }}>
    <Typography variant="h5">コンパチサーチ</Typography>
    <Box sx={{ mt: 2 }}>
      <CharactersSearcher characters={characters} />
    </Box>
  </Container>
);