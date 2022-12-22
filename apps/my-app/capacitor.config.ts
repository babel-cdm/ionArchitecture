import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'es.babel.myapp',
  appName: 'my-app',
  webDir: '../../dist/apps/my-app',
  bundledWebRuntime: false,
  includePlugins: [
    "@capacitor/app",
    "@capacitor/core",
    "@capacitor/haptics",
    "@capacitor/keyboard",
    "@capacitor/status-bar"
 ]
};

export default config;
