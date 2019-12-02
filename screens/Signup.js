import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { signUp } from '../store/user';
import { connect } from 'react-redux';

import styles from '../styles';


class RegisterScreen extends React.Component {
    constructor() {
        super()
        this.state = {
            name: '',
            email: '',
            password: '',
            errorMessage: null
        };
    }
    handleSignUp = async () => {
        const {name, email, password} = this.state;
        const errorMessage = await this.props.signUp(name, email, password);
        if (errorMessage) {
            this.setState({errorMessage});
        } else {
            this.props.navigation.navigate('Home');
        }
    }


    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.greeting}>{`Hello!\nSign up to get started.`}</Text>

                <View style={styles.errorMessage}>
                    {this.state.errorMessage && <Text style={styles.error}>{this.state.errorMessage}</Text>}
                </View>

                <View style={styles.form}>
                    <View>
                        <Text style={styles.inputTitle}>Full Name</Text>
                        <TextInput
                            style={styles.input}
                            autoCapitalize="none"
                            onChangeText={name => this.setState({ name })}
                            value={this.state.name}
                         />
                    </View>

                    <View style={{ marginTop: 32 }}>
                        <Text style={styles.inputTitle}>Email Address</Text>
                        <TextInput
                            style={styles.input}
                            autoCapitalize="none"
                            onChangeText={email => this.setState({ email })}
                            value={this.state.email}
                         />
                    </View>

                    <View style={{ marginTop: 32 }}>
                        <Text style={styles.inputTitle}>Password</Text>
                        <TextInput
                            style={styles.input}
                            secureTextEntry
                            autoCapitalize="none"
                            onChangeText={password => this.setState({ password })}
                            value={this.state.password}
                         />
                    </View>
                </View>

                <TouchableOpacity style={styles.button} onPress={this.handleSignUp}>
                    <Text style={{ color: '#FFF', fontWeight: '500' }}>Sign up</Text>
                </TouchableOpacity>

                <TouchableOpacity style={{ alignSelf: 'center', marginTop: 32 }}>
                    <Text style={{ color: '#414959', fontSize: 13 }}>
                        Already have an account? <Text style={{ fontWeight: '500', color: '#E9446A' }}>Login</Text>
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const mapDispatch = dispatch => ({
    signUp: (name, email, password) => dispatch(signUp(name, email, password))
})

export default connect(null, mapDispatch)(RegisterScreen);
