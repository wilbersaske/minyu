// arquivos/database/Pagamento/cache.js
const pixCache = new Map();

// Limpeza automática a cada 5 minutos (remove dados com +15 minutos)
setInterval(() => {
  const now = Date.now();
  for (const [key, data] of pixCache.entries()) {
    if (now - data.timestamp > 15 * 60 * 1000) {
      pixCache.delete(key);
    }
  }
}, 5 * 60 * 1000);

module.exports = { pixCache };