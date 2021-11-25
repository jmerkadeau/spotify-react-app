import React from 'react';
import { getUser } from '../../Functions/SpotifyUser.js';
import * as $ from "jquery";


class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = { token: props.token, userData: {}}

        this.debugging = this.debugging.bind(this);
        this.getUserData = this.getUserData.bind(this);
        this.setUser = this.setUser.bind(this);
 
    }
    async componentDidMount(props) {
        // const user = await this.getUserData();
        // this.setState({ userData: user })
        this.setUser(this.state.token)
    }

    async getUserData() {
        const user = await getUser(this.state.token);
        return(user);
    
    }

    debugging() {
        console.log('here')
        console.log(this.state)
    }

    // function that gets the current spotify user id
    setUser(token){
        $.ajax({
            url: "    https://api.spotify.com/v1/me",
            type: "GET",
            beforeSend: xhr => {
              xhr.setRequestHeader("Authorization", "Bearer " + token);
            },
            success: data => {
              // Checks if the data is not empty
              if(!data) {
                console.log('no data')
                // return (false);
              }
              else{
                  console.log('there is data!');
                  var userInfo = {
                      'displayName':  data.display_name,
                      'photoUrl': data.images[0].url,
                      'uid': data.id
                  }
                  console.log(userInfo)
                  this.setState({userData: userInfo});
                //   return (userInfo)
              }
      
            }
          });
    }

    render() {
        return (
            <div>
                <p>logged in - main page</p>
                <button type='button' onClick={this.debugging}>debugger</button>
            </div>
        )
    }
}

export default Main;