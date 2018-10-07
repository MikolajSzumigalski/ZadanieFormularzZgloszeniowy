import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField'
import Select from '@material-ui/core/Select'
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import PropTypes from 'prop-types';

class Form extends Component {
    state = {
        animals: '',
        name: 'shibes',
        numbers: 0,
        isLoading: false
      };

    static propTypes = {
        setAnimalTab: PropTypes.func
      }

    pressButton() {
      if(this.state.animals === 'random') {
          this.setState({ isLoading: true });
          let animals = ['shibes', 'cats', 'birds']
          let animal = animals[Math.floor(Math.random() * 3)]
          console.log(animal)
          axios.get(`http://shibe.online/api/${animal}?count=${this.state.numbers}`, {
              })
              .then(res => {
                  const animalsTab = res.data
                  this.setState({ animalsTab });
                  this.props.setAnimalTab(this.state.animalsTab)
                  this.setState({ isLoading: false });
              })
      }
      else if (this.state.animals !== '' && this.state.numbers > 0 && this.state.numbers < 11)  {
              this.setState({ isLoading: true });
              axios.get(`http://shibe.online/api/${this.state.animals}?count=${this.state.numbers}`, {
              })
              .then(res => {
                  const animalsTab = res.data
                  this.setState({ animalsTab });
                  this.props.setAnimalTab(this.state.animalsTab)
                  this.setState({ isLoading: false });
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
                <div>
                <Grid item xs={12}>
                    <TextField 
                        placeholder="podaj wartość od 1 do 10" 
                        type="number" 
                        min="1" 
                        max="10"
                        error={!(this.state.numbers > 0 && this.state.numbers< 11)}
                        value={this.state.numbers}
                        onChange={this.handleChangeNumber('numbers')}/>
                    </Grid>   
                <Grid item xs={12}>     
                    <FormControl>
                        <InputLabel>Animals</InputLabel>
                        <Select
                            style={{ width: 150 }}
                            value={this.state.animals}
                            error={!this.state.animals && true}
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
                    <Button variant="outlined" disabled={this.state.isLoading} style={{ marginTop: 30 }} onClick={()=>this.pressButton()}>
                        {this.state.isLoading ? 'Ładowanie danych': 'Szukaj'}
                    </Button>
                </Grid>
                </div>
            )
    }
}

export default Form