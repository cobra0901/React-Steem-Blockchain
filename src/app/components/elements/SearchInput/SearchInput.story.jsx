import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean } from '@storybook/addon-knobs';
import SearchInput from './index';
import { Center } from '../Tooltip.story';

storiesOf('Elements', module)
    .addDecorator(withKnobs)
    .add('SearchInput', () => (
        <Center>
            <SearchInput />
        </Center>
    ));
