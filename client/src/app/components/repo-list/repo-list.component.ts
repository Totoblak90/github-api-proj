import { Component, OnDestroy } from '@angular/core';
import { Repository } from 'src/app/interface/repository.interface';
import { HttpService } from 'src/app/services/http.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { debounceTime, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'repo-list',
  templateUrl: './repo-list.component.html',
  styleUrls: ['./repo-list.component.scss']
})
export class RepoListComponent implements OnDestroy {

  filterForm: FormGroup = this.fb.group({
    search: [''],
    sort: ['A-Z']
  })

  repoList: Repository[]  = [];

  private _destroy$ = new Subject();

  get sortingValue() {
    return this.filterForm.get('sort')?.value;
  }

  constructor(private httpService: HttpService, private fb: FormBuilder) {
    this.fetchRepos();
    this.subscribeToSearchValueChanges();
  }

  private fetchRepos() {
    this.httpService.allRepos().subscribe(res => {
      this.repoList = res
    })
  }

  private subscribeToSearchValueChanges() {
    this.filterForm.get('search')?.valueChanges
      .pipe(takeUntil(this._destroy$),debounceTime(750))
      .subscribe(term => {
        if (!term) {
          this.fetchRepos();
        } else {
          this.filterRepos(term);
        }
      })
  }

  private filterRepos(term: string) {
    this.httpService.filterReposByName(term).subscribe(repos => this.repoList = repos)
  }

  ngOnDestroy(): void {
    this._destroy$.next(true);
    this._destroy$.unsubscribe();
  }
}
