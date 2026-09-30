/// <reference types="@capawesome/capacitor-android-edge-to-edge-support" />

import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'castello.gdr.larp',
  appName: 'Castello',
  webDir: 'www/browser',
  plugins: {
    SystemBars: {
      insetsHandling: 'disable',
    },
    Keyboard: {
      resizeOnFullScreen: false,
    },
  },
};

export default config;
