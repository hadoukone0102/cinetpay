import { Component, OnInit } from '@angular/core';
import { topToBottomAnimation } from './core/animations/animations';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations:[topToBottomAnimation],
  styles:[`
     .loadPage {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 10%;
      /* background-color: rgba(255, 255, 255, 0.8); Couleur de fond semi-transparente */
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999; 
    }
    .loader {
      width: 48px;
      height: 48px;
      border-radius: 50%;
      display: inline-block;
      position: relative;
      border: 3px solid;
      border-color: #FFF #FFF transparent transparent;
      box-sizing: border-box;
      animation: rotation 1s linear infinite;
    }
    .loader::after,
    .loader::before {
      content: '';  
      box-sizing: border-box;
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      margin: auto;
      border: 3px solid;
      border-color: transparent transparent #FF3D00 #FF3D00;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      box-sizing: border-box;
      animation: rotationBack 0.5s linear infinite;
      transform-origin: center center;
    }
    .loader::before {
      width: 32px;
      height: 32px;
      border-color: #FFF #FFF transparent transparent;
      animation: rotation 1.5s linear infinite;
    }
        
    @keyframes rotation {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    } 
    @keyframes rotationBack {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(-360deg);
   }

}
  `]

})
export class AppComponent implements OnInit {
  pageLoading!:boolean;
  constructor(private router:Router,
    ){
    
  }
  
  ngOnInit(): void {

    // ====================================================== //
    // ===================== BAR LOADING ==================== //
    // ====================================================== //
  
    this.router.events.subscribe(event => {
      switch(true) {
        case event instanceof NavigationStart: {
          this.pageLoading = true;
          break;
        }
        case event instanceof NavigationEnd:
        case event instanceof NavigationCancel:
        case event instanceof NavigationError: {
          this.pageLoading = false;
          break;
        }
      }
    })
  }    
  }

