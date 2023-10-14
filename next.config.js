/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa')({
    dest: 'public'
})
const nextConfig = {
    // disable: process.env.NODE_ENV === 'development',
      experimental: {
    nextScriptWorkers: true,
  },
}

module.exports = withPWA(nextConfig) 
