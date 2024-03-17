import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceeComponent } from './servicee.component';

describe('ServiceeComponent', () => {
  let component: ServiceeComponent;
  let fixture: ComponentFixture<ServiceeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServiceeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ServiceeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
