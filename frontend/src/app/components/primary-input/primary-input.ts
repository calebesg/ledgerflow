import { Component, Input } from '@angular/core';
import { ControlContainer, FormGroupDirective, ReactiveFormsModule } from '@angular/forms';

type InputTypes = 'text' | 'password' | 'email' | 'date' | 'number';

@Component({
  selector: 'app-primary-input',
  imports: [ReactiveFormsModule],
  templateUrl: './primary-input.html',
  styleUrl: './primary-input.css',
  viewProviders: [
    {
      provide: ControlContainer,
      useExisting: FormGroupDirective,
    },
  ],
})
export class PrimaryInput {
  @Input() type: InputTypes = 'text';
  @Input() label: string = '';
  @Input() placeholder: string = '';
  @Input() formName: string = '';
  @Input() icon: string = '';
}
