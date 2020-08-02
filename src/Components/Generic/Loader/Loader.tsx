// Modules
import React from 'react';

// Styles
import './Loader.scss';

const Loader = (): JSX.Element => (
  <div className="loader-component">
    <img
      src="assets/loader.gif"
      alt="ourgarden-loader"
    />
  </div>
);

export {
  Loader,
};
