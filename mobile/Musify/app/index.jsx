import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Pressable } from 'react-native';
import { Link, useRouter } from 'expo-router';

export default function FullStack() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const router = useRouter()

    const handleLogin = async () => {
        if (!username || !password ) {
            alert('Preencha todos os campos');
            return;
        }
         try {
            const response = await fetch('http://localhost:8000/autenticacao/login/', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: username,
                    senha: password
                })
            });
    
            console.log(response)
            if (response.status === 404) {
                alert('Email não encontrado');
                return
            }
            if (response.status === 403){
                alert('Senha incorreta');
                return
            }
            router.push('/perfil')
    
        } catch (error) {
            console.error('Erro:', error);
        } 
    }


    return (
        <View style={styles.container}>
            <View style={styles.login}>
                <Text style={styles.logo}>Musify</Text>
                <View style={styles.labelContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Email"
                        value={username}
                        onChangeText={setUsername}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Senha"
                        secureTextEntry={true}
                        value={password}
                        onChangeText={setPassword}
                    />
                    <Pressable onPress={() => { }}>
                        <Text style={styles.esqueciSenha}>Esqueci a senha!</Text>
                    </Pressable>

                    <Pressable style={styles.botao} onPress={handleLogin}>
                        <Text style={styles.textoBotao}>Acessar</Text>
                    </Pressable>
                    <Link href="./cadastro">
                    <Pressable onPress={() => {router.push('/cadastro')}}>
                        <Text style={styles.signup}>Não possuo cadastro</Text>
                    </Pressable>
                    </Link>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        flex: 1,
        backgroundColor: '#3C096C',
        justifyContent: 'center',
        alignItems: 'center',
    },
    login: {
        backgroundColor: '#5A189A',
        alignItems: 'center',
        width: '90%',
        maxWidth: 400, 
        borderRadius: 30,
        paddingVertical: 30,
        paddingHorizontal: 20,
    },
    logo: {
        color: 'white',
        marginBottom: 30,
        fontSize: 30,
    },
    labelContainer: {
        width: '100%',
    },
    input: {
        backgroundColor: '#D6BCFA',
        width: '100%',
        padding: 12,
        borderRadius: 10,
        fontSize: 16,
        marginVertical: 15,
        color: '#333',
    },
    esqueciSenha: {
        color: 'white',
        textDecorationLine: 'underline',
        fontSize: 14,
        alignSelf: 'flex-start',
        marginTop: -10,
    },
    botao: {
        backgroundColor: '#9D4EDD',
        width: '100%',
        padding: 14,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 30,
    },
    textoBotao: {
        color: 'white',
        fontSize: 18,
    },
    signup: {
        color: 'white',
        marginTop: 20,
        fontSize: 16,
        textDecorationLine: 'underline',
        textAlign: 'center',
    },
});
