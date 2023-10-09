export default {
  preset: 'ts-jest',
  testEnvironment: 'node',
  // Optionally, you can specify a moduleNameMapper if you have custom path aliases
  moduleNameMapper: {
    '^@shared-config/(.*)$': '<rootDir>/packages/shared-config/src/$1',
  },
};
