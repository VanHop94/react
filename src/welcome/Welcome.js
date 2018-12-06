
import React, { Component } from 'react';
import './Welcome.css'
class Welcome extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            phone: '',
            email: '',
            height: '100vh'
        }
    }

    handlerUserInput = () => {
        if (this.name.value.length > 0 && this.phone.value.length > 0) {
            this.props.saveUserInfo(this.name.value, this.phone.value, this.email.value);
        }
    }

    onInputFocus = () => {
        this.setState({
            height: '100%'
        })
    }

    onInputBlur = () => {
        this.setState({
            height: '100vh'
        })
    }

    render() {
        return (
            <div className='welcome-container' style={{height: this.state.height}}>
                <div className='welcome-text'>
                    <span className='hightligh'>Juntos haremos más.</span>
                    El objetivo es hacer un directorio de nuestros talentos y en vez de pagar a un desconocido por algo que necesitemos le pagamos a alguien de confianza que pertenece a nuestra parroquia.
                </div>
                <div className='welcome-form'>
                    <div>
                        <input type='text' placeholder='Nombre' onFocus={this.onInputFocus} onBlur={this.onInputBlur} ref={(node) => {this.name = node}}/>
                        <span className='require'>*</span>
                    </div>
                    <div>
                        <input type='text' placeholder='Celular' onFocus={this.onInputFocus} onBlur={this.onInputBlur} ref={(node) => {this.phone = node}}/>
                        <span className='require'>*</span>
                    </div>
                    <div> 
                        <input type='email' placeholder='Correo electrónico' onFocus={this.onInputFocus} onBlur={this.onInputBlur} ref={(node) => {this.email = node}}/>
                    </div>
                    <div style={{marginTop: 35}}>
                        <button onClick={this.handlerUserInput} >Registrarme con Grupo Emaus</button>
                    </div>
                </div>
            </div>
        )
    }

}

export default Welcome;