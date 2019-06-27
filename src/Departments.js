import React from 'react';
import { Link } from 'react-router-dom';
import Department from './Department';

export default ({ departments, users, match, onUpdate, onDestroy, history})=> {
  const count = users.filter( user => !user.departmentId).length;
  return (
    <div id='departments'>
      <div className={ !match.params.id ? 'selected': ''}><Link to='/'>No Department ({ count })</Link></div>
      {
        departments.map( department => <Department selected={ match.params.id === department.id } key={ department.id} department={ department } users = { users } selectedId={ match.params ? match.params.id : ''} onUpdate={ onUpdate } onDestroy={()=> onDestroy(department, history) }/>)
      }
    </div>
  );
};
