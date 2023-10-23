import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompaniesAdminComponent } from './companies-admin.component';

describe('CompaniesAdminComponent', () => {
  let component: CompaniesAdminComponent;
  let fixture: ComponentFixture<CompaniesAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompaniesAdminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompaniesAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
