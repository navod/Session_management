import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import {useDispatch} from 'react-redux';
import colors from '../constants/colors';
import {logoutUser} from '../redux/actions';

export default function Dashboard({navigation}) {
  const dispatch = useDispatch();

  const [users, setUsers] = useState(null);
  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = () => {
    const list = [];
    const abortCont = new AbortController();
    setTimeout(() => {
      fetch('https://reqres.in/api/users?page=2', {signal: abortCont.signal})
        .then(res => {
          return res.json();
        })
        .then(data => {
          setUsers(data.data);
        })
        .catch(err => {
          if (err.name === 'AbortError') {
            console.log('fetch aborted');
          } else {
            console.log(err.message);
          }
        });
    }, 1000);
    return () => abortCont.abort();
  };
  const renderItem = ({item}) => {
    return (
      <View style={{paddingHorizontal: 20}}>
        <View style={styles.row}>
          <Image source={{uri: item.avatar}} style={styles.avatar} />
          <View style={{marginLeft: 10}}>
            <Text style={{color: 'black'}}>
              {item.first_name} {item.last_name}
            </Text>
            <Text style={{color: colors.gray}}>@{item.email}</Text>
          </View>
        </View>
      </View>
    );
  };
  if (users === null) {
    return <ActivityIndicator color={colors.blue} />;
  } else {
    return (
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <TouchableOpacity
          style={styles.logoutBtn}
          onPress={() => {
            navigation.navigate('Login');
            dispatch(logoutUser(null));
          }}>
          <Image
            style={{width: '100%', height: '100%', resizeMode: 'contain'}}
            source={require('../assets/images/logout.png')}
          />
          <Text style={{color: 'black'}}>Logout</Text>
        </TouchableOpacity>

        <FlatList
          data={users}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
          style={{marginTop: 80}}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  logoutBtn: {
    position: 'absolute',
    right: 15,
    width: 55,
    height: 30,
    top: 10,
  },
  avatar: {
    borderRadius: 100,
    width: 50,
    height: 50,
    resizeMode: 'cover',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
    padding: 10,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,

    elevation: 9,
    backgroundColor: 'white',
  },
});
