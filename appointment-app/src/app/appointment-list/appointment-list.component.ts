import { Component } from '@angular/core';
import { Appointment } from '../models/appointment';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-appointment-list',
  templateUrl: './appointment-list.component.html',
  styleUrls: ['./appointment-list.component.css']
})
export class AppointmentListComponent implements OnInit{/*export it so that we can import it in other modules*/
  newAppointmentTitle: string = "";
  newAppointmentDate: Date = new Date();
  appointments: Appointment[] = []

  ngOnInit(): void {
    let savedAppointments = localStorage.getItem("appointments")
    this.appointments = savedAppointments? JSON.parse(savedAppointments):[]
  }

  /* gets trigerred everytime the user clicks add button (check html)*/
  addAppointment(){
    if(this.newAppointmentTitle.trim().length && this.newAppointmentDate){
      let newAppointment: Appointment = {
        id: Date.now(),
        title: this.newAppointmentTitle,
        date: this.newAppointmentDate
      }
      this.appointments.push(newAppointment)
      
      /* once added to the list, we need to update thse values back since its two way binding
      used again by html*/
      this.newAppointmentTitle= "";
      this.newAppointmentDate= new Date();

      /*key -> appointments, value->json data*/
      localStorage.setItem("appointments",JSON.stringify(this.appointments))
    }
  }

  deleteAppointment(index: number){
    this.appointments.splice(index,1)
    localStorage.setItem("appointments",JSON.stringify(this.appointments))
  }
}
