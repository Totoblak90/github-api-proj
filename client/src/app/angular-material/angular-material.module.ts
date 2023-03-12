import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatDialogModule } from '@angular/material/dialog';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatFormFieldModule} from '@angular/material/form-field';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatDialogModule,
    MatExpansionModule,
    MatFormFieldModule,
  ],
  exports: [
    MatDialogModule,
    MatExpansionModule,
    MatFormFieldModule,
  ]
})
export class AngularMaterialModule { }
