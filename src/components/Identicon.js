import React, { PropTypes } from 'react';
import { map, range, addIndex  } from 'ramda';
import crypto from 'crypto';

const Identicon = props => {
  const { size, string } = props;
  const hash = crypto.createHash('md5').update(string).digest().toString('binary');

  const color =
    "#" +
    (hash.charCodeAt(0).toString(16) + '00').substr(0,2) +
    (hash.charCodeAt(1).toString(16) + '00').substr(0,2) +
    (hash.charCodeAt(2).toString(16) + '00').substr(0,2);

  // Mirror the identicon in the middle
  const cols = map(
    n => map(i => hash.charCodeAt(n) & 1 << i, range(0, 5)),
    [3,4,5,4,3]
  );

  const mapIndexed = addIndex(map);

  const rects = mapIndexed(
    (col, x) => mapIndexed(
      (value, y) => value ?
        <rect x={x * size} y={y * size}
              width={size} height={size}
              fill={color}/> :
        undefined,
      col
    ),
    cols
  );

  return (
    <svg className="media-object" xmlns="http://www.w3.org/2000/svg" width={size * 5} height={size * 5}>  
      {rects}
    </svg>
  );
};

export default Identicon;
