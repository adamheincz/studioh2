import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-document-link',
  templateUrl: './document-link.component.html',
  styleUrls: ['./document-link.component.css']
})
export class DocumentLinkComponent {
  @Input() url: string = '';
  @Input() name: string = '';
}
