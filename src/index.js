import React from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom';
import Departments from './Departments';
import Users from './Users';
import CreateForm from './CreateForm';
import { HashRouter, Route, Link } from 'react-router-dom';


class App extends React.Component{
  constructor(){
    super();
    this.state = {
      URL: localStorage.getItem('URL') || '',
      users: [],
      departments: [],
      error: ''
    };
    this.onChange = this.onChange.bind(this);
    this.setURL = this.setURL.bind(this);
    this.onUpdateDepartment = this.onUpdateDepartment.bind(this);
    this.onUpdateUser = this.onUpdateUser.bind(this);
    this.onDestroyDepartment = this.onDestroyDepartment.bind(this);
    this.onDestroyUser = this.onDestroyUser.bind(this);
    this.loadData = this.loadData.bind(this);
    this.onCreate = this.onCreate.bind(this);
  }
  async onCreate(id, entity, name, history){
    if(entity === 'User'){
      const user = { name };
      if(id){
        user.departmentId = id;
      }
      const { data } = await axios.post(`${this.state.URL}/api/users`, user);
      this.setState({ users: [...this.state.users, data ] });
    }
    if(entity === 'Department'){
      const { data } = await axios.post(`${this.state.URL}/api/departments`, { name });
      this.setState({ departments: [...this.state.departments, data ]});
      history.push(`/${data.id}`);
    }
  }
  async onDestroyDepartment(department, history){
    const updated = await axios.delete(`${this.state.URL}/api/departments/${department.id}`);
    this.loadData();
    history.push('/');
  }
  async onDestroyUser(user, history){
    const updated = await axios.delete(`${this.state.URL}/api/users/${user.id}`);
    this.loadData();
  }
  async onUpdateDepartment(department){
    const { data } = await axios.put(`${this.state.URL}/api/departments/${department.id}`, department);
    const departments = this.state.departments.map( _department => {
      if(_department.id === data.id){
        return data;
      }
      return _department;
    });
    this.setState({ departments });
  }
  async onUpdateUser(user, history){
    const { data } = await axios.put(`${this.state.URL}/api/users/${user.id}`, user);
    const users = this.state.users.map( _user => {
      if(_user.id === data.id){
        return data;
      }
      return _user;
    });
    this.setState({ users });
    history.push(`/${data.departmentId ? data.departmentId : ''}`);
  }
  setURL(ev){
    ev.preventDefault();
    localStorage.setItem('URL', this.state.URL);
    this.loadData();
  }
  onChange(ev){
    this.setState({[ev.target.name]: ev.target.value});
  }
  componentDidMount(){
    this.loadData();
  }
  async loadData(){
    try{
       const [ userResponse, departmentsResponse ] = await Promise.all([
        axios.get(`${this.state.URL}/api/users`),
        axios.get(`${this.state.URL}/api/departments`)
      ]);
      this.setState({ users: userResponse.data, departments: departmentsResponse.data, error: ''});
    }
    catch(ex){
      console.log(ex);
      this.setState({ error: ex.message });
    }
  }
  render(){
    const { onChange, setURL, onUpdateDepartment, onDestroyDepartment, onCreate, onDestroyUser, onUpdateUser } = this;
    const { URL, error, users, departments } = this.state;
    
    return (
      <HashRouter>
        <h1><Link to='/'>Acme Users and Departments API</Link></h1>
        <div id='container'>
          <div id='left'>
          <form id='URL' onSubmit={ setURL } className='silk'>
            <h2>API Setup</h2>
            <div>
              Select an api which supports the following routes:
              <ul>
                <li>GET, POST, PUT, DELETE /api/users/[:id]</li>
                <li>GET, POST, PUT, DELETE /api/departments/[:id]</li>
                <li>Make sure your routes support cors</li>
              </ul>
            </div>
            <input type='text' name='URL' onChange={ onChange } value={ URL }/>
          { !!error && <div>{ error }</div>}
            <button>Save</button>
          </form>
          <Route path='/:id?' render={ ({ match, history })=> <CreateForm match={ match } history={ history } onCreate={ onCreate }/> } />
          </div>
          <div id='right'>
          <Route
            path='/:id?'
      render={({ match, history })=> <Departments match={ match } departments={ departments } users = { users } onUpdate={ onUpdateDepartment } onDestroy={ onDestroyDepartment } history={ history }/> }/>
        <Route
          path='/:id?'
          render={({ match, history })=> <Users match={ match } departments={ departments } users = { users } onDestroy={ onDestroyUser } history={ history } onUpdate={ onUpdateUser }/> } />
      { 
          false && (<div>
            <Route path='/:id?' render={ ({ match, history })=> <CreateForm match={ match } history={ history } onCreate={ onCreate }/> } />
          <Route
            path='/:id?'
      render={({ match, history })=> <Departments match={ match } departments={ departments } users = { users } onUpdate={ onUpdateDepartment } onDestroy={ onDestroyDepartment } history={ history }/> }/>
          <Route
            path='/:id?'
            render={({ match, history })=> <Users match={ match } departments={ departments } users = { users } onDestroy={ onDestroyUser } history={ history } onUpdate={ onUpdateUser }/> } />
          </div>
          )}
        </div>
        </div>
      </HashRouter>
    );
  }
}
const root = document.querySelector('#root');
ReactDOM.render(<App />, root);
