import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { parseError } from './utils';

export default class Department extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      name: this.props.department.name,
      error: ''
    };
    this.onSave = this.onSave.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.onDestroy = this.onDestroy.bind(this);
  }
  onDestroy(ev){
    this.props.onDestroy();
  }
  onCancel(ev){
    this.setState({ name: this.props.department.name, error: '' });
  }
  onChange(ev){
    this.setState({ [ev.target.name] : ev.target.value });
  }
  async onSave(ev){
    try {
      await this.props.onUpdate({...this.props.department, name: this.state.name});
      this.setState({ error: '' });
    }
    catch(ex){
      this.setState({ error: parseError(ex)});
    }
  }
  componentDidUpdate(prevProps){
    if(prevProps.selectedId !== this.props.selectedId){
      this.setState({ name: this.props.department.name });
    }
  }
  render(){
    const { department, selected, users } = this.props;
    const { name, error } = this.state;
    const { onSave, onChange, onCancel, onDestroy } = this;
    const count = users.filter(user => user.departmentId === department.id).length;
    if(!selected){
      return (
          <div>
            <Link to={`/${department.id}`}>{ department.name } ({ count })</Link>
          </div>
      );
    }
    else {
      const changed = this.props.department.name !== name;
      return (
          <div className='selected'>
            <div>
              <input type='text' className='block' value={ name } onChange={ onChange } name='name'/> ({ count })
            </div>
            {
              changed && (
                <Fragment>
                  <button onClick={ onCancel } className='warning block'>Cancel</button>
                  <button onClick={ onSave } className='block'>Save</button>
                </Fragment>
              )

            }
            <button onClick={ onDestroy } className='danger block'>Destroy</button>
            {
              error && <div className='error'>{ error }</div>
            }
        </div>
      );
    }
  }
}
