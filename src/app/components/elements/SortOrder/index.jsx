import React, { Component } from 'react';
import PropTypes from 'prop-types';
import tt from 'counterpart';
import Select from 'react-select';
import { Link } from 'react-router';
import { browserHistory } from 'react-router';
import NativeSelect from 'app/components/elements/NativeSelect';

const SortOrder = ({
    topic,
    sortOrder,
    horizontal,
    nativeClassName,
    reactSelectClassName,
}) => {
    const makeRoute = (topic, sort) =>
        topic ? `/${sort.value}/${topic}` : `/${sort.value}`;

    const handleChange = topic => sort => {
        console.log('SORT', sort);
        const route = topic ? `/${sort.value}/${topic}` : `/${sort.value}`;
        browserHistory.replace(makeRoute(topic, sort));
    };

    const handleNativeChange = topic => e => {
        console.log(topic);
        //const sort = e.target.value
        //browserHistory.replace(makeRoute(topic, sort));
    };

    const sorts = topic => [
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

    return horizontal ? (
        <ul className="nav__block-list">
            {sorts(topic).map(i => {
                return (
                    <li
                        key={i.value}
                        className={`nav__block-list-item ${
                            i.value === sortOrder
                                ? 'nav__block-list-item--active'
                                : ''
                        }`}
                    >
                        <Link to={i.link}>{i.label}</Link>
                    </li>
                );
            })}
        </ul>
    ) : (
        <span>
            <Select
                name="select-topic"
                className={`react-select ${reactSelectClassName}`}
                value={sortOrder}
                onChange={handleChange(topic)}
                options={sorts(topic)}
                clearable={false}
                autosize={false}
                scrollMenuIntoView={false}
                searchable={false}
            />
            <span className={nativeClassName}>
                <NativeSelect
                    options={sorts(topic)}
                    onChange={handleChange(topic)}
                />
            </span>
        </span>
    );
};

SortOrder.propTypes = {
    topic: PropTypes.string,
    sortOrder: PropTypes.string,
    horizontal: PropTypes.bool,
    nativeClassName: PropTypes.oneOf(['show-for-small-only']),
    reactSelectClassName: PropTypes.oneOf(['show-for-medium']),
};

SortOrder.defaultProps = {
    horizontal: false,
    topic: '',
    sortOrder: 'trending',
    nativeClassName: 'show-for-small-only',
    reactSelectClassName: 'show-for-medium',
};

export default SortOrder;
