import {Component, OnInit, ViewChild} from '@angular/core';
import {BreakpointObserver, MediaMatcher} from "@angular/cdk/layout";
import {MatSidenav} from "@angular/material/sidenav";

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  mobileQuery: MediaQueryList;
  isSmallScreen: boolean = false;

  @ViewChild('sidenav') sidenav: MatSidenav | undefined;

  constructor(public breakpointObserver: BreakpointObserver,
              public media: MediaMatcher) {
    this.mobileQuery = this.media.matchMedia('(max-width: 600px)');

    if(this.mobileQuery.matches)
      this.isSmallScreen = true;

    this.breakpointObserver.observe(['(max-width: 600px)']).
      subscribe((state) => {
        if(state.matches)
          this.sidenav?.close();

        else

          this.sidenav?.open()

    })
  }

  ngOnInit(): void {

  }

}
