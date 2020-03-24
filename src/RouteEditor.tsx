import React from 'react';
import { FormikErrors, useFormik } from 'formik';
import { RouteConf } from './types';

import './RouteEditor.scss';

interface RouteEditorProps {
  routes: RouteConf[];
  onRouteAdded: (newRoute: RouteConf) => void;
}

export const RouteEditor: React.FC<RouteEditorProps> = (props) => {
  const formik = useFormik<RouteConf>({
    initialValues: {
      path: '',
      component: ''
    },
    validateOnChange: false,
    validateOnBlur: false,
    validate: (values) => {
      const errors: FormikErrors<RouteConf> = {};

      if (props.routes.filter(r => r.path === values.path.trim()).length > 0) {
        errors.path = `Route with path "${values.path.trim()}" already exists`;
      }

      if (values.path.trim() === '') {
        errors.path = `Route path cannot be empty`;
      }

      return errors;
    },
    onSubmit: (values, helper) => {
      props.onRouteAdded(values);
      helper.resetForm();
    },
  });

  return (
    <div className="route-editor-component">
      <h1 className="title">Add new route</h1>
      <form onSubmit={formik.handleSubmit}>
        <div className="form-field">
          <input className="form-field-input path" name="path" {...formik.getFieldProps('path')} />
          <span className="form-field-error path">{formik.errors.path}</span>
        </div>
        <div className="form-field">
          <select className="form-field-input" {...formik.getFieldProps('component')}>
            <option key="ComponentA">ComponentA</option>
            <option key="ComponentB">ComponentB</option>
            <option key="ComponentC">ComponentC</option>
          </select>
          <div className="form-field-error path">{formik.errors.component}</div>
        </div>
        <button type="submit">Add</button>
      </form>
    </div>
  );
};
