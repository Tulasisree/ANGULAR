import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserListComponent } from './user-list.component';
import { UserService } from '../user.service';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';

describe('UserListComponent', () => {
  let component: UserListComponent;
  let fixture: ComponentFixture<UserListComponent>;
  let userService: UserService;
  let userServiceSpy: jasmine.Spy;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      //for components we need to use declaration , since service is injectable we use inject
      declarations: [UserListComponent],
      providers : [UserService]
    }).compileComponents();

    fixture = TestBed.createComponent(UserListComponent);
    component = fixture.componentInstance;

    userService = TestBed.inject(UserService);
    //spy on the userService getUsers methods so that we know how often this method got called
    // and which arguments got used.
    // we are returning mock values, the when unit test starts we can use these values
    userServiceSpy = spyOn(userService, 'getUsers').and.returnValue(of([
      {id:1,name:"Tulasi"},
      {id:2,name:"Malli"},
      {id:3,name:"Pavan"}
    ]));

    //manually trigger our change detection to update date binding
    // fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  //chekcing ngoninit it getting data
  it('get users from service onInit',() => {
    //will start the lifecycle hook and update all the data bindings
    fixture.detectChanges();
    expect(userServiceSpy).toHaveBeenCalled();
  });

  it('shoudl retriver users form userService when refresh button is clicked',()=>{
    fixture.detectChanges();
    //clearing earlier calls
    userServiceSpy.calls.reset();

    const button = fixture.debugElement.query(By.css('button'));
    button.triggerEventHandler('click',null);

    expect(userServiceSpy).toHaveBeenCalled();
  })
});
