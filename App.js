
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  FlatList,
  Modal,
  Alert,
} from 'react-native';

export default function App() {
  const [listaReceitas, setListaReceitas] = useState([
    {
      id: '1',
      nome: 'Panqueca Simples',
      ingredientes:
        '1 ovo\n1 xícara de leite\n1 xícara de farinha de trigo\n1 pitada de sal',
      modoPreparo:
        '1. Misture todos os ingredientes.\n\n2. Aqueça uma frigideira untada.\n\n3. Despeje uma porção da massa.\n\n4. Doure dos dois lados e sirva.',
    },
  ]);

  const [modalCadastroVisivel, setModalCadastroVisivel] = useState(false);
  const [modalDetalhesVisivel, setModalDetalhesVisivel] = useState(false);

  const [receitaSelecionada, setReceitaSelecionada] = useState(null);

  const [nomeReceita, setNomeReceita] = useState('');
  const [ingredientes, setIngredientes] = useState('');
  const [modoPreparo, setModoPreparo] = useState('');

  const [idEdicao, setIdEdicao] = useState(null);

  // Limpa os campos e fecha o formulário
  function limparEFechar() {
    setNomeReceita('');
    setIngredientes('');
    setModoPreparo('');
    setIdEdicao(null);
    setModalCadastroVisivel(false);
  }

  // Abre o formulário para cadastrar uma nova receita
  function handleNovaReceita() {
    setNomeReceita('');
    setIngredientes('');
    setModoPreparo('');
    setIdEdicao(null);
    setModalCadastroVisivel(true);
  }

  // Carrega uma receita existente para edição
  function handleIniciarEdicao(receita) {
    setNomeReceita(receita.nome);
    setIngredientes(receita.ingredientes);
    setModoPreparo(receita.modoPreparo);
    setIdEdicao(receita.id);
    setModalDetalhesVisivel(false);
    setModalCadastroVisivel(true);
  }

  // Cadastra uma receita ou atualiza uma receita existente
  function handleSalvar() {
    if (
      nomeReceita.trim() === '' ||
      ingredientes.trim() === '' ||
      modoPreparo.trim() === ''
    ) {
      Alert.alert(
        'Campos obrigatórios',
        'Preencha o nome, os ingredientes e o modo de preparo.'
      );
      return;
    }

    if (idEdicao !== null) {
      setListaReceitas((listaAtual) =>
        listaAtual.map((item) =>
          item.id === idEdicao
            ? {
                ...item,
                nome: nomeReceita.trim(),
                ingredientes: ingredientes.trim(),
                modoPreparo: modoPreparo.trim(),
              }
            : item
        )
      );

      limparEFechar();
      Alert.alert('Sucesso!', 'Receita atualizada com sucesso.');
    } else {
      const novaReceita = {
        id: Date.now().toString(),
        nome: nomeReceita.trim(),
        ingredientes: ingredientes.trim(),
        modoPreparo: modoPreparo.trim(),
      };

      setListaReceitas((listaAtual) => [...listaAtual, novaReceita]);

      limparEFechar();
      Alert.alert('Sucesso!', 'Receita cadastrada com sucesso.');
    }
  }

  // Exclui uma receita somente após confirmação
  function handleExcluir(id) {
    Alert.alert(
      'Excluir receita',
      'Tem certeza que deseja excluir esta receita?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: () => {
            setListaReceitas((listaAtual) =>
              listaAtual.filter((item) => item.id !== id)
            );

            setModalDetalhesVisivel(false);
            setReceitaSelecionada(null);
          },
        },
      ]
    );
  }

  // Abre os detalhes de uma receita
  function handleVerReceita(receita) {
    setReceitaSelecionada(receita);
    setModalDetalhesVisivel(true);
  }

  // Cartão individual de cada receita
  function renderizarReceita({ item }) {
    return (
      <View style={styles.card}>
        <Text style={styles.nomeReceita}>
          🍽️ {item.nome}
        </Text>

        <Text style={styles.resumo}>
          Confira os ingredientes e o modo de preparo.
        </Text>

        <TouchableOpacity
          style={styles.botao}
          onPress={() => handleVerReceita(item)}
        >
          <Text style={styles.textoBotao}>Ver Receita</Text>
        </TouchableOpacity>

        <View style={styles.linhaBotoes}>
          <TouchableOpacity
            style={styles.botaoEditar}
            onPress={() => handleIniciarEdicao(item)}
          >
            <Text style={styles.textoBotao}>✏️ Editar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.botaoExcluir}
            onPress={() => handleExcluir(item.id)}
          >
            <Text style={styles.textoBotao}>🗑️ Excluir</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>🍳 App de Receitas</Text>

      <Text style={styles.subtitulo}>
        Descubra sabores e compartilhe receitas!
      </Text>

      <Text style={styles.contador}>
        Total de receitas: {listaReceitas.length}
      </Text>

      {/* LISTA PRINCIPAL COM FLATLIST */}
      <FlatList
        style={styles.lista}
        data={listaReceitas}
        keyExtractor={(item) => item.id}
        renderItem={renderizarReceita}
        contentContainerStyle={
          listaReceitas.length === 0
            ? styles.listaVazia
            : styles.listaConteudo
        }
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Text style={styles.emptyIcone}>📖</Text>
            <Text style={styles.emptyTitulo}>
              Nenhuma receita cadastrada
            </Text>
            <Text style={styles.emptyTexto}>
              Toque no botão + para adicionar sua primeira receita!
            </Text>
          </View>
        }
      />

      {/* BOTÃO FLUTUANTE */}
      <TouchableOpacity
        style={styles.fab}
        onPress={handleNovaReceita}
        activeOpacity={0.8}
      >
        <Text style={styles.fabTexto}>+</Text>
      </TouchableOpacity>

      {/* MODAL DE CADASTRO E EDIÇÃO */}
      <Modal
        visible={modalCadastroVisivel}
        animationType="slide"
        transparent={true}
        onRequestClose={limparEFechar}
      >
        <View style={styles.modalFundo}>
          <View style={styles.modalConteudo}>
            <FlatList
              data={[]}
              keyExtractor={(item) => item.id}
              ListHeaderComponent={
                <View>
                  <Text style={styles.modalTitulo}>
                    {idEdicao !== null
                      ? '✏️ Editar Receita'
                      : '📝 Cadastrar Receita'}
                  </Text>

                  <Text style={styles.label}>
                    Nome da Receita
                  </Text>

                  <TextInput
                    style={styles.input}
                    placeholder="Ex.: Bolo de Cenoura"
                    value={nomeReceita}
                    onChangeText={setNomeReceita}
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
                    placeholder="Descreva o modo de preparo..."
                    value={modoPreparo}
                    onChangeText={setModoPreparo}
                    multiline={true}
                    textAlignVertical="top"
                  />

                  <TouchableOpacity
                    style={styles.botao}
                    onPress={handleSalvar}
                  >
                    <Text style={styles.textoBotao}>
                      {idEdicao !== null
                        ? 'Salvar Alterações'
                        : 'Salvar Receita'}
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.botaoCancelar}
                    onPress={limparEFechar}
                  >
                    <Text style={styles.textoBotao}>
                      Cancelar
                    </Text>
                  </TouchableOpacity>
                </View>
              }
            />
          </View>
        </View>
      </Modal>

      {/* MODAL DE DETALHES */}
      <Modal
        visible={modalDetalhesVisivel}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalDetalhesVisivel(false)}
      >
        <View style={styles.modalFundo}>
          <View style={styles.modalConteudo}>
            {receitaSelecionada && (
              <FlatList
                data={[]}
                keyExtractor={(item) => item.id}
                ListHeaderComponent={
                  <View>
                    <Text style={styles.modalTitulo}>
                      {receitaSelecionada.nome}
                    </Text>

                    <Text style={styles.secaoTitulo}>
                      Ingredientes
                    </Text>

                    <Text style={styles.detalhes}>
                      {receitaSelecionada.ingredientes}
                    </Text>

                    <Text style={styles.secaoTitulo}>
                      Modo de Preparo
                    </Text>

                    <Text style={styles.detalhes}>
                      {receitaSelecionada.modoPreparo}
                    </Text>

                    <TouchableOpacity
                      style={styles.botaoEditar}
                      onPress={() =>
                        handleIniciarEdicao(receitaSelecionada)
                      }
                    >
                      <Text style={styles.textoBotao}>
                        ✏️ Editar Receita
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={styles.botaoExcluir}
                      onPress={() =>
                        handleExcluir(receitaSelecionada.id)
                      }
                    >
                      <Text style={styles.textoBotao}>
                        🗑️ Excluir Receita
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={styles.botaoCancelar}
                      onPress={() => setModalDetalhesVisivel(false)}
                    >
                      <Text style={styles.textoBotao}>
                        Fechar
                      </Text>
                    </TouchableOpacity>
                  </View>
                }
              />
            )}
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
    marginBottom: 15,
  },

  lista: {
    flex: 1,
  },

  listaConteudo: {
    paddingBottom: 100,
  },

  listaVazia: {
    flexGrow: 1,
    justifyContent: 'center',
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

  linhaBotoes: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 5,
  },

  botaoEditar: {
    flex: 1,
    backgroundColor: '#2A9D8F',
    padding: 12,
    borderRadius: 10,
    marginTop: 5,
    marginBottom: 5,
  },

  botaoExcluir: {
    flex: 1,
    backgroundColor: '#C0392B',
    padding: 12,
    borderRadius: 10,
    marginTop: 5,
    marginBottom: 5,
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

  emptyState: {
    alignItems: 'center',
    padding: 25,
  },

  emptyIcone: {
    fontSize: 50,
    marginBottom: 15,
  },

  emptyTitulo: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#A63D20',
    textAlign: 'center',
    marginBottom: 10,
  },

  emptyTexto: {
    fontSize: 16,
    color: '#6B705C',
    textAlign: 'center',
    lineHeight: 24,
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


