import React, { useState } from 'react'
import './Fake.css'
import Modal from '../Modal'
const Fake = () => {
    const [isClicked, setIsClicked] = useState(true);

    const handleOpenClick = () => {
        setIsClicked(true)
    }
  return (
    <>
    <div className='fake-component' onClick={handleOpenClick}>
      <span>Bonjour je suis un faux composant</span>
      <span>Bonjour je suis un faux composant</span>
      <span>Bonjour je suis un faux composant</span>
      <span>Bonjour je suis un faux composant</span>
      <span>Bonjour je suis un faux composant</span>
      <span>Cliquer sur moi</span>
    </div>
    {isClicked && <Modal setState={setIsClicked} style={{top: "-50px"}} color='white'>
    <div className='fake-component-open'>
      <span>Oui je suis après modal</span>
      <span>Oui je suis après modal</span>
      <span>Oui je suis après modal</span>
      <span>Oui je suis après modal</span>
      <span>Oui je suis après modal</span>
      <span>Oui je suis après modal</span>
      <span>Oui je suis après modal</span>
      <span>Oui je suis après modal</span>
    </div>
    </Modal>}
    </>
  )
}

export default Fake
