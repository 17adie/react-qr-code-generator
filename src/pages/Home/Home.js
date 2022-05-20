import { useState } from 'react'
import styles from './Home.module.css'
import axios from 'axios'

export default function Home() {

  const [word, setWord] = useState('')
  const [qrCode, setQrcode] = useState('')
  const [generating, setGenerating] = useState(false)

  const handleClick = async (e) => {
    e.preventDefault()
    setGenerating(true)
    await axios(`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${word}`)
    .then( res => {
      setQrcode(res.request.responseURL)
      setGenerating(false)
    })
    
  }

  return (
    <div className={styles.container}>
      <h1>QR Code Generator</h1>
      <form onSubmit={handleClick}>
        <div className={styles['input-box']}>
        <label>Enter Text</label>
        <input 
          type="text"
          onChange={(e) => setWord(e.target.value)}
          value={word}
          required
        />
        <button>Generate</button>
      </div>

      {
        generating 
        ? 
          <div className={styles.generating}>generating...</div> 
        : 
          <div className={styles['output-box']}>
            <img className={`${qrCode ? styles['img-des'] : ''}`} src={qrCode} alt="" />
          </div>
      }

      </form>
      

    </div>
  )
}
