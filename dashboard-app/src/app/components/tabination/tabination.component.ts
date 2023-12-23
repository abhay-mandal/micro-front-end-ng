import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { NgbTabset } from '@ng-bootstrap/ng-bootstrap';
// import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AngularFireRemoteConfig } from '@angular/fire/remote-config';
// import firebase from 'firebase';

@Component({
  selector: 'app-tabination',
  templateUrl: './tabination.component.html',
  styleUrls: ['./tabination.component.scss']
})
export class TabinationComponent implements OnInit {

  // @ViewChild('nav') private navTabs: NgbTabset;

  screenName = {
    title: "Transfer",
    tabs: [
      {
        tabData: {
          disabled: false,
          tabLabel: "Step 1",
        }
      },
      {
        tabData: {
          disabled: true,
          tabLabel: "Step 2"
        }
      },
      {
        tabData: {
          disabled: true,
          tabLabel: "Step 3"
        }
      }
    ]
  };

  items: Observable<any[]>;

  constructor(
    // private firestore: AngularFirestore,
    private remoteConfig: AngularFireRemoteConfig
  ) {
    // this.items = firestore.collection('items').valueChanges();
    // firestore.collection('items').valueChanges().subscribe(val => console.log(val));

    // remoteConfig.settings = { 'minimumFetchIntervalMillis' : 0, fetchTimeoutMillis : 1  };

    // remoteConfig.settings.then(() => {
    //   minimumFetchIntervalMillis: 0
    // });

    // this.remoteConfig.fetchTimeMillis.finally(() => {
    //   return new Promise(resolve => {
    //     resolve(0);
    //   });
    // });

    remoteConfig.fetchAndActivate()
      .then(() => this.showConfig())
      .catch((err) => {
        console.error(err);
      });

    // const remoteConfig1 = firebase.remoteConfig();
    // remoteConfig1.settings = {
    //   minimumFetchIntervalMillis: 0,
    //   fetchTimeoutMillis: 0
    // };

    // remoteConfig1.defaultConfig = ({
    //   'welcome_message': 'Welcome',
    // });

    // remoteConfig1.fetchAndActivate()
    //   .then(() => this.showConfig())
    //   .catch((err) => {
    //     console.error(err);
    //   });
  }


  ngOnInit() {
  }

  showConfig() {
    // this.remoteConfig.getValue('formField').then(all => console.log('all', all['_value']));
    this.remoteConfig.getAll().then(all => console.log('all', all));
  }

  // nextTab(id) {
  //   id += 1;
  //   this.screenName.tabs[id].tabData.disabled = false;
  //   this.navTabs.select(id);
  // }

}


//In JavaScript, when a function returns an object without the new keyword, then it’s a factory function.

