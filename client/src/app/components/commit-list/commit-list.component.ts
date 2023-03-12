import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Commit } from 'src/app/interface/commit.interface';

interface CommitExpansionModule {
  commits: Commit[],
  repoName: string;
}

@Component({
  selector: 'app-commit-list',
  templateUrl: './commit-list.component.html',
  styleUrls: ['./commit-list.component.scss']
})
export class CommitListComponent {

  commitList: Commit[] = [];
  repoName = ''

  constructor(
    public dialogRef: MatDialogRef<CommitListComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CommitExpansionModule
  ) {
    this.commitList = data.commits;
    this.repoName = data.repoName;
  }

  close() {
    this.dialogRef.close()
  }

  filter(commitList: Commit[]) {
    this.commitList = commitList;
  }

}
