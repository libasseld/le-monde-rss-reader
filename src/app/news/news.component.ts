import { ActivatedRoute } from '@angular/router';
import { NewsRss } from './news-rss';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import * as xml2js from 'xml2js';
@Component({
  selector: 'app-root',
  templateUrl: 'news.component.html',
  styleUrls: ['./news.component.css'],
})
export class NewsComponent implements OnInit {
  RssData: NewsRss;
  constructor(private http: HttpClient,private route: ActivatedRoute) {}
  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params: any) => {
      var symbol = params.params.q ?? 'AAPL';
    this.GetRssFeedData(symbol);
   });
  }
  GetRssFeedData(symbol) {
    const requestOptions: Object = {
      observe: 'body',
      responseType: 'text'
    }; 
    const _url = "https://gadgets.ndtv.com/rss/feeds";
    this.http 
      .get<any>(
        _url,
        requestOptions
      )
      .subscribe((data) => {
        let parseString = xml2js.parseString;
        parseString(data, (err, result: NewsRss) => {
          this.RssData = result;
        });
      });
  }
   getDataDiff(endDate) {
    let setDate= new Date(endDate).toISOString();
    var diff = (new Date()).getTime() - new Date(setDate).getTime();
    var days = Math.floor(diff / (60 * 60 * 24 * 1000));
    var hours = Math.floor(diff / (60 * 60 * 1000)) - (days * 24);
    var minutes = Math.floor(diff / (60 * 1000)) - ((days * 24 * 60) + (hours * 60));
    let dayString =  days == 0 ?  "" : days + "days ";
    let hoursString =  hours == 0 ?  "" : hours + "hr ";
    let minutesString =  minutes == 0 ?  "" : minutes + "m ";
    return dayString + hoursString + minutesString;
  }
}