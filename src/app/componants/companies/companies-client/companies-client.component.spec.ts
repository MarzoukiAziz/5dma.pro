import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompaniesClientComponent } from './companies-client.component';

describe('CompaniesClientComponent', () => {
  let component: CompaniesClientComponent;
  let fixture: ComponentFixture<CompaniesClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompaniesClientComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompaniesClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
