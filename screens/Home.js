import React from 'react';
import { StyleSheet, Text, View,TextInput,TouchableOpacity,KeyboardAvoidingView,Alert } from 'react-native';
import * as  firebase from "firebase";
import {Container,Header,Content,ListItem,CheckBox,Body } from "native-base"

var firebaseConfig = {
    apiKey: "AIzaSyDYAayDPCSbBPkwaR-zS_7JxvcUdGH2J18",
    authDomain: "savingsapp-da36d.firebaseapp.com",
    databaseURL: "https://savingsapp-da36d.firebaseio.com",
    projectId: "savingsapp-da36d",
    storageBucket: "savingsapp-da36d.appspot.com",
    messagingSenderId: "574036959193",
    appId: "1:574036959193:web:1e6894876fcb44ea"
  };
  
  firebase.initializeApp(firebaseConfig);
  
  export default class Home extends React.Component{
   
    constructor(props){
      super(props);
      this.state={
        cost:"",
        description:"",
        expenditureList:[]
        
      }
    }
    
    static navigationOptions={
        header: null
    }
    
    sendMessage = (cost,description) => {
      var expenditureListRef = firebase.database().ref("expenditure_list");
      var newExpenditureRef = expenditureListRef.push();
      newExpenditureRef.set({
        value:cost,
        text:description,
        time:Date().toString()
      }) ;
      this.setState({cost:""});
      this.setState({description:""})
    }  
    
    updateList=expenditureList =>{
        this.setState({expenditureList})
    }

    componentWillMount(){
        
        var self =this;
        var expenditureListRef = firebase.database().ref("expenditure_list")
        expenditureListRef.on("value",dataSnapshot => {
            if (dataSnapshot.val()){
                let expenditureList = Object.values(dataSnapshot.val());
                self.updateList(expenditureList);
            }
        })
    }
    
  
   
  render(){
    return (
      <KeyboardAvoidingView behavior="padding" enabled  style={styles.container}>
      <View style={{backgroundColor:"#218F76",padding:20,borderRadius:10,marginBottom:10}}>
      <Text style={{fontSize:30,color:"white",}}>Expenditure Handler</Text>
      </View>
      <View>
      <Text style={{fontSize:20,fontWeight:"bold"}}>Cost :</Text>
      <TextInput style={{width:300,height:50,borderWidth:4,borderRadius:10,marginTop:15,fontSize:20,padding:10}} onChangeText={text=>{this.setState({cost:text})}} />
      </View>
      <View>
      <Text style={{fontSize:20,fontWeight:"bold",marginTop:10}}>Description :</Text>
      
          <ListItem style={{padding:10,width:300}}>
            <CheckBox checked={true} style={{}}/>
            <Body style={{padding:10}}>
              <Text style={{fontSize:25}}>Daily Stand Up</Text>
            </Body>
          </ListItem>
          
      </View>
      <View style={{flexDirection:"row"}}>
      <TouchableOpacity onPress={() => {this.sendMessage(this.state.cost,this.state.description)}} style={{alignItems:"center",backgroundColor:"#10A881",marginTop:40,alignSelf:"center",width:150,height:60,borderRadius:20,justifyContent:"center",padding:10}}>
      <Text style={{fontSize:20,fontWeight:"bold",color:"white"}}>OK</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={()=>{this.props.navigation.navigate("list",{expenditureList:this.state.expenditureList})}} style={{alignItems:"center",backgroundColor:"#10A881",marginTop:40,alignSelf:"center",width:150,height:60,borderRadius:20,justifyContent:"center",padding:10,marginLeft:10}}>
      <Text style={{fontSize:20,fontWeight:"bold",color:"white"}}>Track</Text>
      </TouchableOpacity>
      </View>
      </KeyboardAvoidingView>
    );
  }
  }
  
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor:"#7CEC9F"
    },
  });
  