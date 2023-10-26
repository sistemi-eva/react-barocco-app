import { StatusBar } from 'expo-status-bar';
import * as Updates from 'expo-updates';
import Constants from 'expo-constants';
import React, { useRef,createRef} from 'react';
import {Platform,Linking,Dimensions,View,ActivityIndicator,Text,Button} from 'react-native';
import { WebView } from 'react-native-webview';
import NetInfo from "@react-native-community/netinfo";
import Svg, {Path} from 'react-native-svg';

const primaryColor = '#8ace6f'
const app_url = 'https://app.uniongaseluce.it'
const fattura_url = 'https://areaclienti.uniongaseluce.it/ubik/'
const STATUSBAR_HEIGHT = Constants.statusBarHeight
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isConnected: false,
      loading: false
    };
    this.unsubscribe = this._handleConnectivityChange.bind(this)
  } 
 componentDidMount(){
   this.setState({loading: true})
   this.unsubscribe()
   setTimeout(()=> {
     this.setState({loading: false})
   },1000)
 }
 componentWillUnmount(){
   this.setState({loading: true})
   if(this.unsubscribe()) {
     this.unsubscribe()
     this.unsubscribe = null
   }
   this.setState({loading: false})
}
  
 _handleConnectivityChange = () => {
   NetInfo.addEventListener(response => {
    this.setState({isConnected:response.isConnected})
  });
 }
 reRender(){
  Updates.reloadAsync()
}
_handleLoading(){
  this.setState({loading:true}) 
}

_handlewebError(){
  this.setState({isWebError:true}) 
}

