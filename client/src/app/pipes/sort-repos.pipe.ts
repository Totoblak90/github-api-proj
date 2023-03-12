import { Pipe, PipeTransform } from '@angular/core';
import { Repository } from '../interface/repository.interface';

@Pipe({
  name: 'sortRepos'
})
export class SortReposPipe implements PipeTransform {

  transform(value: Repository[], sortingValue: 'A-Z' | 'Z-A' | undefined): Repository[] {
    try {
       switch (sortingValue) {
        case 'A-Z':
          return value.sort((prevRepo, nextRepo) => prevRepo.name.toLowerCase() < nextRepo.name.toLowerCase() ? -1 : 1)
        case 'Z-A':
          return value.sort((prevRepo, nextRepo) => prevRepo.name.toLowerCase() < nextRepo.name.toLowerCase() ? 1 : -1)
        default:
          return value;
       }

    } catch (error) {
      console.warn('Error at sorting pipe')
      return value
    }
  }

}
