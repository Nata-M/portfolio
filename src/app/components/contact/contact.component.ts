import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { map } from 'rxjs/Operators';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent implements OnInit {
  @ViewChild('f') signUpForm: NgForm | undefined;
  state = false;
  constructor(private http: HttpClient) {}
  user = {
    firstname: '',
    lastname: '',
    email: '',
    question: '',
  };
  ngOnInit(): void {
    setTimeout(() => {
      this.signUpForm?.resetForm();
    }, 500000);
    this.fetchPosts();
  }
  onSubmit(form: NgForm) {
    setTimeout(() => {
      this.signUpForm?.resetForm();
    }, 4000);
    this.user.firstname = this.signUpForm?.value.userData.firstname;
    this.user.lastname = this.signUpForm?.value.userData.lastname;
    this.user.email = this.signUpForm?.value.userData.email;
    this.user.question = this.signUpForm?.value.userData.question;
    console.log(
      `${this.user.firstname} ${this.user.lastname} sent message from email: ${this.user.email} Text: ${this.user.question}`
    );
  }
  backdrop() {
    this.state = !this.state;
    document.body.style.overflow = 'hidden';
    setTimeout(() => {
      this.backdropRemove();
    }, 4000);
  }
  onSubmitPost(postData: {firstname: string; lastname: string; email: string; question: string}) {
    this.http
    .post('https://ng-test-project-request-default-rtdb.firebaseio.com/posts.json', postData)
    .subscribe((responseData: any) => {
      console.log(responseData);
    });
  }
  backdropRemove() {
    this.state = false;
    document.body.style.overflow = 'visible';
    this.signUpForm?.reset();
  }
  onFetchPosts() {
    this.fetchPosts();
  }
  private fetchPosts() {
    this.http.get('https://ng-test-project-request-default-rtdb.firebaseio.com/posts.json')
    .subscribe(posts => {
      console.log(posts);
    })
  }
}
