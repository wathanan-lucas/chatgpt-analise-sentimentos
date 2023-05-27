import { useState } from 'react';
import { Input, Button, ListItem  } from '@rneui/themed';

import {
  StyleSheet,
  Text,
  TextInput, 
  View 
} from 'react-native';

import * as perguntaService from '../service/perguntaService'

export default function App() {
  const [pergunta, setPergunta] = useState('')
  const [perguntas, setPerguntas] = useState([])

  const capturarPergunta = (perguntaDigitada) => {
    setPergunta(perguntaDigitada)
  }

  const adicionarPergunta = () => {
    let aux = enviarRequisicao(pergunta)

    return aux
  }

  const updateList = (index) => {
    console.log(perguntas[0])

    let newArray = perguntas.filter((item) => item.id !== index)

    console.log(newArray+"- New")
    

    setPerguntas(newArray)

    console.log('Chegou!!', index)
  }


  const enviarRequisicao = async (pergunta)  => {
    try{
      const res = await perguntaService.realizarPergunta({texto: pergunta})
      let resposta = res.data.sentimento
      console.log(res.data.sentimento)

      setPerguntas(perguntas => {
      
        let aux3 = {id: Date.now(), texto: pergunta+' '+resposta}
  
        const aux = [aux3, ...perguntas]
  
        console.log(aux)
  
        setPergunta('')
  
        return aux
      })

      return res.data.sentimento
     
    }catch(e) {
      console.log('erro', e)

    }
  }
  
  return (
    <View style={styles.container}>
      <View>
          <Input
            style={styles.lembreteTextInput}
            placeholder='Desejo lembrar...'
            onChangeText={capturarPergunta}
            value= {pergunta}
          />
          <Button 
            title="Enviar"
            style={styles.lembreteTextInput}
            buttonStyle={{ backgroundColor: 'rgba(39, 39, 39, 1)' }}
            onPress={adicionarPergunta}
          />
      </View>
      <View styles={styles.viewLista}>
          {
            perguntas.map((l) => (
              
      
              <ListItem style={styles.itemNaLista} onLongPress={() => updateList(l.id)}>
                <ListItem.Content style={styles.texto}>
          
                  <Text>{l.texto}</Text>
                    
                </ListItem.Content>
              </ListItem> 
             
          ))
          }
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 40,
    width: '100%',
  },
  lembreteTextInput: {
    padding: 12,
    textAlign: 'center',
    outlineStyle: 'none',
    marginBottom: 4
  },
  itemNaLista: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 12,
    borderColor: '#AAA',
    borderWidth: 1,
    backgroundColor: '',
    marginBottom: 10,
    textAlign: 'center',
    borderRadius: 4,
    margin: 12,
  },
  button: {
    marginBottom: 4
  },
  viewLista: {
    padding: '100px'
  },
  view: {
    // display: 'flex',
    // justifyContent: 'center',
    // alignItems: 'center'

    textAlign: 'center'
  },
  texto: {
    backgroundColor: 'white'
  }
  
})