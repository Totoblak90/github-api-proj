import { Component, Input, OnInit } from '@angular/core';
import { Repository } from 'src/app/interface/repository.interface';
import {MatDialog} from '@angular/material/dialog';
import { CommitListComponent } from '../commit-list/commit-list.component';

@Component({
  selector: 'repo-item',
  templateUrl: './repo-item.component.html',
  styleUrls: ['./repo-item.component.scss']
})
export class RepoItemComponent implements OnInit {
  @Input() repo: Repository | undefined;

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {
    // I open the repo you are interested in
    // This is not a scalabale code but it serves for this
    if (this.repo?.repo_id === 612344469) {
      this.dialog.open(CommitListComponent, {
        data: this.repo?.commits
      })
    }
  }


  seeMore() {
    this.dialog.open(CommitListComponent, {
      data: this.repo?.commits,
      panelClass: 'expansion-panel'
    })
  }
}
