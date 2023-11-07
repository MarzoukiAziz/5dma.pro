import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobteaserScrapperComponent } from './jobteaser-scrapper.component';

describe('JobteaserScrapperComponent', () => {
  let component: JobteaserScrapperComponent;
  let fixture: ComponentFixture<JobteaserScrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobteaserScrapperComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobteaserScrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
