import React, {useState, useRef, useCallback, useEffect} from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
  ActivityIndicator,
  Alert,
  Text,
} from 'react-native';
import {WebView, WebViewNavigation} from 'react-native-webview';

interface AppProps {}

const App: React.FC<AppProps> = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const webViewRef = useRef<WebView>(null);

  // 替换为你的实际网址
  const TARGET_URL = 'http://192.168.1.169:13000/m/page/p5og57w7p6s';

  const handleLoadStart = useCallback(() => {
    setLoading(true);
    setError(false);
  }, []);

  const handleLoadEnd = useCallback(() => {
    setLoading(false);
  }, []);

  const handleError = useCallback(() => {
    setLoading(false);
    setError(true);
    Alert.alert('加载失败', '请检查网络连接或联系管理员', [
      {text: '重试', onPress: handleReload},
      {text: '取消', style: 'cancel'},
    ]);
  }, []);

  const handleReload = useCallback(() => {
    if (webViewRef.current) {
      webViewRef.current.reload();
    }
  }, []);

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <SafeAreaView style={styles.container}>
        {/* 加载指示器 */}
        {loading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#007AFF" />
            <Text style={styles.loadingText}>加载中...</Text>
          </View>
        )}

        {/* 错误提示 */}
        {error && !loading && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>加载失败，请检查网络</Text>
            <Text style={styles.retryText} onPress={handleReload}>
              点击重试
            </Text>
          </View>
        )}

        {/* WebView */}
        <WebView
          ref={webViewRef}
          source={{uri: TARGET_URL}}
          style={[styles.webview, error && !loading && styles.hiddenWebview]}
          onLoadStart={handleLoadStart}
          onLoadEnd={handleLoadEnd}
          onError={handleError}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          startInLoadingState={true}
          allowsBackForwardNavigationGestures={true}
          mixedContentMode="compatibility"
        />
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  webview: {
    flex: 1,
  },
  hiddenWebview: {
    height: 0,
    width: 0,
  },
  loadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    zIndex: 999,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 14,
    color: '#666666',
  },
  errorContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    zIndex: 999,
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    color: '#ff3b30',
    marginBottom: 8,
    textAlign: 'center',
  },
  retryText: {
    fontSize: 14,
    color: '#007AFF',
    textDecorationLine: 'underline',
  },
});

export default App;