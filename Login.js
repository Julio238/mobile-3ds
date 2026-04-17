import React, { useState } from "react";
import { View, Text, TextInput, Button, Image, StyleSheet } from "react-native";

export default function Login({ irParaCatalogo, irParaCadastro }) {
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");

  return (
    <View style={styles.container}>
      {/* Imagem da fazenda como logo/banner */}
      <Image
        source={{ uri: "https://images.creativefabrica.com/products/previews/2023/09/21/zflmFfpQ1/2arIMKaNH3p63xC93CBzRYqmF9Z-desktop.jpg" }}
        style={styles.logo}
      />

      <Text style={styles.titulo}>Login</Text>

      <TextInput
        placeholder="Usuário"
        value={usuario}
        onChangeText={setUsuario}
        style={styles.input}
      />
      <TextInput
        placeholder="Senha"
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
        style={styles.input}
      />

      <Button title="Entrar" onPress={irParaCatalogo} />
      <Button title="Cadastrar" onPress={irParaCadastro} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20, backgroundColor: "#fff" },
  logo: { width: 200, height: 120, marginBottom: 20, borderRadius: 10 },
  titulo: { fontSize: 22, marginBottom: 20 },
  input: { width: "100%", borderWidth: 1, borderColor: "#ccc", padding: 8, marginBottom: 15, borderRadius: 5 },
});
