export default {
  transform: {
    "^.+\\.js$": "babel-jest"
  },
  moduleNameMapper: {
    "\\.(css|jpg|jpeg|png|svg|gif|html)$": "<rootDir>/tests/__mocks__/fileMock.js",
  },
}
