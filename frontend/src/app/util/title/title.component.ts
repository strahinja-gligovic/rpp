import { Component, OnInit, ViewChild, ElementRef, Renderer } from '@angular/core';
import { flyInOut, easeTitleLeft, easeTitleRight } from '../../util/animations/animations';

@Component({
  selector: 'app-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.css'],
  animations: [
    flyInOut, easeTitleLeft, easeTitleRight
  ]
})
export class TitleComponent implements OnInit {

  @ViewChild('hr') hr: ElementRef;
  grow = false;
  constructor(private renderer: Renderer) { }

  ngOnInit() {
    setTimeout(() => this.grow = true, 200);
  }

}
