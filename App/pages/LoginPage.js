import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  StatusBar,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import colors from '../constants/colors';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CheckBox from '@react-native-community/checkbox';
import LinearGradient from 'react-native-linear-gradient';
import {useDispatch} from 'react-redux';
import {loginUser} from '../redux/actions';
import {KeyBoardSpacer} from '../components/KeyBoardSpacer';

export default function Login({navigation}) {
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const [isSave, setIsSave] = useState(false);
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPwOpen, setPwIsOpen] = useState(true);
  const [scrollEnabled, setScrollEnabled] = useState(false);

  const userLogin = () => {
    if (email === '' && password === '') {
      alert('Enter email and password');
    } else {
      setIsSave(true);
      fetch('https://reqres.in/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      })
        .then(e => {
          return e.json();
        })
        .then(e => {
          if (e.error) {
            setIsSave(false);
            alert(e.error);
          } else {
            setIsSave(false);
            if (toggleCheckBox) {
              dispatch(loginUser(e.token));
            }
            navigation.navigate('Dashboard');
          }
          console.log(e);
        })
        .catch(err => {
          setIsSave(false);
          alert('Invalid user name or password');
        });
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={colors.blue} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        scrollEnabled={scrollEnabled}>
        <View style={styles.subcontainer}></View>
        <View style={{padding: 20}}>
          <Text style={styles.headerTxt}>Login</Text>
          <View style={styles.inputRow}>
            <FontAwesome name="user-o" color={colors.gray} size={20} />
            <TextInput
              placeholderTextColor={colors.gray}
              placeholder="Username"
              style={styles.input}
              value={email}
              onChangeText={text => setEmail(text)}
            />
          </View>

          <View style={styles.inputRow}>
            <Ionicons name="md-key-outline" color={colors.gray} size={20} />
            <TextInput
              placeholderTextColor={colors.gray}
              placeholder="Password"
              style={styles.input}
              value={password}
              onChangeText={text => setPassword(text)}
              secureTextEntry={isPwOpen}
            />

            <TouchableOpacity onPress={() => setPwIsOpen(!isPwOpen)}>
              <Ionicons name="eye-outline" color={colors.gray} size={20} />
            </TouchableOpacity>
          </View>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: 20,
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <View
                style={{
                  borderWidth: 1,
                  width: 34,
                  borderRadius: 5,
                  borderColor: colors.gray,
                }}>
                <CheckBox
                  disabled={false}
                  value={toggleCheckBox}
                  onValueChange={newValue => setToggleCheckBox(newValue)}
                />
              </View>
              <Text style={{color: '#8F9092', fontSize: 15, marginLeft: 5}}>
                {' '}
                Remember me
              </Text>
            </View>
            <Text
              style={{
                color: '#8F9092',
                textDecorationLine: 'underline',
                fontSize: 15,
              }}>
              Forgot password ?
            </Text>
          </View>

          {isSave ? (
            <ActivityIndicator size="large" color={colors.primary} />
          ) : (
            <TouchableOpacity
              style={styles.loginBtn}
              onPress={() => {
                userLogin();
              }}>
              <LinearGradient
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
                colors={['#178EB3', '#1490B4', '#5BC9E5']}
                style={styles.liner}>
                <Text
                  style={{color: 'white', fontWeight: 'bold', fontSize: 20}}>
                  Login
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          )}

          <Text style={styles.registerTxt}>
            Don't have an account ?{' '}
            <Text
              style={{
                textDecorationLine: 'underline',
                color: colors.blue,
                fontWeight: 'bold',
              }}>
              Register Now
            </Text>
          </Text>
          <KeyBoardSpacer
            onToggle={keyboardIsVisible => setScrollEnabled(keyboardIsVisible)}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const screen = Dimensions.get('screen');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFBFD',
  },
  subcontainer: {
    height: screen.height / 3,
    backgroundColor: colors.blue,
  },
  headerTxt: {
    color: colors.blue,
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 20,
    marginBottom: 20,
  },
  input: {
    width: '85%',
    paddingLeft: 15,
    fontSize: 15,
    color: '#8F9092',
  },
  inputRow: {
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: 10,
    borderColor: colors.gray,
    alignItems: 'center',
    paddingLeft: 15,
    marginTop: 20,
    paddingVertical: 5,
  },
  loginBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 60,
    width: '100%',
    borderRadius: 10,
    marginTop: 40,
  },
  liner: {
    height: 60,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  registerTxt: {
    color: '#8F9092',
    textAlign: 'center',
    marginTop: 40,
    fontSize: 15,
  },
});
