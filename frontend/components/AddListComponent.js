import { useState } from 'react';
import { Input, Button, ListItem } from '@rneui/themed';
import { Image } from 'react-native';
import Imagem  from '../assets/favicon.png'

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
      let newResp = resposta.replace('\n', '')
    
      console.log(resposta)
    

      setPerguntas(perguntas => {
      
        let aux3 = {id: Date.now(), texto: pergunta, respostaChat: newResp }
  
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
        <div>
          <h1 style={styles.titulo}>Digite uma frase para o chatGPT</h1>
          <Image 
            source={require('../assets/BB-8.png')}
          />

           
        </div>
        
      <View>
          <Input
            style={styles.lembreteTextInput}
            placeholder='Digite sua frase'
            onChangeText={capturarPergunta}
            value= {pergunta}
          />
          <Button 
            title="Enviar"
            style={styles.lembreteTextInput}
            buttonStyle={{ backgroundColor: '#343444' }}
            onPress={adicionarPergunta}
          />
      </View>
      <View styles={styles.viewLista}>
          {
            perguntas.map((l) => (
              
              
              <ListItem style={styles.itemNaLista} onLongPress={() => updateList(l.id)}>
                <ListItem.Content style={styles.texto}>
                  
                  <ListItem.Title style={styles.Title}>{l.texto}</ListItem.Title>
                  <ListItem.Subtitle style={styles.Subtitle}>{l.respostaChat}</ListItem.Subtitle>         
                    
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
    backgroundColor: '#242424'
  },
  lembreteTextInput: {
    padding: 12,
    textAlign: 'center',
    outlineStyle: 'none',
    marginBottom: 4,
    color: 'white'
  },
  itemNaLista: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 12,
    borderColor: '#343444',
    borderWidth: 3,
    backgroundColor: 'white',
    marginBottom: 10,
    textAlign: 'center',
    borderRadius: 4,
    margin: 12,
  },
  button: {
    marginBottom: 4
  },
  viewLista: {
    padding: '100px',
    backgroundColor: 'red'
  },
  view: {
    textAlign: 'center'
  },
  texto: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
  },
  titulo: {
    textAlign:'center',
    fontSize: '25px',
    fontFamily: 'Calibri',
    marginBottom: '50px',
    color: 'white'
  },
  resposta: {
    fontSize: '20px',
    fontFamily: 'Calibri',
    color: '#343444'
  },
  Title: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '50px',
    fontFamily: 'Calibri',
    fontSize: '20px'
  },
  Subtitle: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: 'Calibri',
    fontSize: '18px'
  }
  
})