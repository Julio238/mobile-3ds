
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Modal,
  Alert,
} from 'react-native';

export default function App() {
  const [receitas, setReceitas] = useState([
    {
      id: '1',
      nome: 'Panqueca Simples',
      ingredientes:
        '1 ovo\n1 xícara de leite\n1 xícara de farinha de trigo\n1 pitada de sal',
      preparo:
        '1. Misture o ovo, o leite, a farinha e o sal.\n\n2. Aqueça uma frigideira untada.\n\n3. Despeje uma porção da massa.\n\n4. Doure dos dois lados e sirva.',
    },
  ]);

  const [verReceitaVisivel, setVerReceitaVisivel] = useState(false);
  const [cadastroVisivel, setCadastroVisivel] = useState(false);
  const [receitaSelecionada, setReceitaSelecionada] = useState(null);

  const [nome, setNome] = useState('');
  const [ingredientes, setIngredientes] = useState('');
  const [preparo, setPreparo] = useState('');

  function abrirReceita(receita) {
    setReceitaSelecionada(receita);
    setVerReceitaVisivel(true);
  }

  function limparCampos() {
    setNome('');
    setIngredientes('');
    setPreparo('');
  }

  function cancelarCadastro() {
    limparCampos();
    setCadastroVisivel(false);
  }

  function salvarReceita() {
    if (
      nome.trim() === '' ||
      ingredientes.trim() === '' ||
      preparo.trim() === ''
    ) {
      Alert.alert(
        'Campos obrigatórios',
        'Preencha o nome, os ingredientes e o modo de preparo.'
      );
      return;
    }

    const novaReceita = {
      id: Date.now().toString(),
      nome: nome.trim(),
      ingredientes: ingredientes.trim(),
      preparo: preparo.trim(),
    };

    setReceitas((listaAtual) => [...listaAtual, novaReceita]);
    limparCampos();
    setCadastroVisivel(false);

    Alert.alert('Sucesso!', 'Receita cadastrada com sucesso.');
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>🍳 App de Receitas</Text>

      <Text style={styles.subtitulo}>
        Descubra sabores e compartilhe receitas!
      </Text>

      <Text style={styles.contador}>
        Total de receitas: {receitas.length}
      </Text>

      <ScrollView
        style={styles.lista}
        contentContainerStyle={styles.listaConteudo}
      >
        {receitas.map((receita) => (
          <View key={receita.id} style={styles.card}>
            <Text style={styles.nomeReceita}>
              🍽️ {receita.nome}
            </Text>

            <Text style={styles.resumo}>
              Confira os ingredientes e o modo de preparo.
            </Text>

            <TouchableOpacity
              style={styles.botao}
              onPress={() => abrirReceita(receita)}
            >
              <Text style={styles.textoBotao}>Ver Receita</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>

      {/* BOTÃO FLUTUANTE (+) */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => setCadastroVisivel(true)}
        activeOpacity={0.8}
      >
        <Text style={styles.fabTexto}>+</Text>
      </TouchableOpacity>

      {/* MODAL PARA VISUALIZAR A RECEITA */}
      <Modal
        visible={verReceitaVisivel}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setVerReceitaVisivel(false)}
      >
        <View style={styles.modalFundo}>
          <View style={styles.modalConteudo}>
            <ScrollView>
              <Text style={styles.modalTitulo}>
                {receitaSelecionada?.nome}
              </Text>

              <Text style={styles.secaoTitulo}>
                Ingredientes
              </Text>

              <Text style={styles.detalhes}>
                {receitaSelecionada?.ingredientes}
              </Text>

              <Text style={styles.secaoTitulo}>
                Modo de Preparo
              </Text>

              <Text style={styles.detalhes}>
                {receitaSelecionada?.preparo}
              </Text>

              <TouchableOpacity
                style={styles.botao}
                onPress={() => setVerReceitaVisivel(false)}
              >
                <Text style={styles.textoBotao}>Fechar</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* MODAL PARA CADASTRAR UMA NOVA RECEITA */}
      <Modal
        visible={cadastroVisivel}
        animationType="slide"
        transparent={true}
        onRequestClose={cancelarCadastro}
      >
        <View style={styles.modalFundo}>
          <View style={styles.modalConteudo}>
            <ScrollView keyboardShouldPersistTaps="handled">
              <Text style={styles.modalTitulo}>
                Nova Receita
              </Text>

              <Text style={styles.label}>
                Nome da Receita
              </Text>

              <TextInput
                style={styles.input}
                placeholder="Ex.: Bolo de Cenoura"
                value={nome}
                onChangeText={setNome}
              />

              <Text style={styles.label}>
                Ingredientes
              </Text>

              <TextInput
                style={[styles.input, styles.inputMultiline]}
                placeholder="Digite os ingredientes..."
                value={ingredientes}
                onChangeText={setIngredientes}
                multiline={true}
                textAlignVertical="top"
              />

              <Text style={styles.label}>
                Modo de Preparo
              </Text>

              <TextInput
                style={[styles.input, styles.inputMultiline]}
                placeholder="Descreva o preparo..."
                value={preparo}
                onChangeText={setPreparo}
                multiline={true}
                textAlignVertical="top"
              />

              <TouchableOpacity
                style={styles.botao}
                onPress={salvarReceita}
              >
                <Text style={styles.textoBotao}>Salvar</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.botaoCancelar}
                onPress={cancelarCadastro}
              >
                <Text style={styles.textoBotao}>Cancelar</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF8F0',
    padding: 20,
    paddingTop: 50,
  },

  titulo: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#A63D20',
    textAlign: 'center',
    marginBottom: 10,
  },

  subtitulo: {
    fontSize: 16,
    color: '#6B705C',
    textAlign: 'center',
    marginBottom: 15,
  },

  contador: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#A63D20',
    textAlign: 'center',
    marginBottom: 20,
  },

  lista: {
    flex: 1,
  },

  listaConteudo: {
    paddingBottom: 100,
  },

  card: {
    backgroundColor: '#FFFFFF',
    borderLeftWidth: 5,
    borderLeftColor: '#E76F51',
    padding: 16,
    borderRadius: 12,
    marginBottom: 15,
    elevation: 3,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },

  nomeReceita: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#A63D20',
    marginBottom: 8,
  },

  resumo: {
    fontSize: 14,
    color: '#6B705C',
    marginBottom: 12,
  },

  botao: {
    backgroundColor: '#E76F51',
    padding: 14,
    borderRadius: 10,
    marginTop: 8,
    marginBottom: 8,
  },

  textoBotao: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  fab: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#2A9D8F',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },

  fabTexto: {
    color: '#FFFFFF',
    fontSize: 36,
    lineHeight: 42,
    fontWeight: 'bold',
  },

  modalFundo: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    padding: 20,
  },

  modalConteudo: {
    backgroundColor: '#FFF8F0',
    borderRadius: 16,
    padding: 22,
    maxHeight: '85%',
  },

  modalTitulo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#A63D20',
    textAlign: 'center',
    marginBottom: 20,
  },

  secaoTitulo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2A9D8F',
    marginTop: 12,
    marginBottom: 8,
  },

  detalhes: {
    fontSize: 16,
    color: '#333333',
    lineHeight: 24,
    marginBottom: 12,
  },

  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#6B705C',
    marginBottom: 6,
    marginTop: 8,
  },

  input: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D6CFC7',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 10,
  },

  inputMultiline: {
    minHeight: 90,
  },

  botaoCancelar: {
    backgroundColor: '#6B705C',
    padding: 14,
    borderRadius: 10,
    marginTop: 5,
    marginBottom: 10,
  },
});

