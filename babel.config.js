module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./src'],
          alias: {
            '@': './src',
            '@/assets': './src/assets',
            '@/components': './src/components',
            '@/ui': './src/components/ui',
            '@/constants': './src/constants',
            '@/contexts': './src/contexts',
            '@/navigation': './src/navigation',
            '@/screen': './src/screen',
          },
        },
      ],
      'react-native-reanimated/plugin',
    ],
  };
};
