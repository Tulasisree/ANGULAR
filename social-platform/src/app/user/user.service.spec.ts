import { TestBed } from '@angular/core/testing';

import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;

  //for each unit beforeEach() will be executed first
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserService);
  })

  it('should be created',()=>{
    expect(service).toBeTruthy(); // true value not empty string , null or unfdefined
  })

  it('should get users',()=>{
    service.getUsers().subscribe(users => {
      expect(users.length).toBeGreaterThan(0);
    })
  })
});
