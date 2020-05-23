module.exports = {
    testEnvironment: 'node',
    transform: {
        '\\.(ts|tsx)$': 'ts-jest',
    },
    moduleFileExtensions: ['ts', 'tsx'],
    testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.ts$',
    coverageDirectory: 'coverage',
    collectCoverageFrom: ['src/**/*.ts', '!src/**/*.d.ts'],
};
