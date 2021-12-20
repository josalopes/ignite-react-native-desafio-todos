import React, { useState, useRef, useEffect } from 'react';
import { Image, TouchableOpacity, View, TextInput, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import { EditTask } from './TasksList';
import trashIcon from '../assets/icons/trash/trash.png'
import editIcon from '../assets/images/PenEdit.png'

export interface Task {
  id: number;
  title: string;
  done: boolean;
}

interface TaskItemProps {
  item: Task;
  index: number;
  toggleTaskDone: (id: number) => void;
  removeTask: (id: number) => void;
  editTask: (taskToEdit: EditTask) => void;
}


export function TaskItem({ item, index, toggleTaskDone, removeTask, editTask }: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedItem, setEditedItem] = useState(item.title);
  const textInputRef = useRef<TextInput>(null);
  
  function handleStartEditing() {
    setIsEditing(true);
  }
  
  function handleCancelEditing() {
    setEditedItem(item.title);
    setIsEditing(false);
  }

  function handleSubmitEditing() {
    let dataEdited: EditTask;

    if (isEditing) {
      dataEdited = {
        taskId: item.id,
        taskNewTitle: editedItem
      }
      editTask(dataEdited);
      setIsEditing(false);
    }
  }

  useEffect(() => {
    if (textInputRef.current) {
      if (isEditing) {
        textInputRef.current.focus();
      } else {
        textInputRef.current.blur();
      }
    }
  }, [isEditing])

  return (
    <>
      <View style={ styles.container }>
        <TouchableOpacity
          testID={`button-${index}`}
          activeOpacity={0.7}
          style={styles.taskButton}
          onPress={() => toggleTaskDone(item.id)}
        >
          <View 
            testID={`marker-${index}`}
            style={item.done ? styles.taskMarkerDone : styles.taskMarker}
          >
            { item.done && (
              <Icon 
                name="check"
                size={12}
                color="#FFF"
              />
            )}
          </View>

          <TextInput 
            ref={textInputRef}
            value={editedItem}
            onChangeText={setEditedItem}
            editable={isEditing}
            onSubmitEditing={handleSubmitEditing}
            style={item.done ? styles.taskTextDone : styles.taskText} 
          />
        </TouchableOpacity>
      </View>

      <View style={ styles.iconsContainer } >
        { isEditing ? (
          <TouchableOpacity
            onPress={handleCancelEditing}
          >
            <Icon name="x" size={24} color="#b2b2b2" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={handleStartEditing}
          >
            <Image source={editIcon} />
          </TouchableOpacity>
        ) }

        <View 
          style={ styles.iconsDivider }
        />

        <TouchableOpacity
          disabled={isEditing}
          onPress={() => removeTask(item.id)}
        >
          <Image source={trashIcon} style={{ opacity: isEditing ? 0.2 : 1 }} />
        </TouchableOpacity>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row'  ,
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  infoContainer: {
    flex: 1,
  },
  taskButton: {
    flex: 1,
    paddingHorizontal: 24,
    // paddingVertical: 15,
    marginBottom: 4,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center'
  },
  taskMarker: {
    height: 16,
    width: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#B2B2B2',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  taskText: {
    color: '#666',
    fontFamily: 'Inter-Medium'
  },
  taskMarkerDone: {
    height: 16,
    width: 16,
    borderRadius: 4,
    backgroundColor: '#1DB863',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  taskTextDone: {
    color: '#1DB863',
    textDecorationLine: 'line-through',
    fontFamily: 'Inter-Medium'
  },
  iconsDivider: {
    height: 24,
    width: 1,
    backgroundColor: 'rgba(196, 196, 196, 0.24)',
    marginHorizontal: 12
  },
  iconsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 12,
    paddingRight: 24
  }
})