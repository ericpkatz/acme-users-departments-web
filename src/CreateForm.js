import React from 'react';
import { HashRouter, Route, Link } from 'react-router-dom';
import { parseError } from './utils';

export default class CreateForm extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      name: '',
      entity: 'Department',
      error: ''
    };
    this.onChange = this.onChange.bind(this);
    this.onCreate = this.onCreate.bind(this);
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
      <form className='gold' onSubmit={ onCreate } id='createForm'>
        <h3>Create New { entity }</h3>
        <div className='radio-group'>
        {
          ['Department', 'User'].map( _entity=> (
            <label key={_entity}>
              { _entity }
              <input type='radio' checked={ entity === _entity } name='entity' value={ _entity } onChange={ onChange }/>
            </label>
          ))
        }
        </div>
        <input placeholder={`Enter name for ${entity}`} type='text' name='name' onChange={ onChange } value={ name } />
        <button>Create { entity }</button>
      { !!error && <div className='error'>{ error }</div> }
      </form>
      </div>
    );
  }
}

