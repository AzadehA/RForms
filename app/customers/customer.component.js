"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var forms_1 = require('@angular/forms');
var customer_1 = require('./customer');
function ratingRange(c) {
    if (c.value != undefined && (isNaN(c.value) || c.value < 1 || c.value > 5)) {
        return { 'range': true };
    }
    ;
    return null;
}
;
var CustomerComponent = (function () {
    function CustomerComponent(fb) {
        this.fb = fb;
        this.customer = new customer_1.Customer();
        this.ValidationMessages = {
            required: 'email is required Please enter email address',
            pattern: 'Please enter a valid email address'
        };
    }
    CustomerComponent.prototype.ngOnInit = function () {
        var _this = this;
        // using FormBuilder to set up FormGroup with defalut value and build in validations
        this.customerForm = this.fb.group({
            firstName: ['', forms_1.Validators.required, forms_1.Validators.minLength(3)],
            lastName: ['', forms_1.Validators.required, forms_1.Validators.minLength(3)],
            email: ['', forms_1.Validators.required, forms_1.Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+")],
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
        this.customerForm.get('notification').valueChanges.subscribe(function (value) { return _this.setNotification(value); });
        // put validation in the component
        var emailControl = this.customerForm.get('email');
        emailControl.valueChanges.subscribe(function (value) { return _this.setMessage(emailControl); });
    };
    CustomerComponent.prototype.setMessage = function (c) {
        var _this = this;
        this.emailMessage = '';
        if ((c.touched || c.dirty) && c.errors) {
            this.emailMessage = Object.keys(c.errors).map(function (key) {
                return _this.validationMessages[key];
            }).join(' ');
        }
    };
    CustomerComponent.prototype.save = function () {
        console.log(this.customerForm);
        console.log('Saved: ' + JSON.stringify(this.customerForm.value));
    };
    CustomerComponent.prototype.populateTestData = function () {
        this.customerForm.patchValue({
            firstName: 'Azi',
            lastName: 'Smith'
        });
    };
    CustomerComponent.prototype.setNotification = function (notifyVia) {
        var phoneControl = this.customerForm.get('phone');
        if (notifyVia === 'text') {
            phoneControl.setValidators(forms_1.Validators.required);
        }
        else {
            phoneControl.clearValidators();
        }
        phoneControl.updateValueAndValidity();
    };
    CustomerComponent = __decorate([
        core_1.Component({
            selector: 'my-signup',
            templateUrl: './app/customers/customer.component.html'
        }), 
        __metadata('design:paramtypes', [forms_1.FormBuilder])
    ], CustomerComponent);
    return CustomerComponent;
}());
exports.CustomerComponent = CustomerComponent;
//# sourceMappingURL=customer.component.js.map