import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';

const AlbumScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.topBar}>
        <Link href="../home">
          <Ionicons name="arrow-back-outline" size={24} color="#FFFFFF" />
        </Link>
        <TextInput style={styles.searchBar} placeholder="Pesquisar..." placeholderTextColor="#AFAFAF" />
        <Ionicons name="share-social-outline" size={24} color="#FFFFFF" />
      </View>

      <View style={styles.albumInfo}>
        <Text style={styles.albumName}>Nome do Álbum: "Taylor's Version"</Text>
        <Text style={styles.albumRelease}>Lançamento: 2021</Text>
      </View>

      <Text style={styles.sectionTitle}>Músicas:</Text>
      <View style={styles.grid}>
        {[
          {
            title: 'Fearless',
            imageUri: 'https://i.scdn.co/image/ab67616d0000b273a48964b5d9a3d6968ae3e0de',
          },
          {
            title: 'Hey Stephen',
            imageUri: 'https://i.scdn.co/image/ab67616d0000b273a48964b5d9a3d6968ae3e0de',
          },
          {
            title: 'Love Story',
            imageUri: 'https://i.scdn.co/image/ab67616d0000b273a48964b5d9a3d6968ae3e0de',
          },
          {
            title: 'Tell Me Why',
            imageUri: 'https://i.scdn.co/image/ab67616d0000b273a48964b5d9a3d6968ae3e0de',
          },

        ].map((song, index) => (
          <View key={index} style={styles.songCard}>
            <Image style={styles.songImage} source={{ uri: song.imageUri }} />
            <Text style={styles.songTitle}>{song.title}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
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
    justifyContent: 'space-between',
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
  albumInfo: {
    marginVertical: 15,
  },
  albumName: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  albumRelease: {
    fontSize: 14,
    color: '#AFAFAF',
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginVertical: 8,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  songCard: {
    width: '45%',
    marginBottom: 15,
    alignItems: 'center',
  },
  songImage: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 8,
  },
  songTitle: {
    marginTop: 5,
    color: '#FFFFFF',
    fontSize: 12,
    textAlign: 'center',
  },
});

export default AlbumScreen;
