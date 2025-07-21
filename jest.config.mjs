// jest.config.mjs（推荐简洁写法，不再用 jsonc-parser）
export default {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleFileExtensions: ['ts', 'js', 'json'],
  testMatch: ['**/tests/**/*.test.ts'],
  collectCoverage: true,
  coverageDirectory: 'coverage',
  transform: {
    '^.+\\.ts$': ['ts-jest'],
  },
  globals: {
    'ts-jest': {
      tsconfig: './tsconfig.json',  // ✅ 显式指定 tsconfig
    },
  },
};
