import { Component , OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, ValidatorFn,  Validators, AbstractControl } from '@angular/forms';

import { Customer } from './customer';

function ratingRange(c: AbstractControl): { [key: string]: boolean } | null
{
    if (c.value != undefined && (isNaN(c.value) || c.value < 1 || c.value > 5))
    { return { 'range': true }; };
    return null;
};



@Component({
    selector: 'my-signup',
    templateUrl: './app/customers/customer.component.html'
})
export class CustomerComponent implements OnInit  {
    customer: Customer= new Customer();
    customerForm: FormGroup;

    // bringing validation rule to the component 
    // first we define the set of
    emailMessage: string;
    private ValidationMessages = {
        required: 'email is required Please enter email address',
        pattern: 'Please enter a valid email address'
    };

    constructor(private fb: FormBuilder) { }

    ngOnInit(): void {

        // using FormBuilder to set up FormGroup with defalut value and build in validations
        this.customerForm = this.fb.group({
            firstName: ['', Validators.required , Validators.minLength(3)],
            lastName: ['', Validators.required, Validators.minLength(3)],
            email: ['', Validators.required, Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+")],
            phone: '',
            notification: 'email',
            rating: ['', ratingRange],
            sendCatalog: true
        });

        // using FormBuilder to set up FormGroup just with default value
        //this.customerForm = this.fb.group({
        //    firstName: '',
        //    lastName: '',
        //    email: '',
        //    sendCatalog: true
        //});

        // setting up the customerform with FormGroup
        //this.customerForm = new FormGroup({
        //    firstName: new FormControl(),
        //    lastName: new FormControl(),
        //    email: new FormControl(),
        //    sendCatalog: new FormControl(true)
        //});

        this.customerForm.get('notification').valueChanges.subscribe(value => this.setNotification(value));

     // put validation in the component
        const emailControl = this.customerForm.get('email');
        emailControl.valueChanges.subscribe(value => this.setMessage(emailControl));

    }

    setMessage(c: AbstractControl): void {
        this.emailMessage = '';
        if ((c.touched || c.dirty) && c.errors) {
         //   this.emailMessage = Object.keys(c.errors).map(key => this.validationMessages[key]).join(' ');
        }
    }
    save() {
        console.log(this.customerForm);
        console.log('Saved: ' + JSON.stringify(this.customerForm.value));
    }

    populateTestData() {
        this.customerForm.patchValue({
            firstName: 'Azi',
            lastName: 'Smith'
        });      
    }

    setNotification(notifyVia: string): void {
        const phoneControl = this.customerForm.get('phone');
        if (notifyVia === 'text') {
            phoneControl.setValidators(Validators.required);
        } else {
            phoneControl.clearValidators();
        }
        phoneControl.updateValueAndValidity();
    }
 }