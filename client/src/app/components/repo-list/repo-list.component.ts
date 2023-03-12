import { Component } from '@angular/core';
import { Repository } from 'src/app/interface/repository.interface';
import { HttpService } from 'src/app/services/http.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'repo-list',
  templateUrl: './repo-list.component.html',
  styleUrls: ['./repo-list.component.scss']
})
export class RepoListComponent {

  filterForm: FormGroup = this.fb.group({
    search: ['']
  })

  repoList: Repository[]  = [];

  constructor(private httpService: HttpService, private fb: FormBuilder) {
    this.fetchRepos();
    this.subscribeToValueChanges()
  }

  private fetchRepos() {
    this.httpService.allRepos().subscribe(res => {
      this.repoList = res
    })
  }

  private subscribeToValueChanges() {
    this.filterForm.get('search')?.valueChanges.pipe(debounceTime(750)).subscribe(term => {
      console.log(term)
    })
  }


}
