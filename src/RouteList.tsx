import React from 'react';
import { RouteConf } from './types';

import './RouteList.scss';

interface RouteListProps {
  routes: RouteConf[];
  onDeleteRoute: (route: RouteConf) => void;
}

export const RouteList: React.FC<RouteListProps> = (props) => {
  return (
    <div className="routes-list-component">
      {props.routes.map((route) => (
        <div key={route.path} className="route">
          <div className="route-content">
            <div className="field">
              <div className="field-name">Path:</div>
              <div className="field-value">{route.path}</div>
            </div>
            <div className="field">
              <div className="field-name">Component:</div>
              <div className="field-value">{route.component}</div>
            </div>
          </div>
          <button className="delete-btn" onClick={() => props.onDeleteRoute(route)}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};
