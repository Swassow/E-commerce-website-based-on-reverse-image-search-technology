import { Component } from '@angular/core';
import { ImageService } from './Service/image.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  {
  title = 'project';

  constructor(private imageService: ImageService){

  }

  imageList : string[] = [];
  imageName : string [] = [];
  imagePrice: number [] = [];

  handlerFileInput(event:any){
    this.imageList  = [];
    let section = document.getElementById('main_section');
    section?.classList.add('hide');
    let result = document.getElementById('result');
    result?.classList.remove('hide');
    result?.classList.add('make_opacity');

    let dot = document.getElementById('dot_section');
    dot?.classList.toggle('hide');

    var file=event.target.files[0];
    const formData:FormData=new FormData();
    formData.append('uploadedFile',file,file.name);

    //this.photoData = formData;

    var reader = new FileReader();
    reader.onload = (event:any) =>{
      //this.profileImage = event.target.result;
      console.log("Image selected");
      this.imageService.addImage(formData).subscribe(data=>{
        this.imageList = data;

        // change the opacity
        result?.classList.remove('make_opacity');
        dot?.classList.add('hide');

        for (var i = 0; i < this.imageList.length ; i++){
          this.imageList[i] = "http://127.0.0.1:8000/"+ this.imageList[i];
        }
        console.log(this.imageList);
        for (var i = 0; i < this.imageList.length  ; i++){

          // product name //
          var s = this.imageList[i];
          
          var tmp  = "";
          for (var j = 0; j < s.length ; j++){
            tmp+= s[j];
            if (s[j]=='/'){
              tmp = "";
            }
          }
          this.imageName.push(tmp);
          if(tmp[0]=='A'){
            this.imagePrice.push(200);
          }
          else if(tmp[0]=='B' ){
            this.imagePrice.push(50);
          }
          else if(tmp[0]=='D'){
            this.imagePrice.push(100);
          }
          else if(tmp[0]=='F'){
            this.imagePrice.push(75);
          }
          else if(tmp[0]=='S'){
            this.imagePrice.push(150);
          }
          else if(tmp[0]=='Y'){
            this.imagePrice.push(175);
          }
          else{
            this.imagePrice.push(100);
          }
          
        }

        console.log(this.imageName);
      });
    }
    reader.readAsDataURL(event.target.files[0]);



  }


  // ----------------------------- this section is added later -------------

  changeToHome(){
    let section = document.getElementById('main_section');
    section?.classList.remove('hide');
    let result = document.getElementById('result');
    result?.classList.add('hide');
  }
}
