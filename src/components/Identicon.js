import React, { PropTypes } from 'react';
import { join, map, range, addIndex  } from 'ramda';
import crypto from 'crypto';

const Identicon = ({ size, string }) => {
  const hash = crypto.createHash('md5').update(string).digest().toString('binary');

  const color =
    "#" +
    join("", map(
      i => (hash.charCodeAt(i).toString(16) + '00').substr(0,2),
      range(0, 3)
    ));


  // Mirror the identicon in the middle
  const cols = map(
    n => map(i => hash.charCodeAt(n) & 1 << i, range(0, 5)),
    [3,4,5,4,3]
  );

  const mapIndexed = addIndex(map);

  const rects = mapIndexed(
    (col, x) => mapIndexed(
      (value, y) => <rect x={x * size} y={y * size} width={size} height={size}
                          fill={value ? color : "white"}/>,
      col
    ),
    cols
  );

  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size * 5} height={size * 5}>  
      {rects}
    </svg>
  );
};

Identicon.propTypes = {
  size: PropTypes.number.isRequired,
  string: PropTypes.string.isRequired
};

export default Identicon;
