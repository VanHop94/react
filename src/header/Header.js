
import React, { Component } from 'react';
import './Header.css'
class Header extends Component {

    render() {
        return (
            <div className='header-container'>
                <div>{this.props.name}</div>
                <div><a href={`tel:${this.props.phoneNumber}`} />{this.props.phoneNumber}</div>
            </div>
        )
    }

}

export default Header;