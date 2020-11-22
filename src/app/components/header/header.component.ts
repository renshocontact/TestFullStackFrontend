import { Component, OnInit, Input, Output, ViewChild, EventEmitter } from '@angular/core';
import { HeaderLibrary} from '../../libraries/header.library';

@Component({
  selector: 'main-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Input() disabled:Boolean = false;
  @Input() display:Boolean = true;
  @Output() public sidenavToggle = new EventEmitter();
  @ViewChild('progressBar') progressBar;
  sections:Object={
    'MENU':'apps'
  };

  constructor(public header:HeaderLibrary) {
  }

  ngOnInit() {
  }

  onToggleSidenav() {
    this.sidenavToggle.emit();
  }

}
