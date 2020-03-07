import { Component, OnInit } from '@angular/core';
import { MainService } from '../../../../../../shared/services/main.service';
import { environment } from '../../../../../../../environments/environment';

@Component({
  selector: 'app-preset-index',
  templateUrl: './preset-index.component.html',
  styleUrls: ['./preset-index.component.css']
})
export class PresetIndexComponent implements OnInit {
  presets:[] =[];
  url = environment.url;
  constructor(private service :MainService) {
    this.service.getAllPreset().subscribe(res=>{
      this.presets = res.preset;
      console.log(res);
    })
  }

  onClick_hot(event){
    let value = JSON.parse(event.target.value);
    console.log(value);
    if(value.hot_selling == 1){
      let flag = 0;
      this.service.updateHot_sell(value.id,flag).subscribe(res=>{
        console.log(res);
      })

    }else{
      let flag = 1;
      this.service.updateHot_sell(value.id,flag).subscribe(res=>{
        console.log(res);
      })
    }
  }

  onClick_new(event){
    let value = JSON.parse(event.target.value);
    console.log(value);
    if(value.new == 1){
      let flag = 0;
      this.service.updateNew_sell(value.id,flag).subscribe(res=>{
        console.log(res);
      })

    }else{
      let flag = 1;
      this.service.updateNew_sell(value.id,flag).subscribe(res=>{
        console.log(res);
      })
    }
  }

  ngOnInit() {
  }

}
