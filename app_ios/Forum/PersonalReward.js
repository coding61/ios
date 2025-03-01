'use strict';

import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Image,
  Text,
  TextInput,
  AsyncStorage,
  Alert,
  DeviceEventEmitter,
  NativeModules,
  ActivityIndicator
} from 'react-native';

import Utils from '../utils/Utils.js';
import Http from '../utils/Http.js';
import BCFetchRequest from '../utils/BCFetchRequest.js';

var RNBridgeModule = NativeModules.RNBridgeModule;

const {width, height} = Dimensions.get('window');

class PersonalReward extends Component {
    constructor(props) {
        super(props);
        this.state = {
            token: null,
            num: null,
            owner: this.props.navigation.state.params.owner,
        }
    }

    static navigationOptions = ({ navigation }) => {
        const {state, setParams} = navigation;
        return {
            headerTintColor: "#fff",
            headerStyle: { backgroundColor: '#ff6b94',},
            headerTitleStyle:{alignSelf:'auto',fontSize:18},
            title: '打赏'
        };
    }

    componentWillMount() {
        var _this = this;
        AsyncStorage.getItem('token', function(errs, result) {
            if(result != null){
                _this.setState({token: result});
            }
        });
    }

    componentDidMount() {}

    componentWillUnmount() {
        this.props.navigation.state.params.callback();
    }

    _award() {
        if (this.state.num) {
            // var r = /^[0-9]*[1-9][0-9]*$/;　　//正整数
            // r.test(this.state.num)
            var num = Number(this.state.num);
            if (!isNaN(num)) {
                if (parseInt(num, 10) === num && num > 0) {
                    this._fetchAward(num);
                } else {
                    Alert.alert('请输入一个正整数');
                }
            } else {
                Alert.alert('请输入一个数字');
            }
        } else {
            Alert.alert('请输入你要打赏的钻石数');
        }
    }

    _fetchAward(num) {
        var type = "POST";
        var   url = Http.awardDiamond;
        var   token = this.state.token;
            if(this.props.navigation.state.params.flag=='post'){
                
                var data = {
                    amount: num,
                    to_username: this.state.owner,
                    posts:this.props.navigation.state.params.replypk
                };
            }else if(this.props.navigation.state.params.flag=='reply'){
                
                var data = {
                    amount: num,
                    to_username: this.state.owner,
                    replies:this.props.navigation.state.params.replypk
                };
            }else{
                var data = {
                    amount: num,
                    to_username: this.state.owner
                };
            }
        BCFetchRequest.fetchData(type, url, token, data, (response) => {
            if (!response) {
                Alert.alert('失败，请重试');
            };
            if (response.status == -4 || response.message) {
                Alert.alert(response.message?response.message:response.detail);
                this.setState({num: null});
                return;
            }
        }, (err) => {
            console.log(err);
            Alert.alert('网络请求失败');
        });
    }

    render() {
        return (
            <View style={{flex: 1, alignItems: 'center', backgroundColor: 'rgb(243, 243, 243)'}}>
                <Image style={styles.imgView} source={require('../images/forum_icon/diamond.png')}/>
                <TextInput style={styles.textInput}
                    placeholder='请输入你要打赏的钻石数'
                    underlineColorAndroid='transparent'
                    onChangeText={(num) => this.setState({num})}
                    value={this.state.num}
                    keyboardType={'numeric'}
                />
                <TouchableOpacity style={styles.btn} onPress={this._award.bind(this)}>
                    <Text style={{color: '#fff', fontSize: 17}}>确定</Text>
                </TouchableOpacity>
                <Text style={styles.txt}>提示:一次打赏的钻石数最多为200钻石</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
	imgView:{
		width: width * 185 / 750,
        height: width * 185 / 750,
        marginTop: width * 75 / 750
	},
    textInput: {
        width: width * 670 / 750,
        height: width * 95 / 750,
        marginTop: width * 50 / 750,
        backgroundColor: '#fff',
        textAlign: 'center'
    },
    btn: {
        width: width * 670 / 750,
        height: width * 95 / 750,
        marginTop: width * 40 / 750,
        backgroundColor: '#ff6b94',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center'
    },
    txt: {
        marginTop: width * 30 / 750,
        color: 'gray',
        fontSize: 15
    }
});

export default PersonalReward;
