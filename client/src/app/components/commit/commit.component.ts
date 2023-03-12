import { Component, Input } from '@angular/core';
import { Commit } from 'src/app/interface/commit.interface';

@Component({
  selector: 'commit',
  templateUrl: './commit.component.html',
  styleUrls: ['./commit.component.scss']
})
export class CommitComponent{
  @Input() commit: Commit | undefined;

  panelOpenState = false;

}
