import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

import { signIn } from '../store/user';
import styles from '../styles';

class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            errorMessage: null
        };
    }


    handleLogin = async () => {
        const { email, password } = this.state;

        const errorMessage = await this.props.signIn(email, password);
        if (errorMessage) {
            this.setState({errorMessage});
        } else {
            this.props.navigation.navigate('Home');
        }
    }

    render() {
        if (this.props.isConnected) {
            return (
                <View style={styles.container}>
                    <Text style={styles.greeting}>Welcome!</Text>

                    <View style={styles.errorMessage}>
                        {this.state.errorMessage && <Text style={styles.error}>{this.state.errorMessage}</Text>}
                    </View>

                    <View style={styles.form}>
                        <View>
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

                    <TouchableOpacity style={styles.button} onPress={this.handleLogin}>
                        <Text style={{ color: '#FFF', fontWeight: '500' }}>Sign in</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={{ alignSelf: 'center', marginTop: 32 }}
                        onPress={() => this.props.navigation.navigate('Signup')}
                    >
                        <Text style={{ color: '#414959', fontSize: 13 }}>
                            New to ReadMe? <Text style={{ fontWeight: '500', color: '#E9446A' }}>Sign Up</Text>
                        </Text>
                    </TouchableOpacity>
                </View>
            );
        } else {
            return (
            <View style={styles.container}>
                <Text>Please Connect To Internet to Login or Signup</Text>
            </View>
            )
        }
    }
}

const mapStateToProps = state => ({
    isConnected: state.network.isConnected
})

const mapDispatch = dispatch => ({
    signIn: (email, password) => dispatch(signIn(email, password))
})

export default connect(mapStateToProps, mapDispatch)(Login);
