import React, { useState, useContext, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert, TextInput, Modal, Pressable } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { AppContext } from '../../scripts/appContext.js';
import { Ionicons } from '@expo/vector-icons';

export default function ProfileScreen() {
  const [profileImage, setProfileImage] = useState(null);
  const [bio, setBio] = useState('');
  const { userInfo, setUserInfo } = useContext(AppContext)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [novaSenha, setNovaSenha] = useState('')
  const [confirmarNovaSenha, setConfirmarNovaSenha] = useState('')

  useEffect(() => {
    if (userInfo.profile_image) {
        setImage(userInfo.profile_image)
    }
}, [])

  const handleSendImage = async () => {
    try {
      const data = {
        file: profileImage,
        upload_preset: 'ml_default',
      };
      const res = await fetch('https://api.cloudinary.com/v1_1/drpncpz9i/upload', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await res.json();
      setProfileImage(result.url);
      Alert.alert('Sucesso', 'Salvo com Sucesso!');
    } catch (e) {
      console.error(e);
      Alert.alert('Erro', 'Não foi possível enviar a imagem. Tente novamente.');
    }
  };

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      Alert.alert('Permissão necessária', 'Você precisa permitir o acesso à galeria para alterar a foto.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  const saveNewImageURLonBackend = async (result) => {
    const response = await fetch(`http://localhost:8000/user/trocar-img/${userInfo.id}`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: result.url })
    });
    console.log(data)
    if (response.status === 200) {
        data = await response.json()
        alert('Imagem atualizada com sucesso')
        return
    }
    alert('Houve um erro ao atualizar a imagem')
}

const handleChangePassword = async () => {
    if (novaSenha != confirmarNovaSenha){
        alert('as senhas não coincidem')
        return
    }
    const res = await fetch(`http://localhost:8000/autenticacao/change-password/${userInfo.id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({novaSenha: novaSenha})
        });
    if (res.status != 200){
        alert('houve um problema, tente novamente')
        setIsModalOpen(!isModalOpen)
        return
    }
    alert('senha trocada com sucesso')
    setIsModalOpen(!isModalOpen)
}

return (
  <View style={styles.container}>
    <View style={styles.header}>
      <TextInput
        style={styles.searchBar}
        placeholder="Pesquisar"
        placeholderTextColor="#ccc"
      />
      <Ionicons name="home-outline" size={20} color="#FFFFFF" />
    </View>

    <Text style={styles.welcomeText}>Seja bem-vindo {userInfo.nome}!</Text>

    

    <View style={styles.profileContainer}>
      <TouchableOpacity
        onPress={pickImage}
        style={styles.profileImageContainer}
      >
        <Image
          source={
            profileImage
              ? { uri: profileImage }
              : require('../../assets/images/icon.png')
          }
          style={styles.profileImage}
        />
      </TouchableOpacity>

      <View style={styles.bioContainer}>
        <TextInput
          style={styles.bioInput}
          placeholder="Bio"
          placeholderTextColor="#ccc"
          value={bio}
          onChangeText={(text) => setBio(text)}
        />
        <TouchableOpacity
          onPress={() => setIsModalOpen(true)}
          style={styles.changePasswordButton}
        >
          <Text style={styles.changePasswordText}>Trocar senha</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => console.log('Imagem salva!')}
          style={styles.saveIconContainer}
        >
          <Image
            source={require('../../assets/images/salvar.png')}
            style={styles.saveIcon}
          />
        </TouchableOpacity>
      </View>
    </View>

    <Modal
      animationType="slide"
      transparent={true}
      visible={isModalOpen}
      onRequestClose={() => setIsModalOpen(false)}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <TextInput
            placeholder="Nova senha"
            style={styles.bioInput}
            onChangeText={setNovaSenha}
            value={novaSenha}
            secureTextEntry={true}
          />
          <TextInput
            placeholder="Confirmar nova senha"
            style={styles.bioInput}
            onChangeText={setConfirmarNovaSenha}
            value={confirmarNovaSenha}
            secureTextEntry={true}
          />
          <Pressable
            onPress={handleChangePassword}
            style={styles.changePasswordButton}
          >
            <Text style={styles.changePasswordText}>Alterar senha</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  </View>
);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4B0082',
    padding: 15,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  searchBar: {
    flex: 1,
    height: 35,
    backgroundColor: '#6A0DAD',
    borderRadius: 15,
    paddingHorizontal: 10,
    marginHorizontal: 8,
    color: '#FFFFFF',
    fontSize: 12,
  },
  welcomeText: {
    color: '#fff',
    fontSize: 15,
    marginTop: 20,
    marginLeft: 20,
    fontWeight: 'bold', 
    paddingEnd: 20,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    marginBottom: 30,
  },
  profileImageContainer: {
    backgroundColor: '#FFF',
    width: 120,
    height: 120,
    borderRadius: 60,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 20,
    
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  bioContainer: {
    flex: 1,
    justifyContent: 'center',
    
  },
  bioInput: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 10,
    color: '#000',
    height: 50,
    width: '100%', 
    
  },
  saveIconContainer: {
    backgroundColor: '#fff',
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveIcon: {
    width: 24,
    height: 24,
  },
  changePasswordButton: {
    backgroundColor: '#6A0572',
    padding: 10,
    borderRadius: 5,
    alignSelf: 'flex-start',
    marginBottom: 20, 
    marginTop: 15, 
  },
  changePasswordText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold', 
  },
  modalView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', 
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: '#FFF',
    padding: 20,
    width: '80%', 
    borderRadius: 10,
  },
  modalInput: {
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
    width: '100%',
    height: 50,
  },
});