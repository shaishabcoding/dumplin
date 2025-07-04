import './configure';
import env from '../util/env/env';
import type ms from 'ms';
import { genSecret } from '../util/crypto/genSecret';
import getIpAddress from '../util/server/getIpAddress';

const node_env = process.env.NODE_ENV ?? 'development';
const server_name = process.env.SERVER_NAME ?? 'Server';
const email = process.env.EMAIL_USER ?? 'admin@example.com';

/**
 * Configuration object for the application
 *
 * This object contains various configuration settings for the application,
 * including server details, database connection, allowed origins, and authentication settings.
 */
const config = {
  server: {
    node_env: env<string>('node env', node_env, 'Server info - start'),
    allowed_origins: env('allowed origins', ['*']),
    ip_address: env('ip address', getIpAddress()),
    port: env('port', Math.floor(Math.random() * 1_000) + 3_000),
    developer: env('developer', 'Shaishab Chandra Shil'),
    name: env('server name', server_name),
    isDevelopment: node_env !== 'production',
    href: 'http://localhost:3000',
    logo: env('logo', '/images/logo.png'),
    default_avatar: env('default avatar', '/images/placeholder.png'),
    mock_mail: env('mock mail', true, 'Server info - end', false),
  },
  url: {
    database: env(
      'database url',
      `mongodb://127.0.0.1:27017/${server_name.toLowerCase().replace(' ', '-')}`,
      'Url info - start',
    ),
    payment: {
      success: env('payment success url', `/payment/success`),
      cancel: env('payment cancel url', `/payment/cancel`),
    },
    api_doc: env('api doc', '', 'Url info - end', false),
  },
  bcrypt_salt_rounds: env('bcrypt salt rounds', 10, 'Authentication - start'),
  otp: {
    exp: env<ms.StringValue>('otp expire in', '10m'),
    length: env('otp length', 6),
    limit: env('otp limit', 2),
    window: env<ms.StringValue>('otp window', '10s'),
  },
  jwt: {
    access_token: {
      secret: env('jwt access secret', genSecret()),
      expire_in: env<ms.StringValue>('jwt access expire in', '1d'),
    },
    refresh_token: {
      secret: env('jwt refresh secret', genSecret()),
      expire_in: env<ms.StringValue>('jwt refresh expire in', '30d'),
    },
    reset_token: {
      secret: env('jwt reset secret', genSecret()),
      expire_in: env<ms.StringValue>(
        'jwt reset expire in',
        '10m',
        'Authentication - end',
        false,
      ),
    },
  },
  payment: {
    stripe: {
      secret: env(
        'stripe secret',
        `sk_${genSecret(16)}`,
        'Payment credentials - start',
      ),
      webhook: env('stripe webhook secret', `whsec_${genSecret(16)}`),
    },
    methods: env<[string, ...string[]]>('payment methods', ['card']),
    default_method: env(
      'default payment method',
      'card',
      'Payment credentials - end',
      false,
    ),
  },
  email: {
    user: env('email user', email, 'Email credentials - start'),
    from: `${server_name} <${email}>`,
    port: env('email port', 587),
    host: env('email host', 'smtp.gmail.com'),
    pass: env('email pass', '', 'Email credentials - end', false),
  },
  admin: {
    name: env('admin name', 'Mr. Admin', 'Admin info - start'),
    email: env('admin email', email),
    password: env('admin password', genSecret(4), 'Admin info - end', false),
  },
  auth: {
    apple: {
      client: env('apple client', '', 'Auth credentials - start'),
    },
  },
  ai: {
    gemini: {
      key: env('gemini key', '', 'AI credentials - start'),
    },
  },
};

export default config;
