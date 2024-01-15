import { AfterViewInit, Component, ElementRef, EventEmitter, OnInit, Output, Renderer2, ViewChild } from '@angular/core';
import { DashPropertyListingComponent } from '../dash-property-listing/dash-property-listing.component';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, AfterViewInit {
  @ViewChild('myButton') closeButton!: ElementRef;
  constructor(private el: ElementRef, private renderer: Renderer2) { }
  ngAfterViewInit(): void {

  }

  ngOnInit(): void {

  }
  inputValue: string = '';

  submitForm() {
    console.log('Input Value:', this.inputValue);
    this.inputValue = '';
  }

  handleChildData(data: any) {
    this.closeButton.nativeElement.click();
  }

  openModal() {
    const modalElement = this.el.nativeElement.querySelector('#searchModal');
    if (modalElement && this.inputValue.length > 0) {
      this.renderer.addClass(modalElement, 'show');
      this.renderer.setStyle(modalElement, 'display', 'block')
      // this.renderer.setStyle(document.body,'padding-right','10px')
      document.body.classList.add('modal-open')
    }
  }

  closeModal() {
    const modalElement = this.el.nativeElement.querySelector('#searchModal');
    if (modalElement) {
      this.renderer.addClass(modalElement, 'show');
      this.renderer.setStyle(modalElement, 'display', 'none');
      document.body.classList.add('modal-open')
    }
  }
}
