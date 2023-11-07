import { Component } from '@angular/core';
import { WebScraperService } from 'src/app/services/web-scraper.service';

@Component({
  selector: 'app-jobteaser-scrapper',
  templateUrl: './jobteaser-scrapper.component.html',
  styleUrls: ['./jobteaser-scrapper.component.css'],
})
export class JobteaserScrapperComponent {
  scrapedData: string;

  constructor(private webScraperService: WebScraperService) {
    const targetUrl = 'https://www.jobteaser.com/fr'; // Replace with the URL you want to scrape
    this.webScraperService.scrapeWebsite(targetUrl).subscribe((data) => {
      this.scrapedData = data;
    });
  }
}
