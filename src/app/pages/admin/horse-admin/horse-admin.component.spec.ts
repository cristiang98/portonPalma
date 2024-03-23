import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HorseAdminComponent } from './horse-admin.component';

describe('HorseAdminComponent', () => {
  let component: HorseAdminComponent;
  let fixture: ComponentFixture<HorseAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HorseAdminComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HorseAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
