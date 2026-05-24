/* eslint-disable */
const { name } = require('./package.json');

module.exports = {
    displayName: name,
    preset: 'ts-jest/presets/js-with-ts',
    moduleNameMapper: {
        '^@cda/toolkit/dom/local$': '<rootDir>/../toolkit/src/dom/local/index.ts',
        '^@cda/toolkit(.*)$': '<rootDir>/../toolkit/src/index.ts',
    },
    testEnvironment: 'jsdom',
    testMatch: ['**/__tests__/**/*.ts', '**/?(*.)+(spec|test).ts'],
    moduleFileExtensions: ['ts', 'js'],
    modulePathIgnorePatterns: [
        "<rootDir>/dist",
        '.*__mocks__.*'
    ]
};