import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { generateClient, type Client } from 'aws-amplify/api';
import { Todo, ListTodosQuery } from '../../API';
import * as mutations from '../../graphql/mutations';

@Component({
  standalone: true,
  imports: [ReactiveFormsModule],
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent {
  public createForm: FormGroup;
  public client: Client;

  constructor(private fb: FormBuilder) {
    this.createForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required]
    });

    this.client = generateClient();
  }

  public async onCreate(todo: Todo) {
    try {
      const response = await this.client.graphql({
        query: mutations.createTodo,
        variables: {
          input: todo
        }
      });
      console.log('item created!', response);
      this.createForm.reset();
    } catch (e) {
      console.log('error creating todo...', e);
    }
  }
}
