<script setup>
import { ref } from 'vue';
const todoRef = ref('');
const todoListRef = ref([]);
const ls = localStorage.todoList;
todoListRef.value = ls ? JSON.parse(ls) : [];
const isEditRef = ref(false); //編集ボタンを押したときにtrueにする
let editId = -1;
const editTodo = () => {
  //編集対象となるTODOを取得
  const todo = todoListRef.value.find((todo) => todo.id === editId);
  //TODOリストから編集対象のインデックスを取得
  const idx = todoListRef.value.findIndex((todo) => todo.id === editId);
  //taskを編集後のTODOで置き換え
  todo.task = todoRef.value;
  //solice関数でインデックスをもとに対象オブジェクトを置き換え
  todoListRef.value.splice(idx, 1, todo);
  //ローカルストレージに保存
  localStorage.todoList = JSON.stringify(todoListRef.value);
  //編集モードを解除
  isEditRef.value = false;
  //IDを初期値に戻す
  //editIndex = -1; これは必要？？
  todoRef.value = '';
}; //変更ボタンを押したとき
const deleteTodo = (id) => {
  const todo = todoListRef.value.find((todo) => todo.id === id);
  const idx = todoListRef.value.findIndex((todo) => todo.id === id);
  const delMsg = '「' + todo.task + '」を削除しますか？';
  if (!confirm(delMsg)) return;
  todoListRef.value.splice(idx, 1);
  localStorage.todoList = JSON.stringify(todoListRef.value);
};
const showTodo = (id) => {
  //配列（todoListRef.value）からの引数のidと同じ要素を検索する
  //findの「（todo）」には配列の要素が引数として順番に入る
  //「todo.id === id」がtureならその時点の要素：todoが返る
  const todo = todoListRef.value.find((todo) => todo.id === id);
  todoRef.value = todo.task;
  isEditRef.value = true;
  editId = id;
};

const addTodo = () => {
  //IDを簡易的にミリ秒で登録する
  const id = new Date().getTime();

  //配列に入力TODOを格納
  todoListRef.value.push({ id: id, task: todoRef.value });

  //ローカルストレージに登録
  localStorage.todoList = JSON.stringify(todoListRef.value);

  //登録後は入力欄を空にする
  todoRef.value = '';
};
</script>

<template>
  <div class="box_input">
    <input
      type="text"
      class="todo_input"
      v-model="todoRef"
      placeholder="+ TODOを入力"
    />
    <button class="btn green" @click="editTodo" v-show="isEditRef">変更</button>
    <button class="btn" @click="addTodo" v-show="!isEditRef">追加</button>
  </div>
  <div class="box_list">
    <div class="todo_list" v-for="todo in todoListRef" :key="todo.id">
      <div class="todo">
        <input type="checkbox" class="check" /><label>{{ todo.task }}</label>
      </div>
      <div class="btns">
        <button class="btn green" @click="showTodo(todo.id)">編</button>
        <button class="btn pink" @click="deleteTodo(todo.id)">削</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.box_input {
  margin-top: 20px;
}

.todo_input {
  width: 300px;
  border: 1px solid #aaa;
  border-radius: 6px;
  padding: 8px;
  font-size: 18px;
  margin-right: 8px; /*要素の右側の余白（マージン）を8ピクセルに設定する*/
}

.btn {
  border-radius: 6px;
  padding: 6px;
  font-size: 14px;
  color: #fff;
  text-align: center; /*要素内のテキストを中央揃えにする*/
  background-color: #03a9f4; /*要素の背景色を青色に設定する*/
}

.box_list {
  margin-top: 20px; /* 要素の上部に20ピクセルの余白を追加します。 */
  display: flex; /*要素をフレックスコンテナとして指定します。*/
  flex-direction: column; /*要素内のフレックスアイテム（子要素）の配置方向を縦方向に指定します。*/
  gap: 4px; /*フレックスアイテム間の余白を4ピクセルに指定します。*/
}

.todo_list {
  display: flex;
  align-items: center;
  gap: 8px;
}

.todo {
  border: 1px solid #ccc; /*要素に1ピクセル幅の #ccc (灰色)の線を描画する*/
  border-radius: 6px; /*要素の角を6ピクセルの半径で丸める*/
  padding: 12px; /*要素内部の余白を8ピクセルに設定する*/
  width: 300px; /*要素の幅を300ピクセルに設定する*/
}

.check {
  border: 1px solid red;
  transform: scale(1.6); /*要素の拡大率を1.6倍にする*/
  margin: 0 16px 2px 6px; /*上から順に、上下のマージンを0、左右のマージンを16ピクセルと12ピクセルに設定し、下のマージンを2ピクセルに設定する*/
}

.btns {
  display: flex;
  gap: 4px;
}

.green {
  background-color: #00c853;
}

.pink {
  background-color: #ff4081;
}
</style>
