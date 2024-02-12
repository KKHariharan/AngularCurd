import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
 

@Injectable({
  providedIn: 'root'
})
export class ListServices {
 constructor(private http : HttpClient){

 }
 AddEmployee(formdata:any){
  return this.http.post("http://127.0.0.1:5000/list/emp",formdata)
 }
 AddManager(formdata:any){
  return this.http.post("http://127.0.0.1:5000/list/man",formdata)
 }
 ListApi (){
    return this.http.get("http://127.0.0.1:5000/list/list")
  }
 ManagerList (){
    return this.http.get("http://127.0.0.1:5000/list/man-list")
  }
  DeltByid(id:any){
    return this.http.delete(`http://127.0.0.1:5000/list/delete/${id}`)
  }
  ViewList(id:any){
    return this.http.get(`http://127.0.0.1:5000/list/view/${id}`)
  }
  EditList(formdata:any){
    return this.http.put(`http://127.0.0.1:5000/list/edit/${formdata.id}`,formdata)
  }
}