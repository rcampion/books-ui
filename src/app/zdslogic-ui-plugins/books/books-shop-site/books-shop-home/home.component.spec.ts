import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopBooksHomeComponent} from './home.component';

describe('HeaderComponent', () => {
  let component: ShopBooksHomeComponent;
  let fixture: ComponentFixture<ShopBooksHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShopBooksHomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShopBooksHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
