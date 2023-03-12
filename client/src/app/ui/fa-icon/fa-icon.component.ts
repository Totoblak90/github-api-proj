import { Component, Input } from '@angular/core';

@Component({
  selector: 'fa-icon',
  templateUrl: './fa-icon.component.html',
  styleUrls: ['./fa-icon.component.scss']
})
export class FaIconComponent {
  @Input() iconName: string = '';
  @Input() style: {[key:string]: string} = {}

  get classes() {
    const cssClass: {[key: string]: boolean} = {
      'fas': true
    }

    if (this.iconName) {
      cssClass['fa-' + this.iconName] = true
    }

    return cssClass
  }
}
