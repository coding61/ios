/**
 * @author: chenwei
 * @description: 答题，答对，答错视图
 * @time: 2017-07-18
 */
 /**
  *  type,            图片的类型，hongbao、zuan
  *  msg  ,           图片下文本消息
  *  hide,            隐藏视图
  *  submitText,      按钮的文字(可选)
  *  submitPressEvent, 按钮触发事件(可选)
  */
'use strict';

import React, { Component,PropTypes } from 'react';

import {
  StyleSheet,
  View,
  Modal,
  Text,
  ActivityIndicator,
  Image,
  Dimensions,
  TouchableOpacity
} from 'react-native';

const height = Dimensions.get('window').height
const width = Dimensions.get('window').width

class RewardView extends Component {
	constructor(props) {
	  super(props);

	  this.state = {};
	}
	_submitPressEvent(){
        this.props.submitPressEvent?this.props.submitPressEvent():this.props.hide();
    }
    _renderFullView(){
    	var img = this.props.type == "hongbao"?require('../assets/Activity/hongbao.png'):this.props.type == "punchcard"?require('../assets/Activity/punch.png'):require('../assets/Activity/zuan.png'),
    		msg = this.props.msg,
    		submitText=this.props.submitText?this.props.submitText:"确定";
    	return (
    		<Modal visible={true} transparent={true} onRequestClose={()=>{}}>
    			<View style={styles.fullParent}>
    				<View style={styles.loadView}>
    					<View style={styles.imgView}>
							<Image
							  style={styles.img}
							  source={img}
							  resizeMode={'contain'}
							/>
						</View>
						<View style={styles.msgView}>
							<Text style={styles.msg}>{msg}</Text>
						</View>
		                <TouchableOpacity style={styles.btn} onPress={this._submitPressEvent.bind(this)}>
		                	<Text style={{color:'white', fontSize:15}}>{submitText}</Text>
		                </TouchableOpacity>
	                </View>
    			</View>
	        </Modal>
    	)
    }
  	render() {
	    return (
	    	<View style={[]}>
	    	{
	   			this._renderFullView()
		    }
	    	</View>
	    );
  	}
}
const w1 = width*3/4
const styles = StyleSheet.create({
	unfullParent:{
		position:'absolute',
		width:width,
		height:height,
		alignItems:'center',
		justifyContent:'center',
	},
	fullParent:{
		flex:1,
		alignItems:'center',
		justifyContent:'center',
		backgroundColor:'rgba(0,0,0,0.6)'
	},
	loadView:{
		width:w1,
		// height:height/2,
		borderRadius:5,
		alignItems:'center',
		// alignSelf:'center',
		justifyContent:'center',
		backgroundColor:'white',
		paddingHorizontal:20,
	},
	imgView:{
		width:w1-20,
		height:120,
		marginTop:15,
		alignItems:'center',
		justifyContent:'center',
	},
	img:{
		width:w1-20,
		height:120,
	},
	msgView:{
		width:w1-20,
		paddingHorizontal:20,
		marginVertical:15,
		alignItems:'center',
		justifyContent:'center',
		height:40,
	},
	msg:{
		color:'#373737',
		// backgroundColor:'blue',
		lineHeight:20,
		fontSize:15,
		textAlign:'center'
	},
	btn:{
		width:w1-60,
		height:45,
		backgroundColor:'#ff7373',
		marginBottom:15,
		borderRadius:5,
		alignItems:'center',
		justifyContent:'center',
		marginHorizontal:20
	}

});


export default RewardView;
