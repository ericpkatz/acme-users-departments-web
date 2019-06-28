import React from 'react';
import { HashRouter, Route, Link } from 'react-router-dom';
import User from './User';

export default ({ match, users, departments, onDestroy, history, onUpdate })=> {
   const filtered = users.filter( user => (!match.params.id && !user.departmentId) || (match.params && match.params.id === user.departmentId));
  return (
    <div>
      <h2>Users</h2>
      {
        !filtered.length && <div>There are no users for this department</div>
      }
      <div id='users'>
        {
          filtered.map( user => <User key={ user.id } user={ user } departments={ departments } onDestroy={ ()=> onDestroy(user) } onUpdate={(user)=> onUpdate(user, history)}/>)
        }
      </div>
    </div>
  );
};
