import React, { Component } from 'react'
import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField'
import Select from '@material-ui/core/Select'
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import axios from 'axios';

class MainPage extends Component {
    state = {
        animals: '',
        name: 'shibes',
        animalsTab: [],
        numbers: null
      };

      pressButton() {
          console.log(this.state.numbers)
        if(this.state.animals === 'random') {
            let animals = ['shibes', 'cats', 'birds']
            let animal = animals[Math.floor(Math.random() * 3)]
            console.log(animal)
            axios.get(`http://shibe.online/api/${animal}?count=${this.state.numbers}`, {
                })
                .then(res => {
                    const animalsTab = res.data
                    this.setState({ animalsTab });
                })
        }
        else if (this.state.animals !== '')  {
                axios.get(`http://shibe.online/api/${this.state.animals}?count=${this.state.numbers}`, {
                })
                .then(res => {
                    const animalsTab = res.data
                    this.setState({ animalsTab });
                })
            }
      }

      handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
      };
      handleChangeNumber = name => event => {
        this.setState({
          [name]: event.target.value,
        });
      };

    render(){
        return(
            <Paper style={{ padding: 50 }}>
            <Grid item xs={12}>
                <TextField 
                    placeholder="podaj wartość od 1 do 10" 
                    type="number" 
                    min="1" 
                    max="10"
                    value={this.state.numbers}
                    onChange={this.handleChangeNumber('numbers')}/>
                </Grid>   
            <Grid item xs={12}>     
                <FormControl>
                    <InputLabel>Animals</InputLabel>
                    <Select
                        style={{ width: 150 }}
                        value={this.state.animals}
                        onChange={this.handleChange}
                        inputProps={{
                            name: 'animals',
                            id: 'animals-simple',
                          }}
                    >
                        <MenuItem value="">
                        <em>None</em>
                        </MenuItem>
                        <MenuItem value={'shibes'}>shibes</MenuItem>
                        <MenuItem value={'cats'}>cats</MenuItem>
                        <MenuItem value={'birds'}>birds</MenuItem>
                        <MenuItem value={'random'}>random</MenuItem>
                    </Select>
                </FormControl>
            </Grid>    
            <Grid item xs={12}> 
                <Button variant="outlined" style={{ marginTop: 30 }} onClick={()=>this.pressButton()}>
                    Szukaj
                </Button>
            </Grid>
            { this.state.animalsTab.map(animal => <img src={animal} alt="dog" width="100"/>) }
            </Paper>
        )
    }
}

export default MainPage