render(){
  if(this.state.isWebError) {
    return (
      <>
      <StatusBar style={Platform.OS == 'ios' ? 'dark' : 'light'} backgroundColor={primaryColor}/>
      <View style = {{display: 'flex', justifyContent: 'center', alignItems:'center', backgroundColor: '#f2f2f2', width: Dimensions.get('window').width, height: Dimensions.get('window').height , marginTop: STATUSBAR_HEIGHT}}>
      <Svg width={250} height={200} viewBox="0 0 24 24">
        <Path d="
          M19.14,12.94c0.04-0.3,0.06-0.61,0.06-0.94c0-0.32-0.02-0.64-0.07-0.94l2.03-1.58c0.18-0.14,0.23-0.41,0.12-0.61 l-1.92-3.32c-0.12-0.22-0.37-0.29-0.59-0.22l-2.39,0.96c-0.5-0.38-1.03-0.7-1.62-0.94L14.4,2.81c-0.04-0.24-0.24-0.41-0.48-0.41 h-3.84c-0.24,0-0.43,0.17-0.47,0.41L9.25,5.35C8.66,5.59,8.12,5.92,7.63,6.29L5.24,5.33c-0.22-0.08-0.47,0-0.59,0.22L2.74,8.87 C2.62,9.08,2.66,9.34,2.86,9.48l2.03,1.58C4.84,11.36,4.8,11.69,4.8,12s0.02,0.64,0.07,0.94l-2.03,1.58 c-0.18,0.14-0.23,0.41-0.12,0.61l1.92,3.32c0.12,0.22,0.37,0.29,0.59,0.22l2.39-0.96c0.5,0.38,1.03,0.7,1.62,0.94l0.36,2.54 c0.05,0.24,0.24,0.41,0.48,0.41h3.84c0.24,0,0.44-0.17,0.47-0.41l0.36-2.54c0.59-0.24,1.13-0.56,1.62-0.94l2.39,0.96 c0.22,0.08,0.47,0,0.59-0.22l1.92-3.32c0.12-0.22,0.07-0.47-0.12-0.61L19.14,12.94z M12,15.6c-1.98,0-3.6-1.62-3.6-3.6 s1.62-3.6,3.6-3.6s3.6,1.62,3.6,3.6S13.98,15.6,12,15.6z"
        fill="#8ace6f"/>
      </Svg>
      <Text style={{textAlign: 'center',fontSize:35, fontWeight:'600',color:'#9d948c'}}>
         C'è stato un errore
      </Text>
      <Text  style={{marginLeft:45,marginRight:40, marginBottom:30, textAlign: 'center',marginTop: 20, fontSize:20,color:'silver'}}>
        Scusaci per l'inconveniente. Stiamo lavorando per migliorare il servizio. Prova a ricaricare l'app con il bottone oppure chiudi e riapri l'app
      </Text>
      <View style={{width:'70%'}}>
        <Button color={primaryColor}  title="Riavvia l'app" onPress = {(e) => {
          this.reRender()
        }} 
        />
      </View>
      </View>  
      </>
    )
  }
  if(this.state.loading == true) {
    return(
      <View
        style={{
          flex: 1,
          backgroundColor: '#f2f2f2', 
          width: Dimensions.get('window').width, 
          height: Dimensions.get('window').height,
          padding: 20,
          alignContent :'center',
          justifyContent :'center',
        }}>
        <StatusBar style={Platform.OS == 'ios' ? 'dark' : 'light'} backgroundColor={primaryColor}/>
        <ActivityIndicator size="large" color={primaryColor} />
      </View>
    )
  }
  else if(this.state.isConnected === false) {
    return(
      <>
        <StatusBar style={Platform.OS == 'ios' ? 'dark' : 'light'} backgroundColor={primaryColor}/>
        <View style = {{display: 'flex', justifyContent: 'center', alignItems:'center', backgroundColor: '#f2f2f2', width: Dimensions.get('window').width, height: Dimensions.get('window').height , marginTop: STATUSBAR_HEIGHT}}>
        <Svg width={250} height={200} viewBox="0 0 48 48">
          <Path d="M35.12 28.48c.56-1.38.88-2.89.88-4.48 0-6.63-5.37-12-12-12-1.59 0-3.1.32-4.49.88l3.25 3.25c.41-.07.82-.13 1.24-.13 4.42 0 8 3.58 8 8 0 .43-.04.85-.11 1.25l3.23 3.23zM24 8c8.84 0 16 7.16 16 16 0 2.71-.7 5.24-1.89 7.47l2.94 2.94C42.91 31.38 44 27.82 44 24c0-11.05-8.96-20-20-20-3.82 0-7.38 1.09-10.41 2.95l2.92 2.92C18.74 8.68 21.29 8 24 8zM6.54 5L4 7.55l4.21 4.21C5.58 15.14 4 19.38 4 24c0 7.39 4.02 13.83 9.99 17.29l2-3.46C11.22 35.07 8 29.91 8 24c0-3.51 1.14-6.75 3.06-9.39l2.87 2.87C12.71 19.36 12 21.59 12 24c0 4.44 2.41 8.3 5.99 10.38l2.02-3.48C17.62 29.51 16 26.96 16 24c0-1.29.34-2.49.88-3.57l3.16 3.16L20 24c0 2.21 1.79 4 4 4l.41-.04.02.02L39.45 43 42 40.45 8.54 7l-2-2z" 
          fill="#8ace6f"/>
        </Svg>
        <Text style={{textAlign: 'center',fontSize:35, fontWeight:'600',color:'#9d948c'}}>
            Sei Offline!!
        </Text>
        <Text  style={{marginLeft:45,marginRight:40, textAlign: 'center',marginTop: 20, fontSize:20,color:'silver'}}>
          Non sei connesso ad internet. Hai bisogno di essere connesso per continuare ad utilizzare l'applicazione
        </Text>
        </View>  
        </>
    )
  }else{
    return(
      <View style = {{flex: 1, width: Dimensions.get('window').width, height: Dimensions.get('window').height}} >
        <StatusBar style={Platform.OS == 'ios' ? 'dark' : 'light'} backgroundColor={primaryColor}/>
        <WebView 
          onShouldStartLoadWithRequest = {(event) => {
            if(Platform.OS == 'ios') {
              if(event.url.startsWith(fattura_url)) {
                Linking.openURL(event.url).then((supported) => {
                  if (!supported) {
                    return false
                  } else {
                    Linking.openURL(event.url);
                    return false
                  }
                }).catch(err => console.error('An error occurred', err));
              }else return true
              return false
            }
            return true
          }}
          cacheEnabled={true}
          thirdPartyCookiesEnabled={true}
          sharedCookiesEnabled={true}
          originWhitelist={['http://*', 'https://*', 'intent://*']}
          startInLoadingState={false}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          startInLoadingState={true}
          onError = {(e) => { this._handlewebError()  }}
          mixedContentMode={'always'}
          allowsBackForwardNavigationGestures = {true}
          source={{ uri: app_url }} 
          style = {{flex: 1, width: Dimensions.get('window').width, height: Dimensions.get('window').height , marginTop: STATUSBAR_HEIGHT}} 
          />
      </View>
    )
  }
  
 }
}