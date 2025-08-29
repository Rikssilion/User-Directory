import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../services/user.service';

type UserFormGroup = FormGroup<{
  firstname: FormControl<string>;
  lastname: FormControl<string>;
  email: FormControl<string>;
  company: FormControl<string>;
  isVip: FormControl<boolean>;
}>;

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule,
    MatCardModule, MatFormFieldModule, MatInputModule,
    MatCheckboxModule, MatButtonModule, RouterLink
  ],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.scss'
})
export class UserFormComponent implements OnInit {
  form!: UserFormGroup;

  constructor(private fb: FormBuilder, private svc: UserService, private router: Router) {}

  ngOnInit(): void {
    // Инициализация формы в ngOnInit, чтобы не было "used before initialization"
    this.form = this.fb.nonNullable.group({
      firstname: ['', [Validators.required, Validators.minLength(2)]],
      lastname:  ['', [Validators.required, Validators.minLength(2)]],
      email:     ['', [Validators.required, Validators.email]],
      company:   [''],
      isVip:     [false]
    });
  }

  submit(): void {
    if (this.form.invalid) return;
    this.svc.add(this.form.getRawValue()); // типобезопасно
    this.router.navigate(['/users']);
  }
}
