import { Component } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import * as xml2js from "xml2js";
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  RssData;
  constructor(private http: HttpClient) {}
  ngOnInit(): void {
    
    this.GetRssFeedData();
  }
  GetRssFeedData() {
    const requestOptions: Object = {
      observe: "body",
      responseType: "text"
    };
    const feedURL = "https://www.lemonde.fr/rss/en_continu.xml"
    this.http
      .get<any>("https://api.rss2json.com/v1/api.json?rss_url=" + feedURL, requestOptions)
      .subscribe(data => {
        this.RssData = JSON.parse(data);
        console.log(this.RssData);
        
      });
  }
}

export interface IRssData {}