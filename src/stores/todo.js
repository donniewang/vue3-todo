import { defineStore } from 'pinia';

import { reactive, computed } from 'vue';

export const useToDoStore = defineStore('todo', () => {
  const todos = reactive({});

  function saveToDo() {
    const todoData = JSON.stringify(todos.values);
    localStorage.setItem('TODO', todoData);
    console.log('saveToDo', todos.values);
  }

  function loadToDo() {
    const todoData = localStorage.getItem('TODO');
    if (!!todoData) {
      todos.values = JSON.parse(todoData);
    }
    console.log('loadToDo', todos.values);
  }

  function addToDo(todo) {
    console.log('addToDo', todo, todos.values);
    todos.values.push(todo);
    console.log('after addToDo', todo, todos.values);
    saveToDo();
  }

  function modifyToDo(todo) {
    console.log('modifyToDo', todo);
    const index = todos.values.findIndex((item) => item['id'] === todo['id']);
    if (index > -1) {
      todos.values[index] = todo;
      console.log('after modifyToDo', todo, todos.values);
    }
    saveToDo();
  }

  function removeToDo(todo) {
    console.log('removeToDo', todo);
    const index = todos.values.findIndex((item) => item['id'] === todo['id']);
    if (index > -1) {
      todos.values.splice(index, 1);
    }
    saveToDo();
  }

  function completeToDo(todo) {
    console.log('completeToDo', todo);
    const index = todos.values.findIndex((item) => item['id'] === todo['id']);
    if (index > -1 && todos.values[index]['status'] == 1) {
      todos.values[index]['status'] = 2;
    }
    saveToDo();
  }

  return {
    loadToDo,
    todos,
    addToDo,
    modifyToDo,
    removeToDo,
    completeToDo,
  };
});
