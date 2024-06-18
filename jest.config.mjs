const nextJest = require('next/jest')

const createJestConfig = nextJest({
    //Provide the path to your Nexgt.js is app to load next
    dir: './',

})

//Add any custom config to be passed
/** @type {import('jest').Config} */

const config = {
    // Add more setup options before each test run
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],

    testEnvironment: 'jest-enviroment-jsdom',

}

// createJestConfig is exported this way to ensure
module.exports = createJestConfig(config)