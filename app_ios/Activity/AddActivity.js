'use strict';

import React, { Component } from 'react';

import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  TextInput,
  ScrollView,
  Dimensions,
  Alert,
  AsyncStorage
} from 'react-native';
import Utils from '../utils/Utils.js';
const {width, height} = Dimensions.get('window');
import Http from '../utils/Http.js';
class RightBtn extends Component {
	render() {
		return (
			<TouchableOpacity onPress={this.props.press()} style={{alignItems: 'center', justifyContent: 'center'}}>
				<Text style={{fontSize: 16, color: 'white', width: 50, height: 20}}>{'发布'}</Text>
			</TouchableOpacity>
			)
	}
}
class AddActivity extends Component {
  static navigationOptions  = ({ navigation, screenProps }) => ({
    title: '添加活动',
    headerStyle: {
      backgroundColor: 'rgb(250, 80, 131)'
    },
    headerTitleStyle: {
      color: 'white',
      fontWeight: '400'
    },
    headerTintColor: "#fff",
    headerRight: <RightBtn press={() => navigation.state.params.navigatePress}/>
  })
  constructor() {
  	super();
  	this.state = {
  		titleText: '',
  		contentText: '',
      password: '',
      isUp: false,
      days: '',
      isDays: false
  	}
  }
  componentWillUnmount() {
    this.props.navigation.state.params.callback(this.state.isUp);
  }
  onPress = () => {
    var _this = this;
    if (this.state.titleText === '') {
      Utils.showMessage('活动标题不能为空！')
    } else if (this.state.contentText === '') {
      Utils.showMessage('活动简介不能为空！')
    } else if (this.state.password === '') {
      Utils.showMessage('活动密码不能为空！')
    } else if (this.state.isDays === true && this.state.days === '') {
      Utils.showMessage('打卡天数不能为空')
    } else {
      
      var form;
      if (this.state.isDays === true) {
        form = JSON.stringify({name:_this.state.titleText,password:_this.state.password,introduction:_this.state.contentText, ispunch: _this.state.isDays, punch_days: _this.state.days})
      } else {
        form = JSON.stringify({name:_this.state.titleText,password:_this.state.password,introduction:_this.state.contentText, ispunch: _this.state.isDays, punch_days: 0})
      }
      AsyncStorage.getItem("token", function(errs, results) {
         fetch(Http.domain + '/club/club_create/',{method: 'post', headers: {'Authorization': 'Token ' + results, 'content-type': 'application/json'},body: form})
          .then(response => {
            if (response.ok === true) {
              return '成功';
            } else {
              return response.json()
            }
          })
          .then(res => {
            if (res === '成功') {
              Utils.showMessage('活动已经提交，审核后将出现在列表中！');
              _this.setState({
                isUp: true
              },() => {
                _this.props.navigation.goBack();
              })
            } else {
              if (res.message) {
                Utils.showMessage(res.message);
              }
            }
          })
      })
    }
  }
  componentWillMount() {
    this.props.navigation.setParams({
        navigatePress:this.onPress
    })
  }
  days() {
    this.setState({
      isDays: !this.state.isDays
    })
  }
  render() {
    return (
      <View style={{flex: 1, backgroundColor: 'rgb(243, 243, 243)'}}>
      	<ScrollView>
	      	<TextInput
		        style={{fontSize: 16, paddingLeft: 10, marginTop: 20, height: 40, borderBottomColor: 'rgb(243, 244, 245)', borderBottomWidth: 1, backgroundColor: 'white', color: 'rgb(72, 73, 74)'}}
		        onChangeText={(titleText) => this.setState({titleText})}
		        placeholder={'标题'}
		        value={this.state.titleText}
	      	/>
          <TextInput
            style={{fontSize: 16, paddingLeft: 10, height: 40, borderBottomColor: 'rgb(243, 244, 245)', borderBottomWidth: 1, backgroundColor: 'white', color: 'rgb(72, 73, 74)'}}
            onChangeText={(password) => this.setState({password})}
            placeholder={'密码'}
            value={this.state.password}
          />
	      	<TextInput
		        style={{fontSize: 14, paddingLeft: 10, height: height / 3, borderBottomColor: 'rgb(243, 244, 245)', borderBottomWidth: 1, backgroundColor: 'white', color: 'rgb(72, 73, 74)'}}
		        onChangeText={(contentText) => this.setState({contentText})}
		        placeholder={'通告内容'}
		        value={this.state.contentText}
		        multiline={true}
	      	/>
          <View style={{flexDirection: 'row', width: width, height: 100, alignItems: 'center', justifyContent: 'space-between'}}>
            <TouchableOpacity onPress={this.days.bind(this)} style={{marginLeft: 10, backgroundColor: 'rgb(250, 80, 131)', width: 60, height: 60, borderRadius: 35, justifyContent: 'center', alignItems: 'center'}}>
              <Text style={{fontSize: 16, color: 'white', textAlign: 'center'}}>{this.state.isDays === true ? ('打卡'):('不打卡')}</Text>
            </TouchableOpacity>
            {this.state.isDays === true ? <TextInput
            style={{width: 100, fontSize: 16, height: 30, borderBottomColor: 'rgb(243, 244, 245)', borderBottomWidth: 1, backgroundColor: 'white', color: 'rgb(72, 73, 74)', borderRadius: 5}}
            onChangeText={(days) => this.setState({days})}
            placeholder={'打卡天数为1-30天'}
            value={this.state.days}
            keyboardType={'numeric'}
          /> : null}
          </View>
	      </ScrollView>
      </View>
    );
  }
}


export default AddActivity;