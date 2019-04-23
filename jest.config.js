module.exports = {
  testEnvironment: "jsdom",
  moduleFileExtensions: ["jsx", "js"],
  moduleNameMapper: {
    "\\.(scss|css|less)$": "<rootDir>/__mocks__/styleMock.js"
  },
  clearMocks: true,
  testMatch: ["**/__tests__/*.(jsx|js)"],
  setupFiles: ['<rootDir>/jest.setup.js'],
  testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/']
}

// // testEnvironment: 'node',
// testEnvironment: 'jsdom',