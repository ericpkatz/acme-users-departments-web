import React from 'react';
import { HashRouter, Route, Link } from 'react-router-dom';
import { parseError } from './utils';

export default class CreateForm extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      name: '',
      entity: 'department',
      error: ''
    };
    this.onChange = this.onChange.bind(this);
    this.onCreate = this.onCreate.bind(this);
    /*
    this.onCancel = this.onCancel.bind(this);
    this.onDestroy = this.onDestroy.bind(this);
    */
  }
  async onCreate(ev){
    ev.preventDefault();
    try {
      await this.props.onCreate(this.props.match ? this.props.match.params.id : '', this.state.entity, this.state.name, this.props.history);
      this.setState({ name: '', error: '' });
    }
    catch(ex){
      this.setState({ error: parseError(ex) });
    }
  }
  onChange(ev){
    this.setState({ [ev.target.name]: ev.target.value });
  }
  render(){
    const { entity, name, error } = this.state;
    const { onChange, onCreate } = this;
    return (
      <div>
      { !!error && <div className='error'>{ error }</div> }
      <form onSubmit={ onCreate } id='createForm'>
        <div>
          Department
          <input type='radio' checked={ entity === 'department'} name='entity' value='department' onChange={ onChange }/>
        </div>
        <div>
          User
          <input type='radio' name='entity' value='user' checked={ entity === 'user' } onChange={ onChange }/>
        </div>
        <input name='name' onChange={ onChange } value={ name } />
        <button>Create { entity }</button>
      </form>
      </div>
    );
  }
}

