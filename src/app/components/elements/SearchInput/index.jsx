import React from 'react';
import tt from 'counterpart';

const SearchInput = () => (
    <form className="input-group" action="/static/search.html" method="GET">

        <button
            className="input-group-button"
            href="/static/search.html"
            type="submit"
            title={tt('g.search')}
        >
            <svg
                className="nav__item nav__icon nav__icon--search icon"
                viewBox="0 0 34 34"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
            >
                <title>Search icon</title>
                <g
                    className="icon__search"
                    stroke="none"
                    strokeWidth="1"
                    fill="none"
                    fillRule="evenodd"
                    transform="translate(-246.000000, -15.000000)"
                >
                    <g transform="translate(247.000000, 16.000000)">
                        <g id="search">
                            <circle
                                className="icon-svg__border"
                                cx="16"
                                cy="16"
                                r="16"
                            />
                            <path
                                d="M14.3681591,18.5706017 L11.3928571,21.6 L14.3681591,18.5706017 C13.273867,17.6916019 12.5714286,16.3293241 12.5714286,14.8 C12.5714286,12.1490332 14.6820862,10 17.2857143,10 C19.8893424,10 22,12.1490332 22,14.8 C22,17.4509668 19.8893424,19.6 17.2857143,19.6 C16.1841009,19.6 15.1707389,19.215281 14.3681591,18.5706017 Z"
                                className="icon-svg__shape"
                            />
                        </g>
                    </g>
                </g>
            </svg>
        </button>


        <input
            className="input-group-field"
            type="text"
            placeholder="search"
            name="q"
            autoComplete="off"
        />
    </form>
);

export default SearchInput;
