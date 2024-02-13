module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    parserOptions: {
        tsconfigRootDir: __dirname,
        project: ['./tsconfig.json'],
    },
    plugins: [
        '@typescript-eslint',
        'import'
    ],
    extends: [
        '../shared/.eslintrc.js',
    ],
    rules: {
        'indent': ['warn', 4, {
            'SwitchCase': 1,
            'MemberExpression': 'off',
            'flatTernaryExpressions': true,
            'ArrayExpression': 'first',
            'ObjectExpression': 'first',
        }]
    },
};
