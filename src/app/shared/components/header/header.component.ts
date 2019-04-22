import { Component, OnInit, AfterViewInit, Renderer2 } from '@angular/core';
import { LoginService } from 'src/app/login/services/login.service';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, AfterViewInit {

  constructor(private loginService: LoginService, private renderer: Renderer2) { }

  loggedInUserName: string;
  public menus: MenuItem[];
  public isUserNameHighlighted: boolean;
  public documentClickListener: any;

  ngOnInit() {
    this.isUserNameHighlighted = false;
    this.loggedInUserName = sessionStorage.getItem('currentUser');
    // Initializing the menu dropdown
    this.menus = [
      {
        label: 'Logout', icon: 'fa fa-sign-out', command: (event) => {
          this.loginService.logout();
        }
      }
    ];
  }

  ngAfterViewInit() {
    // storing reference of this to a variable
    const that = this;
    // when user click on any element except user elements having user class and menu is in open state,
    // then remove the highlight color from user name
    this.documentClickListener = this.renderer.listen('document', 'click', ($event) => {
      if (!($event.target.classList.contains('user-profile'))) {
        that.isUserNameHighlighted = false;
      }
    });
  }

  /** Function to  handle click event on user name click */
  onUserNameClick(event, userMenu) {
    this.isUserNameHighlighted = !this.isUserNameHighlighted;
    userMenu.toggle(event);
  }

}
