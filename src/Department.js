import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

export default class Department extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      name: this.props.department.name
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
    this.setState({ name: this.props.department.name });
  }
  onChange(ev){
    this.setState({ [ev.target.name] : ev.target.value });
  }
  onSave(ev){
    this.props.onUpdate({...this.props.department, name: this.state.name});
    
  }
  componentDidUpdate(prevProps){
    if(prevProps.selectedId !== this.props.selectedId){
      this.setState({ name: this.props.department.name });
    }
  }
  render(){
    const { department, selected, users } = this.props;
    const { name } = this.state;
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
            <input value={ name } onChange={ onChange } name='name'/> ({ count })
            <br />
            {
              changed && (
                <Fragment>
                  <button onClick={ onCancel }>Cancel</button>
                  <button onClick={ onSave }>Save</button>
                </Fragment>
              )

            }
            <button onClick={ onDestroy } disabled={ false }>Destroy</button>
        </div>
      );
    }
  }
}
