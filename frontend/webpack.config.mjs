import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
  // Các cấu hình khác của bạn
  resolve: {
    fallback: {
      crypto: 'crypto-browserify',
      stream: 'stream-browserify',
      assert: 'assert',
    },
  },
  // Các cấu hình khác của bạn
};
