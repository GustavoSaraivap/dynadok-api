// jest.config.js  – configuração única do Jest
/** @type {import('jest').Config} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',

  // diretórios de teste
  roots: ['<rootDir>/tests'],

  // extensões que serão resolvidas
  moduleFileExtensions: ['ts', 'js', 'json'],

  // cobertura
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageThreshold: {
    global: {
      branches: 95,
      functions: 95,
      lines: 95,
      statements: 95,
    },
  },
};
