// module.exports = {
//     testEnvironment: 'jest-environment-jsdom',
//     setupFiles: ['./jest.setup.js']
// }
//modulos
module.exports = {
    "roots": [
      "<rootDir>/src"
    ],
    "testMatch": [
      "**/__tests__/**/*.+(ts|tsx|js)",
      "**/?(*.)+(spec|test).+(ts|tsx|js)"
    ],
    "transform": {
      "^.+\\.(ts|tsx)$": "ts-jest"
    },

    // testEnvironment: 'jsdom'
    testEnvironment: 'jest-environment-jsdom'
  }