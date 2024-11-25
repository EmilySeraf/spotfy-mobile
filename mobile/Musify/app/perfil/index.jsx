import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert, TextInput } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function ProfileScreen() {
  const [profileImage, setProfileImage] = useState(null);
  const [bio, setBio] = useState('');

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

  const handleChangePassword = () => {
    Alert.alert('Trocar Senha', 'Funcionalidade de troca de senha em desenvolvimento.');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TextInput style={styles.searchBar} placeholder="Pesquisar" placeholderTextColor="#ccc" />
      </View>

      <Text style={styles.welcomeText}>Seja bem-vindo!</Text>

      <View style={styles.profileContainer}>
        <TouchableOpacity onPress={pickImage} style={styles.profileImageContainer}>
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
          <TouchableOpacity onPress={handleChangePassword} style={styles.changePasswordButton}>
            <Text style={styles.changePasswordText}>Trocar senha</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleSendImage} style={styles.saveIconContainer}>
            <Image
              source={require('../../assets/images/salvar.png')}
              style={styles.saveIcon}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3C096C',
  },
  header: {
    marginBottom: 20,
    backgroundColor: '#5A189A',
    padding: 23,
  },
  searchBar: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingHorizontal: 15,
    marginRight: 10,
    color: '#000',
    width: 400,
    padding: 5,
  },
  welcomeText: {
    color: '#fff',
    fontSize: 18,
    marginTop: 20,
    marginLeft: 50,
    marginBottom: 20,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
  },
  profileImageContainer: {
    backgroundColor: '#FFF',
    width: 150,
    height: 150,
    borderRadius: 75,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 20,
    marginLeft: 20,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
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
    marginBottom: 10,
    height: 50,
    marginTop: 30,
    width: 1100,
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
    marginBottom: 15,
    marginTop: 10
  },
  changePasswordText: {
    color: '#FFF',
    fontSize: 16,
  },
});
