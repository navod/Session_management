import {useNavigation} from '@react-navigation/native';
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
import {connect} from 'react-redux';
import colors from '../constants/colors';
import {onGetUsers, onLogoutUser} from '../redux/actions';

const Dashboard = props => {
  const {users} = props;
  const navigation = useNavigation();

  useEffect(() => {
    props.getUser();
  }, []);

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
            props.logout();
            navigation.navigate('Login');
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
};

const mapStateToProps = state => {
  return {
    users: state.userReducer.users,
  };
};

const mapDispatchToState = dispatch => {
  return {
    getUser: () => dispatch(onGetUsers()),
    logout: () => dispatch(onLogoutUser()),
  };
};

export default connect(mapStateToProps, mapDispatchToState)(Dashboard);

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
