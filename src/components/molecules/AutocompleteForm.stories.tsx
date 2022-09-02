import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { AutocompleteForm } from './AutocompleteForm';
import { SearchTarget } from '../../lib/search-target';

const componentMeta: ComponentMeta<typeof AutocompleteForm> = {
  title: 'Molecules/AutocompleteForm',
  component: AutocompleteForm,
  argTypes: {
    target: {
      options: [SearchTarget.TAG, SearchTarget.NAME],
      control: {
        type: 'radio',
        labels: {
          [SearchTarget.TAG]: 'タグ',
          [SearchTarget.NAME]: '名前',
        },
      },
    },
    words: { control: 'object' },
    autocompleteOptions: { control: 'object' },
    sx: { control: 'object' },
  },
};
export default componentMeta;

const Template: ComponentStory<typeof AutocompleteForm> = (args) => (
  <AutocompleteForm {...args} />
);

export const SearchByTag = Template.bind({});
SearchByTag.args = {
  target: SearchTarget.TAG,
  words: [],
  autocompleteOptions: [
    { category: 'あ行', label: 'あいうえお' },
    { category: 'か行', label: 'かきくけこ' },
  ],
  sx: {},
};

export const SearchByName = Template.bind({});
SearchByName.args = {
  target: SearchTarget.NAME,
  words: [],
  autocompleteOptions: [{ label: 'さしすせそ' }, { label: 'たちつてと' }],
  sx: {},
};

export const InputtedWords = Template.bind({});
InputtedWords.args = {
  target: SearchTarget.TAG,
  words: ['あいうえお', 'なにぬねの'],
  autocompleteOptions: [
    { category: 'な行', label: 'なにぬねの' },
    { category: 'は行', label: 'はひふへほ' },
  ],
  sx: {},
};