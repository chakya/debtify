import { ContactPage } from './../pages/contact/contact';
import { DebtListPage } from './../pages/debt-list/debt-list';
import { AuthProvider } from './../providers/auth/auth';
import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { LoginPage } from '../pages/login/login';

import { timer } from 'rxjs/observable/timer';

@Component({
  templateUrl: 'app.html'
})

export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any;

  pages: Array<{title: string, component: any}>;

  showSplash = true;
  showSplashClass = true;

  constructor(
    public platform: Platform, 
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    private auth: AuthProvider) {
    
    const authObserver = auth.currentUserObservable().subscribe(user => {
      if (user && user.emailVerified) {
        this.rootPage = DebtListPage
      } else {
        this.rootPage = LoginPage;
      }
      authObserver.unsubscribe();
    });

    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: DebtListPage },
      { title: 'Contact', component: ContactPage},
      { title: 'Log Out', component: LoginPage}
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      timer(3000).subscribe(() => this.showSplashClass = false);
      timer(3500).subscribe(() => this.showSplash = false);

    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    if (page.component == LoginPage) {
      this.auth.logoutUser().then(() => this.nav.setRoot(page.component));
    } else {
      this.nav.setRoot(page.component);
    }
  }

}
