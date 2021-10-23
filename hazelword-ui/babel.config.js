const plugins = [
]
if (process.env.VUE_APP_DEBUG === '0') {
  plugins.push('transform-remove-console')
}

module.exports = {
  plugins,
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  env: {
    'test': {
      'presets': [
        ['env', { 'targets': { 'node': 'current' } }]
      ]
    }
  }
}
