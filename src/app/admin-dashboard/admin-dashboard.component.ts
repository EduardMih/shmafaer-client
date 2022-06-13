import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {BreakpointObserver, MediaMatcher} from "@angular/cdk/layout";
import {MatDrawerMode, MatSidenav} from "@angular/material/sidenav";

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit{
  mobileQuery: MediaQueryList;
  isSmallScreen: boolean = false;
  isMenuCollapsed: boolean = false;
  isContentShown: boolean = true;

  activeComp: number = 1;

  @ViewChild('sidenav') sidenav!: MatSidenav;

  constructor(public breakpointObserver: BreakpointObserver,
              public media: MediaMatcher) {
    this.mobileQuery = this.media.matchMedia('(max-width: 600px)');

    if(this.mobileQuery.matches)
      this.isSmallScreen = true;

    this.breakpointObserver.observe(['(max-width: 600px)']).
      subscribe((state) => {
        if(state.matches)
        {
          //this.sidenav.mode= 'over';
          this.sidenav?.close();
          this.isMenuCollapsed = true;
          this.isSmallScreen = true;
        }

        else

        {
          //this.sidenav.mode = 'side';
          this.sidenav?.open()
          this.isMenuCollapsed = false;
          this.isSmallScreen = false;
        }

    })
  }

  ngOnInit(): void {
  }

  setActiveComp(activeComp: number)
  {
    this.activeComp = activeComp;
  }

  collapse(): void
  {
    this.isMenuCollapsed = !this.isMenuCollapsed;


    if(this.isSmallScreen)
    {

      if(this.isMenuCollapsed)
        this.isContentShown = true;

      else

        this.isContentShown = false;
    }


  }

  selectComponent(activeComp: number): void
  {
    this.activeComp = activeComp;

    if(this.isSmallScreen)
      this.collapse();
  }


}
