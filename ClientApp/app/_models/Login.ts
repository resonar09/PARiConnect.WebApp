

export const Login = 
{
  settings: {
    label: 'Settings',
    title: 'Login',
    logo: require('../assets/images/pic_logo_small.png'),
    // subtitle: '',
    background: 'bg-light',
    debug: false,
    layout: 'two-column'
    //,submit: ''
  },
  controls: {
    email: {
      label: 'Email',
      placeholder: 'Please enter your email.',
      value: '',
      type: 'email',
      validation: {
        required: true
      }
    },
    password: {
      label: 'Password',
      value: '',
      placeholder: 'Please enter your password.',
      type: 'password',
      validation: {
        required: true
      }
    }
  },
  buttons: {
    login: {
      label: 'Login',
      type: 'submit',
      class: 'btn-primary'
      //, click: this.clickEventLogin

    },
    cancel: {
      label: 'Cancel',
      type: 'cancel',
      class: 'btn-secondary'

    }
  }
}

