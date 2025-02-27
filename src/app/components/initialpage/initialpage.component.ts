import { Component } from '@angular/core';
import { FeaturedComponent } from "../featured/featured.component";
import { BestandnewComponent } from "../bestandnew/bestandnew.component";
import { BuyiconsComponent } from "../buyicons/buyicons.component";
import { WeeknewsComponent } from "../weeknews/weeknews.component";
import { DiscovermoreComponent } from "../discovermore/discovermore.component";

@Component({
  selector: 'app-initialpage',
  imports: [FeaturedComponent, BestandnewComponent, BuyiconsComponent, WeeknewsComponent, DiscovermoreComponent],
  templateUrl: './initialpage.component.html',
  styleUrl: './initialpage.component.css'
})
export class InitialpageComponent {

}
