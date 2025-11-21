#!/usr/bin/env node

/**
 * Authentication System Setup Validator
 * Run: node verify-auth-setup.js
 * 
 * Checks:
 * ✓ Node.js and npm versions
 * ✓ .env file exists and has required variables
 * ✓ Dependencies are installed
 * ✓ MongoDB connection can be established
 * ✓ JWT secrets are properly formatted
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import dotenv from 'dotenv'
import mongoose from 'mongoose'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Colors for terminal output
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m'
}

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`)
}

function check(condition, successMsg, failMsg) {
  if (condition) {
    log(`✓ ${successMsg}`, 'green')
    return true
  } else {
    log(`✗ ${failMsg}`, 'red')
    return false
  }
}

async function validateAuthSetup() {
  log('\n═══════════════════════════════════════════════════════', 'cyan')
  log('  Authentication System - Setup Validator', 'cyan')
  log('═══════════════════════════════════════════════════════\n', 'cyan')

  let allChecks = true

  // Check 1: Node.js version
  log('1. Checking Node.js Version...', 'blue')
  const nodeVersion = process.version
  const majorVersion = parseInt(nodeVersion.split('.')[0].slice(1))
  allChecks &= check(
    majorVersion >= 18,
    `Node.js version: ${nodeVersion}`,
    `Node.js v18+ required (found ${nodeVersion})`
  )

  // Check 2: npm installed
  log('\n2. Checking npm...', 'blue')
  const npmVersion = require('child_process').execSync('npm --version', { encoding: 'utf-8' }).trim()
  allChecks &= check(
    npmVersion,
    `npm version: ${npmVersion}`,
    'npm not found'
  )

  // Check 3: .env file exists
  log('\n3. Checking .env File...', 'blue')
  const envPath = path.join(__dirname, '.env')
  const envExists = fs.existsSync(envPath)
  allChecks &= check(envExists, '.env file found', '.env file not found - run: cp .env.example .env')

  // Check 4: Load .env and validate required variables
  if (envExists) {
    log('\n4. Validating Environment Variables...', 'blue')
    const envContent = fs.readFileSync(envPath, 'utf-8')
    dotenv.config({ path: envPath })

    const requiredVars = [
      'PORT',
      'NODE_ENV',
      'MONGO_URI',
      'JWT_SECRET',
      'JWT_REFRESH_SECRET'
    ]

    const optionalVars = [
      'JWT_EXPIRE',
      'JWT_REFRESH_EXPIRE',
      'CLIENT_URL',
      'EMAIL_USER',
      'EMAIL_PASS'
    ]

    let requiredMissing = []
    for (const varName of requiredVars) {
      if (!process.env[varName] || process.env[varName].includes('<')) {
        requiredMissing.push(varName)
        log(`  ✗ ${varName}: Not set or uses placeholder`, 'red')
      } else {
        const value = varName.includes('SECRET') ? '[HIDDEN]' : process.env[varName]
        log(`  ✓ ${varName}: Set`, 'green')
      }
    }

    allChecks &= requiredMissing.length === 0

    log('\n  Optional variables:', 'yellow')
    for (const varName of optionalVars) {
      if (process.env[varName]) {
        log(`  ✓ ${varName}: Set`, 'green')
      }
    }

    // Check 5: JWT Secrets format
    if (process.env.JWT_SECRET && process.env.JWT_REFRESH_SECRET) {
      log('\n5. Validating JWT Secrets...', 'blue')
      const jwtSecret = process.env.JWT_SECRET
      const jwtRefreshSecret = process.env.JWT_REFRESH_SECRET

      const isHex = /^[a-f0-9]{64}$/i.test(jwtSecret)
      const isHexRefresh = /^[a-f0-9]{64}$/i.test(jwtRefreshSecret)

      allChecks &= check(
        isHex,
        'JWT_SECRET is 64-char hex string',
        'JWT_SECRET should be 64-char hex string (generate: node -e "console.log(require(\'crypto\').randomBytes(32).toString(\'hex\'))")'
      )

      allChecks &= check(
        isHexRefresh,
        'JWT_REFRESH_SECRET is 64-char hex string',
        'JWT_REFRESH_SECRET should be 64-char hex string'
      )
    }
  } else {
    allChecks = false
  }

  // Check 6: node_modules exists
  log('\n6. Checking Dependencies...', 'blue')
  const nodeModulesPath = path.join(__dirname, 'node_modules')
  const depsInstalled = fs.existsSync(nodeModulesPath)
  allChecks &= check(
    depsInstalled,
    'Dependencies installed',
    'Dependencies not installed - run: npm install'
  )

  if (depsInstalled) {
    const requiredPackages = [
      'express',
      'mongoose',
      'jsonwebtoken',
      'bcryptjs',
      'dotenv'
    ]

    for (const pkg of requiredPackages) {
      const pkgPath = path.join(nodeModulesPath, pkg)
      const exists = fs.existsSync(pkgPath)
      if (exists) {
        log(`  ✓ ${pkg}`, 'green')
      } else {
        log(`  ✗ ${pkg} missing`, 'red')
        allChecks = false
      }
    }
  }

  // Check 7: Test MongoDB connection (optional, requires connection)
  if (process.env.MONGO_URI && !process.env.MONGO_URI.includes('<')) {
    log('\n7. Testing MongoDB Connection...', 'blue')
    try {
      log('  Connecting to MongoDB...', 'yellow')
      await mongoose.connect(process.env.MONGO_URI, {
        serverSelectionTimeoutMS: 5000,
        connectTimeoutMS: 5000
      })

      const connected = mongoose.connection.readyState === 1
      if (connected) {
        log(`  ✓ MongoDB connected: ${mongoose.connection.host}`, 'green')
        log(`  ✓ Database: ${mongoose.connection.name}`, 'green')
      } else {
        log(`  ✗ MongoDB connection failed`, 'red')
        allChecks = false
      }

      await mongoose.connection.close()
    } catch (error) {
      log(`  ✗ MongoDB error: ${error.message}`, 'red')
      allChecks = false
    }
  }

  // Check 8: Key files exist
  log('\n8. Checking Auth System Files...', 'blue')
  const requiredFiles = [
    'models/User.js',
    'controllers/authController.js',
    'middleware/authMiddleware.js',
    'routes/auth.js',
    'config/db.js',
    'server.js'
  ]

  for (const file of requiredFiles) {
    const filePath = path.join(__dirname, file)
    const exists = fs.existsSync(filePath)
    allChecks &= check(
      exists,
      `${file} exists`,
      `${file} not found`
    )
  }

  // Summary
  log('\n═══════════════════════════════════════════════════════', 'cyan')
  if (allChecks) {
    log('✓ All checks passed! Ready to start server.', 'green')
    log('  Run: npm run dev', 'cyan')
  } else {
    log('✗ Some checks failed. See above for details.', 'red')
    log('\nCommon fixes:', 'yellow')
    log('  • Copy .env: cp .env.example .env', 'yellow')
    log('  • Install deps: npm install', 'yellow')
    log('  • Generate secrets: node -e "console.log(require(\'crypto\').randomBytes(32).toString(\'hex\'))"', 'yellow')
    log('  • Update MONGO_URI in .env', 'yellow')
  }
  log('═══════════════════════════════════════════════════════\n', 'cyan')

  return allChecks
}

// Run validation
validateAuthSetup().then(success => {
  process.exit(success ? 0 : 1)
}).catch(error => {
  log(`\nUnexpected error: ${error.message}`, 'red')
  process.exit(1)
})
