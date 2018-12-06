
import React, { Component } from 'react';
import './Category.css'
import axios from 'axios';
import { getUserInfoFromPrivateLinkId, submitTalentOfUser, getUserInfoFromPhoneNumber } from './../util/API';
import { Icon, message } from 'antd';
import Header from '../header/Header';

class Category extends Component {

    constructor(props){
        super(props)
        this.state = {
            isSubmiting: false,
            isLoadingPage: true
        }
    }

    componentDidMount() {

        const { id, phoneNumber, groupName } = this.props.match.params

        if (id) {
            getUserInfoFromPrivateLinkId(id)
            .then(response => {
        
                response.data.group.categories.forEach((category) => {
                    this.setState({
                        [category.name]: category.selectedItemCategories
                    })
                });

                this.setState({
                    group: response.data.group,
                    user: response.data.user,
                    isLoadingPage: false,
                    currentCategory: response.data.group.categories.sort((a, b) => a.position - b.position)[0].name
                })
            }).catch(error => {
                message.error(error.response.data.message)
            })
        } else if (phoneNumber && groupName) {
            getUserInfoFromPhoneNumber(groupName, phoneNumber)
            .then(response => {
                response.data.group.categories.forEach((category) => {
                    this.setState({
                        [category.name]: category.selectedItemCategories
                    })
                });

                this.setState({
                    group: response.data.group,
                    user: response.data.user,
                    isLoadingPage: false,
                    currentCategory: response.data.group.categories.sort((a, b) => a.position - b.position)[0].name
                })
            }).catch(error => {
                message.error(error.response.data.message)
            })
        }

    }

    handleCategoryClick = (value) => {

        if (this.props.readonly)
            return;

        const lstSelectedCategory = this.state[this.state.currentCategory];

        if (!lstSelectedCategory.includes(value)) {
            this.setState({
                [this.state.currentCategory]: this.state[this.state.currentCategory].concat([value])
            })
        } else {
            const filteredItems = lstSelectedCategory.filter(item => item !== value)
            this.setState({
                [this.state.currentCategory]: filteredItems
            })
        }
    }

    changeCurrentCategory = (value) => {
        this.setState({
            currentCategory: value
        })
    }

    submitUserData = () => {
       
        let categoryIds = [];
        this.state.group.categories.forEach((category => {
            if (this.state[category.name] && this.state[category.name].length > 0) {
                categoryIds.push(...this.state[category.name]);
            }
        }))

        // let formData = {};
        // formData['name'] = this.props.name;
        // formData['phone'] = this.props.phone;
        // formData['email'] = this.props.email;
        
        // formData['home'] = this.state.selectedHome.join(',');
        // formData['car'] = this.state.selectedCar.join(',');
        // formData['department'] = this.state.selectedDepartment.join(',');
        // formData['industry'] = this.state.selectedIndustry.join(',');
        // formData['art'] = this.state.selectedArt.join(',');
        
        // axios.get('https://script.google.com/macros/s/AKfycbwGu6hbQNJNJ6Qha90tu65pYl3_rEjvYwAXYkK3oHanPsn_mstf/exec',{
        //     params: formData
        // }) 
        this.setState({
            isSubmiting: true
        })
        submitTalentOfUser(categoryIds, this.props.match.params.id)
        .then(response => {
            this.props.history.push("/success")
            this.setState({
                isSubmiting: false
            })
        })
        .catch(error => {
            this.setState({
                isSubmiting: false
            })
            alert('Something went wrong!')
        })
    }

    render() {
        if (this.state.isLoadingPage) {
            return (
                <div className='container'>
                    <Icon className='loading' type="loading" style={{fontSize: '80px'}}/>
                </div>
            )
        }

        let { user, group } = this.state;

        const mainCategories = group.categories.sort((a, b) => a.position - b.position).map((category) => {
            return (
                <div className='main-category-item' key={category.categoryId} onClick={ () => this.changeCurrentCategory(category.name)}>
                    <div className={`category ${category.name.toLowerCase()}`}>
                        {this.state[category.name].length > 0 ? (
                            <span className='badge'>{this.state[category.name].length}</span>
                        ) : ''}
                        
                    </div>
                    <span style={{marginTop: 5, display: 'block'}}>{category.name.toUpperCase()}</span>
                </div>
            )
        })

        const lstSelectedCategory = this.state[this.state.currentCategory];
        const lstCategory = group.categories.filter(category => category.name === this.state.currentCategory)[0]
                                            .items.sort((a, b) => a.position - b.position).map((item) => {
            return (
                <div key={item.uuid} className='category-item-container' onClick= { () => this.handleCategoryClick(item.uuid)}>
                    <div className={`category-item-icon category ${this.state.currentCategory}`}></div>
                        <div className='category-item-desc'>
                            {item.name}
                        </div>
                    <span className={lstSelectedCategory.includes(item.uuid) ? 'checked' : 'unchecked'}></span>
                </div>
            )
        })
        return (
            <div className='container'>
                <div className='category-container'>
                    <div className={this.props.readonly ? 'height-footer' : 'height-ignore-footer'}>
                        <Header name={user.name} phoneNumber={user.phoneNumber} />
                        <div className='group'>
                            <div className='title'>Group {this.state.group.name}</div>
                            <div className='description'>{this.state.group.description}</div>
                        </div>
                        <div className='category-header'>
                            <div className='main-category'>
                                {mainCategories}
                            </div>
                        </div>
                        <div className='category-list'>
                            {lstCategory}
                        </div>
                    </div>
                    {!this.props.readonly ? (
                        <div className='submit-container'>
                            <span>PARROQUIA DE SANTO TOMAS DE MORO</span>
                            <button onClick={this.submitUserData} className='submit'>{this.state.isSubmiting ? 'Waiting...' : 'Salvar'}</button>
                        </div>
                    ) : ''}
                    
                </div>
            </div>
        )
    }
}

export default Category;