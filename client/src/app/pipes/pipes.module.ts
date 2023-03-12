import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SortReposPipe } from './sort-repos.pipe';



@NgModule({
  declarations: [
    SortReposPipe
  ],
  exports: [
    SortReposPipe
  ],
  imports: [
    CommonModule
  ]
})
export class PipesModule { }
