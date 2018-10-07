import React, { Component } from 'react'
import Paper from '@material-ui/core/Paper'
import Form from './Form'

class MainPage extends Component {
    state = {
        animalsTab: []
      };

    setAnimalTab(data){
        this.setState({
            animalsTab: data
        })
    }

    render(){
        return(
            <Paper style={{ padding: 50 }}>
            <Form 
                setAnimalTab={this.setAnimalTab.bind(this)}
                />
            { this.state.animalsTab.map((animal, id) => <img key={id} src={animal} alt="animals" width="200"/>) }
            </Paper>
        )
    }
}

export default MainPage