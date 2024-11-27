import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';

const HomeScreen = () => {
  const [searchQuery, setSearchQuery] = useState(''); // Controla o texto digitado
  const [suggestions, setSuggestions] = useState([]); // Armazena as sugestões filtradas

  // "API falsa" com músicas
  const songs = [
    { id: 1, name: 'Virginia Beach', screen: '../player' },
    { id: 2, name: 'Save Your Tears', screen: '../player' },
    { id: 3, name: 'Starboy', screen: '../player' },
    { id: 4, name: 'Can’t Feel My Face', screen: '../player' },
    { id: 5, name: 'After Hours', screen: '../player' },
    { id: 6, name: 'In Your Eyes', screen: '../player' },
  ];

  // Função para gerenciar a busca
  const handleSearch = (text) => {
    setSearchQuery(text);
    if (text === '') {
      setSuggestions([]);
    } else {
      const filtered = songs.filter((song) =>
        song.name.toLowerCase().includes(text.toLowerCase())
      );
      setSuggestions(filtered);
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        {/* Barra de pesquisa */}
        <View style={styles.topBar}>
          <Link href="../perfil">
            <Ionicons name="person-circle-outline" size={24} color="#FFFFFF" />
          </Link>
          <TextInput
            style={styles.searchBar}
            placeholder="Pesquisar..."
            placeholderTextColor="#AFAFAF"
            value={searchQuery}
            onChangeText={handleSearch}
          />
          <Ionicons name="home-outline" size={20} color="#FFFFFF" />
        </View>

        {/* Exibição das sugestões de pesquisa */}
        {suggestions.length > 0 && (
          <View style={styles.suggestionsContainer}>
            {suggestions.map((song) => (
              <Link key={song.id} href={song.screen}>
                <Text style={styles.suggestion}>{song.name}</Text>
              </Link>
            ))}
          </View>
        )}

        {/* Seções da Home */}
        <Text style={styles.sectionTitle}>Você pode gostar:</Text>
        <View style={styles.grid}>
          {[
            'https://i.scdn.co/image/ab67616d0000b2737d384516b23347e92a587ed1',
            'https://image-cdn-ak.spotifycdn.com/image/ab67706c0000da84ca2979cca43e8bc4b7f04051',
            'https://i.scdn.co/image/ab67616d00001e02e787cffec20aa2a396a61647',
            'https://i.scdn.co/image/ab67616d00001e022641dabf71490db793d28b40',
            'https://i.scdn.co/image/ab67616d0000b2734e3dbfb3779e35fe39ae418a',
            'https://i.scdn.co/image/ab67616d00001e0293b7f0d53b20302ee6e28f13',
          ].map((imageUri, index) => (
            <View key={index} style={styles.squareCard}>
              <Link href="../player">
                <Image style={styles.squareCard} source={{ uri: imageUri }} />
              </Link>
            </View>
          ))}
        </View>

        <Text style={styles.sectionTitle}>Artistas populares:</Text>
        <View style={styles.grid}>
          {[
            'https://i.scdn.co/image/ab67706f0000000252feef11af8c9d412769ec5a',
            'https://thisis-images.spotifycdn.com/37i9dQZF1DZ06evO4dI4Ei-default.jpg',
            'https://camoesradio.com/ewrt87u6ythghrhfg/2020/12/Ariana-Grande-no-spotify-Camo%CC%83es-Ra%CC%81dio-Mundo.jpeg',
          ].map((imageUri, index) => (
            <Image key={index} style={styles.circleCard} source={{ uri: imageUri }} />
          ))}
        </View>

        <Text style={styles.sectionTitle}>Álbuns:</Text>
        <View style={styles.grid}>
          {[
            'https://i.scdn.co/image/ab67616d0000b273a48964b5d9a3d6968ae3e0de',
            'https://i.scdn.co/image/ab67616d0000b27318e89c16c0fa1ad6547a8e83',
            'https://i.scdn.co/image/ab67616d0000b273c3af0c2355c24ed7023cd394',
          ].map((imageUri, index) => (
            <View key={index} style={styles.squareCard}>
              <Link href="../albuns">
                <Image style={styles.squareCard} source={{ uri: imageUri }} />
              </Link>
            </View>
          ))}
        </View>
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
  suggestionsContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    marginTop: 5,
    padding: 10,
    elevation: 5,
  },
  suggestion: {
    fontSize: 14,
    paddingVertical: 5,
    color: '#4B0082',
    borderBottomWidth: 1,
    borderBottomColor: '#DDD',
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
  squareCard: {
    width: 100,
    height: 100,
    aspectRatio: 1,
    borderRadius: 8,
    marginBottom: 10,
  },
  circleCard: {
    width: '28%',
    aspectRatio: 1,
    borderRadius: 50,
    marginBottom: 10,
  },
});

export default HomeScreen;
