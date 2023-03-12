import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { take } from 'rxjs/operators';
import { Commit } from 'src/app/interface/commit.interface';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {
  @Input() commitList: Commit[] = [];
  @Output() onReset: EventEmitter<Commit[]> = new EventEmitter();
  @Output() onSubmit: EventEmitter<Commit[]> = new EventEmitter();

  filterForm: FormGroup = this.fb.group({
    startDate: [null, [Validators.required]],
    endDate: [null, [Validators.required]]
  })

  get showError() {
    return (this.filterForm.get('startDate')?.hasError('required') || this.filterForm.get('startDate')?.hasError('endDate') || this.filterForm.hasError('required')) && this.filterForm.touched
  }

  get noResults() {
    if (this.filterForm.errors) return this.filterForm.errors['noResults']
    else return false;
  }

  get invalidDateOrder() {
    if (this.filterForm.errors) return this.filterForm.errors['invalidDateOrder']
    else return false;
  }

  constructor(private httpService: HttpService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.commitList.sort((prevCommit, nextCommit) => prevCommit.creation > nextCommit.creation ? 1 : -1)
  }

  reset() {
    this.filterForm.reset();
    this.httpService.allCommits(this.commitList[0].repo_id).pipe(take(1))
    .subscribe(res => this.onReset.emit((res.sort((prevCommit, nextCommit) => prevCommit.creation > nextCommit.creation ? 1 : -1))))
  }

  filter() {
    this.filterForm.setErrors(null)
    this.filterForm.markAllAsTouched();

    const startDate = this.filterForm.get('startDate')?.value
    const endDate = this.filterForm.get('endDate')?.value

    if (!endDate || !startDate) {
      this.filterForm.setErrors({required: true})
    }

    if (endDate && startDate && new Date(startDate) > new Date(endDate)) {
      this.filterForm.setErrors({invalidDateOrder: true})
    }

    if (this.filterForm.valid) {

      this.httpService.fiterCommitsByDate(startDate, endDate, this.commitList[0].repo_id)
      .subscribe(res => {

        if (res.length) {
          this.onSubmit.emit((res.sort((prevCommit, nextCommit) => prevCommit.creation > nextCommit.creation ? 1 : -1)));
          this.filterForm.reset()
        } else {
          this.filterForm.setErrors({noResults: true})
        }

      })
    }
  }
}
