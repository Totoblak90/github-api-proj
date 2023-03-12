import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Commit } from 'src/app/interface/commit.interface';

@Component({
  selector: 'app-commit-list',
  templateUrl: './commit-list.component.html',
  styleUrls: ['./commit-list.component.scss']
})
export class CommitListComponent {

  constructor(
    public dialogRef: MatDialogRef<CommitListComponent>,
    @Inject(MAT_DIALOG_DATA) public commitList: Commit[],
  ) {
    this.commitList.sort((prevCommit, nextCommit) => prevCommit.creation > nextCommit.creation ? 1 : -1)

  }
}
