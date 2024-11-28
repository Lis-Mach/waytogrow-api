//role has default value : USER

const {roles}=require('../../config');


module.exports={
type: 'object',
properties:{
    name: {
        type: 'string'
    },
      surname: {
        type: 'string'
      },
        
      login: {
        type: 'string'
      },
        
      email: {
        type: 'string',
        pattern: "^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$"
      },

      password: {
        type: 'string'
      },
      
},

required:
[
    'name',
    'surname',
    'login',
    'email',
    'password'
],
additionalProperties:false

};