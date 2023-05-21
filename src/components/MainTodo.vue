<script setup>
import { ref } from 'vue';
import { useTodoList } from '/src/composables/useTodoList.js';
import BaseButton from '/src/components/BaseButton.vue';

const todoRef = ref('');
const isEditRef = ref(false); //編集ボタンを押したときにtrueにする
const { todoListRef, add, show, edit, del, check, countFin } = useTodoList();

const addTodo = () => {
  add(todoRef.value);
  todoRef.value = '';
};

const showTodo = (id) => {
  todoRef.value = show(id);
  isEditRef.value = true;
};

const editTodo = () => {
  edit(todoRef.value);
  isEditRef.value = false;
  todoRef.value = '';
};

const deleteTodo = (id) => {
  del(id);
};

const changeCheck = (id) => {
  check(id);
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
    <BaseButton color="green" @on-click="editTodo" v-if="isEditRef"
      >変更</BaseButton
    >
    <BaseButton color="blue" @on-click="addTodo" v-else>追加</BaseButton>
  </div>
  <div class="box_list">
    <div class="todo_list" v-for="todo in todoListRef" :key="todo.id">
      <div class="todo" :class="{ fin: todo.checked }">
        <input
          type="checkbox"
          class="check"
          @change="changeCheck(todo.id)"
          :checked="todo.checked"
        /><label>{{ todo.task }}</label>
      </div>
      <div class="btns">
        <BaseButton color="green" @on-click="showTodo(todo.id)">編</BaseButton>
        <BaseButton color="pink" @on-click="deleteTodo(todo.id)">削</BaseButton>
      </div>
    </div>
  </div>
  <div class="finCount">
    <span>完了：{{ countFin }} 、</span>
    <span>未完了：{{ todoListRef.length - countFin }}</span>
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

.fin {
  text-decoration: line-through;
  background-color: #ddd;
  color: #777;
}

.fincount {
  margin-top: 8px;
  font-size: 0.8em;
}
</style>
