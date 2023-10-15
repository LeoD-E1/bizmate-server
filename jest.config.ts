import type { Config } from '@jest/types'

const config: Config.InitialOptions = {
	preset: 'ts-jest',
	testEnvironment: 'node',
	verbose: true,
	collectCoverage: true,
	collectCoverageFrom: ['**/*.(t|j)s'],
	rootDir: 'src',
	testRegex: '.*\\.test\\.ts$',
}

export default config
