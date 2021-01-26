<template>
  <div class="q-pa-md q-gutter-sm">
    <q-editor
      v-model="editor"
      :definitions="{
        save: {
          tip: 'Salve sua tarefa',
          icon: 'save',
          label: 'Salvar',
          handler: saveWork
        }
      }"
      :toolbar="[
        ['bold', 'italic', 'strike', 'underline'],
        ['upload', 'save']
      ]"
    />    
    <q-card class="row"
      flat bordered v-for="(item, index) in tasks" :key="index">
      <q-card-section class="col" v-html="item.texto" :class="item.estado ? 'tachar' : ''" />
      <q-btn flat color="blue" @click="item.estado = !item.estado">Ação</q-btn>
      <q-btn flat color="red" @click="eliminar(index)">Eliminar</q-btn>
    </q-card>

    <div class="flex flex-center" v-if="tasks.length == 0">
      <h6>Sem Tarefas!</h6>
    </div>

  </div>
</template>

<script>
export default {
  // Default Page Index
  // name: 'PageIndex'  
  data() {
    return {
      editor: '',
      tasks: [
        // {texto: 'Tarefa #1', estado: false},
       // {texto: 'Tarefa #2', estado: true},
       // {texto: 'Tarefa #3', estado: false}
      ]
    }
  },
  methods: {
    saveWork () {
      this.tasks.push({
        texto: this.editor,
        estado: false
      })
      this.$q.notify({
        message: 'Sua tarefa está salva',
        color: 'green-4',
        textColor: 'white',
        icon: 'cloud_done'
      })
    },
    eliminar(index) {
      this.$q.dialog({
        title: 'Ação Perigosa',
        message: 'Realmente quer eliminar a tarefa?',
        cancel: true,
        persistent: true
      }).onOk(() => {
      this.tasks.splice(index, 1);
        // console.log('>>> OK')
      })     
    }
  }
}
</script>

<style>
  .tachar{
    text-decoration: line-through;
  }
</style>
