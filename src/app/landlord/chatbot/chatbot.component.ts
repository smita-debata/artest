import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css']
})
export class ChatbotComponent implements OnInit {
  @ViewChild('chatIcon') chatIcon!: ElementRef;
  @ViewChild('chatWindow') chatWindow!: ElementRef;
  isChatOpen = false;
  constructor(private renderer: Renderer2) { }
  text: string = '';
  containerHeight = 0; // Initial height
  initialHeight = 0;
  expandContainer() {
    this.containerHeight += 100; // Increase the height by 50 pixels (adjust as needed)
  }
  resetContainer() {
    this.containerHeight = this.initialHeight;
  }
  clear() {
    this.text = ''
  }
  ngOnInit(): void {
  }
  isDragging = false;
  startX = 0;
  initialRight = 20;
  rightOffset = this.initialRight;

  onMouseDown(event: MouseEvent) {
    this.isDragging = true;
    this.startX = event.clientX;

    const moveListener = (e: MouseEvent) => {
      if (this.isDragging) {
        const offsetX = e.clientX - this.startX;
        this.rightOffset = this.initialRight - offsetX;
      }
    };

    const upListener = () => {
      this.isDragging = false;
      document.removeEventListener('mousemove', moveListener);
      document.removeEventListener('mouseup', upListener);
    };

    document.addEventListener('mousemove', moveListener);
    document.addEventListener('mouseup', upListener);
  }
  toggleChat() {
    this.isChatOpen = !this.isChatOpen;

    if (this.isChatOpen) {
      this.renderer.setStyle(this.chatWindow.nativeElement, 'display', 'block');
    } else {
      this.renderer.setStyle(this.chatWindow.nativeElement, 'display', 'none');
    }
  }

}
