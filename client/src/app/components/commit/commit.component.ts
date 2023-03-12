import { Component, Input, OnInit } from '@angular/core';
import { Commit } from 'src/app/interface/commit.interface';

@Component({
  selector: 'commit',
  templateUrl: './commit.component.html',
  styleUrls: ['./commit.component.scss']
})
export class CommitComponent implements OnInit{
  @Input() commit: Commit | undefined;

  panelOpenState = false;


  ngOnInit(): void {
    console.log(this.commit)
  }

}
