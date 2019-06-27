import React from 'react';
import { HashRouter, Route, Link } from 'react-router-dom';

export default class User extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      name: this.props.user.name,
      departmentId: this.props.user.departmentId || ''
    };
    this.onChange = this.onChange.bind(this);
    this.onSave = this.onSave.bind(this);
  }
  onSave(ev){
    const user = {...this.state, id: this.props.user.id};
    this.props.onUpdate(user);
  }
  onChange(ev){
    this.setState({ [ev.target.name]: ev.target.value });
  }
  render(){
    const { user, departments, onDestroy } = this.props;
    const { name, departmentId } = this.state;
    const { onChange, onSave } = this;
    const changed = name !== this.props.user.name || this.props.user.departmentId !== departmentId;
    return (
      <div className='user'>
        <input name='name' onChange={ onChange} value ={ name } />
        <select name='departmentId' value={ departmentId } onChange={ onChange }>
        <option value=''>-- none --</option>
        {
          departments.map( department => <option key={ department.id} value={ department.id }>{ department.name }</option>)
        }
        </select>
        {
         changed && <button onClick={ onSave }>Save</button>
        }
        <button onClick={ onDestroy }>Destroy</button>
      </div>
    );
  }
}
