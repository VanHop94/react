
import React, { Component } from 'react';
import './Success.css'
class Success extends Component {
    
    render() {
        return (
            <div className='success-container'>
                <div className='main-success'>
                    <div className='success'>Bienvenido !</div>
                    <div className='success-note'>Gracias.</div>
                </div>
                <div className='bottom'>
                    <div>Presione aquí para mandar la pagina de registro a otro miembro que necesita suscribirse.</div>
                </div>
            </div>
        )
    }
}

export default Success;