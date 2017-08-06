/**
 * # BackendFactory
 *
 * This class sets up the backend by checking the config.js
 *
 */
'use strict'

import CONFIG from './config'
import { server } from './Server'

export default function BackendFactory(token = null) {
  server.initialize()
  return server
}
