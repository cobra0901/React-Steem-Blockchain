import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean } from '@storybook/addon-knobs';
import NativeSelect from './index';
import { Center } from '../Tooltip.story';
import tt from 'counterpart';


const opts = topic => [
    {
        value: 'trending',
        label: tt('main_menu.trending'),
        link: `/trending/${topic}`,
    },
    {
        value: 'created',
        label: tt('g.new'),
        link: `/created/${topic}`,
    },
    {
        value: 'hot',
        label: tt('main_menu.hot'),
        link: `/hot/${topic}`,
    },
    {
        value: 'promoted',
        label: tt('g.promoted'),
        link: `/promoted/${topic}`,
    },
];

storiesOf('Elements', module)
    .addDecorator(withKnobs)
    .add('NativeSelect', () => (
        <Center>
            <NativeSelect
                className={'Rat'}
                onChange={(arfff) =>{ console.log('arg', arfff)}}
                options={opts('cool')}
            />
        </Center>
    ));
