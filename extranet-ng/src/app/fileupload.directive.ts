import { Directive, HostBinding, HostListener, Output ,EventEmitter} from '@angular/core';


@Directive({
  selector: '[appFileupload]'
})
export class FileuploadDirective {
  @HostBinding('class.fileover') fileOver :boolean;
  @Output() fileDropped = new EventEmitter<any>(); 

  constructor() { }

  @HostListener('dragover',['$event']) onDragOver(evt){
    evt.preventDefault();
    evt.stopPropagation();
    this.fileOver = true;
    console.log('Drag over');
  }
  @HostListener('dragleave',['$event']) onDragLeave(evt){
    evt.preventDefault();
    evt.stopPropagation();
    this.fileOver = true;
    console.log('Drag leave');
  }
  @HostListener('drop',['$event']) onDrop(evt){
    evt.preventDefault();
    evt.stopPropagation();
    this.fileOver  = false;
    const files = evt.dataTransfer.files;
    if(files.length > 0){
      this.fileDropped.emit(files);
      console.log(`you Dropped ${files.length} files`);
    }
    
  }


  

}
