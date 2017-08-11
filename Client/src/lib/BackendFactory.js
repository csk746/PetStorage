'use strict'
import { server } from './Server'

export default function BackendFactory() {
  server.initialize()
  return server
}