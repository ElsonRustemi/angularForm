import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormArray, FormBuilder  } from '@angular/forms';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
})
export class UserFormComponent implements OnInit {

  userForm;
  
  educationLevel = [
    { name: 'Select Profile', short: 'SP' },
    { name: 'High-School', short: 'HS' },
    { name: 'Bachelor', short: 'BA' },
    { name: 'Masters', short: 'MS' },
    { name: 'Doctorate', short: 'Phd' },
  ];

  profiles = [
    { name: 'Select Profile', short: 'SP' },
    { name: 'Developerl', short: 'DEV' },
    { name: 'Manager', short: 'MG' },
    { name: 'Engeneer', short: 'ENG' },
    { name: 'Doctor', short: 'DC' },
  ];

  selectGender: string[] = ['Female', 'Male', 'Not Specified'];

  // userForm = new FormGroup({
  //   firstname: new FormControl("", Validators.required),
  //   lastname: new FormControl("", Validators.required),
  //   age: new FormControl("", Validators.required),
  //   gender: new FormControl("", Validators.required),
  //   education: new FormControl("", Validators.required),
  //   profile: new FormControl("", Validators.required),
  //   phone: new FormControl("", Validators.required)
  // })

  constructor(private fb: FormBuilder) {}

  

  ngOnInit(): void {

    this.userForm = this.fb.group({
      firstname: ['', [Validators.required] ],
      lastname: ['', [Validators.required] ],
      age: ['', [Validators.required] ],
      gender: ['', [Validators.required] ],
      education: this.fb.array(['']),
      profile: ['', [Validators.required] ],
      phone: this.fb.array([
        this.addPhoneInput()
      ]),
    });

  }

  get educationControls() {
    return (<FormArray>this.userForm.get('education')).controls;
  }

  addEducationField() {
    const control = new FormControl('', [Validators.required]);
    return (<FormArray>this.userForm.get('education')).push(control);
  }

  addPhoneInput(): FormGroup {
    return this.fb.group({phone: new FormControl('')});
  }

  addPhoneNumber():void {
    (<FormArray>this.userForm.get('phone')).push(this.addPhoneInput());
  }

  onFormSubmit(): void {
    console.log(this.userForm.value);
    // this.userForm.reset();
  }
}
