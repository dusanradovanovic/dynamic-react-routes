import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Link, useLocation, useParams } from 'react-router-dom';
import { RouteConf } from './types';
import { RouteList } from './RouteList';
import { RouteEditor } from './RouteEditor';

import './App.scss';

const App: React.FC = () => {
  const [routes, setRoutes] = useState<RouteConf[]>([
    {
      path: '/',
      component: 'ComponentA'
    },
    {
      path: '(/about|/contact)',
      component: 'ComponentB'
    },
  ]);

  const handleRouteAdded = (newRoute: RouteConf) => {
    setRoutes([...routes, newRoute]);
  };

  const handleRouteDeleted = (route: RouteConf) => {
    setRoutes([...routes.filter(r => r !== route)]);
  };

  return (
    <Router>
      <div className="app-component">
        <div className="routes-section">
          <RouteList routes={routes} onDeleteRoute={handleRouteDeleted} />
          <RouteEditor routes={routes} onRouteAdded={handleRouteAdded} />
        </div>
        <div className="components-section">
          <div className="links">
            <Link to="/">/</Link>
            <Link to="/about">/about</Link>
            <Link to="/contact">/contact</Link>
            <Link to="/product/123">/product/123</Link>
            <Link to="/product/456">/product/456</Link>
            <Link to="/category/abc">/category/abc</Link>
            <Link to="/category/xyz">/category/xyz</Link>
            <Link to="/other">/other</Link>
          </div>
          <div className="components">
            <Switch>
              {routes.map(r => (
                <Route key={r.path} exact={true} path={r.path} component={selectComponent(r.component)} />
              ))}
              <Route path="*" >
                404 error...
              </Route>
            </Switch>
          </div>
        </div>
      </div>
    </Router>
  );
}

function selectComponent(name: string): React.FC | undefined {
  switch (name) {
    case 'ComponentA': return ComponentA;
    case 'ComponentB': return ComponentB;
    case 'ComponentC': return ComponentC;
  }

  return undefined;
}

const ComponentA: React.FC = () => (
  <div className="dyn-comp component-a">
    <div className="component-name">ComponentA</div>
    <RouteInfo />
  </div>
);

const ComponentB: React.FC = () => (
  <div className="dyn-comp component-b">
    <div className="component-name">ComponentB</div>
    <RouteInfo />
  </div>
);

const ComponentC: React.FC = () => (
  <div className="dyn-comp component-c">
    <div className="component-name">ComponentC</div>
    <RouteInfo />
  </div>
);

const RouteInfo: React.FC = () => {
  const location = useLocation();
  const params = useParams<any>();

  return (
    <div className="route-info-component">
      <div className="path">
        Path: {location.pathname}
      </div>
      <div className="params">
        Params:
        {Object.keys(params).map((k) => (
          <div className="key-value">
            <span className="key">{k}</span>
            {': '}
            <span className="value">{params[k]}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
