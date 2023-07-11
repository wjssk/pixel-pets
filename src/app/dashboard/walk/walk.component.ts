import { Component, HostListener, ElementRef, ViewChild, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-walk',
  templateUrl: './walk.component.html',
  styleUrls: ['./walk.component.scss']
})
export class WalkComponent implements AfterViewInit {
  @ViewChild('mapContainer') mapContainer!: ElementRef;
  mapSource: string = 'assets/images/laka.jpg';
  userSource: string = 'assets/images/postac.jpg';
  userPositionX: number = 0;
  userPositionY: number = 0;
  userSpeed: number = 10; // Adjust the user's movement speed as desired
  boundaryMargin: number = 10; // Adjust the margin from the screen edge at which the map scrolls
  mapWidth: number = 2000; // Width of the map image
  mapHeight: number = 2000; // Height of the map image

  ngAfterViewInit(): void {
    this.centerMap();
  }

  centerMap(): void {
    const mapContainer = this.mapContainer.nativeElement;
    const containerWidth = mapContainer.clientWidth;
    const containerHeight = mapContainer.clientHeight;
    const maxScrollLeft = this.mapWidth - containerWidth;
    const maxScrollTop = this.mapHeight - containerHeight;

    mapContainer.scrollLeft = (maxScrollLeft - containerWidth) / 2;
    mapContainer.scrollTop = (maxScrollTop - containerHeight) / 2;
  }

  @HostListener('window:keydown', ['$event'])
  handleKeyPress(event: KeyboardEvent) {
    const { key } = event;

    if (key === 'ArrowUp' || key === 'w') {
      this.moveUser(0, -this.userSpeed);
    } else if (key === 'ArrowDown' || key === 's') {
      this.moveUser(0, this.userSpeed);
    } else if (key === 'ArrowLeft' || key === 'a') {
      this.moveUser(-this.userSpeed, 0);
    } else if (key === 'ArrowRight' || key === 'd') {
      this.moveUser(this.userSpeed, 0);
    }
  }

  moveUser(deltaX: number, deltaY: number): void {
    const mapContainer = this.mapContainer.nativeElement;
    const containerWidth = mapContainer.clientWidth;
    const containerHeight = mapContainer.clientHeight;
    const scrollLeft = mapContainer.scrollLeft;
    const scrollTop = mapContainer.scrollTop;
    const maxScrollLeft = this.mapWidth - containerWidth;
    const maxScrollTop = this.mapHeight - containerHeight;

    // Calculate new positions
    let newUserPositionX = this.userPositionX + deltaX;
    let newUserPositionY = this.userPositionY + deltaY;
    let newScrollLeft = scrollLeft;
    let newScrollTop = scrollTop;

    // Check if we're close to the boundary, and if so, scroll the map
    if (newUserPositionX < this.boundaryMargin && scrollLeft > 0) {
      newScrollLeft = Math.max(0, scrollLeft - this.userSpeed);
      newUserPositionX = this.userPositionX;
    } else if (newUserPositionX > containerWidth - this.boundaryMargin && scrollLeft < maxScrollLeft) {
      newScrollLeft = Math.min(maxScrollLeft, scrollLeft + this.userSpeed);
      newUserPositionX = this.userPositionX;
    }

    if (newUserPositionY < this.boundaryMargin && scrollTop > 0) {
      newScrollTop = Math.max(0, scrollTop - this.userSpeed);
      newUserPositionY = this.userPositionY;
    } else if (newUserPositionY > containerHeight - this.boundaryMargin && scrollTop < maxScrollTop) {
      newScrollTop = Math.min(maxScrollTop, scrollTop + this.userSpeed);
      newUserPositionY = this.userPositionY;
    }

    // Apply the new positions
    this.userPositionX = newUserPositionX;
    this.userPositionY = newUserPositionY;
    mapContainer.scrollLeft = newScrollLeft;
    mapContainer.scrollTop = newScrollTop;
  }

}
