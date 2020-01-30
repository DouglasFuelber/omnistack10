import React from 'react';
import { WebView } from "react-native-webview";

export default ({ navigation }) => {
    const githubUsername = navigation.getParam('github_username');

    return <WebView styles={{ flex: 1 }} source={{ uri: `https://github.com/${githubUsername}` }} />
}
