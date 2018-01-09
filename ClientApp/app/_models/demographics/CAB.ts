/* 
import { validateDuration } from "../validators/duration.validator";
import { validateUrl } from "../validators/url.validator";
import { validateStarts } from "../validators/starts.validator";
import { validateEnds } from "../validators/ends.validator";
 
function getSelect(){
   const parent = [
    { label: "(choose one)", value: '' },
    { label: "Perez", value: '39100' },
    { label: "Meltina", value: '39010' },
    { label: "Appiano", value: '39057' }
  ];
  return parent;
}

function getSelectClick(){
  const parent = [
   { label: "(choose one)", value: '' },
   { label: "Perez", value: '39100' },
   { label: "Meltina", value: '39010' },
   { label: "Appiano", value: '39057' }
 ];
 return parent;
}


export const CAB = {
  settings: {
    label: 'Settings',
    title: 'CAB',
    subtitle: 'Parent Form',
    debug: false,
    layout: 'inline' // inline | two-column | stacked | responsive
  },
  controls: {
    name: {
      label: 'Name',
      placeholder: 'Please enter your name.',
      value: '',
      type: 'text', //text | number | date | email | radio | select
      size: '',
      validation: {
        required: true, //required | min | max | pattern
        customs: {
          validateStarts: {
            function: validateStarts,
            message: 'Name must start with B'
          },
          validateEnds: {
            function: validateEnds,
            message: 'Name must end with B'
          }
        }
      }
    },
    age: {
      label: 'Age',
      value: 5,
      type: 'number',
      readOnly: false,
      size: '',
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
    },
    city: {
      label: 'City',
      value: '',
      type: 'select',
      options: getSelect(),
      validation: {
        required: true
      }
    }
  },
  buttons: {
    continue: {
      label: 'Continue',
      type: 'submit', //submit | cancel | reset
      class: 'btn-primary'
    },
    cancel: {
      label: 'Cancel',
      type: 'cancel',
      class: 'btn-secondary'
    }
  }
} */