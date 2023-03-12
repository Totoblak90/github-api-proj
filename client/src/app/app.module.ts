import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { RepoListComponent } from './components/repo-list/repo-list.component';
import { RepoItemComponent } from './components/repo-item/repo-item.component';
import { CommitListComponent } from './components/commit-list/commit-list.component';
import { CommitComponent } from './components/commit/commit.component';

import { MatDialogModule } from '@angular/material/dialog';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { FilterComponent } from './components/filter/filter.component';
import { InputComponent } from './ui/input/input.component';
import { FaIconComponent } from './ui/fa-icon/fa-icon.component';
import { InputRefDirective } from './directives/input-ref.directive';

@NgModule({
  declarations: [
    AppComponent,
    RepoListComponent,
    RepoItemComponent,
    CommitListComponent,
    CommitComponent,
    FilterComponent,
    InputComponent,
    FaIconComponent,
    InputRefDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatSelectModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
