import type { Config } from '@jest/types'

const config: Config.InitialOptions = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: 'src',
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest'
  },
  collectCoverageFrom: ['**/*.(t|j)s'],
  coverageDirectory: '../coverage',
  testEnvironment: 'node',
  // 其他 Jest 配置项...
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1'
  },
  // 如果报错jasmine is not defined 则需要加上这行
  testRunner: 'jest-jasmine2',
  // 每次执行测试前执行这个文件以便让allure生成测试结果报告
  setupFilesAfterEnv: ['jest-allure/dist/setup'],
  reporters: ['default', 'jest-allure']
  // collectCoverage: true,
  // coverageReporters: ['lcov'],
  // testResultsProcessor: 'jest-allure/dist/setup'
}

export default config
