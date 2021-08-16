module.exports = {
  transpileDependencies: ['vuetify'],
  pwa: {
    workboxPluginMode: 'InjectManifest',
    workboxOptions: {
      swSrc: 'src/config/firebase-messaging-sw.js',
      exclude: [/\.map$/, /_redirects/],
    },
    manifestOptions: {
      start_url: 'index.html',
    },
    name: 'Tìm Phòng Trọ',
    appleMobileWebAppCapable: 'yes',
  },
};
