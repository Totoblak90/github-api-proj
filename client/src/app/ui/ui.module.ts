import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent } from './input/input.component';
import { FaIconComponent } from './fa-icon/fa-icon.component';
import { DirectivesModule } from '../directives/directives.module';



@NgModule({
  declarations: [
    InputComponent,
    FaIconComponent,
  ],
  exports: [
    InputComponent,
    FaIconComponent,
  ],
  imports: [
    CommonModule,
    DirectivesModule
  ]
})
export class UiModule { }
