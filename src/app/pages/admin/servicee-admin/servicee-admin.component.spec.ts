import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceeAdminComponent } from './servicee-admin.component';

describe('ServiceeAdminComponent', () => {
  let component: ServiceeAdminComponent;
  let fixture: ComponentFixture<ServiceeAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServiceeAdminComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ServiceeAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
