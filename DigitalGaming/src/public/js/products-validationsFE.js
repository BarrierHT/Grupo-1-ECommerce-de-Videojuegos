import validator from 'validator';

let v, form = document.querySelector('#form-edit-prod'), input = form.find('input');

v = validator.create({holder:form});

v.add('#nameProduct', {rules : {required : true}});
