import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import { Link } from "react-router-dom";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";

export default class GuildPage extends Component{

    constructor(props) {
        super(props);
        this.state = {
            guild_name: "",
        }
        console.log(this)
        this.handleCreateButtonPress = this.handleCreateButtonPress.bind(this);
        this.handleNameChenge = this.handleNameChenge.bind(this)
    }
    
    handleNameChenge(e) {
        this.setState({
            guild_name: e.target.value,
        });
    }
    handleCreateButtonPress() {
        console.log(this.state);
        const requestOptions = {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                guild_name: this.state.guild_name,
            }),
        };
        fetch('/api/guild/create', requestOptions)
            .then((response) => response.json())
            .then((data) => console.log(data));
    }

    render() {
        return <Grid container spacing={5}>
            <Grid item xs={12} align="center">
                <Typography component='h4' variant='h4'>
                    Create Guild
                </Typography>
            </Grid>
            <Grid item xs={12} align="center">
                <Typography component='h5' variant='h5'>
                    Guild name
                </Typography>
                <FormControl>
                    <TextField required={true} type="string" onChange={this.handleNameChenge}/>
                </FormControl>
            </Grid>
            <Grid item xs={12} align="center" direction="row" justify="center">
                <Button color="primary" variant="contained" onClick={this.handleCreateButtonPress}>
                    Create the guild
                </Button>
                <Button color="secondary" variant="contained" to="/" component={Link}>
                    Back
                </Button>
            </Grid>
            <Grid item xs={12} align="center">
                
            </Grid>
        </Grid>;
    }
}