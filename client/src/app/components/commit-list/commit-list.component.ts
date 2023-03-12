import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { take } from 'rxjs';
import { Commit } from 'src/app/interface/commit.interface';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-commit-list',
  templateUrl: './commit-list.component.html',
  styleUrls: ['./commit-list.component.scss']
})
export class CommitListComponent {

  constructor(
    public dialogRef: MatDialogRef<CommitListComponent>,
    @Inject(MAT_DIALOG_DATA) public commitList: Commit[],
    private httpService: HttpService
  ) {
    this.commitList.sort((prevCommit, nextCommit) => prevCommit.creation > nextCommit.creation ? 1 : -1)
  }

  close() {
    this.dialogRef.close()
  }

  reset() {
    this.httpService.allCommits(this.commitList[0].repo_id).pipe(take(1))
    .subscribe(res => this.commitList = res.sort((prevCommit, nextCommit) => prevCommit.creation > nextCommit.creation ? 1 : -1))
  }
}
