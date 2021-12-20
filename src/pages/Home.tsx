import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, EditTask, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const updatedTasks = tasks.map(el => {return { ...el }});
    const foundTaskByTitle = updatedTasks.find(item => item.title.toLowerCase() === newTaskTitle.toLowerCase());

    if (foundTaskByTitle) {
      Alert.alert(
        "Task já cadastrada",
        "Você não pode cadastrar uma task com o mesmo nome"
      )
    } else {
      const data = {
        id: new Date().getTime(),
        title: newTaskTitle,
        done: false
      }
      setTasks(oldTasks => [...oldTasks, data]);
    }
  }

  function handleToggleTaskDone(id: number) {
    const updatedTasks = tasks.map(el => {return { ...el }});
    const foundTaskById = updatedTasks.find(item => item.id == id);
    if (!foundTaskById)   {
      return;
    }

    foundTaskById.done = !foundTaskById.done;
    setTasks(updatedTasks);
  }

  function handleRemoveTask(id: number) {
    Alert.alert(
      "Remover item",
      "Tem certeza de que deseja remover este item?",
      [
        {
          text: "Cancelar",
          style: "cancel"
        },
        { text: "OK", 
          onPress: () => {
            const tasksEdited = tasks.filter(item => item.id !== id);
            setTasks(tasksEdited);
          }
        } 
      ]
    )
  }

  function handleEditTask(editTask: EditTask) {
    const editedTasks = tasks.map(el => {return { ...el }});
    const foundTaskById = editedTasks.find(item => item.id == editTask.taskId);
    if (!foundTaskById)   {
      return;
    }

    foundTaskById.title = editTask.taskNewTitle;
    setTasks(editedTasks);
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask} 
        editTask={handleEditTask} 
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})