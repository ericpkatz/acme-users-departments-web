const parseError = (error)=> {
  const _error = error.response.data;
  if(_error.message){
    return _error.message;
  }
  if(_error.errors && Array.isArray(_error.errors)){
    return _error.errors[0].message;
  }
};
export {
  parseError
};
