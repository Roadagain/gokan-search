import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { SearchCondition } from '../../components/molecules/SearchCondition';
import { SearchTarget } from '../../lib/search-target';

const componentMeta: ComponentMeta<typeof SearchCondition> = {
  title: 'Molecules/SearchCondition',
  component: SearchCondition,
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
    texts: { control: 'object' },
    showAll: { control: 'boolean' },
    sx: { control: 'object' },
  },
};
export default componentMeta;

const Template: ComponentStory<typeof SearchCondition> = (args) => (
  <SearchCondition {...args} />
);

export const Condition = Template.bind({});
Condition.args = {
  target: SearchTarget.TAG,
  texts: ['あいうえお'],
  showAll: false,
  sx: {},
};
