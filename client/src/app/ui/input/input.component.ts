import { AfterContentInit, Component, ContentChild, EventEmitter, HostBinding, Input, Output } from '@angular/core';
import { InputRefDirective } from 'src/app/directives/input-ref.directive';

@Component({
  selector: 'fa-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent implements AfterContentInit {

  @ContentChild(InputRefDirective) input: InputRefDirective | undefined;

  @Input() icon: string = '';
  @Input() iconStyle: {[key:string]: string} = {}

  @Output() onClick: EventEmitter<boolean> = new EventEmitter();

  ngAfterContentInit(): void {
    if (!this.input) console.error("It's mandatory to provide an input or a select")
  }

  @HostBinding('class.input-focus')
  get isInputFocus() {
    return this.input?.focus || false;
  }
}
