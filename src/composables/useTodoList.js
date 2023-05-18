import { computed, ref } from 'vue';

//外部から使えるようにexportする
export const useTodoList = () => {
  //ローカルストレージにtodoListが存在していればparseし、
  //なければundifinedになるため空配列をセットする。
  const ls = localStorage.todoList;
  const todoListRef = ref([]);
  todoListRef.value = ls ? JSON.parse(ls) : [];

  //追加処理
  const add = (task) => {
    //IDを簡易的にミリ秒で登録する
    const id = new Date().getTime();
    //配列に入力TODOを格納
    todoListRef.value.push({ id: id, task: task, checked: false });
    //ローカルストレージに登録
    localStorage.todoList = JSON.stringify(todoListRef.value);
  };
  //TODOリストからIDを元にそのインデックスを取得
  const findById = (id) => {
    return todoListRef.value.find((todo) => todo.id === id);
  };
  //TODOリストからIDを元にそのインデックスを取得
  const findIndexById = (id) => {
    return todoListRef.value.findIndex((todo) => todo.id === id);
  };

  //編集ボタン処理
  const editId = ref(-1); //リアクティブにします
  const show = (id) => {
    const todo = findById(id);
    editId.value = id;
    return todo.task; //画面処理させるために返します
  };

  //変更ボタン処理
  const edit = (task) => {
    const todo = findById(editId.value);
    const idx = findIndexById(editId.value);
    todo.task = task;
    todoListRef.value.splice(idx, 1, todo);
    localStorage.todoList = JSON.stringify(todoListRef.value);
    editId.value = -1;
  };

  //削除ボタン処理
  const del = (id) => {
    const todo = findById(id);
    const delMsg = '「' + todo.task + '」を削除しますか？';
    if (!confirm(delMsg)) return;

    const idx = findIndexById(id);
    todoListRef.value.splice(idx, 1);
    localStorage.todoList = JSON.stringify(todoListRef.value);
  };

  //チェックボタン処理
  const check = (id) => {
    const todo = findById(id);
    const idx = findIndexById(id);
    todo.checked = !todo.checked;
    todoListRef.value.splice(idx, 1, todo);
    localStorage.todoList = JSON.stringify(todoListRef.value);
  };

  const countFin = computed(() => {
    console.log('computed');
    const finArr = todoListRef.value.filter((todo) => todo.checked);
    return finArr.length;
  });

  //returnすることでtodoとidxを外部から使うことができる
  return { todoListRef, add, show, edit, del, check, countFin };
};
