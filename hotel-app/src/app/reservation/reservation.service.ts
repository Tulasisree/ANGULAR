import { Injectable } from '@angular/core';
import { Reservation } from '../models/reservation';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  //API URL (pointing tou our mockoon api)
  private apiUrl = "http://localhost:3000"

  private reservations: Reservation[] = [];
  
  // constructor(){
  //   let savedReservations = localStorage.getItem("reservations")
  //   this.reservations = savedReservations? JSON.parse(savedReservations):[]
  // }

  constructor(private http: HttpClient){}

  //CRUD
  getReservations(): Observable<Reservation[]>{
    // return this.reservations;
    return this.http.get<Reservation[]>(this.apiUrl + "/reservations")
  }

  // chances are we can return a resvertation , undefined if we don't find it in array
  getReservation(id: string):Observable<Reservation> | undefined{
    //return this.reservations.find(res=> res.id == id)
    return this.http.get<Reservation>(this.apiUrl + "/reservation/"+id)
  }

  addReservation(reservation: Reservation){

    return this.http.post<void>(this.apiUrl + "/reservation/",reservation)

    reservation.id = Date.now().toString();
    this.reservations.push(reservation)
    // localStorage.setItem("reservations",JSON.stringify(this.reservations))
  }

  deleteReservation(id:string): Observable<void>{

    return this.http.delete<void>(this.apiUrl+"/reservation/"+id)

    let index= this.reservations.findIndex(res=> res.id === id)
    this.reservations.splice(index,1)
    // localStorage.setItem("reservations",JSON.stringify(this.reservations))
  }

  updateReservation(id:string,updatedReservation:Reservation){

    return this.http.put<void>(this.apiUrl + "/reservation/"+id,updatedReservation)

    let index = this.reservations.findIndex(res=> res.id === id)
    this.reservations[index] = updatedReservation
    // localStorage.setItem("reservations",JSON.stringify(this.reservations))
  }
}
