import React from 'react';

// reactstrap components
import { Spinner } from 'reactstrap';
import { IPageChange } from '../../models/page-change.interface';

// core components

export default function PageChange(props: IPageChange) {
  return (
    <div>
      <div className="page-transition-wrapper-div">
        <div className="page-transition-icon-wrapper mb-3">
          <Spinner
            color="white"
            style={{ width: '6rem', height: '6rem', borderWidth: '.3rem' }}
          />
        </div>
        <h4 className="title text-white">
          Loading page contents for: {props.path}
        </h4>
      </div>
    </div>
  );
}
