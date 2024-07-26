module.exports = {
  commitlint: {
    extends: ['@commitlint/config-conventional']
  },
  rules: {
    'type-enum': [
      2,
      'always',
      ['feat', 'fix', 'docs', 'style', 'refactor', 'perf', 'test', 'build', 'ci', 'revert', 'chore']
    ]
  },
  prompt: {
    types: [
      { name: 'feat', value: 'feat', emoji: ':sparkles:' },
      { name: 'fix', value: 'fix', emoji: ':bug:' },
      { name: 'docs', value: 'docs', emoji: ':memo:' },
      { name: 'style', value: 'style', emoji: ':lipstick:' },
      { name: 'refactor', value: 'refactor', emoji: ':recycle:' },
      { name: 'perf', value: 'perf', emoji: ':zap:' },
      { name: 'test', value: 'test', emoji: ':white_check_mark:' },
      {
        name: 'build',
        value: 'build',
        emoji: ':package:'
      },
      { name: 'ci', value: 'ci', emoji: ':ferris_wheel:' },
      { name: 'revert', value: 'revert', emoji: ':rewind:' },
      {
        name: 'chore',
        value: 'chore',
        emoji: ':hammer:'
      }
    ],
    useEmoji: true
  }
}
