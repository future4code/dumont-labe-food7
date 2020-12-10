import React, {useState} from 'react';
import {useHistory} from 'react-router-dom'
import  useAuthorization  from '../Hooks/useAuthetication';
import {useForm}  from '../Hooks/useForm'
import {api} from '../Services/api'
import Logo from '../Assets/Img/logo-future-eats-invert@3x.png'
import {FormContainer, 
        Button} 
        from './Styles/styles'
import InputComponent from '../Components/Inputs/InputComponent'
import styled from 'styled-components'


export const EditContainer = styled.div`

    display: flex;
    align-items: center;
    flex-direction: column;
    height: 100vh;
    width: 100vw;
    position: relative;
` 

export const TextContainer = styled.div`
    position: sticky;
    margin-top: 2px;
    margin-bottom: 5%;
    z-index: 2;
`


export default function AddressPage() {
  const history = useHistory()
  const [formDefault, setFormDefault] = useState(JSON.parse(localStorage.getItem('address')))
  useAuthorization()
  const initForm = formDefault ? formDefault : {street: '', number: '', neighbourhood: '', city: '', state: '', complement: ''}
  const [form, onChange] = useForm(initForm)

  const handleChange = (event)=>{
    const {name, value} = event.target

    onChange(name, value)
  }


  const addAdress = (event)=>{
    localStorage.setItem('address', JSON.stringify(form))
    api.defaults.headers.common['auth'] = localStorage.getItem('token')
    api.put('/address', form).then(response=>{
      localStorage.setItem('user', JSON.stringify(response.data.user))
      localStorage.setItem('token', response.data.token)
      history.push('/')

    }).catch(error=>{
      console.log(error.message)
    })

    event.preventDefault()
  }
  
  return (
    <EditContainer>
      <TextContainer>
        <h4>Endereço</h4>
      </TextContainer>
      <FormContainer onSubmit={addAdress}>
        <InputComponent
          type="text"
          name='street'
          value={form.street}
          onChange={handleChange} 
          required
          label='Rua'
            />
        <InputComponent
          type="text"
          name='number'
          value={form.number}
          onChange={handleChange} 
          required
          label='Numero'
          />      
        <InputComponent
          type="text"
          name='complement'
          value={form.complement}
          onChange={handleChange} 
          label='Complemento'
          />
        <InputComponent
          type="text"
          name='neighbourhood'
          value={form.neighbourhood}
          onChange={handleChange} 
          required
          label='Bairro'
          />
        <InputComponent
          type="text"
          name='city'
          value={form.city}
          onChange={handleChange} 
          required
          label='Cidade'
            />
        <InputComponent
          type="text"
          name='state'
          value={form.state}
          onChange={handleChange} 
          required
          label='Estado'
            />
        <Button>Salvar</Button>
      </FormContainer>
    </EditContainer>
  );
}