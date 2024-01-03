import React from 'react';
import './NotifyItem.css';
import { Link } from 'react-router-dom';
import { bool } from 'prop-types';
import dogimg from '../../images/golden.png';
import axios from 'axios';
import documentimg from '../../images/documentimg.png';
import moment from 'moment';

export default function NotifyItem(props) {
  console.log(props);
  const notify = props.notify;
  const from = moment(notify.createdDate).startOf('hour').fromNow();
  console.log(from);
  return (
    <div className={`div-main${notify.isViewed ? '-viewed' : '-not-view'}`}>
      <div className={`div-content`}>{notify.content}</div>
      <div className={`div-timespan`}>{from}</div>
    </div>
  );
}
