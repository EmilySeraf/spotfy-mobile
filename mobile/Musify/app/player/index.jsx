import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';

const PlayerScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <Link href="../perfil">
          <Ionicons name="person-circle-outline" size={24} color="#FFFFFF" />
        </Link>
        <TextInput style={styles.searchBar} placeholder="Pesquisar..." placeholderTextColor="#AFAFAF" />
        <Link href="../home">
        <Ionicons name="home-outline" size={20} color="#FFFFFF" />
        </Link>
      </View>

      <Image
        source={{
          uri: 'https://i.scdn.co/image/ab67616d0000b2737d384516b23347e92a587ed1',
        }}
        style={styles.albumImage}
      />
      <Text style={styles.songTitle}>Virginia Beach</Text>
      <Text style={styles.artist}>Drake</Text>

      {/* Controls */}
      <View style={styles.controls}>
        <TouchableOpacity>
          <Ionicons name="play-back" size={40} color="#FFFFFF" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.playPauseButton}>
          <Ionicons name="play" size={40} color="#FFFFFF" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="play-forward" size={40} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4B0082',
    padding: 15,
  },
  topBar: {
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
  albumImage: {
    width: 200,
    height: 200,
    borderRadius: 10,
    alignSelf: 'center',
    marginVertical: 20,
  },
  songTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  artist: {
    fontSize: 14,
    color: '#AFAFAF',
    textAlign: 'center',
    marginBottom: 30,
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  playPauseButton: {
    backgroundColor: '#6A0572',
    padding: 20,
    borderRadius: 50,
  },
});

export default PlayerScreen;
