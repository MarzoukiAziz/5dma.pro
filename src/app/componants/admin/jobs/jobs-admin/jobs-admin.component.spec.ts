import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobsAdminComponent } from './jobs-admin.component';

describe('JobsAdminComponent', () => {
  let component: JobsAdminComponent;
  let fixture: ComponentFixture<JobsAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobsAdminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobsAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
