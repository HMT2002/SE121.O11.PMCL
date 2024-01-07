import React, { useEffect, useState } from 'react';

import { Link, useLocation } from 'react-router-dom';

import '../../Styles/SearchBar.css';

const SearchItem = (props) => {
  return (
    <React.Fragment>
      <div className="search-item">
        {/* <Link className="search-item__link" to={`/thread/${props.thread.slug}`}>
          <img className="search-item__thumbnail" alt="thumbnail" src={props.thread.video.thumbLink} />
          <div>
            <div className="flex center-content-cross" style={{ marginBlock: '0.1rem' }}>
              <div className="search-item__title">{props.thread.title}</div>
              <div className="search-item__creator-name" style={{ width: 'fit-content', marginInline: '0.5rem' }}>
                |
              </div>
              <img className="search-item__creator-avatar" alt="Creator Avatar" src={props.thread.user.photo.link} />
              <div className="search-item__creator-name">{props.thread.user.username}</div>
            </div>
            <div className="search-item__content">{props.thread.content}</div>
          </div>
        </Link> */}
      </div>
    </React.Fragment>
  );
};

const SearchBar = () => {
  const [searchValue, setSearchValue] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const [isFocus, setIsFocus] = useState(false);

  const location = useLocation();

  useEffect(() => {
    setSearchValue('');
    setSearchResults([]);
  }, [location.pathname]);

  useEffect(() => {}, [searchValue]);

  return (
    <React.Fragment>
      <div className="search-bar">
        {/* <input
          placeholder="Search"
          value={searchValue}
          onChange={(event) => setSearchValue(event.target.value)}
          onFocus={() => setIsFocus(true)}
        />
        {isFocus && (
          <div className="search-item__container" autoFocus onBlur={() => setIsFocus(false)}>
            {searchResults}
          </div>
        )} */}
      </div>
    </React.Fragment>
  );
};

export default SearchBar;
