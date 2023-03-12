import { Component } from '@angular/core';
import { Repository } from 'src/app/interface/repository.interface';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'repo-list',
  templateUrl: './repo-list.component.html',
  styleUrls: ['./repo-list.component.scss']
})
export class RepoListComponent {

  repoList: Repository[]  = [];

  constructor(private httpService: HttpService) {
    this.httpService.allRepos().subscribe(res => {
      this.repoList = res
    })
  }
}
