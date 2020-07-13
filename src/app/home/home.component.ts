import { Component, OnInit } from '@angular/core';
import { openClose } from '../_animations/index';
import { fadeInAnimation } from '../_animations/index';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [openClose, fadeInAnimation],
  host: { '[@openClose]': '', '[@fadeInAnimation]': '' }
})
export class HomeComponent implements OnInit {

  isOpen = true;

  constructor() { }

  ngOnInit(): void {
    this.isOpen = true;
  }

  toggle() {
    this.isOpen = !this.isOpen;
    console.log("Trigger is ", this.isOpen);
  }
}