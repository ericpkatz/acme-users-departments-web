import React, { Fragment } from 'react';
import { HashRouter, Route, Link } from 'react-router-dom';
import { parseError } from './utils';

export default class User extends React.Component{
  constructor(props){
    super(props);
    const user = this.props.user;
    const state = this.getInitialState(user);
    this.state = state;
    this.onChange = this.onChange.bind(this);
    this.onSave = this.onSave.bind(this);
    this.onCancel = this.onCancel.bind(this);
  }
  getInitialState(user){
    return {
      name: user.name,
      departmentId: user.departmentId || '',
      error: ''
    };
  }
  onCancel(ev){
    this.setState(this.getInitialState(this.props.user));

  }
  async onSave(ev){
    try{
      const user = {...this.state, id: this.props.user.id};
      await this.props.onUpdate(user);
      this.setState({ error: '' });
    }
    catch(ex){
      console.log(ex);
      this.setState({ error: parseError(ex)});
    }
  }
  onChange(ev){
    this.setState({ [ev.target.name]: ev.target.value });
  }
  render(){
    const { user, departments, onDestroy } = this.props;
    const { name, departmentId, error } = this.state;
    const { onChange, onSave, onCancel } = this;
    const changedName = name !== this.props.user.name;
    const changedDepartment = this.props.user.departmentId !== departmentId && (
      this.props.user.departmentId || departmentId
    );
    const changed = changedName || changedDepartment;
    

    return (
      <div className='user'>
        <div className='row'>
        <input name='name' onChange={ onChange} value ={ name } type='text'/>
        <select name='departmentId' value={ departmentId } onChange={ onChange }>
        <option value=''>-- none --</option>
        {
          departments.map( department => <option key={ department.id} value={ department.id }>{ department.name }</option>)
        }
        </select>
        {
         changed && (
           <Fragment>
            <button onClick={ onSave }>Save</button>
            <button onClick={ onCancel } className='warning'>Cancel</button>
           </Fragment>
         )
        }
        <button onClick={ onDestroy } className='danger'>Destroy</button>
        </div>
        { !!error && <div className='error'>{ error }</div> }
      </div>
    );
  }
}
