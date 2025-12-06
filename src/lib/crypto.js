/**
 * 🔐 Módulo de Criptografia - Agente GPT Master Premium
 * Proteção de ponta a ponta para chaves sensíveis
 */

import crypto from 'crypto';

// Algoritmo de criptografia AES-256-GCM (padrão bancário)
const ALGORITHM = 'aes-256-gcm';
const IV_LENGTH = 16;
const AUTH_TAG_LENGTH = 16;
const SALT_LENGTH = 64;
const KEY_LENGTH = 32;
const ITERATIONS = 100000;

/**
 * Deriva uma chave segura a partir de uma senha
 */
function deriveKey(password, salt) {
  return crypto.pbkdf2Sync(password, salt, ITERATIONS, KEY_LENGTH, 'sha512');
}

/**
 * Criptografa um texto usando AES-256-GCM
 * @param {string} plaintext - Texto a ser criptografado
 * @param {string} masterKey - Chave mestra (use JWT_SECRET ou similar)
 * @returns {string} - Texto criptografado em formato base64
 */
export function encrypt(plaintext, masterKey) {
  const salt = crypto.randomBytes(SALT_LENGTH);
  const iv = crypto.randomBytes(IV_LENGTH);
  const key = deriveKey(masterKey, salt);
  
  const cipher = crypto.createCipheriv(ALGORITHM, key, iv);
  const encrypted = Buffer.concat([cipher.update(plaintext, 'utf8'), cipher.final()]);
  const authTag = cipher.getAuthTag();
  
  // Formato: salt + iv + authTag + encrypted
  const result = Buffer.concat([salt, iv, authTag, encrypted]);
  return result.toString('base64');
}

/**
 * Descriptografa um texto criptografado com AES-256-GCM
 * @param {string} encryptedText - Texto criptografado em base64
 * @param {string} masterKey - Chave mestra usada na criptografia
 * @returns {string} - Texto original
 */
export function decrypt(encryptedText, masterKey) {
  const buffer = Buffer.from(encryptedText, 'base64');
  
  const salt = buffer.subarray(0, SALT_LENGTH);
  const iv = buffer.subarray(SALT_LENGTH, SALT_LENGTH + IV_LENGTH);
  const authTag = buffer.subarray(SALT_LENGTH + IV_LENGTH, SALT_LENGTH + IV_LENGTH + AUTH_TAG_LENGTH);
  const encrypted = buffer.subarray(SALT_LENGTH + IV_LENGTH + AUTH_TAG_LENGTH);
  
  const key = deriveKey(masterKey, salt);
  
  const decipher = crypto.createDecipheriv(ALGORITHM, key, iv);
  decipher.setAuthTag(authTag);
  
  return decipher.update(encrypted) + decipher.final('utf8');
}

/**
 * Mascara uma chave API para logs (mostra apenas início e fim)
 * @param {string} apiKey - Chave a ser mascarada
 * @returns {string} - Chave mascarada
 */
export function maskApiKey(apiKey) {
  if (!apiKey || apiKey.length < 10) return '***';
  return `${apiKey.substring(0, 6)}...${apiKey.substring(apiKey.length - 4)}`;
}

/**
 * Valida se uma chave tem formato esperado
 * @param {string} key - Chave a validar
 * @param {string} prefix - Prefixo esperado (ex: 'AIzaSy')
 * @returns {boolean}
 */
export function validateKeyFormat(key, prefix = 'AIzaSy') {
  return key && key.startsWith(prefix) && key.length >= 30;
}

/**
 * Gera um hash seguro de uma chave (para comparação sem expor)
 * @param {string} key - Chave original
 * @returns {string} - Hash SHA-256
 */
export function hashKey(key) {
  return crypto.createHash('sha256').update(key).digest('hex');
}

export default {
  encrypt,
  decrypt,
  maskApiKey,
  validateKeyFormat,
  hashKey
};
