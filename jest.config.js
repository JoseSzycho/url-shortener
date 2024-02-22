/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    collectCoverage: true,
    coverageThreshold: {
      global: {
        branches: 65,
        functions: 65,
        lines: 65,
        statements: 65,
      },
    },
  };