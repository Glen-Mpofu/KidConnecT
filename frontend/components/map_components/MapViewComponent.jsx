// components/MapViewComponent.js
import { Platform } from 'react-native';
import React from 'react';

let MapViewComponent = () => null; // fallback

if (Platform.OS === 'web') {
  MapViewComponent = require('./WebMap').default;
} else if (Platform.OS === 'android' || Platform.OS === 'ios') {
  MapViewComponent = require('./_NativeMap').default;
}

export default MapViewComponent;
