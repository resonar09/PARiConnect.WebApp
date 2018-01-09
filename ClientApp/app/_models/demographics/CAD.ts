import { automateAge } from "../../_validators/age.automator";

export const CAD = {
  settings: {
    label: 'Settings',
    title: 'CAD',
    // subtitle: '',
    background: 'bg-light',
    debug: false,
    layout: ''
  },
  controls: {
    name: {
      label: 'Name',
      placeholder: 'Please enter your full name.',
      value: '',
      class:'',
      type: 'text',
      validation: {
        required: true
      }
    },
    dob: {
      label: 'Date',
      value: '',
      placeholder: '__/__/____',
      type: 'date',
      validation: {
        required: true,
        customs: {
          validateMatching: {
            function: automateAge('age'),
            message: 'username and password must match'
          }
        }
      }
    },
    age: {
      label: 'Age',
      value: 5,
      type: 'number',
      readOnly: false,
      validation: {
        min: 3,
        max: 10,
        required: true,
        pattern: '[0-9]+'
      }
    },
    email: {
      label: 'Email',
      placeholder: 'test@test.com',
      value: '',
      type: 'email',
      validation: {
        required: true,
        email: true,
        pattern: '[a-zA-Z.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}'
      }
    },
    gender: {
      label: 'Gender',
      value: 'M',
      readOnly: true,
      type: 'radio',
      options: [
        { label: "Male", value: 'M' },
        { label: "Female", value: 'F' }
      ]
    }
  },
  buttons: {
    continue: {
      label: 'Continue',
      type: 'submit',
      class: 'btn-primary'
    },
    cancel: {
      label: 'Cancel',
      type: 'cancel',
      class: 'btn-secondary'
    }
  }
}