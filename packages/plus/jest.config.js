module.exports = {
  displayName: "plus",
  globals: {
    "babel-jest": {
      tsconfig: "<rootDir>/tsconfig.spec.json",
      useESM: true,
    },
  },
  transform: {
    "^.+\\.[tj]s$": "babel-jest", // ts-jest
  },
  transformIgnorePatterns: ["node_modules/(?!(tslog)/)"],
  extensionsToTreatAsEsm: [".ts"],
  coverageDirectory: "../../coverage/packages/plus",
  moduleNameMapper: {
    "^(\\.{1,2}/.*)\\.js$": "$1",
  },
};
